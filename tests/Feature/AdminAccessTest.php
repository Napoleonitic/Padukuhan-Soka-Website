<?php

namespace Tests\Feature;

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
}
