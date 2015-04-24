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
            $etgar22Record = $this->parseEtgar22Row($row);

            $log['rows'][] = $etgar22Record;

            try {
                \DB::transaction(function () use ($etgar22Record) {

                    $this->dispatch(new PopulateEtgar22Record($etgar22Record,
                        $this->output));

                    $log['well_constructed_rows'] = $etgar22Record;
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

    protected function parseEtgar22Row($row)
    {
        $etgar22Request = new Etgar22Record();

        $etgar22Request->registrationDateStr = $row[0];
        $etgar22Request->notesStr = $row[1];
        $etgar22Request->groupStr = $row[2];
        $etgar22Request->fullNameStr = $row[3];
        $etgar22Request->firstNameStr = $row[4];
        $etgar22Request->lastNameStr = $row[5];
        $etgar22Request->facebookNameStr = $row[6];
        $etgar22Request->emailStr = $row[7];
        $etgar22Request->phoneStr = $row[8];
        $etgar22Request->birthYearStr = $row[9];
        $etgar22Request->flagContactMeForDonationStr = $row[10];
        $etgar22Request->flagFacebookKnowHowStr = $row[11];
        $etgar22Request->flagCallMeForFacebookHelpStr = $row[12];
        $etgar22Request->facebookEtgar22GroupStr = $row[13];
        $etgar22Request->whyGoVeganStr = $row[14];
        $etgar22Request->parentNameStr = $row[15];
        $etgar22Request->parentEmailStr = $row[16];
        $etgar22Request->pageNameStr = $row[17];
        $etgar22Request->idStr = $row[18];
        $etgar22Request->doneStr = $row[19];

        return $etgar22Request;
    }
}
