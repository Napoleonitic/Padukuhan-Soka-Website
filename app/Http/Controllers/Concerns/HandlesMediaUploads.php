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

        return $file->store($directory, 'public');
    }

    protected function replaceUploadedFile(?UploadedFile $file, ?string $currentUrl, string $directory): ?string
    {
        if (! $file) {
            return $currentUrl;
        }

        $this->deleteStoredFile($currentUrl);

        return $this->storeUploadedFile($file, $directory);
    }

    protected function deleteStoredFile(?string $pathOrUrl): void
    {
        $storagePath = $this->extractStoragePath($pathOrUrl);

        if (! $storagePath) {
            return;
        }

        Storage::disk('public')->delete($storagePath);
    }

    protected function extractStoragePath(?string $pathOrUrl): ?string
    {
        if (! $pathOrUrl) {
            return null;
        }

        if (filter_var($pathOrUrl, FILTER_VALIDATE_URL)) {
            $path = parse_url($pathOrUrl, PHP_URL_PATH);

            if (! is_string($path) || ! Str::startsWith($path, '/storage/')) {
                return null;
            }

            $pathOrUrl = $path;
        }

        $pathOrUrl = ltrim(str_replace('\\', '/', $pathOrUrl), '/');

        if (Str::startsWith($pathOrUrl, 'images/')) {
            return null;
        }

        if (Str::startsWith($pathOrUrl, 'storage/')) {
            return Str::after($pathOrUrl, 'storage/');
        }

        return $pathOrUrl;
    }
}
