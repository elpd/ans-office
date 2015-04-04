<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEtgar22Tables extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create the ui languages table
        Schema::create('ui_languages',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->string('name', 20);
                $table->timestamps();
            });

        // Create the ui themes table
        Schema::create('ui_themes',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->string('name', 20);
                $table->string('css_file', 50);
                $table->timestamps();
            });

        // Creates the contacts table
        Schema::create('contacts',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->dateTime('registration_date');
                $table->string('email', 50);
                $table->string('first_name', 30);
                $table->string('last_name', 30);
                $table->string('phone', 30);
                $table->string('facebook', 30);
                $table->integer('birth_year');
                $table->tinyInteger('donate');
                $table->tinyInteger('blacklisted');
                $table->timestamps();

                $table->unique(
                    array(
                        'email',
                        'first_name'
                    ));
            });

        // Create the cycles table
        Schema::create('cycles',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->date('startDate')
                    ->unique();;
                $table->integer('num');
                $table->timestamps();

            });

        // Create the group status table
        Schema::create('group_status',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->string('status', 20);
                $table->timestamps();
            });

        // Create the groups members status table
        Schema::create('group_members_status',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->string('status', 20);
                $table->timestamps();
            });

        // Create the guides table
        Schema::create('guides',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->string('name', 20);
                $table->timestamps();
            });

        // Create the etgar22 table
        Schema::create('etgar22',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->integer('contact_id')
                    ->unsigned()
                    ->unique();
                $table->tinyInteger('facebook_know_how')->nullable();
                $table->tinyInteger('call_for_facebook_help')->default(0);
                $table->dateTime('registration_date');
                $table->string('notes', 4000);
                $table->dateTime('next_call');
                $table->string('why_go_vegan', 1000);
                $table->string('parent_name', 30);
                $table->string('parent_email', 100);
                $table->timestamps();

                $table->foreign('contact_id')
                    ->references('id')
                    ->on('contacts');
            });

        // Create the groups table
        Schema::create('groups',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->integer('cycle_id')
                    ->unsigned()
                    ->index();
                $table->string('name', 30);
                $table->integer('status_id')
                    ->unsigned()
                    ->index();
                $table->timestamps();

                $table->foreign('cycle_id')
                    ->references('id')
                    ->on('cycles')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->foreign('status_id')
                    ->references('id')
                    ->on('group_status')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            });

        // Create the groups members table
        Schema::create('groups_members',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->integer('group_id')->unsigned();
                $table->integer('contact_id')
                    ->unsigned()
                    ->index();
                $table->integer('status_id')
                    ->unsigned()
                    ->index();
                $table->integer('guide_id_1')
                    ->unsigned()
                    ->index();
                $table->integer('guide_id_2')
                    ->unsigned()
                    ->nullable()
                    ->index();
                $table->timestamps();

                $table->unique(
                    array(
                        'group_id',
                        'contact_id'
                    ));

                $table->foreign('group_id')
                    ->references('id')
                    ->on('groups')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->foreign('contact_id')
                    ->references('id')
                    ->on('contacts')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->foreign('status_id')
                    ->references('id')
                    ->on('group_members_status')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->foreign('guide_id_1')
                    ->references('id')
                    ->on('guides')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->foreign('guide_id_2')
                    ->references('id')
                    ->on('guides')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            });

        // Create the user settings table
        Schema::create('settings_user',
            function ($table) {
                $table->increments('id')->unsigned();
                $table->integer('user_id')
                    ->unsigned()
                    ->unique();
                $table->integer('ui_language_id')
                    ->unsigned()
                    ->index();
                $table->integer('ui_theme_id')
                    ->unsigned()
                    ->index();
                $table->timestamps();

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->foreign('ui_language_id')
                    ->references('id')
                    ->on('ui_languages')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->foreign('ui_theme_id')
                    ->references('id')
                    ->on('ui_themes')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('etgar22',
            function (Blueprint $table) {
                $table->dropForeign('etgar22_contact_id_foreign');
            });

        Schema::table('groups',
            function (Blueprint $table) {
                $table->dropForeign('groups_status_id_foreign');
                $table->dropForeign('groups_cycle_id_foreign');
            });

        Schema::table('groups_members',
            function (Blueprint $table) {
                $table->dropForeign('groups_members_guide_id_1_foreign');
                $table->dropForeign('groups_members_guide_id_2_foreign');
                $table->dropForeign('groups_members_group_id_foreign');
                $table->dropForeign('groups_members_contact_id_foreign');
                $table->dropForeign('groups_members_status_id_foreign');
            });

        Schema::table('settings_user',
            function(Blueprint $table){
                $table->dropForeign('settings_user_user_id_foreign');
                $table->dropForeign('settings_user_ui_language_id_foreign');
                $table->dropForeign('settings_user_ui_theme_id_foreign');
        });

        Schema::drop('contacts');
        Schema::drop('cycles');
        Schema::drop('etgar22');
        Schema::drop('groups');
        Schema::drop('groups_members');
        Schema::drop('group_members_status');
        Schema::drop('group_status');
        Schema::drop('guides');
        Schema::drop('settings_user');
        Schema::drop('ui_languages');
        Schema::drop('ui_themes');
    }

}
