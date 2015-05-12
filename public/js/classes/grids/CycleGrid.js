define([
    'lodash',
    'classes/utilities',
    'classes/Grid',
    'classes/subRows/CycleSubRow',
    'services/language'
], function (_,
             utilities,
             Grid,
             CycleSubRow,
             lang) {

    var CONTROLLER_URL = '/api/cycle';

    var defaultColumns = null;

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.cycles');
        params.SubRow = CycleSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(_.values(Object.create(Class.prototype).getDefaultColumnsDefinitions()));

        self.columns().selectAbsolute([
            'id',
            'startDate',
            'num',
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

                static_defaultColumnsDefinitions =
                {
                    startDate: {
                        label: _.capitalize(lang.get('bo.cycle_start_date')),
                        name: 'startDate',
                        editable: true,
                        //edittype: 'select',
                        formatter: 'datetime',
                        datefmt: 'yyyy-mm-dd',
                        editoptions: {
                            // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                            // use it to place a third party control to customize the toolbar
                            dataInit: utilities.generateDateTimePicker
                        },
                        //stype: 'datetime',
                        searchoptions: {
                            sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'],
                            dataInit: utilities.generateDateTimePicker
                        },
                        searchrules: {
                            date: true
                        }
                    },
                    num: {
                        label: _.capitalize(lang.get('bo.cycle_num')),
                        name: 'num',
                        editable: true,
                        editoptions: {},
                        editrules: {
                            integer: true
                        },
                        searchoptions: {
                            // show search options
                            sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                        },
                        searchrules: {
                            integer: true
                        }

                    }
                }

                return static_defaultColumnsDefinitions;
            }

        }
    });

    return Class;
});