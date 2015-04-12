@extends('employee')

@section('subContent')
    <div id="contacts_page" class="sub_content">
        <div class="row">
            <h2 class="section_header
                @if($userSettings->ui_language->direction == 'right_to_left')
			        right_aligned
			    @endif"
                    >@lang('bo.Contacts')</h2>
        </div>
        <div class="row">

            <div class="col-xs-12">
                <table id="contacts_grid"></table>
                <div id="contacts_grid_pager"></div>
            </div>
        </div>
    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('employee/contacts');
    </script>
@endsection
