<form method="POST" action="{{ $action }}" enctype="multipart/form-data" class="stack">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif

    <div class="form-grid">
        <div class="field">
            <label class="field-label" for="title">Judul</label>
            <input class="input" id="title" name="title" type="text" value="{{ old('title', $article->title) }}" required>
        </div>

        <div class="field">
            <label class="field-label" for="cover_image">Cover</label>
            <input class="input" id="cover_image" name="cover_image" type="file" accept="image/*">
            <p class="help-text">Biarkan kosong jika tidak ingin mengganti gambar.</p>
            @if ($article->cover_image)
                <img class="image-preview" src="{{ $article->cover_image }}" alt="{{ $article->title }}">
            @endif
        </div>
    </div>

    <div class="field">
        <label class="field-label" for="excerpt">Ringkasan</label>
        <textarea class="textarea" id="excerpt" name="excerpt" rows="3">{{ old('excerpt', $article->excerpt) }}</textarea>
    </div>

    <div class="field">
        <label class="field-label" for="content">Konten</label>
        <textarea class="textarea" id="content" name="content" rows="12" required>{{ old('content', $article->content) }}</textarea>
    </div>

    <label class="checkbox-row">
        <input type="checkbox" name="is_published" value="1" {{ old('is_published', $article->is_published) ? 'checked' : '' }}>
        <span>Publikasikan berita ini</span>
    </label>

    <div class="form-actions">
        <button class="button button-primary" type="submit">{{ $submitLabel }}</button>
        <a class="button button-ghost" href="{{ route('admin.articles.index') }}">Batal</a>
    </div>
</form>
