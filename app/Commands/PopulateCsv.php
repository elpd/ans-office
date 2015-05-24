<?php namespace App\Commands;

use League\Csv\Reader;
use App\Etgar22Record;
use Watson\Validating\ValidationException;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Foundation\Bus\DispatchesCommands;


class PopulateCsv extends Command implements SelfHandling
{

    use DispatchesCommands;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct($filePath, $output = null, $overwriteEtgar22Option = false, $user)
    {
        $this->filePath = $filePath;
        $this->output = $output;
        $this->overwriteEtgar22Option = $overwriteEtgar22Option;
        $this->user = $user;
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {
        $csv = Reader::createFromPath($this->filePath);
        try {
            $rows_descriptor = $this->generateRowsDescriptor($csv->fetchOne(0));
        } catch (\Exception $e) {
            if ($this->output) {
                $this->output->error('Malformed csv file. Details: ' . $e->getMessage());
            }

            return;
        }

        $csv->setOffset(3); //because we don't want to insert the header

        $log = [
            'rows' => [],
            'malformed_rows' => [],
            'well_constructed_rows' => []
        ];

        $nbInsert = $csv->each(function ($row) use (&$log, $rows_descriptor) {
            if ($this->checkEmptyLine($row)) {
                return true;
            }

            $etgar22Record = $this->parseEtgar22Row($row, $rows_descriptor);

            $log['rows'][] = $etgar22Record;

            try {
                \DB::transaction(function () use ($etgar22Record) {

                    $this->dispatch(new PopulateEtgar22Record($etgar22Record,
                        $this->output, $this->overwriteEtgar22Option, $this->user));

                    $log['well_constructed_rows'] = $etgar22Record;

                    if ($this->output) {
                        $this->output->info('parsed row successfully. ' .
                            $etgar22Record->emailStr . ' - ' .
                            $etgar22Record->firstNameStr);
                    }
                });

            } catch (ValidationException $e) {
                $errors = $e->getErrors();

                $log['malformed_rows'][] = $etgar22Record;
                if ($this->output) {
                    $this->output->error('could not parsed etgar 22 line for: ' . $etgar22Record->emailStr .
                        ' reason: ' . $e->getMessage() .
                        ' validation errors: ' . $errors);
                }
            } catch (\Exception $e) {
                $log['malformed_rows'][] = $etgar22Record;
                if ($this->output) {
                    $this->output->error('could not parsed etgar 22 line for: ' . $etgar22Record->emailStr .
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

    protected function checkEmptyLine($row)
    {
        if (count($row) <= 1) {
            return true;
        }

        return false;
    }

    protected function generateRowsDescriptor($row)
    {
        $descriptor = new \stdClass();

        $descriptor->registrationDateStrIndex = $this->findIndex($row, 'תאריך');
        $descriptor->notesStrIndex = $this->findIndex($row, 'notes');
        $descriptor->groupStrIndex = $this->findIndex($row, 'group');
        $descriptor->fullNameStrIndex = $this->findIndex($row, 'full-name');
        $descriptor->firstNameStrIndex = $this->findIndex($row, 'first-name');
        $descriptor->lastNameStrIndex = $this->findIndex($row, 'last-name');
        $descriptor->facebookNameStrIndex = $this->findIndex($row, 'facebook-name');
        $descriptor->emailStrIndex = $this->findIndex($row, 'your-email');
        $descriptor->phoneStrIndex = $this->findIndex($row, 'phone');
        $descriptor->birthYearStrIndex = $this->findIndex($row, 'birth-year');
        $descriptor->flagContactMeForDonationStrIndex = $this->findIndex($row, 'checkbox-2');
        $descriptor->flagFacebookKnowHowStrIndex = $this->findIndex($row, 'facebook-knowhow');
        $descriptor->flagCallMeForFacebookHelpStrIndex = $this->findIndex($row, 'call-me-for-facebook-help');
        $descriptor->facebookEtgar22GroupStrIndex = $this->findIndex($row, 'subscribe-facebook-group');
        $descriptor->whyGoVeganStrIndex = $this->findIndex($row, 'why-go-vegan');
        $descriptor->parentNameStrIndex = $this->findIndex($row, 'parents-name');
        $descriptor->parentEmailStrIndex = $this->findIndex($row, 'parents-email');
        $descriptor->idStrIndex = $this->findIndex($row, 'id');
        $descriptor->doneStrIndex = $this->findIndex($row, 'טופל');

        return $descriptor;
    }

    protected function findIndex($row, $value)
    {
        foreach ($row as $cellKey => $cellValue) {
            if ($cellValue == $value) {
                return $cellKey;
            }
        }

        throw new \Exception('cell index not found. cell: ' . $value);
    }

    protected function parseEtgar22Row($row, $descriptor)
    {
        $etgar22Request = new Etgar22Record();

        $etgar22Request->registrationDateStr =
            $row[$descriptor->registrationDateStrIndex];
        $etgar22Request->notesStr =
            $row[$descriptor->notesStrIndex];
        $etgar22Request->groupStr =
            $row[$descriptor->groupStrIndex];
        $etgar22Request->fullNameStr =
            $row[$descriptor->fullNameStrIndex];
        $etgar22Request->firstNameStr =
            $row[$descriptor->firstNameStrIndex];
        $etgar22Request->lastNameStr =
            $row[$descriptor->lastNameStrIndex];
        $etgar22Request->facebookNameStr =
            $row[$descriptor->facebookNameStrIndex];
        $etgar22Request->emailStr =
            $row[$descriptor->emailStrIndex];
        $etgar22Request->phoneStr =
            $row[$descriptor->phoneStrIndex];
        $etgar22Request->birthYearStr =
            $row[$descriptor->birthYearStrIndex];
        $etgar22Request->flagContactMeForDonationStr =
            $row[$descriptor->flagContactMeForDonationStrIndex];
        $etgar22Request->flagFacebookKnowHowStr =
            $row[$descriptor->flagFacebookKnowHowStrIndex];
        $etgar22Request->flagCallMeForFacebookHelpStr =
            $row[$descriptor->flagCallMeForFacebookHelpStrIndex];
        $etgar22Request->facebookEtgar22GroupStr =
            $row[$descriptor->facebookEtgar22GroupStrIndex];
        $etgar22Request->whyGoVeganStr =
            $row[$descriptor->whyGoVeganStrIndex];
        $etgar22Request->parentNameStr =
            $row[$descriptor->parentNameStrIndex];
        $etgar22Request->parentEmailStr =
            $row[$descriptor->parentEmailStrIndex];
        /*        $etgar22Request->pageNameStr =
                    $row[$descriptor->];*/
        $etgar22Request->idStr =
            $row[$descriptor->idStrIndex];
        $etgar22Request->doneStr =
            $row[$descriptor->doneStrIndex];

        return $etgar22Request;
    }
}
