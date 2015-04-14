define([
        'lodash',
        'classes/utilities',
        'classes/GeneralGrid',
        'employee/emptySubRow'
    ],
    function (_,
              utilities,
              GeneralGrid,
              SubRow) {

        var Class = function SubRow(params) {
            this.parentControllerUrl = params.parentControllerUrl;
            this.lang = params.lang;
            this.userSettingsGService = params.userSettingsGService;
        };

        Class.prototype = {
            // the event handler on expanding parent row receives two parameters
            // the ID of the grid row  and the primary key of the row
            show: function (parentRowID, parentRowKey) {
                var self = this;

                // Create the sub page. Tabs interface for each wanted child and info.
                // TODO: active indication

                var etgar22TabId = parentRowID + '_etgar22Tab';
                var etgar22TabLinkId = etgar22TabId + '_link';
                var etgar22GridId = etgar22TabId + '_grid';
                var etgar22PagerId = etgar22GridId + '_pager';

                $('#' + parentRowID).append(
                    '<div id="' + parentRowID + '_subcontent" role="tabpanel">' +

                    '<ul class="nav nav-tabs" role="tablist">' +

                    '<li role="presentation"><a id="' + etgar22TabLinkId +
                    '" href="#' + etgar22TabId + '" aria-controls="' + etgar22TabId +
                    '" role="tab" data-toggle="tab">' +
                    self.lang.get('bo.etgar22') + '</a></li>' +
                    '<li role="presentation"><a href="#">Info 2</a></li>' +
                    '<li role="presentation"><a href="#">Info 3</a></li>' +

                    '</ul>' +

                    '<div class="tab-content">' +

                    '<div role="tabpanel" class="tab-pane" id="' + etgar22TabId + '">' +
                    '<table id="' + etgar22GridId + '"></table>' +
                    '<div id="' + etgar22PagerId + '"></div>' +
                    '</div>' +

                    '<div role="tabpanel" class="tab-pane" id="profile">bbbb</div>' +
                    '<div role="tabpanel" class="tab-pane" id="messages">cccc</div>' +
                    '<div role="tabpanel" class="tab-pane" id="settings">dddd</div>' +

                    '</div>' +

                    '</div>'
                );

                // Bind the tabs

                $('#' + etgar22TabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/etgar22',
                        parentClass: '\\App\\Contact',
                        parentId: parentRowKey,
                        childParentNick: 'contact',
                        childParentField: 'contact_id',
                        gridId: etgar22GridId,
                        biName: 'etgar22',
                        biNamePlural: 'etgar22s',
                        caption: _.capitalize(self.lang.get('bo.etgar22')),
                        SubRow: SubRow,
                        direction: self.userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: self.lang.get('bo.id'),
                            name: 'id',
                            width: 30,
                            key: true,
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                            },
                            searchrules: {
                                integer: true
                            }
                        }, {
                            label: self.lang.get('bo.etgar22_facebook_know_how'),
                            name: 'facebook_know_how',
                            editable: true,
                            formatter: 'checkbox',
                            align: 'center',
                            width: 50,
                            edittype: 'checkbox',
                            editoptions: {
                                value: "1:0"
                            },
                            stype: "select",
                            searchoptions: {
                                sopt: ['eq', 'ne'],
                                value: ":All;1:Yes;0:No"
                            }
                        }, {
                            label: self.lang.get('bo.etgar22_call_for_facebook_help'),
                            name: 'call_for_facebook_help',
                            editable: true,
                            formatter: 'checkbox',
                            align: 'center',
                            width: 50,
                            edittype: 'checkbox',
                            editoptions: {
                                value: "1:0"
                            },
                            stype: "select",
                            searchoptions: {
                                sopt: ['eq', 'ne'],
                                value: ":All;1:Yes;0:No"
                            }
                        },{
                            label: self.lang.get('bo.etgar22_registration_date'),
                            name: 'registration_date',
                            editable: true,
                            formatter: 'datetime',
                            datefmt: 'yyyy-mm-dd',
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: generateDateTimePicker
                            },
                            //stype: 'datetime',
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                // TODO: bug in jqgrid ? find out why same id as parent search.
                                //dataInit: generateDateTimePicker
                            },
                            searchrules: {
                                date: true
                            }
                        },{
                            label: self.lang.get('bo.etgar22_notes'),
                            name: 'notes',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        },{
                            label: self.lang.get('bo.etgar22_next_call'),
                            name: 'next_call',
                            editable: true,
                            formatter: 'datetime',
                            datefmt: 'yyyy-mm-dd',
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: generateDateTimePicker
                            },
                            //stype: 'datetime',
                            searchoptions: {
                                sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                // TODO: bug in jqgrid ? find out why same id as parent search.
                                //dataInit: generateDateTimePicker
                            },
                            searchrules: {
                                date: true
                            }
                        },{
                            label: self.lang.get('bo.etgar22_why_go_vegan'),
                            name: 'why_go_vegan',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        },{
                            label: self.lang.get('bo.etgar22_parent_name'),
                            name: 'parent_name',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        },{
                            label: self.lang.get('bo.etgar22_parent_email'),
                            name: 'parent_email',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        }]
                    });

                    grid.activate();

                    $(this).tab('show');
                });
            }
        };

        function generateDateTimePicker(element) {
            $(element).datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            });
        }

        return Class;
    });
