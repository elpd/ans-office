<?php

use Illuminate\Database\Seeder;
use App\ContactNote;
use App\Contact;
use App\User;

class ContactNotesTableSeeder extends Seeder
{

    public function run ()
    {
        DB::table('contact_notes')->delete();
        
        $user = User::where('name', '=', 'root')->firstOrFail();
        $contact = Contact::where('email', '=', 'contact1@example.com')->firstOrFail();
        
        $newItem = new ContactNote(['text' => 'hello world!']);
        $newItem->user()->associate($user);
        $newItem->contact()->associate($contact);
        $newItem->saveOrFail();

        $errors = $newItem->getErrors();
        if (count($errors) > 0) {
            throw new Exception($errors);
        }
        
    }
}