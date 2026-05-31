<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HandlesMediaUploads
{
    protected function storeUploadedFile(?UploadedFile $file, string $directory): ?string
    {
        if (! $file) {
            return null;
        }

        $path = $file->store($directory, 'public');

        return Storage::disk('public')->url($path);
    }

    protected function replaceUploadedFile(?UploadedFile $file, ?string $currentUrl, string $directory): ?string
    {
        if (! $file) {
            return $currentUrl;
        }

        $this->deleteStoredFile($currentUrl);

        return $this->storeUploadedFile($file, $directory);
    }

    protected function deleteStoredFile(?string $url): void
    {
        if (! $url || ! Str::startsWith($url, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(Str::after($url, '/storage/'));
    }
}
