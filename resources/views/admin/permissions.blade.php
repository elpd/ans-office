@extends('admin')

@section('subContent')
<div id="permissions_page" class="sub_content">
	<h2 class="section_header
	    @if($userSettings->ui_language->direction == 'right_to_left')
		    right_aligned
        @endif
	">@lang('bo.Permissions')</h2>

	<table id="permissions_grid"></table>
	<div id="permissions_grid_pager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('admin/permissions');
</script>
@endsection
