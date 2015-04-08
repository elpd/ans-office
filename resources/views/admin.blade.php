@extends('app')

@section('content')
<div id="admin_section" class="main_content">
	<div class="row content_main_row">

			<div class="col-xs-2 content_main_row_part">

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

							<ul class="nav navbar-nav">
								<li><a href="/admin/users" data-action="usersList">Users</a> </li>
								<li><a href="/admin/roles" data-action="rolesList">Roles</a> </li>
								<li><a href="/admin/permissions" data-action="permissionsList">
									Permissions</a>
								</li>
							</ul>
						</div>
						<!--/.nav-collapse -->
					</div>
				</div>
			</div>

			<div class="col-xs-10 content_main_row_part">
				@yield('subContent')
			</div>

	</div>
</div>
@endsection
