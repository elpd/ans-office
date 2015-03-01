@extends('app')

@section('content')
<div class="">
	<div class="row">

			<div class="col-xs-2">

				<div class="row">

					<div class="col-md-1"></div>

					<div class="btn-group col-md-10" dropdown>
						<button type="button" class="btn btn-danger dropdown-toggle new-button"
						dropdown-toggle ng-disabled="disabled">
						NEW
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu" role="menu">
							<li><a ui-sref="logged.employee.contact.new">Contact</a>
							</li>
							<li><a ui-sref="logged.employee.cycle.new">Cycle</a>
							</li>
							<li><a ui-sref="logged.employee.group.new">Group</a>
							</li>
							<li><a ui-sref="logged.employee.guide.new">Guide</a>
							</li>
						</ul>
					</div>

					<div class="col-md-1"></div>

				</div>

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
								<li><a href="logged.employee.contacts">Contacts</a> </li>
								<li><a ui-sref="logged.employee.cycles">Cycles</a> </li>
								<li><a ui-sref="logged.employee.groups">Groups</a></li>
								<li><a ui-sref="logged.employee.guides">Guides</a></li>
								<li><a href="/employee/groups-members">Groups Members</a></li>
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
