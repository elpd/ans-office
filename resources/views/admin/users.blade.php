@extends('admin')

@section('subContent')
    <div id="users_page" class="sub_content">
        <div class="row">
            <h2 class="section_header
                @if($userSettings->ui_language->direction == 'right_to_left')
			        right_aligned
			    @endif
            ">@lang('bo.Users')</h2>
        </div>

        <table id="users_grid"></table>
        <div id="users_grid_pager"></div>

    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('admin/users');
    </script>
@endsection
