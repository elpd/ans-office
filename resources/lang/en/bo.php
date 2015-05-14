<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Business Objects Language Lines
    |--------------------------------------------------------------------------
    |
    |
    */

    // General

    'id' => 'ID',
    'general_id' => 'ID',
    'general_created-at' => 'Created At',
    'general_updated-at' => 'Updated At',

    // User

    'user' => 'user',
    'users' => 'users',
    'user_name' => 'name',
    'user_email' => 'email',
    'user_password' => 'password',
    'user_password_confirmation' => 'password confirmation',
    'user_roles' => 'roles',
    'user_permissions' => 'permissions',

    // Role

    'role' => 'role',
    'roles' => 'roles',
    'role_name' => 'name',
    'role_slug' => 'slug',
    'role_description' => 'description',
    'role_level' => 'level',
    'role_users' => 'associated users',
    'role_permissions' => 'associated permissions',

    // Permission

    'permissions' => 'permissions',
    'Permissions' => 'Permissions',
    'permission_name' => 'Name',
    'permission_slug' => 'Slug',
    'permission_description' => 'Description',
    'permission_model' => 'Model',
    'permission_roles' => 'roles',
    'permission_users' => 'users',

    // Contact

    'contact' => 'contact',
    'contacts' => 'contacts',
    'Contacts' => 'Contacts',
    'registration_date' => 'Registration Date',
    'email' => 'Email',
    'first_name' => 'First Name',
    'last_name' => 'Last Name',
    'phone' => 'Phone',
    'facebook_account' => 'Facebook',
    'birth_year' => 'Birth Year',
    'donate' => 'Donate',
    'blacklisted' => 'Blacklisted',
    'contact_group-members' => 'membership in groups',
    'contact_etgar22' => 'etgar 22',

    // Etgar 22
    'etgar22' => 'Etgar22',
    'etgar22_contact-id' => 'contact',
    'etgar22_facebook-know-how' => 'Knows To Use Facebook',
    'etgar22_call-for-facebook-help' => 'Call For FB Help',
    'etgar22_registration-date' => 'Registration Date',
    'etgar22_notes' => 'Notes',
    'etgar22_next-call' => 'Next Call',
    'etgar22_why-go-vegan' => 'Why Go Vegan',
    'etgar22_parent-name' => 'Parent Name',
    'etgar22_parent-email' => 'Parent Email',

    // Cycle

    'cycle' => 'cycle',
    'cycles' => 'cycles',
    'cycle_start_date' => 'Start Date',
    'cycle_num' => 'Num',
    'cycle_groups' => 'groups',

    // Group

    'group' => 'group',
    'groups' => 'Groups',
    'Groups' => 'Groups',
    'group_cycle-id' => 'Cycle',
    'group_name' => 'Name',
    'group_status-id' => 'Status',
    'group_group-members' => 'memberships in group',

    // Guide

    'guides' => 'Guides',
    'Guides' => 'Guides',
    'guide_name' => 'Name',
    'guide__user_id__user_name' => 'User Name',
    'guide__user_id__user_email' => 'User Email',

    // Groups Members
    'group-member' => 'group member',
    'group-members' => 'group members',
    'group-member_group-id' => 'group',
    'group-member_contact-id' => 'contact',
    'group-member_status-id' => 'status',
    'group-member_guides' => 'associated guides',

    // Role-User
    'role-user' => 'role and user association',
    'role-user_role-id' => 'role',
    'role-user_user-id' => 'user',

    // Permission-User
    'permission-user' => 'permission and user association',
    'permission-user_permission-id' => 'permission',
    'permission-user_user-id' => 'user',

    // Permission-Role
    'permission-role' => 'permission and role association',
    'permission-role_permission-id' => 'permission',
    'permission-role_role-id' => 'role',

    // Contact Note
    'contact-notes' => 'Notes',
    'contact-note_contact-id' => 'contact',
    'contact-note_user-id' => 'user',
    'contact-note_text' => 'text',
    'contact-note_created-at' => 'called at',
    'contact-note_updated-at' => 'updated at',

    // etgar-22-registration-requests

    'etgar-22-registration-request' => 'Etgar 22 Registration Request',
    'etgar-22-registration-requests' => 'Etgar 22 Registration Requests',
    'Etgar-22-registration-requests' => 'Etgar 22 Registration Requests',
    'etgar-22-registration-request_full_name' => 'Full Name',
    'etgar-22-registration-request_facebook_account_name' => 'Facebook',
    'etgar-22-registration-request_email' => 'Email',
    'etgar-22-registration-request_phone' => 'Phone',
    'etgar-22-registration-request_birth_year' => 'Birth Year',
    'etgar-22-registration-request_call_for_donation' => 'Donate',
    'etgar-22-registration-request_facebook_know_how' => 'Knows To Use Facebook',
    'etgar-22-registration-request_call_for_facebook_help' => 'Call For FB Help',
    'etgar-22-registration-request_why_go_vegan' => 'Why Go Vegan Answer',
    'etgar-22-registration-request_parent_name' => 'Parent Name',
    'etgar-22-registration-request_parent_email' => 'Parent Email',
    'etgar-22-registration-request_status' => 'Request Status',

    // group-member-guide

    'group-member-guide' => 'group member guide association',
    'group-member-guides' => 'group member guide association',
    'group-member-guide_group-member-id' => 'group member',
    'group-member-guide_user-id' => 'guide',
];
