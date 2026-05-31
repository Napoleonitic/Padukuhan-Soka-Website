@extends('layouts.site')

@section('title', $article->title . ' | Padukuhan Soka')
@section('description', $article->excerpt ?: \Illuminate\Support\Str::limit(strip_tags($article->content), 150))

@section('content')
    <section class="page-hero">
        <div class="container">
            <a class="back-link" href="{{ route('home') }}#berita" data-reveal="fade">&larr; Kembali ke berita</a>
            <div class="article-layout" data-reveal-group>
                <article class="article-content" data-reveal="left" data-lustre>
                    <span class="eyebrow">Berita Padukuhan</span>
                    <h1 data-parallax="0.03">{{ $article->title }}</h1>
                    <p class="meta">{{ optional($article->published_at)->format('d M Y') ?? $article->created_at->format('d M Y') }}</p>

                    @if ($article->cover_image)
                        <img class="article-cover" src="{{ $article->cover_image }}" alt="{{ $article->title }}" data-reveal="zoom">
                    @endif

                    @if ($article->excerpt)
                        <p class="article-lead">{{ $article->excerpt }}</p>
                    @endif

                    <div class="rich-copy">
                        {!! nl2br(e($article->content)) !!}
                    </div>
                </article>

                <aside class="article-aside">
                    <div class="feature-card" data-reveal="right" data-lustre>
                        <span class="badge">Artikel Lainnya</span>
                        <h3>Baca juga</h3>
                        @forelse ($recentArticles as $recentArticle)
                            <a class="aside-link" href="{{ route('articles.show', $recentArticle->slug) }}">
                                <strong>{{ $recentArticle->title }}</strong>
                                <span>{{ optional($recentArticle->published_at)->format('d M Y') ?? $recentArticle->created_at->format('d M Y') }}</span>
                            </a>
                        @empty
                            <p>Belum ada artikel lain yang dipublikasikan.</p>
                        @endforelse
                    </div>
                </aside>
            </div>
        </div>
    </section>
@endsection
