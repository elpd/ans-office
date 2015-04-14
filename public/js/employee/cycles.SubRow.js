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

                var groupTabId = parentRowID + '_groupTab';
                var groupTabLinkId = groupTabId + '_link';
                var groupGridId = groupTabId + '_grid';
                var groupPagerId = groupGridId + '_pager';

                $('#' + parentRowID).append(
                    '<div id="' + parentRowID + '_subcontent" role="tabpanel">' +

                    '<ul class="nav nav-tabs" role="tablist">' +

                    '<li role="presentation"><a id="' + groupTabLinkId +
                    '" href="#' + groupTabId + '" aria-controls="' + groupTabId +
                    '" role="tab" data-toggle="tab">' +
                    self.lang.get('bo.groups') + '</a></li>' +
                    '<li role="presentation"><a href="#">Info 2</a></li>' +
                    '<li role="presentation"><a href="#">Info 3</a></li>' +

                    '</ul>' +

                    '<div class="tab-content">' +

                    '<div role="tabpanel" class="tab-pane" id="' + groupTabId + '">' +
                    '<table id="' + groupGridId + '"></table>' +
                    '<div id="' + groupPagerId + '"></div>' +
                    '</div>' +

                    '<div role="tabpanel" class="tab-pane" id="profile">bbbb</div>' +
                    '<div role="tabpanel" class="tab-pane" id="messages">cccc</div>' +
                    '<div role="tabpanel" class="tab-pane" id="settings">dddd</div>' +

                    '</div>' +

                    '</div>'
                );

                // Bind the tabs

                $('#' + groupTabLinkId).click(function (e) {
                    e.preventDefault();

                    var grid = new GeneralGrid({
                        lang: self.lang,
                        controllerUrl: '/api/group',
                        parentClass: '\\App\\Cycle',
                        parentId: parentRowKey,
                        childParentNick: 'cycle',
                        childParentField: 'cycle_id',
                        gridId: groupGridId,
                        biName: 'group',
                        biNamePlural: 'groups',
                        caption: _.capitalize(self.lang.get('bo.groups')),
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
                            label: self.lang.get('bo.group_name'),
                            name: 'name',
                            editable: true,
                            editoptions: {}
                            //search:true,
                            //stype:'text',

                        },{
                            // TOOD: value from select (enum)
                            label: self.lang.get('bo.group_status'),
                            name: 'status_id',
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

