<?php namespace App\Console\Commands;

use App\Commands\PopulateCsv as PopulateCsvCommand;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Illuminate\Foundation\Bus\DispatchesCommands;

class PopulateCsv extends Command
{
    use DispatchesCommands;

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'populate:csv';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'populate database with data from csv (google apps)';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function fire()
    {
        $filePath = $this->option('path');

        $this->dispatch(new PopulateCsvCommand($filePath, $this));


        //$this->table(['date', 'group', 'full name'], $rows);
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['example', InputArgument::OPTIONAL, 'An example argument.'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['path', null, InputOption::VALUE_REQUIRED, 'An example option.', null],
        ];
    }
}
