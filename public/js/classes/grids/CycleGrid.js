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
    };

    var Class = function (params) {
        var self = this;

        params.controllerUrl = CONTROLLER_URL;
        // TODO: attribute inharitance.
        params.caption = lang.get('bo.cycles');
        params.SubRow = CycleSubRow;
        params.hasSubGrid = true;

        Grid.call(this, params);

        self.columns().add(self.defaultColumnDefs.id);
        self.columns().add(self.defaultColumnDefs.startDate);
        self.columns().add(self.defaultColumnDefs.num);

        self.columns().selectAbsoluteAll();
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