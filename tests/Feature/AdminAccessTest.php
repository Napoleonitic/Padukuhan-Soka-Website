<?php

namespace Tests\Feature;

use App\Models\GalleryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_and_access_dashboard(): void
    {
        $admin = User::query()->create([
            'name' => 'Admin Soka',
            'email' => 'admin@example.com',
            'password' => 'secret123',
            'is_admin' => true,
        ]);

        $response = $this->post('/admin/login', [
            'email' => $admin->email,
            'password' => 'secret123',
        ]);

        $response->assertRedirect(route('admin.dashboard'));
        $this->assertAuthenticatedAs($admin);

        $this->get('/admin/dashboard')
            ->assertOk()
            ->assertSee('Dashboard');
    }

    public function test_non_admin_login_is_rejected_for_admin_area(): void
    {
        $member = User::query()->create([
            'name' => 'Warga Biasa',
            'email' => 'member@example.com',
            'password' => 'secret123',
            'is_admin' => false,
        ]);

        $response = $this->post('/admin/login', [
            'email' => $member->email,
            'password' => 'secret123',
        ]);

        $response
            ->assertSessionHasErrors('email')
            ->assertSessionHasInput('email', $member->email);

        $this->assertGuest();
    }

    public function test_admin_can_open_gallery_edit_page(): void
    {
        $admin = User::query()->create([
            'name' => 'Admin Soka',
            'email' => 'admin@example.com',
            'password' => 'secret123',
            'is_admin' => true,
        ]);

        $galleryItem = GalleryItem::query()->create([
            'title' => 'Kegiatan Warga',
            'caption' => 'Kerja bakti pagi hari.',
            'image_url' => 'https://example.com/gallery.jpg',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.gallery.edit', ['gallery' => $galleryItem]))
            ->assertOk()
            ->assertSee('Perbarui foto')
            ->assertSee(route('admin.gallery.update', ['gallery' => $galleryItem]), false);
    }

    public function test_gallery_edit_page_normalizes_local_storage_urls(): void
    {
        $admin = User::query()->create([
            'name' => 'Admin Soka',
            'email' => 'admin@example.com',
            'password' => 'secret123',
            'is_admin' => true,
        ]);

        $galleryItem = GalleryItem::query()->create([
            'title' => 'Foto Upload',
            'caption' => 'Foto hasil upload admin.',
            'image_url' => 'http://localhost/storage/gallery/uploaded-photo.jpg',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.gallery.edit', ['gallery' => $galleryItem]))
            ->assertOk()
            ->assertSee('src="/storage/gallery/uploaded-photo.jpg"', false);
    }
}
