<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Watson\Validating\ValidationException;

class PasswordController extends Controller
{
    /*public function show()
    {
        $user = \Auth::user();

        return [
            'success' => true,
            'data' => [
                'email' => $user->email
            ]
        ];
    }*/

    public function update(Request $request)
    {
        $user = \Auth::user();
        $data = \Request::input('data');
        $password = $data['password'];

        $validator = \Validator::make($data, [
            'password' => 'required|confirmed|min:6',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'success' => false,
                'messages' => $validator->errors()
            ], 400);
        }

        $user->password = \Hash::make($password);

        try{
            $user->saveOrFail();
            return [
                'success' => true,
                'messages' => [
                    \Lang::get('controller_messages.user_settings_was_changed_successfully')
                ]
            ];
        }
        catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'messages' => $user->getErrors()
            ], 400);
        }
        catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'messages' => \Lang::get('controller_messages.general_error')
            ], 400);
        }

    }
}