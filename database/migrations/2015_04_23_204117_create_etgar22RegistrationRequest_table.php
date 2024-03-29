<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEtgar22RegistrationRequestTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_status',
            function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->string('name',30)
                    ->unique();
                $table->timestamps();
            });

        Schema::create('etgar22_registration_requests',
            function (Blueprint $table) {
                $table->increments('id')->unsigned();
                $table->string('full_name', 50);
                $table->string('facebook_account_name', 30);
                $table->string('email', 50);
                $table->string('phone', 30);
                $table->integer('birth_year');
                $table->tinyInteger('call_for_donation');
                $table->tinyInteger('facebook_know_how')->nullable();
                $table->tinyInteger('call_for_facebook_help')->default(0);
                $table->string('why_go_vegan', 1000);
                $table->string('parent_name', 30);
                $table->string('parent_email', 100);
                $table->integer('request_status_id')
                    ->unsigned();
                $table->timestamps();

                $table->foreign('request_status_id')
                    ->references('id')
                    ->on('request_status')
                    ->onUpdate('CASCADE')
                    ->onDelete('CASCADE');
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('etgar22_registration_requests',
            function (Blueprint $table) {
                $table->dropForeign('etgar22_registration_requests_request_status_id_foreign');
            });

        Schema::drop('etgar22_registration_requests');
        Schema::drop('request_status');
    }

}
