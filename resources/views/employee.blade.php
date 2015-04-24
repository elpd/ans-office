@extends('logged')

@section('main_content')
    <div class="main_content container-fluid">
        <div class="row content_main_row">

            <div class="col-xs-2 content_main_row_part
			    @if($userSettings->ui_language->direction == 'right_to_left')
			        col-xs-push-10
			    @endif
                    ">

                <div class="sidebar-nav">
                    <div class="navbar navbar-default" role="navigation">

                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse"
                                    data-target=".sidebar-navbar-collapse">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            </button>
                            <span class="visible-xs navbar-brand">Sidebar menu</span>
                        </div>

                        <div class="navbar-collapse collapse sidebar-navbar-collapse">

                            <ul class="nav navbar-nav
							    @if($userSettings->ui_language->direction == 'right_to_left')
							        vertical_navbar_list_right
                                @endif
                                    ">
                                <li class=" @if(isset($selected_view) && $selected_view == 'contacts') active @endif">
                                    <a href="/employee/contacts" id="contacts_section_link">
                                        @lang('main.contacts_list_label')
                                    </a></li>
                                <li class=" @if(isset($selected_view) && $selected_view == 'cycles') active @endif">
                                    <a href="/employee/cycles" id="cycles_section_link">
                                        @lang('main.cycles_list_label')
                                    </a></li>
                                <li class=" @if(isset($selected_view) && $selected_view == 'groups') active @endif">
                                    <a href="/employee/groups" id="groups_section_link">
                                        @lang('main.groups_list_label')
                                    </a></li>
                                <li class=" @if(isset($selected_view) && $selected_view == 'guides') active @endif">
                                    <a href="/employee/guides" id="guides_section_link">
                                        @lang('main.guides_list_label')
                                    </a></li>
                                <li class=" @if(isset($selected_view) && $selected_view == 'groups_members') active @endif">
                                    <a href="/employee/groups-members" id="groups_members_section_link">
                                        @lang('main.groups_members_list_label')
                                    </a></li>
                                <li class=" @if(isset($selected_view) && $selected_view == 'etgar22_registration_requests') active @endif">
                                    <a href="/employee/etgar22-registration-requests" id="etgar22_registration_requests_section_link">
                                        @lang('main.etgar22_registration_requests_list_label')
                                    </a></li>
                            </ul>
                        </div>
                        <!--/.nav-collapse -->
                    </div>
                </div>
            </div>

            <div class="col-xs-10 content_main_row_part
			    @if($userSettings->ui_language->direction == 'right_to_left')
			        col-xs-pull-2
			    @endif
                    ">
                @yield('subContent')
            </div>

        </div>
    </div>
@endsection
