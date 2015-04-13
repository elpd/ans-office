define([
        'lodash',
        'classes/utilities',
        'classes/bi/Contact',
        'admin/permissions.SubRow',
        'services/language',
        'classes/LoadingIndicator',
        'classes/GeneralGrid',
        'services/userSettings'
    ],
    function (_,
              utilities,
              Contact,
              SubRow,
              lang,
              LoadingIndicator,
              GeneralGrid,
              userSettingsGService
              ) {

        $(document).ready(function () {


            userSettingsGService.load().then(function() {

                    var grid = new GeneralGrid({
                        controllerUrl: '/api/contact',
                        biName: 'contact',
                        biNamePlural: 'contacts',
                        caption: _.capitalize(lang.get('bo.contacts')),
                        SubRow: SubRow,
                        direction: userSettingsGService.getLanguage().direction,
                        colModel: [{
                            label: lang.get('bo.id'),
                            name: 'id',
                            width: 30,
                            key: true
                        }, {
                            label: lang.get('bo.registration_date'),
                            name: 'registration_date',
                            editable: true,
                            //edittype: 'select',
                            formatter: 'datetime',
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: function (element) {
                                   /*$(element).datepicker({
                                        id: 'registrationDate_datePicker',
                                        dateFormat: 'yy-mm-dd',
                                        //minDate: new Date(2010, 0, 1),
                                        maxDate: new Date(2090, 0, 1),
                                        showOn: 'focus'
                                    });*/
                                    $(element).datetimepicker({
                                        dateFormat: 'yy-mm-dd',
                                        timeFormat: 'hh:mm:ss'
                                    });
                                }
                            }
                        }, {
                            label: lang.get('bo.email'),
                            name: 'email',
                            editable: true,
                            editoptions: {},
                            //search:true,
                            //stype:'text',
                            searchoptions: {
                                // show search options
                                //sopt: ["eq"]
                            }
                        }, {
                            label:  lang.get('bo.first_name'),
                            name: 'first_name',
                            editable: true,
                            editoptions: {}
                        }, {
                            label: lang.get('bo.last_name'),
                            name: 'last_name',
                            editable: true,
                            editoptions: {}
                        }, {
                            label:  lang.get('bo.phone'),
                            name: 'phone',
                            editable: true,
                            editoptions: {}
                        }, {
                            label:  lang.get('bo.facebook_account'),
                            name: 'facebook',
                            editable: true,
                            editoptions: {}
                        }, {
                            label:  lang.get('bo.birth_year'),
                            name: 'birth_year',
                            editable: true,
                            editoptions: {}
                        }, {
                            label:  lang.get('bo.donate'),
                            name: 'donate',
                            editable: true,
                            formatter: 'checkbox',
                            align: 'center',
                            width: 50,
                            edittype: 'checkbox',
                            editoptions: {
                                value: "1:0"
                            }
                        }, {
                            label:  lang.get('bo.blacklisted'),
                            name: 'blacklisted',
                            editable: true,
                            formatter: 'checkbox',
                            align: 'center',
                            width: 50,
                            edittype: 'checkbox',
                            editoptions: {
                                value: "1:0"
                            }
                        }]
                    });

                    grid.activate();
                }
            )
            ;

        });
    });

/*define([
 'classes/utilities',
 ],
 function(
 utilities
 ) {

 $(document).ready(function() {
 var contactControllerUrl = "/api/contact";

 $("#jqGrid").jqGrid({

 colModel: ,

 viewrecords: true, // show the current page, data rang and total records on the toolbar
 width: 780,
 height: 200,
 rowNum: 15,
 datatype: 'json',
 url: contactControllerUrl,
 pager: "#jqGridPager",
 caption: "Contacts",
 //onSelectRow: editRow,
 ondblClickRow: editRow,
 autowidth: true//,
 //subGrid: true,
 //subGridRowExpanded: showChildGrid
 //loadOnce: false
 });

 $('#jqGrid').navGrid("#jqGridPager",
 // the buttons to appear on the toolbar of the grid
 {
 edit: false,
 add: true,
 del: true,
 refresh: false,
 view: false
 },
 // options for the Edit Dialog
 {},
 // options for the Add Dialog
 {
 height: 'auto',
 width: 620,
 closeAfterAdd: true,
 recreateForm: true,
 reloadAfterSubmit: true,
 url: contactControllerUrl,
 mtype: 'POST',
 editData: {
 _token: $_token
 },
 afterSubmit: function(data, postdata, oper) {
 var response = data.responseJSON;
 if (!response.success) {
 var errorsArray = utilities.errorsObjectToArray(
 response.errors);
 if (errorsArray.length) {
 return [false, errorsArray];
 }
 }
 //$(this).jqGrid("setGridParam", {datatype: 'json'});
 return [true, "", response.item_id];
 }
 },
 // options for the Delete Dailog
 {
 height: 'auto',
 width: 620,
 url: contactControllerUrl + '/-1',
 mtype: 'DELETE',
 delData: {
 _token: $_token
 },
 reloadAfterSubmit: true
 }
 );
 $('#jqGrid').inlineNav('#jqGridPager', {
 edit: false,
 add: false,
 del: true,
 cancel: true,
 addParams: {
 keys: true
 }
 });

 var lastSelection;

 function editRow(id) {
 if (id && id !== lastSelection) {
 var grid = $("#jqGrid");
 grid.jqGrid('restoreRow', lastSelection);

 var editOptions = {
 keys: true,
 focusField: 4,
 url: contactControllerUrl + '/' + id.toString(),
 "extraparam": {
 _token: $_token
 },
 mtype: 'PUT'
 };

 grid.jqGrid('editRow', id, editOptions);
 lastSelection = id;
 }
 };
 });
 });*/
