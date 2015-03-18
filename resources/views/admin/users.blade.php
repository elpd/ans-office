@extends('admin')

@section('subContent')
<div id="users_page">
	<h2 class="section_header">@choice('main.User',2)</h2>

	<table id="users_grid"></table>
	<div id="users_grid_pager"></div>
	<div id="users_grid_loading_indicator"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('admin/users');
</script>
@endsection
