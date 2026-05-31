<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertSee('Padukuhan Soka')
            ->assertSee('Selamat datang di Padukuhan Soka')
            ->assertSee('Temukan Padukuhan Soka langsung di peta.')
            ->assertSee('Buka di Google Maps');
    }
}
