<?php namespace App;

use Carbon\Carbon;

class Etgar22Record
{

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

    public function getRecordContact()
    {
        $recordContact = new Etgar22RecordContact($this);

        return $recordContact;
    }

    public function getRegistrationDate()
    {
        return Carbon::parse($this->registrationDateStr);
    }

    public function getParentName()
    {
        $parentName = $this->parentNameStr;

        if ($parentName == 'שם ההורה/ים') {
            $parentName = '';
        }

        return $parentName;
    }

    public function getParentEmail()
    {
        $parentEmail = $this->parentEmailStr;

        if ($parentEmail == 'אימייל ההורה/ים') {
            $parentEmail = '';
        }

        return $parentEmail;
    }

    public function getFlagFacebookKnowHow()
    {
        $flag = null;

        switch ($this->flagFacebookKnowHowStr) {
            case 'יש לי חשבון פייסבוק פעיל ואני מתמצא/ת':
                $flag = true;
                break;
            case 'אין לי חשבון פייסבוק ואינני יודע להשתמש בפייסבוק':
                $flag = false;
                break;
            case 'יש לי חשבון פייסבוק פעיל אך אינני יודע להשתמש בו היטב':
                $flag = false;
                break;
            default:
                $flag = null;
        }

        return $flag;
    }

    public function getFlagCallForFacebookHelp()
    {
        $flag = false;

        switch ($this->flagCallMeForFacebookHelpStr) {
            case '':
                $flag = false;
                break;
            case ' ':
                $flag = false;
                break;
            default:
                $flag = true;
                break;
        }

        return $flag;
    }

    public function getNotes()
    {
        return $this->notesStr;
    }

    public function getWhyGoVegan()
    {
        return $this->whyGoVeganStr;
    }

    public function getFacebookEtgar22GroupStr()
    {
        return $this->facebookEtgar22GroupStr;
    }
}