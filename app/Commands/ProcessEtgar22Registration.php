<?php namespace App\Commands;

use App\Commands\Command;

use Illuminate\Contracts\Bus\SelfHandling;
use App\Etgar22RegistrationRequest;

class ProcessEtgar22Registration extends Command implements SelfHandling
{

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct($fullName, $facebookAccountName, $email, $phone, $birthYear,
                                $whyGoVeganAnswer, $parentName, $parentEmail)
    {
        $this->etgar22RegistrationRequest = new Etgar22RegistrationRequest(
            $fullName, $facebookAccountName, $email, $phone, $birthYear,
            $whyGoVeganAnswer, $parentName, $parentEmail);
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {

    }

}
