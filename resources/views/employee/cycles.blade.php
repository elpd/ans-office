@extends('employee')

@section('subContent')
    <div id="cycles_page" class="sub_content">
        <h2 class="section_header
                @if($userSettings->ui_language->direction == 'right_to_left')
			        right_aligned
			    @endif"
                >@lang('bo.Cycles')
        </h2>

        <div class="row">

            <div class="col-xs-12">
                <table id="cycles_grid"></table>
                <div id="cycles_grid_pager"></div>
            </div>
        </div>
    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('employee/cycles');
    </script>
@endsection
