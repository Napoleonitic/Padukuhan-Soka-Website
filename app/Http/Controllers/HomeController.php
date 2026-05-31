<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Article;
use App\Models\GalleryItem;
use Illuminate\Contracts\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        return view('home', [
            'articles' => Article::query()
                ->published()
                ->orderByDesc('published_at')
                ->latest('id')
                ->take(3)
                ->get(),
            'activities' => Activity::query()
                ->orderByDesc('event_date')
                ->latest('id')
                ->take(4)
                ->get(),
            'galleryItems' => GalleryItem::query()
                ->latest()
                ->take(9)
                ->get(),
        ]);
    }

    public function showArticle(Article $article): View
    {
        abort_unless(
            Article::query()->published()->whereKey($article->id)->exists(),
            404,
        );

        return view('articles.show', [
            'article' => $article,
            'recentArticles' => Article::query()
                ->published()
                ->whereKeyNot($article->id)
                ->orderByDesc('published_at')
                ->latest('id')
                ->take(3)
                ->get(),
        ]);
    }
}
