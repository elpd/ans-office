@extends('user.settings')

@section('subContent')
    <div id="user_settings_general_page">.

        <div class="row">
            <h2 class="section_header
                @if($userSettings->ui_language->direction == 'right_to_left')
			        right_aligned
			    @endif"
                    >
                @lang('main.general_user_settings_label')</h2>
        </div>

        <div class="row">
            <div class="panel-group col-xs-10 col-xs-push-1" id="accordion" role="tablist" aria-multiselectable="true">

                <div class="panel panel-default" id="section_settings_user_name">
                    <div class="panel-heading" role="tab" id="section_settings_user_name_heading"
                         data-toggle="collapse"
                         data-parent="#accordion" href="#section_settings_user_name_content"
                         aria-expanded="true"
                         aria-controls="section_settings_user_name_content">
                        <h4 class="panel-title
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif">
                            <a>
                                @lang('main.settings_user_name_label')
                            </a>
                        </h4>
                    </div>
                    <div id="section_settings_user_name_content" class="panel-collapse collapse panel-content"
                         role="tabpanel"
                         aria-labelledby="section_settings_user_name_heading">
                        <div class="panel-body
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif"
                                >
                            <form id="form_user_name">
                                <div class="form-group">
                                    <label for="inputName">@lang('main.settings_user_name_label')</label>
                                    <input type="text" class="form-control input_name
                                    @if($userSettings->ui_language->direction == 'right_to_left')
			                        right_aligned
			                        @endif"
                                           id="inputName"
                                           placeholder="@lang('main.enter_user_name_sentence')">
                                </div>
                                <button type="submit" class="btn btn-default input_submit">
                                    @lang('main.settings_submit_button_label')
                                </button>
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
                        <h4 class="panel-title
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif">
                            <a>
                                @lang('main.settings_email_label')
                            </a>
                        </h4>
                    </div>
                    <div id="section_settings_user_email_content" class="panel-collapse collapse panel-content"
                         role="tabpanel"
                         aria-labelledby="section_settings_user_email_heading">
                        <div class="panel-body
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif"
                                >
                            <form>
                                <div class="form-group">
                                    <label for="inputEmail">@lang('main.settings_email_label')</label>
                                    <input type="text" class="form-control input_email
                                    @if($userSettings->ui_language->direction == 'right_to_left')
			                            right_aligned
			                        @endif"
                                           id="inputEmail"
                                           placeholder="@lang('main.enter_user_email_sentence')">
                                </div>
                                <button type="submit" class="btn btn-default">
                                    @lang('main.settings_submit_button_label')</button>
                                <div class="message_section bs-callout">

                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                <div class="panel panel-default" id="section_settings_user_password">
                    <div class="panel-heading" role="tab" id="section_settings_user_password_heading">
                        <h4 class="panel-title
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif"
                            data-toggle="collapse" data-parent="#accordion"
                            href="#section_settings_user_password_content"
                            aria-expanded="true"
                            aria-controls="section_settings_user_password_content">
                            <a>
                                @lang('main.settings_password_label')
                            </a>
                        </h4>
                    </div>
                    <div id="section_settings_user_password_content" class="panel-collapse collapse panel-content"
                         role="tabpanel"
                         aria-labelledby="section_settings_user_password_heading">
                        <div class="panel-body
                            @if($userSettings->ui_language->direction == 'right_to_left')
			                    right_aligned
			                @endif"
                                >
                            <form id="form_user_password">
                                <div class="form-group">
                                    <label for="inputPassword">@lang('main.settings_password_label')</label>
                                    <input type="text" class="form-control input_password
                                    @if($userSettings->ui_language->direction == 'right_to_left')
			                            right_aligned
			                        @endif"
                                           id="inputPassword"
                                           placeholder="@lang('main.enter_user_password_sentence')">
                                    <label for="inputPasswordConfirmation">
                                        @lang('main.settings_password_confirmation_label')</label>
                                    <input type="text" class="form-control input_password_confirmation
                                        @if($userSettings->ui_language->direction == 'right_to_left')
			                                right_aligned
			                            @endif"
                                           id="inputPasswordConfirmation"
                                           placeholder="@lang('main.enter_user_password_confirmation_sentence')">
                                </div>
                                <button type="submit" class="btn btn-default input_submit">
                                    @lang('main.settings_submit_button_label')
                                </button>
                                <div class="message_section bs-callout">

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="panel panel-default" id="section_settings_user_language">
                    <div class="panel-heading" role="tab" id="section_settings_user_language_heading">
                        <h4 class="panel-title
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif"
                            data-toggle="collapse" data-parent="#accordion"
                            href="#section_settings_user_language_content"
                            aria-expanded="true"
                            aria-controls="section_settings_user_language_content">
                            <a>
                                @lang('main.settings_user_language_label')
                            </a>
                        </h4>
                    </div>
                    <div id="section_settings_user_language_content" class="panel-collapse collapse panel-content"
                         role="tabpanel"
                         aria-labelledby="section_settings_user_language_heading">
                        <div class="panel-body
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif"
                                >
                            <form id="form_user_language">
                                <div class="form-group">
                                    <label for="inputLanguage">@lang('main.settings_user_language_label')</label>
                                    <select class="form-control input_language
                                    @if($userSettings->ui_language->direction == 'right_to_left')
			                            right_aligned
			                        @endif"
                                            id="inputLanguage"
                                            placeholder="@lang('main.enter_user_language_sentence')">
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-default input_submit">
                                    @lang('main.settings_submit_button_label')
                                </button>
                                <div class="message_section bs-callout">

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="panel panel-default" id="section_settings_user_ui_theme">
                    <div class="panel-heading" role="tab" id="section_settings_user_ui_theme_heading">
                        <h4 class="panel-title
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif"
                            data-toggle="collapse" data-parent="#accordion"
                            href="#section_settings_user_ui_theme_content"
                            aria-expanded="true"
                            aria-controls="section_settings_user_ui_theme_content">
                            <a>
                                @lang('main.settings_user_theme_label')
                            </a>
                        </h4>
                    </div>
                    <div id="section_settings_user_ui_theme_content" class="panel-collapse collapse panel-content"
                         role="tabpanel"
                         aria-labelledby="section_settings_user_ui_theme_heading">
                        <div class="panel-body
                        @if($userSettings->ui_language->direction == 'right_to_left')
			               right_aligned
			            @endif"
                                >
                            <form id="form_user_ui_theme">
                                <div class="form-group">
                                    <label for="inputUiBootstrapTheme">@lang('main.settings_user_bootstrap_theme_label')</label>
                                    <select class="form-control input_ui_bootstrap_theme
                                    @if($userSettings->ui_language->direction == 'right_to_left')
			                            right_aligned
			                        @endif"
                                            id="inputUiBootstrapTheme">
                                    </select>
                                    <label for="inputUiJqueryUiTheme">@lang('main.settings_user_jquery_ui_theme_label')</label>
                                    <select class="form-control input_ui_jquery_ui_theme
                                    @if($userSettings->ui_language->direction == 'right_to_left')
			                            right_aligned
			                        @endif"
                                            id="inputUiTheme">
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-default input_submit">
                                    @lang('main.settings_submit_button_label')
                                </button>
                                <div class="message_section bs-callout">

                                </div>
                            </form>
                        </div>
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
