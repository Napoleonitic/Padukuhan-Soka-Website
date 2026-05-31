<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesMediaUploads;
use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    use HandlesMediaUploads;

    public function index(): View
    {
        return view('admin.articles.index', [
            'articles' => Article::query()->latest()->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.articles.create', [
            'article' => new Article(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
        ]);

        $isPublished = $request->boolean('is_published');

        Article::query()->create([
            'title' => $validated['title'],
            'slug' => $this->makeUniqueSlug($validated['title']),
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'],
            'cover_image' => $this->storeUploadedFile($request->file('cover_image'), 'articles'),
            'is_published' => $isPublished,
            'published_at' => $isPublished ? now() : null,
        ]);

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Berita berhasil ditambahkan.');
    }

    public function edit(Article $article): View
    {
        return view('admin.articles.edit', compact('article'));
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
        ]);

        $isPublished = $request->boolean('is_published');

        $article->update([
            'title' => $validated['title'],
            'slug' => $article->title !== $validated['title']
                ? $this->makeUniqueSlug($validated['title'], $article->id)
                : $article->slug,
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'],
            'cover_image' => $this->replaceUploadedFile($request->file('cover_image'), $article->cover_image, 'articles'),
            'is_published' => $isPublished,
            'published_at' => $isPublished ? ($article->published_at ?? now()) : null,
        ]);

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $this->deleteStoredFile($article->cover_image);
        $article->delete();

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Berita berhasil dihapus.');
    }

    private function makeUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slugSeed = $baseSlug !== '' ? $baseSlug : Str::lower(Str::random(8));
        $slug = $slugSeed;
        $suffix = 2;

        while (
            Article::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->exists()
        ) {
            $slug = "{$slugSeed}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
