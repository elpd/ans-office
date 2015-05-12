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

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inheritance.
        params.caption = lang.get('bo.roles');
        params.SubRow = RoleSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'name',
            'slug',
            'description',
            'level',
            'updated_at'
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
                }
                return static_defaultColumnsDefinitions;
            }
        }
    });

    return Class;
});

