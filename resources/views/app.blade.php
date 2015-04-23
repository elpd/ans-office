<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ANS Office System</title>

    <link rel="stylesheet" media="screen" href="/lib/jquery-ui/jquery-ui.css"/>
    <link rel="stylesheet" media="screen" href="/lib/jquery-ui/jquery-ui.structure.css"/>

    <link rel="stylesheet" media="screen" href="/js/jqGrid/css/trirand/ui.jqgrid.css"/>
    <link rel="stylesheet" media="screen" href="/js/lib/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.min.css"/>

    {!! HTML::style('lib/bootstrap-3.3.2-dist/css/bootstrap.css') !!}
    @if ($userSettings)
        <link rel="stylesheet" media="screen" href="/lib/jquery-ui-themes/{{ $userSettings->ui_jquery_ui_theme->folder }}/jquery-ui.css"/>
        <link rel="stylesheet" media="screen" href="/lib/jquery-ui-themes/{{ $userSettings->ui_jquery_ui_theme->folder }}/theme.css"/>
        <link rel="stylesheet" media="screen" href="/lib/bootstrap_themes/{{ $userSettings->ui_bootstrap_theme->css_file }}"/>
    @else
        <link rel="stylesheet" media="screen" href="/lib/jquery-ui-themes/redmond//jquery-ui.css"/>
        <link rel="stylesheet" media="screen" href="/lib/jquery-ui-themes/redmond//theme.css"/>
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
