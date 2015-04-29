define([
        'lodash',
        'classes/AttributesObject'
    ], function (_,
                 AttributesObject) {

        var JQGRID_SORT_ORDER_INDEX_REQ_PARAM = 'sidx';
        var JQGRID_SORT_ORDER_DIRECTION_REQ_PARAM = 'sord';
        var JQGRID_PAGING_PAGE_INDEX_REQ_PARAM = 'page';
        var JQGRID_PAGING_ROW_AMOUNT_REQ_PARAM = 'rows';

        var attributesRules = {
            table: {
                required: false
            },
            joins: {
                required: true,
                defaults: {
                    calculation: []
                }
            },
            orders: {
                required: true,
                defaults: {
                    calculation: []
                }
            },
            paging: {
                required: true,
                defaults: {
                    calculation: null
                }
            }
        }

        var Class = function (params) {
            AttributesObject.call(this, params, attributesRules);
        };

        Class.prototype = Object.create(AttributesObject.prototype, {
            from: {
                value: function (table) {
                    this.from = table;
                }
            },

            joinIfNotExists: {
                value: function (joinDef) {
                    var self = this;
                    var existingIndex = self.findJoin(joinDef);
                    if (existingIndex >= 0) {
                        return;
                    }
                }
            },

            findJoin: {
                value: function (joinDef) {
                    var self = this;
                    var existingIndex = _.findIndex(self.joins, function (join) {
                        if (join.table == joinDef.table &&
                            join.fieldOne == joinDef.fieldOne &&
                            join.operator == joinDef.operator &&
                            join.fieldTow == joinDef.fieldTow) {

                            return true;
                        }
                    });

                    return existingIndex;
                }
            },

            addSelect: {
                value: function (columns) {
                    var self = this;

                }
            },

            clone: {
                value: function () {
                    var self = this;
                    var clone = _.cloneDeep(self);
                    clone.__proto__ = self.__proto__;

                    return clone;
                }
            },

            setByJqGridPostData: {
                value: function (postData, grid) {
                    var self = this;
                    var orderClause = parseJqGridSort(postData);
                    if (orderClause) {
                        self.orderBy(orderClause);
// todo
                    }
                    var pagingClause = parseJqGridPaging(postData);
                    if (pagingClause) {
                        self.pageBy(pagingClause);
                    }
                }
            },

            orderBy: {
                value: function (orderClause) {
                    var self = this;
                    self.orders.push(orderClause);
                }
            },

            pageBy: {
                value: function (pagingClause) {
                    var self = this;
                    self.paging = pagingClause;
                }
            },

            asJson: {
                value: function() {
                    return JSON.stringify(this);
                }
            }
        });

        function parseJqGridSort(postData) {
            if (postData.hasOwnProperty(JQGRID_SORT_ORDER_INDEX_REQ_PARAM) &&
                postData[JQGRID_SORT_ORDER_INDEX_REQ_PARAM] != '') {

                var orderClause = {};
                var indexName = postData[JQGRID_SORT_ORDER_INDEX_REQ_PARAM];
                var direction = postData[JQGRID_SORT_ORDER_DIRECTION_REQ_PARAM];

                orderClause.field = indexName;
                orderClause.direction = direction;

                return orderClause;
            }

            return null;
        }

        function parseJqGridPaging(postData) {
            if (postData.hasOwnProperty(JQGRID_PAGING_PAGE_INDEX_REQ_PARAM)) {
                var pagingClause = {};
                var pageIndex = postData[JQGRID_PAGING_PAGE_INDEX_REQ_PARAM];
                var rowAmount = postData[JQGRID_PAGING_ROW_AMOUNT_REQ_PARAM];

                pagingClause.pageIndex = pageIndex;
                pagingClause.rowAmount = rowAmount;

                return pagingClause;
            }

            return null;
        }

        return Class;
    }
)
;