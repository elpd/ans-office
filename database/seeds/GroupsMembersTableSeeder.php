<?php

use Illuminate\Database\Seeder;
use App\GroupsMember;
use App\Group;
use App\Contact;
use App\GroupMembersStatus;
use App\User;

class GroupsMembersTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('groups_members')->delete();

        $group1 = Group::where('name', '=', 'firstgroup')->firstOrFail();
        $group2 = Group::where('name', '=', 'secondgroup')->firstOrFail();
        $contact1 = Contact::where('email', '=', 'contact1@example.com')->firstOrFail();
        $contact2 = Contact::where('email', '=', 'contact2@example.com')->firstOrFail();
        $status1 = GroupMembersStatus::where('status', '=', 'new')->firstOrFail();
        $guide1 = User::where('name', '=', 'guide1')->firstOrFail();
        $guide2 = User::where('name', '=', 'guide2')->firstOrFail();

        $itemsData = array(
            array(
                'group' => [
                    'group_id' => $group1->id,
                    'contact_id' => $contact1->id,
                    'status_id' => $status1->id,
                ],
                'guides' => [
                    $guide1,
                    $guide2,
                ]
            ),
            array(
                'group' => [
                    'group_id' => $group2->id,
                    'contact_id' => $contact2->id,
                    'status_id' => $status1->id,
                ],
                'guides' => [
                    $guide1,
                ]
            )
        );

        foreach ($itemsData as $itemData) {
            $groupData = $itemData['group'];
            $newItem = GroupsMember::create($groupData);

            $guidesData = $itemData['guides'];
            foreach ($guidesData as $guide) {
                $newItem->guides()->save($guide);
            }

            $errors = $newItem->getErrors();
            if (count($errors) > 0) {
                throw new Exception($errors);
            }
        };
    }
}
