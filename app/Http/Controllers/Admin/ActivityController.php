<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesMediaUploads;
use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    use HandlesMediaUploads;

    public function index(): View
    {
        return view('admin.activities.index', [
            'activities' => Activity::query()
                ->orderByDesc('event_date')
                ->latest('id')
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.activities.create', [
            'activity' => new Activity(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'event_date' => ['nullable', 'date'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        Activity::query()->create([
            'title' => $validated['title'],
            'category' => $validated['category'] ?? null,
            'description' => $validated['description'],
            'event_date' => $validated['event_date'] ?? null,
            'image' => $this->storeUploadedFile($request->file('image'), 'activities'),
        ]);

        return redirect()
            ->route('admin.activities.index')
            ->with('success', 'Kegiatan berhasil ditambahkan.');
    }

    public function edit(Activity $activity): View
    {
        return view('admin.activities.edit', compact('activity'));
    }

    public function update(Request $request, Activity $activity): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'event_date' => ['nullable', 'date'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        $activity->update([
            'title' => $validated['title'],
            'category' => $validated['category'] ?? null,
            'description' => $validated['description'],
            'event_date' => $validated['event_date'] ?? null,
            'image' => $this->replaceUploadedFile($request->file('image'), $activity->image, 'activities'),
        ]);

        return redirect()
            ->route('admin.activities.index')
            ->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy(Activity $activity): RedirectResponse
    {
        $this->deleteStoredFile($activity->image);
        $activity->delete();

        return redirect()
            ->route('admin.activities.index')
            ->with('success', 'Kegiatan berhasil dihapus.');
    }
}
