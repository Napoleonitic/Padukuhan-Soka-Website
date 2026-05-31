<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Article;
use App\Models\GalleryItem;
use Illuminate\Contracts\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        return view('admin.dashboard', [
            'articleCount' => Article::count(),
            'publishedCount' => Article::query()->where('is_published', true)->count(),
            'activityCount' => Activity::count(),
            'galleryCount' => GalleryItem::count(),
            'recentArticles' => Article::query()->latest()->take(4)->get(),
            'recentActivities' => Activity::query()->orderByDesc('event_date')->take(4)->get(),
        ]);
    }
}
