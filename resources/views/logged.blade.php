@extends('app')

@section('content')

    <nav class="navbar navbar-default" id="main_navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#main_navbar_collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#" id="main_label">@lang('main.anonymouse_org_short_label')</a>
            </div>

            <div class="collapse navbar-collapse" id="main_navbar_collapse">
                <ul class="nav navbar-nav
                @if($userSettings && $userSettings->ui_language->direction == 'right_to_left')
			        navbar-right
			    @endif"
                        >
                    <li><a href="/" id="home_section_link">@lang('main.home_menu_label')</a></li>
                    @role('admin')
                    <li><a href="/admin" id="admin_section_link">@lang('main.admin_menu_label')</a></li>
                    @endrole
                    @role('admin')
                    <li><a href="/table" id="table_section_link">@lang('main.table_menu_label')</a></li>
                    @endrole
                    @role('guide')
                    <li><a href="/guide" id="guide_section_link">@lang('main.guide_menu_label')</a></li>
                    @endrole
                    @role('etgar22registrar')
                    <li><a href="/etgar22-registrar" id="registrar_section_link">@lang('main.etgar22_registrar_menu_label')</a></li>
                    @endrole
                </ul>

                <ul class="nav navbar-nav
                @if(!$userSettings || $userSettings->ui_language->direction == 'left_to_right')
			        navbar-right
			    @endif"
                    id="user_nav_menu">
                    @if (Auth::guest())
                        <li><a href="/auth/login">Login</a></li>
                    @else
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-expanded="false">{{
                        Auth::user()->name }} <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li class="
                            @if($userSettings->ui_language->direction == 'right_to_left')
                            right_aligned
                            @endif"
                                        ><a href="/user/settings">@lang('main.menu_settings_label')</a></li>
                                <li role="presentation" class="divider"></li>
                                <li class="
                            @if($userSettings->ui_language->direction == 'right_to_left')
			                    right_aligned
			                @endif"
                                        ><a href="/auth/logout">@lang('main.menu_logout_label')</a></li>
                            </ul>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>

    @yield('main_content')

@endsection


