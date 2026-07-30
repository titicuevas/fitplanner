<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'objective',
        'birth_date',
        'height',
        'weight',
        'gender',
        'fitness_level',
        'goal',
        'profile_photo_path',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'birth_date' => 'date',
        'height' => 'float',
        'weight' => 'float',
    ];

    protected $appends = [
        'profile_photo_url',
    ];

    public function getProfilePhotoUrlAttribute(): ?string
    {
        if ($this->profile_photo_path) {
            return Storage::disk('public')->url($this->profile_photo_path);
        }

        return null;
    }

    public function weeklyPlans(): HasMany
    {
        return $this->hasMany(WeeklyPlan::class);
    }

    public function workouts(): BelongsToMany
    {
        return $this->belongsToMany(Workout::class, 'user_workout', 'user_id', 'workout_id');
    }

    public function completedWorkouts(): BelongsToMany
    {
        return $this->belongsToMany(Workout::class, 'user_workout')
            ->withPivot('completed_at', 'score', 'notes')
            ->withTimestamps();
    }

    public function workoutLogs(): HasMany
    {
        return $this->hasMany(WorkoutLog::class);
    }
}
