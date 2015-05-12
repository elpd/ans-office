<?php namespace App\Http\Controllers\api;

use App\Commands\PopulateCsv;
use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Hash;

class DataFromCsvController extends ApiController
{


    public function add(Request $request)
    {
        $file = $request->file('csvFileInput');
        $contents = \File::get($file->getRealPath());
        $overwriteEtgar22Option = $request->get('overwriteEtgar22Option', false) ? true: false;

        $outputHandler = new OutputHandler();
        $command = new PopulateCsv($file->getRealPath(), $outputHandler, $overwriteEtgar22Option);
        $this->dispatch($command);

        return response()->json([
            'errors' => $outputHandler->getOutputData()['errors'],
            'info' => $outputHandler->getOutputData()['info'],
        ], 200);
    }
}

class OutputHandler
{

    private $outputData = [
        'errors' => [],
        'info' => [],
    ];

    public function error($message)
    {
        $this->outputData['errors'][] = $message;
    }

    public function info($message)
    {
        $this->outputData['info'][] = $message;
    }

    public function getOutputData()
    {
        return $this->outputData;
    }
}
