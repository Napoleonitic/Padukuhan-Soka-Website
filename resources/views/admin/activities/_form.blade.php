<form method="POST" action="{{ $action }}" enctype="multipart/form-data" class="stack">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif

    <div class="form-grid">
        <div class="field">
            <label class="field-label" for="title">Judul kegiatan</label>
            <input class="input" id="title" name="title" type="text" value="{{ old('title', $activity->title) }}" required>
        </div>

        <div class="field">
            <label class="field-label" for="category">Kategori</label>
            <input class="input" id="category" name="category" type="text" value="{{ old('category', $activity->category) }}">
        </div>

        <div class="field">
            <label class="field-label" for="event_date">Tanggal</label>
            <input class="input" id="event_date" name="event_date" type="date" value="{{ old('event_date', optional($activity->event_date)->format('Y-m-d')) }}">
        </div>

        <div class="field">
            <label class="field-label" for="image">Foto kegiatan</label>
            <input class="input" id="image" name="image" type="file" accept="image/*">
            @if ($activity->image)
                <img class="image-preview" src="{{ $activity->image }}" alt="{{ $activity->title }}">
            @endif
        </div>
    </div>

    <div class="field">
        <label class="field-label" for="description">Deskripsi</label>
        <textarea class="textarea" id="description" name="description" rows="8" required>{{ old('description', $activity->description) }}</textarea>
    </div>

    <div class="form-actions">
        <button class="button button-primary" type="submit">{{ $submitLabel }}</button>
        <a class="button button-ghost" href="{{ route('admin.activities.index') }}">Batal</a>
    </div>
</form>
