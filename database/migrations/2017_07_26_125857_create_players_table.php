<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->increments('idPlayer');
            $table->unsignedInteger('idPlayerApi');
            $table->string('Name', 128);
            $table->string('DateOfBirth', 10);
            $table->string('Nationality', 64);
            $table->string('Image', 256)->nullable();
            $table->string('Position', 60)->nullable();
            $table->tinyInteger('ShirtNumber')->nullable();
            $table->tinyInteger('Updateable')->nullable()->default(1);
            $table->string('Role', 32);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
}
