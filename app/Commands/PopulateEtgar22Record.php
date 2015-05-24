<?php namespace App\Commands;

use Illuminate\Contracts\Bus\SelfHandling;
use App\Etgar22Record;
use App\Contact;
use App\Etgar22;

class PopulateEtgar22Record extends Command implements SelfHandling
{

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(Etgar22Record $etgar22Record, $output, $overwriteEtgar22Option, $currentUser)
    {
        $this->etgar22Record = $etgar22Record;
        $this->output = $output;
        $this->overwriteEtgar22Option = $overwriteEtgar22Option;
        $this->currentUser = $currentUser;
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
        $this->putContactInGroup($contact);
    }

    protected function findOutContact()
    {
        $recordContact = $this->etgar22Record->getRecordContact();
        $contact = Contact::findByEmailName($recordContact->getEmail(),
            $recordContact->getCalcFirstName());
        if ($contact == null) {
            $contact = $this->createContact($recordContact);
        }

        return $contact;
    }

    protected function createContact($recordContact)
    {
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

    protected function findOutEtgar22ForContact(\App\Contact $contact)
    {
        $etgar22 = $contact->etgar22()->first();
        if ($etgar22 != null) {
            if ($this->overwriteEtgar22Option) {
                $etgar22 = $contact->etgar22()->first();

                $newNote = new \App\ContactNote([
                    "text" => $etgar22->toJson()
                ]);
                $newNote->user()->associate($this->currentUser);

                $contact->notes()->save($newNote);

            } else {
                throw new \Exception('contact already has etgar 22 record'); // TODO: custom exception with contact data.
            }
        } else {
            $etgar22 = new Etgar22();
            $etgar22->contact()->associate($contact);
        }

        $onTheRoadToVeganStatus = \App\Etgar22ProgressStatus::where('name', '=', 'בדרך לטבעונות')->firstOrFail();

        $etgar22->facebook_know_how = $this->etgar22Record->getFlagFacebookKnowHow();
        $etgar22->call_for_facebook_help = $this->etgar22Record->getFlagCallForFacebookHelp();
        $etgar22->registration_date = $this->etgar22Record->getRegistrationDate();
        $etgar22->notes = $this->etgar22Record->getNotes();
        $etgar22->why_go_vegan = $this->etgar22Record->getWhyGoVegan();
        $etgar22->parent_name = $this->etgar22Record->getParentName();
        $etgar22->parent_email = $this->etgar22Record->getParentEmail();

        // Defaults
        $etgar22->progressStatus()->associate($onTheRoadToVeganStatus);

        $contact->etgar22()->save($etgar22);

        return $etgar22;
    }

    protected function putContactInGroup($contact)
    {
        $group_name = $this->etgar22Record->getFacebookEtgar22GroupStr();
        $group = \App\Group::where('name', '=', $group_name)->first();

        if ($group == null) {
            throw new \Exception('group not found. group name: ' . $group_name);
        }

        $membership = \App\GroupsMember::where('contact_id', '=', $contact->id)
            ->where('group_id', '=', $group->id)->first();
        if ($membership != null) {
            return;
        }

        $newStatus = \App\GroupMembersStatus::where('status', '=', 'new')->firstOrFail();

        $membership = new \App\GroupsMember();
        $membership->group()->associate($group);
        $membership->contact()->associate($contact);
        $membership->status()->associate($newStatus);

        $membership->saveOrFail();
    }
}
