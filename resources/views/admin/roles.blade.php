@extends('admin')

@section('subContent')
<div id="roles_page">
	<h2 class="section_header">@choice('main.Role',2)</h2>

	<table id="roles_grid"></table>
	<div id="roles_grid_pager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('admin/roles');
</script>
@endsection
