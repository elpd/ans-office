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

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inheritance.
        params.caption = lang.get('bo.permissions');
        params.SubRow = PermissionSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'name',
            'slug',
            'description',
            'model'
        ]);
    };

    var static_defaultColumnsDefinitions = null;

    Class.prototype = Object.create(Grid.prototype, {
        defaultColumnsDefinitions: {
            get: function () {
                if (static_defaultColumnsDefinitions != null) {
                    return static_defaultColumnsDefinitions;
                }

                static_defaultColumnsDefinitions = {
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
                    model: {
                        label: lang.get('bo.permission_model'),
                        name: 'model',
                        editable: true,
                        editoptions: {}
                    }
                }

                return static_defaultColumnsDefinitions;
            }
        }
    });

    return Class;
});

