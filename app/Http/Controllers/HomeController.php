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
        $location = $this->villageLocation();
        $coordinates = "{$location['latitude']},{$location['longitude']}";

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
            'location' => [
                ...$location,
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=' . urlencode($coordinates),
                'direction_url' => 'https://www.google.com/maps/dir/?api=1&destination=' . urlencode($coordinates),
                'embed_url' => 'https://www.google.com/maps?q=' . urlencode($coordinates) . '&z=18&output=embed',
            ],
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

    private function villageLocation(): array
    {
        return [
            'name' => 'Balai Dusun Soka Mertelu',
            'address' => '5JMH+54J, Soko, Mertelu, Kec. Gedang Sari, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta 55863',
            'plus_code' => '5JMH+54J',
            // Short plus code decoded against the Mertelu area to lock the map to the balai dusun point.
            'latitude' => -7.8170375,
            'longitude' => 110.627765625,
        ];
    }
}
