@extends('employee')

@section('subContent')
    <div id="etgar22_registration_requests_page" class="sub_content">
        <h2 class="section_header
                @if($userSettings->ui_language->direction == 'right_to_left')
			        right_aligned
			    @endif"
                >@lang('bo.Etgar-22-registration-requests')
        </h2>

        <div class="row">

            <div class="col-xs-12">
                <table id="etgar22_registration_requests_grid"></table>
                <div id="etgar22_registration_requests_grid_pager"></div>
            </div>
        </div>
    </div>
@endsection

@section('childScript')
<script>
	scripts.push('employee/etgar22RegistrationRequests');
</script>
@endsection
