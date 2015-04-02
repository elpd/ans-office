<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ANS Office System</title>

    <link rel="stylesheet" media="screen" href="/lib/jquery-ui-1.11.3.custom/jquery-ui.css"/>
    <link rel="stylesheet" media="screen" href="/js/jqGrid/css/trirand/ui.jqgrid.css"/>

    {!! HTML::style('lib/bootstrap-3.3.2-dist/css/bootstrap.css') !!}
    @if ($userSettings)
      <link rel="stylesheet" media="screen" href="/lib/bootstrap_themes/{{ $userSettings->ui_theme->css_file }}"/>
    @else
       {!! HTML::style('css/app.css') !!}
    @endif
    {!! HTML::style('css/custom.css') !!}

    <!-- Fonts -->
    <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<nav class="navbar navbar-default" id="main_navbar">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#" id="main_label">@lang('main.anonymouse-org-short')</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a href="/" id="home_section_link">Home</a></li>
                @role('admin')
                <li><a href="/admin" id="admin_section_link">Admin</a></li>
                @endrole
                @role('employee')
                <li><a href="/employee" id="employee_section_link">Employee</a></li>
                @endrole
            </ul>

            <ul class="nav navbar-nav navbar-right" id="user_nav_menu">
                @if (Auth::guest())
                <li><a href="/auth/login">Login</a></li>
                @else
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{
                        Auth::user()->name }} <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="/user/settings">Settings</a></li>
                        <li role="presentation" class="divider"></li>
                        <li><a href="/auth/logout">Logout</a></li>
                    </ul>
                </li>
                @endif
            </ul>
        </div>
    </div>
</nav>

@yield('content')

<!-- Scripts -->
<!--script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js">
</script-->
<!--script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js">
</script-->
<!--script src="/js/jqGrid/src/jquery.jqGrid.js"></script-->
<!--script src="/js/jqGrid/src/i18n/grid.locale-en.js"></script-->
<script>
    var scripts = [];
    var $_token = "{{ csrf_token() }}";
</script>
<script data-main="/js/main" src="/js/require.js"></script>

@yield('childScript')

</body>
</html>
