<?php

namespace App\Models\Concerns;

use Illuminate\Support\Str;

trait ResolvesMediaUrls
{
    protected function resolveMediaUrl(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        if (filter_var($value, FILTER_VALIDATE_URL)) {
            $path = parse_url($value, PHP_URL_PATH);

            if (is_string($path) && Str::startsWith($path, ['/images/', '/storage/'])) {
                return $path;
            }

            return $value;
        }

        if (Str::startsWith($value, ['/images/', '/storage/'])) {
            return $value;
        }

        if (Str::startsWith($value, ['images/', 'storage/'])) {
            return '/' . ltrim($value, '/');
        }

        return '/storage/' . ltrim($value, '/');
    }
}
