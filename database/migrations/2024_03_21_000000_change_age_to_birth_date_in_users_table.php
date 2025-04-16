<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->date('birth_date')->nullable()->after('age');
        });

        // Actualizar los datos existentes (opcional)
        DB::table('users')->whereNotNull('age')->update([
            'birth_date' => DB::raw('DATE_SUB(CURDATE(), INTERVAL age YEAR)')
        ]);

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('age');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('age')->nullable()->after('birth_date');
        });

        // Revertir los datos (opcional)
        DB::table('users')->whereNotNull('birth_date')->update([
            'age' => DB::raw('TIMESTAMPDIFF(YEAR, birth_date, CURDATE())')
        ]);

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('birth_date');
        });
    }
}; 