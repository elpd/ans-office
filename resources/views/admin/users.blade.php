@extends('admin')

@section('subContent')
<div id="users_page" class="sub_content">
	<h2 class="section_header">@choice('main.User',2)</h2>

	<table id="users_grid"></table>
	<div id="users_grid_pager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('admin/users');
</script>
@endsection
