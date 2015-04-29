define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/PermissionSubRow',
    'services/language'
], function (_,
             utilities,
             Grid,
             PermissionSubRow,
             lang) {

    var CONTROLLER_URL = '/api/permission';

    var defaultColumns = {
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
            label: lang.get('bo.permission_name'),
            name: 'name',
            editable: true,
            editoptions: {}
        },
        slug: {
            label: lang.get('bo.permission_slug'),
            name: 'slug',
            editable: true,
            editoptions: {}
        },
        description: {
            label: lang.get('bo.permission_description'),
            name: 'description',
            editable: true,
            editoptions: {}
        },
        level: {
            label: lang.get('bo.permission_model'),
            name: 'model',
            editable: true,
            editoptions: {}
        }
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inheritance.
        params.caption = lang.get('bo.permissions');
        params.SubRow = PermissionSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.name);
        self.columns().add(self.defaultColumnDefs.slug);
        self.columns().add(self.defaultColumnDefs.description);
        self.columns().add(self.defaultColumnDefs.model);
    };

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnDefs: {
            get: function () {
                return _.cloneDeep(defaultColumns);
            }
        }
    });

    return Class;
});

