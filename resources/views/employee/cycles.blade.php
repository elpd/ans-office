@extends('employee')

@section('subContent')
<div>
	<h2 class="section_header">Cycles</h2>

	<table id="jqGrid"></table>
	<div id="jqGridPager"></div>

</div>
@endsection

@section('childScript')
<script>
	scripts.push('employee/cycles');
</script>
@endsection
