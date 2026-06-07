import { unstable_noStore as noStore } from "next/cache";

import {
  fallbackActivities,
  fallbackArticles,
  fallbackGalleryItems,
} from "@/lib/fallback-data";
import { resolveMediaUrl } from "@/lib/media";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { villageLocation, getMapLinks } from "@/lib/site-config";

function normalizeArticle(article) {
  return {
    ...article,
    cover_image: resolveMediaUrl(article.cover_image),
  };
}

function normalizeActivity(activity) {
  return {
    ...activity,
    image: resolveMediaUrl(activity.image),
  };
}

function normalizeGalleryItem(item) {
  return {
    ...item,
    image_url: resolveMediaUrl(item.image_url),
  };
}

function getFallbackHomeData() {
  return {
    articles: fallbackArticles.slice().sort(sortArticles).slice(0, 3),
    activities: fallbackActivities.slice().sort(sortActivities).slice(0, 4),
    galleryItems: fallbackGalleryItems.slice().sort(sortByCreatedAt).slice(0, 9),
    location: {
      ...villageLocation,
      ...getMapLinks(),
    },
    source: "fallback",
  };
}

function sortArticles(left, right) {
  return (
    new Date(right.published_at || right.created_at).getTime() -
    new Date(left.published_at || left.created_at).getTime()
  );
}

function sortActivities(left, right) {
  return (
    new Date(right.event_date || right.created_at).getTime() -
    new Date(left.event_date || left.created_at).getTime()
  );
}

function sortByCreatedAt(left, right) {
  return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
}

export async function getHomePageData() {
  noStore();

  if (!isSupabaseConfigured()) {
    return getFallbackHomeData();
  }

  const supabase = createSupabaseServerClient();
  const now = Date.now();

  const [{ data: rawArticles, error: articlesError }, { data: activities, error: activitiesError }, { data: galleryItems, error: galleryError }] =
    await Promise.all([
      supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("id", { ascending: false }),
      supabase
        .from("activities")
        .select("*")
        .order("event_date", { ascending: false, nullsFirst: false })
        .order("id", { ascending: false })
        .limit(4),
      supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(9),
    ]);

  if (articlesError || activitiesError || galleryError) {
    return getFallbackHomeData();
  }

  const articles = (rawArticles || [])
    .filter(
      (article) =>
        !article.published_at || new Date(article.published_at).getTime() <= now,
    )
    .sort(sortArticles)
    .slice(0, 3);

  return {
    articles: (articles || []).map(normalizeArticle),
    activities: (activities || []).map(normalizeActivity),
    galleryItems: (galleryItems || []).map(normalizeGalleryItem),
    location: {
      ...villageLocation,
      ...getMapLinks(),
    },
    source: "supabase",
  };
}

export async function getPublishedArticleBySlug(slug) {
  noStore();

  if (!isSupabaseConfigured()) {
    const article = fallbackArticles.find((item) => item.slug === slug);

    if (!article || !article.is_published) {
      return null;
    }

    return {
      article: normalizeArticle(article),
      recentArticles: fallbackArticles
        .filter((item) => item.slug !== slug && item.is_published)
        .sort(sortArticles)
        .slice(0, 3)
        .map(normalizeArticle),
      source: "fallback",
    };
  }

  const supabase = createSupabaseServerClient();
  const now = Date.now();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!article || (article.published_at && new Date(article.published_at).getTime() > now)) {
    return null;
  }

  const { data: rawRecentArticles } = await supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .neq("id", article.id)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("id", { ascending: false });

  const recentArticles = (rawRecentArticles || [])
    .filter(
      (recentArticle) =>
        !recentArticle.published_at ||
        new Date(recentArticle.published_at).getTime() <= now,
    )
    .sort(sortArticles)
    .slice(0, 3);

  return {
    article: normalizeArticle(article),
    recentArticles: recentArticles.map(normalizeArticle),
    source: "supabase",
  };
}
