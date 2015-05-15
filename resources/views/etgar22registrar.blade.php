@extends('logged')

@section('main_content')
    <div id="etgar22registrar_page" class="container-fluid">
        <div class="col-md-10 col-md-offset-1">
            <h2>@lang('main.etgar22registrar-page_header')</h2>
            <div class="row home_row">
                <h4>@lang('main.etgar22registrar-page_table-header')</h4>
                <table id="contacts_grid"></table>
                <div id="contacts_grid_pager"></div>
            </div>
        </div>
    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('classes/pages/etgar22registrar');
    </script>
@endsection
