<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutLog extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id', 'workout_id', 'score', 'notes'
    ];
    
    // Relación: cada registro pertenece a un usuario y a un workout.
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }
}
