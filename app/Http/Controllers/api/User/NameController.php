<?php namespace App\Http\Controllers\api\User;

use App\Http\Controllers\Controller;

class NameController extends Controller
{
    public function show()
    {
        $user = \Auth::user();

        return [
            'success' => true,
            'data' => [
                'name' => $user->name
            ]
        ];
    }

    public function update()
    {
        $user = \Auth::user();
        $data = \Request::input('data');
        $name = $data['name'];

        $validator = \Validator::make($data, [
            'name' => 'required|between:4,50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'messages' => $validator->errors()
            ], 400);
        }

        try {
            $name = $data['name'];

            $user->name = $name;
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