@extends('user.settings')

@section('subContent')
    <div id="user_settings_general_page">.

        <h2 class="section_header">@lang('main.user-settings-general')</h2>

        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

            <div class="panel panel-default" id="section_settings_user_name">
                <div class="panel-heading" role="tab" id="section_settings_user_name_heading"
                     data-toggle="collapse"
                     data-parent="#accordion" href="#section_settings_user_name_content"
                     aria-expanded="true"
                     aria-controls="section_settings_user_name_content">
                    <h4 class="panel-title">
                        <a>
                            @lang('main.name')
                        </a>
                    </h4>
                </div>
                <div id="section_settings_user_name_content" class="panel-collapse collapse panel-content"
                     role="tabpanel"
                     aria-labelledby="section_settings_user_name_heading">
                    <div class="panel-body">
                        <form id="form_user_name">
                            <div class="form-group">
                                <label for="inputName">@lang('main.user_name')</label>
                                <input type="text" class="form-control input_name" id="inputName"
                                       placeholder="@lang('main.enter_email')">
                            </div>
                            <button type="submit" class="btn btn-default input_submit">Submit</button>
                            <div class="message_section bs-callout">

                            </div>
                        </form>
                    </div>
                </div>
                <div class="loading_indicator"></div>
            </div>

            <div class="panel panel-default" id="section_settings_user_email">
                <div class="panel-heading" role="tab" id="section_settings_user_email_heading"
                     data-toggle="collapse" data-parent="#accordion" href="#section_settings_user_email_content"
                     aria-expanded="true"
                     aria-controls="section_settings_user_email_content">
                    <h4 class="panel-title">
                        <a>
                            @lang('main.email')
                        </a>
                    </h4>
                </div>
                <div id="section_settings_user_email_content" class="panel-collapse collapse panel-content" role="tabpanel"
                     aria-labelledby="section_settings_user_email_heading">
                    <div class="panel-body">
                        <form>
                            <div class="form-group">
                                <label for="inputEmail">@lang('main.user_email')</label>
                                <input type="text" class="form-control input_email" id="inputEmail"
                                       placeholder="@lang('main.enter_email')">
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                            <div class="message_section bs-callout">

                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <div class="panel panel-default" id="section_settings_user_password">
                <div class="panel-heading" role="tab" id="section_settings_user_password_heading">
                    <h4 class="panel-title"
                        data-toggle="collapse" data-parent="#accordion" href="#section_settings_user_password_content"
                        aria-expanded="true"
                        aria-controls="section_settings_user_password_content">
                        <a>
                            @lang('main.password')
                        </a>
                    </h4>
                </div>
                <div id="section_settings_user_password_content" class="panel-collapse collapse panel-content"
                     role="tabpanel"
                     aria-labelledby="section_settings_user_password_heading">
                    <div class="panel-body">
                        <form id="form_user_password">
                            <div class="form-group">
                                <label for="inputPassword">@lang('main.user_password')</label>
                                <input type="text" class="form-control input_password" id="inputPassword"
                                       placeholder="@lang('main.enter_password')">
                                <label for="inputPasswordConfirmation">@lang('main.user_password_confirmation')</label>
                                <input type="text" class="form-control input_password_confirmation"
                                       id="inputPasswordConfirmation"
                                       placeholder="@lang('main.enter_password_confirmation')">
                            </div>
                            <button type="submit" class="btn btn-default input_submit">Submit</button>
                            <div class="message_section bs-callout">

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="panel panel-default" id="section_settings_user_language">
                <div class="panel-heading" role="tab" id="section_settings_user_language_heading">
                    <h4 class="panel-title"
                        data-toggle="collapse" data-parent="#accordion"
                        href="#section_settings_user_language_content"
                        aria-expanded="true"
                        aria-controls="section_settings_user_language_content">
                        <a>
                            @lang('main.language')
                        </a>
                    </h4>
                </div>
                <div id="section_settings_user_language_content" class="panel-collapse collapse panel-content"
                     role="tabpanel"
                     aria-labelledby="section_settings_user_language_heading">
                    <div class="panel-body">
                        <form id="form_user_language">
                            <div class="form-group">
                                <label for="inputLanguage">@lang('main.language')</label>
                                <select class="form-control input_language" id="inputLanguage"
                                        placeholder="@lang('main.enter_language')">
                                </select>
                            </div>
                            <button type="submit" class="btn btn-default input_submit">Submit</button>
                            <div class="message_section bs-callout">

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="panel panel-default" id="section_settings_user_ui_theme">
                <div class="panel-heading" role="tab" id="section_settings_user_ui_theme_heading">
                    <h4 class="panel-title"
                        data-toggle="collapse" data-parent="#accordion"
                        href="#section_settings_user_ui_theme_content"
                        aria-expanded="true"
                        aria-controls="section_settings_user_ui_theme_content">
                        <a>
                            @lang('main.ui_theme')
                        </a>
                    </h4>
                </div>
                <div id="section_settings_user_ui_theme_content" class="panel-collapse collapse panel-content"
                     role="tabpanel"
                     aria-labelledby="section_settings_user_ui_theme_heading">
                    <div class="panel-body">
                        <form id="form_user_ui_theme">
                            <div class="form-group">
                                <label for="inputUiTheme">@lang('main.ui_theme')</label>
                                <select class="form-control input_ui_theme" id="inputUiTheme"">
                                </select>
                            </div>
                            <button type="submit" class="btn btn-default input_submit">Submit</button>
                            <div class="message_section bs-callout">

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    </div>
@endsection

@section('childScript')
    <script>
        scripts.push('user/settings/general');
    </script>
@endsection
