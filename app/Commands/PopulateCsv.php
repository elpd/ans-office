<?php namespace App\Commands;

use App\Commands\Command;
use League\Csv\Reader;
use Carbon\Carbon;
use App\Etgar22;
use App\Contact;
use Watson\Validating\ValidationException;

use Illuminate\Contracts\Bus\SelfHandling;


class PopulateCsv extends Command implements SelfHandling
{

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct($filePath, \Illuminate\Console\Command $consoleOutput)
    {
        $this->filePath = $filePath;
        $this->output = $consoleOutput;
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {
        $csv = Reader::createFromPath($this->filePath);
        $csv->setOffset(3); //because we don't want to insert the header

        $log = [
            'rows' => [],
            'malformed_rows' => [],
            'well_constructed_rows' => []
        ];

        $nbInsert = $csv->each(function ($row) use (&$log) {
            $parsedRow = $this->parseEtgar22Row($row);

            $log['rows'][] = $parsedRow;

            try {
                \DB::transaction(function () use ($parsedRow) {

                    $etgar22Rec = new Etgar22();
                    $contactFields = $this->extractContactFields($parsedRow);

                    $contact = $this->generateContact($contactFields);

                    $existingEtgar22Rec = $contact->etgar22()->first();
                    if ($existingEtgar22Rec != null) {
                        throw new \Exception('contact already has etgar 22 record'); // TODO: custom exception with contact data.
                    }

                    $registrationDate = $this->convertDateStr($parsedRow['registrationDateStr']);
                    $parentName = $this->convertParentName($parsedRow['parentNameStr']);
                    $parentEmail = $this->convertParentEmail($parsedRow['parentEmailStr']);
                    $flagFacebookKhnowHow = $this->convertFlagFacebookKnowHow($parsedRow['flagFacebookKnowHowStr']);
                    $flagCallForFacebookHelp = $this->convertFlagCallForFacebookHelp($parsedRow['flagCallMeForFacebookHelpStr']);

                    $etgar22Rec->facebook_know_how = $flagFacebookKhnowHow;
                    $etgar22Rec->call_for_facebook_help = $flagCallForFacebookHelp;
                    $etgar22Rec->registration_date = $registrationDate;
                    $etgar22Rec->notes = $parsedRow['notesStr'];
                    $etgar22Rec->why_go_vegan = $parsedRow['whyGoVeganStr'];
                    $etgar22Rec->parent_name = $parentName;
                    $etgar22Rec->parent_email = $parentEmail;

                    $contact->etgar22()->save($etgar22Rec);

                    $log['well_constructed_rows'] = $parsedRow;
                });

            } catch (ValidationException $e) {
                $errors = $e->getErrors();

                $log['malformed_rows'][] = $parsedRow;
                if ($this->output) {
                    $this->output->error('could not parsed etgar 22 line for: ' . $parsedRow['emailStr'] .
                        ' reason: ' . $e->getMessage() .
                        ' validation errors: ' . $errors);
                }
            } catch (\Exception $e) {
                $log['malformed_rows'][] = $parsedRow;
                if ($this->output) {
                    $this->output->error('could not parsed etgar 22 line for: ' . $parsedRow['emailStr'] .
                        ' reason: ' . $e->getMessage());
                }
            }

            return true;
        });

        if ($this->output) {
            $this->output->info('all rows: ' . count($log['rows']));
            $this->output->info('malformed rows count: ' . count($log['malformed_rows']));
        }
    }

    protected function extractContactFields($source)
    {
        $contactFields = [];

        $contactFields['fullNameStr'] = $source['fullNameStr'];
        $contactFields['firstNameStr'] = $source['firstNameStr'];
        $contactFields['lastNameStr'] = $source['lastNameStr'];
        $contactFields['phoneStr'] = $source['phoneStr'];
        $contactFields['facebookNameStr'] = $source['facebookNameStr'];
        $contactFields['emailStr'] = $source['emailStr'];
        $contactFields['birthYearStr'] = $source['birthYearStr'];
        $contactFields['parentNameStr'] = $source['parentNameStr'];
        $contactFields['parentEmailStr'] = $source['parentEmailStr'];

        return $contactFields;
    }

    protected function generateContact($contactFields)
    {
        $contact = $this->findContactBy($contactFields);

        if ($contact == null) {
            $contact = $this->createContact($contactFields);

            if ($contact == null) {
                throw new \Exception('insefiesient data to find or generate contact'); // TODO: custom exception
            }
        }

        return $contact;
    }

    protected function findContactBy($contactFields)
    {
        $contact = null;

        $contacts = Contact::where('email', '=', $contactFields['emailStr'])->get();
        if ($contacts->count() > 1) {
            $contacts = Contact::where('email', '=', $contactFields['emailStr'])->
            where('firstName', '=', $contactFields['firstNameStr'])->get();
            if ($contacts->count() > 1) {
                throw new \Exception('Multiple raw contacts with same email and first name'); // TODO: custom exception.
            }

            $contact = Contact::where('email', '=', $contactFields['emailStr'])->
            where('firstName', '=', $contactFields['firstNameStr'])->first();
        }

        return $contact;
    }

    protected function createContact($contactFields)
    {
        $nameArray = $this->calcNameFrom(
            $contactFields['firstNameStr'],
            $contactFields['lastNameStr'],
            $contactFields['fullNameStr']);

        $firstName = $nameArray['firstName'];
        $lastName = $nameArray['lastName'];

        $birthYear = intval($contactFields['birthYearStr']);

        $contact = new Contact([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $contactFields['emailStr'],
            //'registration_date' => ,
            'phone' => $contactFields['phoneStr'],
            'facebook' => $contactFields['facebookNameStr'],
            'birth_year' => $birthYear,
            //'donate' => ,
            //'blacklisted' => ,
        ]);

        $contact->saveOrFail();

        return $contact;
    }

    protected function  calcNameFrom($firstNameStr, $lastNameStr, $fullNameStr)
    {
        $nameArray = [
            'firstName' => $firstNameStr,
            'lastName' => $lastNameStr
        ];

        if ($firstNameStr == '' && $lastNameStr == '') {
            $tempArray = explode(' ', $fullNameStr);
            if (count($tempArray) > 0) {
                $nameArray['firstName'] = $tempArray[0];
            }
            if (count($tempArray) > 1) {
                $nameArray['lastName'] = $tempArray[1];
            }
        }

        return $nameArray;
    }

    protected function convertDateStr($dateStr)
    {
        return Carbon::parse($dateStr);
    }

    protected function convertParentName($parentNameStr)
    {
        $parentName = $parentNameStr;

        if ($parentNameStr == 'שם ההורה/ים') {
            $parentName = '';
        }

        return $parentName;
    }

    protected function convertParentEmail($parentEmailStr)
    {
        $parentEmail = $parentEmailStr;

        if ($parentEmailStr == 'אימייל ההורה/ים') {
            $parentEmail = '';
        }

        return $parentEmail;
    }

    protected function convertFlagFacebookKnowHow($dataStr)
    {
        $flag = null;

        switch ($dataStr) {
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

    protected function convertFlagCallForFacebookHelp($str)
    {
        $flag = false;

        switch ($str) {
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

    protected function parseEtgar22Row($row)
    {
        $parsedRow = [];

        $parsedRow['registrationDateStr'] = $row[0];
        $parsedRow['notesStr'] = $row[1];
        $parsedRow['groupStr'] = $row[2];
        $parsedRow['fullNameStr'] = $row[3];
        $parsedRow['firstNameStr'] = $row[4];
        $parsedRow['lastNameStr'] = $row[5];
        $parsedRow['facebookNameStr'] = $row[6];
        $parsedRow['emailStr'] = $row[7];
        $parsedRow['phoneStr'] = $row[8];
        $parsedRow['birthYearStr'] = $row[9];
        $parsedRow['flagContactMeForDonationStr'] = $row[10];
        $parsedRow['flagFacebookKnowHowStr'] = $row[11];
        $parsedRow['flagCallMeForFacebookHelpStr'] = $row[12];
        $parsedRow['facebookEtgar22GroupStr'] = $row[13];
        $parsedRow['whyGoVeganStr'] = $row[14];
        $parsedRow['parentNameStr'] = $row[15];
        $parsedRow['parentEmailStr'] = $row[16];
        $parsedRow['pageNameStr'] = $row[17];
        $parsedRow['idStr'] = $row[18];
        $parsedRow['doneStr'] = $row[19];

        return $parsedRow;
    }
}
