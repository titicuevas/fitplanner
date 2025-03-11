<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('workouts', function (Blueprint $table) {
        $table->id();
        $table->string('title'); // Nombre del WOD
        $table->text('warmup'); // Calentamiento
        $table->text('movements'); // Movimientos
        $table->text('wod'); // Workout principal
        $table->integer('duration')->default(60); // Duración en minutos (1 hora)
        $table->foreignId('category_id')->constrained()->onDelete('cascade');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workouts');
    }
};
