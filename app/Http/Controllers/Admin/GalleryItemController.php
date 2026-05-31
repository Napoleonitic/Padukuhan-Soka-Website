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

    public function edit(GalleryItem $galleryItem): View
    {
        return view('admin.gallery.edit', compact('galleryItem'));
    }

    public function update(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        $galleryItem->update([
            'title' => $validated['title'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'image_url' => $this->replaceUploadedFile($request->file('image'), $galleryItem->image_url, 'gallery'),
        ]);

        return redirect()
            ->route('admin.gallery.index')
            ->with('success', 'Foto galeri berhasil diperbarui.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        $this->deleteStoredFile($galleryItem->image_url);
        $galleryItem->delete();

        return redirect()
            ->route('admin.gallery.index')
            ->with('success', 'Foto galeri berhasil dihapus.');
    }
}
