<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class EmailController extends Controller
{
    public function show()
    {
        $user = \Auth::user();

        return [
            'success' => true,
            'data' => [
                'email' => $user->email
            ]
        ];
    }

    public function update()
    {
        $user = \Auth::user();
        $data = \Request::input('data');

        $validator = \Validator::make($data, [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'messages' => $validator->errors()
            ], 400);
        }

        try {
            $email = $data['email'];

            $user->email = $email;
            $user->saveOrFail();
            return [
                'success' => true,
                'messages' => [
                    \Lang::get('controller_messages.user_settings_was_changed_successfully')
                ]
            ];
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'messages' => $user->getErrors()
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'messages' => \Lang::get('controller_messages.general_error')
            ], 400);
        }
    }
}