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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('workout_id')->constrained()->onDelete('cascade');
            $table->string('assigned_day');
            $table->string('month');  // Añadir columna para el mes
            $table->boolean('completed')->default(false); // Añadir columna para completado
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('weekly_plans');
    }
}