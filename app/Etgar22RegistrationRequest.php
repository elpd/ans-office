<?php namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;

class Etgar22RegistrationRequest extends Model
{
    use ValidatingTrait;
    use GeneralModel;

    protected $table = 'etgar22_registration_requests';

    protected $fillable = [
        'full_name',
        'facebook_account_name',
        'email',
        'phone',
        'birth_year',
        'call_for_donation',
        'facebook_know_how',
        'call_for_facebook_help',
        'why_go_vegan',
        'parent_name',
        'parent_email',
        'request_status_id',
    ];

    protected $rules = [
        'full_name' => [
            'required'
        ],
        'email' => [
            'required'
        ],
        'phone' => [
            'required'
        ],
        'birth_year' => [
            'numeric'
        ],
        'request_status_id' => [
            'required',
            'exists:request_status,id'
        ],
        'call_for_donation' => [
            'boolean'
        ],
        'facebook_know_how' => [
            'boolean'
        ],
        'call_for_facebook_help' => [
            'boolean'
        ],
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'call_for_donation' => 'boolean',
        'facebook_know_how' => 'boolean',
        'call_for_facebook_help' => 'boolean',
    ];

    protected static $linksInfos = [
        'request_status_id' => [
            'fieldName' => 'request_status_id',
            'functionOnChild' => 'status',
            'linkedTable' => 'request_status',
            'linkedField' => 'id',
            'linkedClass' => 'App\RequestStatus'
        ],
    ];

    /*
     * Links
     */

    public function status() {
        return $this->belongsTo('App\RequestStatus', 'request_status_id');
    }

    /*
     * Business Object Functions
     */

    public function process() {
        if ($this->status->name != 'new'){
            throw new \Exception('Can not process request. Status is not new');
        }

        // Contact

        $contactNames = Contact::translateFullName($this->full_name);
        $contact = Contact::findByEmailNameOrNew($this->email, $contactNames->firstName);
        $this->updateContactWithFields($contact);
        $contact->saveOrFail();

        // Etgar 22

        $etgar22 = $this->findOrNewEtgar22($contact);
        $this->updateEtgar22WithFields($etgar22);
        $etgar22->save();

        // Process status

        $doneStatus = RequestStatus::where('name', '=', 'done')->firstOrFail();
        $this->status()->associate($doneStatus);
        $this->saveOrFail();
    }

    protected function updateContactWithFields($contact) {
        $contactNames = Contact::translateFullName($this->full_name);
        if ($contact->email != '' && $this->email != $contact->email) {
            throw new \Exception('unabled to set contact email in request. Email already set on existing contact');
        }
        if ($contact->first_name != '' && $contactNames->firstName != $contact->first_name){
            throw new \Exception('unabled to set contact first name in request. First name already set on existing contact');
        }

        $contact->email = $this->email;
        $contact->first_name = $contactNames->firstName;

        if ($contactNames->lastName != '') {
            $contact->last_name = $contactNames->lastName;
        }

        if ($contact->facebook == '') {
            $contact->facebook = $this->facebook_account_name;
        }

        if ($contact->phone == '') {
            $contact->phone = $this->phone;
        }

        if ($contact->birth_year == 0){
            $contact->birth_year = $this->birth_year;
        }

        if ($contact->registration_date == null) {
            $contact->registration_date = new Carbon('now');
        }

        if ($contact->donate == false && $this->call_for_donation) {
            $contact->donate = $this->call_for_donation;
        }
    }

    protected function updateEtgar22WithFields($etgar22) {
        if ($this->why_go_vegan != '') {
            $etgar22->why_go_vegan = $this->why_go_vegan;
        }
        if ($this->parent_name != '') {
            $etgar22->parent_name = $this->parent_name;
        }
        if ($this->parent_email != '') {
            $etgar22->parent_email = $this->parent_email;
        }
        if ($etgar22->registration_date == null) {
            $etgar22->registration_date = new Carbon('now');
        }
        $etgar22->facebook_know_how = $this->facebook_know_how;
        $etgar22->call_for_facebook_help = $this->call_for_facebook_help;
    }

    protected function findOrNewEtgar22($contact) {
        $etgar22 = $contact->etgar22;
        if ($etgar22 == null) {
            $etgar22 = new Etgar22();
            $etgar22->contact()->associate($contact);
        }

        return $etgar22;
    }

}