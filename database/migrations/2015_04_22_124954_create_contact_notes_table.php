<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactNotesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// Create the contact notes table
		Schema::create('contact_notes',
			function ($table) {
				$table->increments('id')->unsigned();
				$table->integer('contact_id')
					->unsigned();
				$table->string('text', 4000);
				$table->integer('user_id')
					->unsigned();
				$table->timestamps();

				$table->foreign('contact_id')
					->references('id')
					->on('contacts')
					->onUpdate('cascade')
					->onDelete('cascade');

				$table->foreign('user_id')
					->references('id')
					->on('users')
					->onUpdate('CASCADE')
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
		Schema::table('contact_notes',
			function (Blueprint $table) {
				$table->dropForeign('contact_notes_contact_id_foreign');
				$table->dropForeign('contact_notes_user_id_foreign');
			});

		Schema::drop('contact_notes');
	}

}
