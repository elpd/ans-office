@extends('logged')

@section('main_content')
<div id="admin_section" class="main_content container-fluid">
	<div class="row content_main_row">

			<div class="col-xs-2 content_main_row_part
			    @if($userSettings->ui_language->direction == 'right_to_left')
			        col-xs-push-10
			    @endif
			">

				<div class="sidebar-nav" id="admin_nav_menu">
					<div class="navbar navbar-default" role="navigation">

						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
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
								<li><a href="/admin/users" data-action="usersList">@lang('main.users_list_label')</a> </li>
								<li><a href="/admin/roles" data-action="rolesList">@lang('main.roles_list_label')</a> </li>
								<li><a href="/admin/permissions" data-action="permissionsList">
									@lang('main.permissions_list_label')</a>
								</li>
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
