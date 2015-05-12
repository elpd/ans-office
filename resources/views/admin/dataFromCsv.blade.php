@extends('admin')

@section('subContent')
    <div id="dataFromCsv_page" class="sub_content">

        <h2>@lang('main.dataFromCsv_header')</h2>

        <form id="data_from_csv_file_uploader" action="add" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="csvFileInput">@lang('main.dataFromCsv_label_choose-csv-file-to-process')</label>
                <input type="file" name="csvFileInput" id="csvFileInput" class="form-control" required>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" id="overwriteEtgar22Option" value="1"
                           name="overwriteEtgar22Option"> @lang('main.dataFromCsv_label_overwrite_etgar22')
                </label>
            </div>
            <input type="submit" class="btn btn-default">
        </form>

        <div class="progress" id="loading_indicator">
            <div class="progress-bar progress-bar-striped active" role="progressbar"
                 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 45%">
                <span class="sr-only">45% Complete</span>
            </div>
        </div>

        <div id="action_output">

            <div class="bs-callout bs-callout-danger">
                <h4>@lang('main.dataFromCsv_errors')</h4>

                <div id="output_errors"></div>
            </div>
            <div class="bs-callout bs-callout-info">
                <h4>@lang('main.dataFromCsv_info')</h4>

                <div id="output_info"></div>
            </div>
        </div>
    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('admin/dataFromCsv');
    </script>
@endsection
