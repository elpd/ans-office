define([
        'lodash',
        'classes/utilities',
        'classes/GeneralGrid',
        'classes/EmptySubRow'
    ],
    function (_,
              utilities,
              GeneralGrid,
              EmptySubRow) {

        var Class = function RoleGrid(params) {
            this.setParams(params);
            this.setVariables();
        };

        Class.prototype = {
            setParams: function (params) {
                var self = this;

                // Services
                self.lang = params.lang;
                self.userSettingsGService = params.userSettingsGService;

                //
                self.gridId = params.gridId;
                self.parentLink = params.parentLink;
            },

            setVariables: function () {
                var self = this;

                self.controllerUrl = '/api/role';
                self.biName = 'role';
                self.biNamePlural = 'roles';
                self.caption = self.lang.get('bo.roles');
                self.SubRow = EmptySubRow;
                self.direction= self.userSettingsGService.getLanguage().direction;

                self.colModel = [{
                    label: self.lang.get('bo.id'),
                    name: 'id',
                    width: 30,
                    key: true
                }, {
                    label: self.lang.get('bo.role_name'),
                    name: 'name',
                    editable: true,
                    editoptions: {}
                }, {
                    label: self.lang.get('bo.role_slug'),
                    name: 'slug',
                    editable: true,
                    editoptions: {}
                }, {
                    label: self.lang.get('bo.role_description'),
                    name: 'description',
                    editable: true,
                    editoptions: {}
                }, {
                    label: self.lang.get('bo.role_level'),
                    name: 'level',
                    editable: true,
                    formatter: 'integer',
                    editoptions: {}
                }];
            },

            activate: function () {
                var self = this;

                this.grid = new GeneralGrid({
                    gridId: self.gridId,
                    controllerUrl: self.controllerUrl,
                    biName: self.biName,
                    biNamePlural: self.biNamePlural,
                    caption: self.caption,
                    SubRow: self.SubRow,
                    direction: self.direction,
                    colModel: self.colModel,
                    parentLink: self.parentLink
                });

                this.grid.activate();
            }
        };

        return Class;
    }
);
