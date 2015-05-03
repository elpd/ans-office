define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/RoleSubRow',
    'services/language'
], function (_,
             utilities,
             Grid,
             RoleSubRow,
             lang) {

    var CONTROLLER_URL = '/api/role';

    var defaultColumns = null;



    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inheritance.
        params.caption = lang.get('bo.roles');
        params.SubRow = RoleSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.name);
        self.columns().add(self.defaultColumnDefs.slug);
        self.columns().add(self.defaultColumnDefs.description);
        self.columns().add(self.defaultColumnDefs.level);

        self.columns().selectAbsoluteAll();
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                var self = this;
                if (defaultColumns == null) {
                    defaultColumns = generateDefaultColumns();
                }
                return _.cloneDeep(defaultColumns);
            }
        }
    });

    function generateDefaultColumns() {
        var columnsDefs = {
            id: {
                label: _.capitalize(lang.get('bo.id')),
                name: 'id',
                width: 50,
                key: true,
                searchoptions: {
                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                },
                searchrules: {
                    integer: true
                }
            },
            name: {
                label: lang.get('bo.role_name'),
                name: 'name',
                editable: true,
                editoptions: {}
            },
            slug: {
                label: lang.get('bo.role_slug'),
                name: 'slug',
                editable: true,
                editoptions: {}
            },
            description: {
                label: lang.get('bo.role_description'),
                name: 'description',
                editable: true,
                editoptions: {}
            },
            level: {
                label: lang.get('bo.role_level'),
                name: 'level',
                editable: true,
                formatter: 'integer',
                editoptions: {}
            }
        };

        return columnsDefs;
    }

    return Class;
});

