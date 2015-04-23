<?php namespace App;

use Carbon\Carbon;

class Etgar22RegistrationRequest
{

    public $fullName;
    public $facebookAccountName;
    public $email;
    public $phone;
    public $birthYear;
    public $whyGoVeganAnswer;
    public $parentName;
    public $parentEmail;


    public function __construct($fullName, $facebookAccountName, $email, $phone, $birthYear,
                                $whyGoVeganAnswer, $parentName, $parentEmail)
    {
        $this->setFullName($fullName);
        $this->setFacebookAccountName($facebookAccountName);
        $this->setEmail($email);
        $this->setPhone($phone);
        $this->setBirthYear($birthYear);
        $this->setWhyGoVeganAnswer($whyGoVeganAnswer);
        $this->parentName($parentName);
        $this->parentEmail($parentEmail);
    }

}