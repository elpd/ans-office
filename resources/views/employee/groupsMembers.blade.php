@extends('employee')

@section('subContent')
<div>
	<h2>Groups Members</h2>

	<table id="jqGrid"></table>
	<div id="jqGridPager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('employee/groupsMembers');
</script>
@endsection