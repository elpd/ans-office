@extends('app')

@section('content')
<div class="">
	<div class="row">

			<div class="col-xs-2">

				<div class="sidebar-nav">
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
								<li><a href="/employee/contacts" id="contacts_section_link">Contacts</a> </li>
								<li><a href="/employee/cycles" id="cycles_section_link">Cycles</a> </li>
								<li><a href="/employee/groups" id="groups_section_link">Groups</a></li>
								<li><a href="/employee/guides" id="guides_section_link">Guides</a></li>
								<li><a href="/employee/groups-members" id="groups_members_section_link">Groups Members</a></li>
							</ul>
						</div>
						<!--/.nav-collapse -->
					</div>
				</div>
			</div>

			<div class="col-xs-10">
				@yield('subContent')
			</div>

	</div>
</div>
@endsection
