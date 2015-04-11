@extends('employee')

@section('subContent')
    <div id="contacts_page" class="sub_content">
        <div class="row">
            <h2 class="section_header">@choice('main.Contact',2)</h2>
            <button id="grid_fullscreen_button" >
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
            </button>
        </div>
        <div class="row">

            <table id="contacts_grid"></table>
            <div id="contacts_grid_pager"></div>
        </div>
    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('employee/contacts');
    </script>
@endsection
