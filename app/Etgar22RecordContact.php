<?php namespace App;

use Carbon\Carbon;

class Etgar22RecordContact {
    public $registrationDateStr;
    public $notesStr;
    public $groupStr;
    public $fullNameStr;
    public $firstNameStr;
    public $lastNameStr;
    public $facebookNameStr;
    public $emailStr;
    public $phoneStr;
    public $birthYearStr;
    public $flagContactMeForDonationStr;
    public $flagFacebookKnowHowStr;
    public $flagCallMeForFacebookHelpStr;
    public $facebookEtgar22GroupStr;
    public $whyGoVeganStr;
    public $parentNameStr;
    public $parentEmailStr;
    public $pageNameStr;
    public $idStr;
    public $doneStr;

    public function __construct(Etgar22Record $etgar22Record) {
        $this->registrationDateStr = $etgar22Record->registrationDateStr;
        $this->fullNameStr = $etgar22Record->fullNameStr;
        $this->firstNameStr = $etgar22Record->firstNameStr;
        $this->lastNameStr = $etgar22Record->lastNameStr;
        $this->phoneStr = $etgar22Record->phoneStr;
        $this->facebookNameStr = $etgar22Record->facebookNameStr;
        $this->emailStr = $etgar22Record->emailStr;
        $this->birthYearStr = $etgar22Record->birthYearStr;
        $this->parentNameStr = $etgar22Record->parentNameStr;
        $this->parentEmailStr = $etgar22Record->parentEmailStr;
    }

    public function findOutContactNames() {
        $contactNames = new \stdClass();

        $contactNames->firstName = $this->firstNameStr;
        $contactNames->lastName = $this->lastNameStr;

        if ($contactNames->firstName  == '' && $contactNames->lastName == '') {
            $contactNames = Contact::translateFullName($this->fullNameStr);
        }

        return $contactNames;
    }

    public function getFirstName() {
        return $this->firstNameStr;
    }

    public function getCalcFirstName() {
        $contactNames = $this->findOutContactNames();
        return $contactNames->firstName;
    }

    public function getRegistrationDate() {
        return Carbon::parse($this->registrationDateStr);
    }

    public function getBirthYear() {
        return intval($this->birthYearStr);
    }

    public function getPhone() {
        return ($this->phoneStr);
    }

    public function getEmail() {
        return $this->emailStr;
    }

    protected function fixPhoneStr($phoneStr) {
        $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
        try {
            $numberParsed = $phoneUtil->parse($phoneStr, 'IL');
            //var_dump($numberParsed);
        } catch (\libphonenumber\NumberParseException $e) {
            var_dump($e);
        }

        if ($phoneUtil->isValidNumber($numberParsed)){
            return $phoneStr;
        }

        if ($this->output) {
            $this->output->info('phone number is invalid: ' . $phoneStr);
            //$this->output->info('Trying to fix phone number: ' . $phoneStr);
        }

        return $phoneStr;
    }
}