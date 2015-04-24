<?php namespace App\Commands;

use Illuminate\Contracts\Bus\SelfHandling;
use App\Etgar22Record;
use App\Contact;
use App\Etgar22;

class PopulateEtgar22Record extends Command implements SelfHandling {

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct(Etgar22Record $etgar22Record, $output)
	{
		$this->etgar22Record = $etgar22Record;
		$this->output = $output;
	}

	/**
	 * Execute the command.
	 *
	 * @return void
	 */
	public function handle()
	{
		$contact = $this->findOutContact();
		$contactEtgar22 = $this->findOutEtgar22ForContact($contact);
	}

	protected function findOutContact() {
		$recordContact = $this->etgar22Record->getRecordContact();
		$contact = Contact::findByEmailName($recordContact->getEmail(),
			$recordContact->getCalcFirstName());
		if ($contact == null) {
			$contact = $this->createContact($recordContact);
		}

		return $contact;
	}

	protected function createContact($recordContact) {
		$contactNames = $recordContact->findOutContactNames();

		$firstName = $contactNames->firstName;
		$lastName = $contactNames->lastName;

		$registration_date = $recordContact->getRegistrationDate();
		$birthYear = $recordContact->getBirthYear();
		$phone = $recordContact->getPhone();

		$contact = new Contact([
			'first_name' => $firstName,
			'last_name' => $lastName,
			'email' => $recordContact->getEmail(),
			'registration_date' => $registration_date,
			'phone' => $phone,
			'facebook' => $recordContact->facebookNameStr,
			'birth_year' => $birthYear,
			//'donate' => ,
			//'blacklisted' => ,
		]);

		$contact->saveOrFail();

		return $contact;
	}

	protected function findOutEtgar22ForContact($contact) {
		$etgar22 = $contact->etgar22()->first();
		if ($etgar22 != null) {
			throw new \Exception('contact already has etgar 22 record'); // TODO: custom exception with contact data.
		}

		$etgar22 = new Etgar22();
		$etgar22->contact()->associate($contact);

		$etgar22->facebook_know_how = $this->etgar22Record->getFlagFacebookKnowHow();
		$etgar22->call_for_facebook_help = $this->etgar22Record->getFlagCallForFacebookHelp();
		$etgar22->registration_date = $this->etgar22Record->getRegistrationDate();
		$etgar22->notes = $this->etgar22Record->getNotes();
		$etgar22->why_go_vegan = $this->etgar22Record->getWhyGoVegan();
		$etgar22->parent_name = $this->etgar22Record->getParentName();
		$etgar22->parent_email = $this->etgar22Record->getParentEmail();

		$contact->etgar22()->save($etgar22);

		return $etgar22;
	}
}
