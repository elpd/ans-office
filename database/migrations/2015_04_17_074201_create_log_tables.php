<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogTables extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create the log table
        Schema::create('logs', function ($table) {
            $table->increments('id')->unsigned();
            $table->dateTime('event_time');
            $table->timestamps();
        });

        // Create the users actions type table
        Schema::create('user_action_types', function($table){
            $table->increments('id')->unsigned();
            $table->string('name', 30)->unique();
            $table->timestamps();
        });

        // Create the users actions log sub table
        Schema::create('users_logs', function ($table) {
            $table->increments('id')->unsigned();
            $table->integer('log_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('user_action_type_id')->unsigned();
            $table->text('description');
            $table->timestamps();

            $table->foreign('log_id')
                ->references('id')
                ->on('logs')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('NO ACTION');

            $table->foreign('user_action_type_id')
                ->references('id')
                ->on('user_action_types')
                ->onUpdate('cascade')
                ->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users_logs', function (Blueprint $table) {
            $table->dropForeign('users_logs_log_id_foreign');
            $table->dropForeign('users_logs_user_id_foreign');
            $table->dropForeign('users_logs_user_action_type_id_foreign');
        });

        Schema::drop('logs');
        Schema::drop('users_logs');
        Schema::drop('user_action_types');
    }

}
