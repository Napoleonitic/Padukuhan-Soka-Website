<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesMediaUploads;
use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GalleryItemController extends Controller
{
    use HandlesMediaUploads;

    public function index(): View
    {
        return view('admin.gallery.index', [
            'galleryItems' => GalleryItem::query()->latest()->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.gallery.create', [
            'galleryItem' => new GalleryItem(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'image', 'max:4096'],
        ]);

        GalleryItem::query()->create([
            'title' => $validated['title'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'image_url' => $this->storeUploadedFile($request->file('image'), 'gallery'),
        ]);

        return redirect()
            ->route('admin.gallery.index')
            ->with('success', 'Foto galeri berhasil ditambahkan.');
    }

    public function edit(GalleryItem $gallery): View
    {
        return view('admin.gallery.edit', [
            'galleryItem' => $gallery,
        ]);
    }

    public function update(Request $request, GalleryItem $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        $gallery->update([
            'title' => $validated['title'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'image_url' => $this->replaceUploadedFile($request->file('image'), $gallery->image_url, 'gallery'),
        ]);

        return redirect()
            ->route('admin.gallery.index')
            ->with('success', 'Foto galeri berhasil diperbarui.');
    }

    public function destroy(GalleryItem $gallery): RedirectResponse
    {
        $this->deleteStoredFile($gallery->image_url);
        $gallery->delete();

        return redirect()
            ->route('admin.gallery.index')
            ->with('success', 'Foto galeri berhasil dihapus.');
    }
}
