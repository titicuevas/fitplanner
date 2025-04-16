<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'birth_date',
        'height',
        'weight',
        'gender',
        'fitness_level',
        'goal',
        'profile_photo_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function weeklyPlans()
    {
        return $this->hasMany(WeeklyPlan::class);
    }
    public function workouts()
{
    return $this->belongsToMany(Workout::class, 'user_workout', 'user_id', 'workout_id');

}
public function completedWorkouts()
{
    return $this->belongsToMany(Workout::class, 'user_workout')
        ->withPivot('completed_at', 'score', 'notes') // Incluye los campos adicionales de la tabla intermedia
        ->withTimestamps();
}
public function workoutLogs()
{
    return $this->hasMany(WorkoutLog::class);
}
}
