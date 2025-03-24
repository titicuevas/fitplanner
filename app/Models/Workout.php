<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'warmup',
        'movements',
        'wod',
        'duration',
        'category_id'
    ];

    // Relación: cada workout pertenece a una categoría.
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relación: un workout tiene muchos logs y comentarios.
    public function logs()
    {
        return $this->hasMany(WorkoutLog::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function weeklyPlans()
    {
        return $this->hasMany(WeeklyPlan::class);
    }
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }
}
