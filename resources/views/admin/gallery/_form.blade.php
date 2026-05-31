<form method="POST" action="{{ $action }}" enctype="multipart/form-data" class="stack">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif

    <div class="form-grid">
        <div class="field">
            <label class="field-label" for="title">Judul foto</label>
            <input class="input" id="title" name="title" type="text" value="{{ old('title', $galleryItem->title) }}">
        </div>

        <div class="field">
            <label class="field-label" for="caption">Caption</label>
            <input class="input" id="caption" name="caption" type="text" value="{{ old('caption', $galleryItem->caption) }}">
        </div>
    </div>

    <div class="field">
        <label class="field-label" for="image">Gambar</label>
        <input class="input" id="image" name="image" type="file" accept="image/*" {{ $method === 'POST' ? 'required' : '' }}>
        <p class="help-text">
            {{ $method === 'POST' ? 'Unggah foto baru untuk ditampilkan di galeri.' : 'Pilih foto baru jika ingin mengganti gambar yang sekarang.' }}
        </p>
        @if ($galleryItem->image_url)
            <p class="help-text">Foto saat ini:</p>
            <img class="image-preview" src="{{ $galleryItem->image_url }}" alt="{{ $galleryItem->title ?: 'Galeri Padukuhan Soka' }}">
        @endif
    </div>

    <div class="form-actions">
        <button class="button button-primary" type="submit">{{ $submitLabel }}</button>
        <a class="button button-ghost" href="{{ route('admin.gallery.index') }}">Batal</a>
    </div>
</form>
