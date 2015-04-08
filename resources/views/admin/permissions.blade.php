@extends('admin')

@section('subContent')
<div id="permissions_page" class="sub_content">
	<h2 class="section_header">@choice('main.Permission',2)</h2>

	<table id="permissions_grid"></table>
	<div id="permissions_grid_pager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('admin/permissions');
</script>
@endsection
