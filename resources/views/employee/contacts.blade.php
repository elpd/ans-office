@extends('employee')

@section('subContent')
<div id="contacts_page" class="sub_content">
    <h2 class="section_header">@choice('main.Contact',2)</h2>

	<table id="contacts_grid"></table>
	<div id="contacts_grid_pager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('employee/contacts');
</script>
@endsection
