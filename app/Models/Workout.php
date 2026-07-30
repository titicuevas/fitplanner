<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'warmup',
        'movements',
        'wod',
        'duration',
        'category_id',
    ];

    protected $casts = [
        'duration' => 'integer',
        'category_id' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(WorkoutLog::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function weeklyPlans(): HasMany
    {
        return $this->hasMany(WeeklyPlan::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_workout')
            ->withPivot('completed_at', 'score', 'notes')
            ->withTimestamps();
    }
}
