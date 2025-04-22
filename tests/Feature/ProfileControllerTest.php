<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfileControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_profile_photo()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->actingAs($user)
            ->post(route('profile.update'), [
                'photo' => $file
            ]);

        $response->assertRedirect(route('profile.edit'));
        Storage::disk('public')->assertExists('profile-photos/' . $file->hashName());
    }

    public function test_user_can_delete_account()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'password'
            ]);

        $response->assertRedirect('/');
        $this->assertNull(User::find($user->id));
    }
} 