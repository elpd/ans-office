@extends('logged')

@section('main_content')
    <div class="container-fluid">

        <div id="guide_section">

            <div class="row">

                <div class="col-md-10 col-md-offset-1" id="guide_contact_by_guide_grid_subsection">
                    <h2>Contacts Associated With Guide</h2>

                    <div class="row home_row">
                        <form class="form-inline">
                            <div class="form-group">
                                <label for="groups_selector_on_contacts_by_guide">Group</label>
                                <select id="groups_selector_on_contacts_by_guide" class="form-control">

                                </select>
                            </div>
                            <div class="form-group">
                                <label for="guides_selector_on_contacts_by_guide">Guide</label>
                                <select id="guides_selector_on_contacts_by_guide" class="form-control">

                                </select>
                            </div>
                        </form>
                    </div>

                    <div class="row home_row">
                        <table id="contact_by_guide_grid"></table>
                        <div id="contact_by_guide_grid_pager"></div>
                    </div>
                </div>
            </div>

        </div>

    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('classes/pages/guidePage');
    </script>
@endsection
