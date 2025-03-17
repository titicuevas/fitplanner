<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeeklyPlansTable extends Migration
{
    public function up()
    {
        Schema::create('weekly_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Relación con usuarios
            $table->foreignId('workout_id')->constrained('workouts'); // Relación con WODs
            $table->string('assigned_day'); // Día de la semana asignado (lunes, martes, etc.)
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('weekly_plans');
    }
}
