@extends('admin')

@section('subContent')
<div id="roles_page" class="sub_content">
	<h2 class="section_header
	    @if($userSettings->ui_language->direction == 'right_to_left')
			        right_aligned
		  @endif
	">@lang('bo.Roles')</h2>

	<table id="roles_grid"></table>
	<div id="roles_grid_pager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('admin/roles');
</script>
@endsection
