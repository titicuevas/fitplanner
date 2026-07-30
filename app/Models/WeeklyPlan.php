<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeeklyPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'workout_id',
        'assigned_day',
        'month',
        'completed',
        'score',
        'notes',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'workout_id' => 'integer',
        'completed' => 'boolean',
        'score' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function workout(): BelongsTo
    {
        return $this->belongsTo(Workout::class);
    }
}
