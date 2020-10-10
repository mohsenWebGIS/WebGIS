    
var map;
var featureUrl;
var Alamak,Eleman,station,Valve,Pipe,Area,Division,Block,Side,parcel;
//        var popupTemplate_alamak;
//var theme = "PrimaryColors";
// All in this Html:
//Homebotton+ OverviewMap + Scalebar+ InfoTemplate +  FeatureLayer + query    
require([
 

    "esri/toolbars/navigation",          
    "esri/toolbars/draw",
    "esri/geometry/Extent",
    "esri/geometry/webMercatorUtils",//xy cordinate
    "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
    "esri/dijit/HomeButton",
    "esri/dijit/OverviewMap",
    "esri/dijit/FeatureTable",//query-table1
    "dojo/dom",//query-table
    "esri/dijit/Scalebar",
    "esri/dijit/BasemapToggle",
    "esri/dijit/InfoWindow",

    "esri/InfoTemplate",
    "esri/layers/FeatureLayer",
    "esri/symbols/TextSymbol",///
    "esri/layers/LabelClass",//
    "esri/symbols/SimpleFillSymbol",//query-table
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",//query-table
    "dojo/dom-construct",
    "esri/Color",
    "dojo/keys",//m
    "esri/sniff",//m
    "esri/SnappingManager",//m
    "esri/dijit/Measurement",//m
    "esri/tasks/GeometryService",//m
    "esri/tasks/Geoprocessor",
    "esri/renderers/ClassBreaksRenderer",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ImageParameters",
    "esri/layers/Field",//query-table
    "esri/dijit/Search",
    "esri/dijit/Legend",
    "esri/tasks/QueryTask",//query-table
    "esri/tasks/query",//query-table
    "dojo/store/Memory",//query-table
    "dijit/form/ComboBox",//query-table
    "dojo/_base/array",//query-table
    "dojo/_base/array",//query-table
    "dojo/_base/array",//select          
    //               "dojo/_base/Color",//
    "esri/dijit/LayerList",
    "dojo/on",//clear selection
    //               "dojo/dom",//query-table
    "dijit/registry",
    "dijit/form/ToggleButton",//
    "dijit/Dialog",
    "esri/dijit/Print",//Print
    "esri/tasks/PrintTemplate",//Print
    "esri/graphic",//add graphic
    "esri/geometry/Point",//
    "esri/graphicsUtils",
    "esri/tasks/RelationshipQuery",



    //               "esri/dijit/ColorPicker",
    "dijit/layout/BorderContainer",
    "dijit/layout/AccordionContainer",
    "dijit/TitlePane",//m

    "dojo/ready",
    "dijit/form/Button",
    "dijit/form/TextBox","dijit/form/Textarea","dijit/form/MultiSelect","dijit/form/SimpleTextarea",
    "dijit/form/CheckBox",//m

    "esri/dijit/ColorPicker",
    "dijit/form/DropDownButton",
    "dijit/form/RadioButton",
    "dojox/widget/ColorPicker",
    "dijit/Toolbar",
    "dojo/dom-style",
    //    "dojox/form/CheckedMultiSelect",
    //"dojox/data/HtmlTableStore","dojox/grid/DataGrid",
    "dojo/domReady!"
], function(

         Navigation,                 
         Draw, 
         Extent, 
         webMercatorUtils,//xy cordinate 
         Popup,
         PopupTemplate,
         HomeButton,
         OverviewMap,
         FeatureTable,//Q&T

         dom, 
         Scalebar,
         BasemapToggle,
         InfoWindow,

         InfoTemplate,
         FeatureLayer,
         TextSymbol,////
         LabelClass,///
         SimpleFillSymbol,//Q&T
         SimpleMarkerSymbol,
         PictureMarkerSymbol,
         SimpleLineSymbol,//Q&T
         domConstruct,
         Color,
         keys,//m
         has,//m
         SnappingManager,//m
         Measurement,//m
         GeometryService,//m 
         Geoprocessor, 
         ClassBreaksRenderer,
         ArcGISImageServiceLayer,
         ArcGISDynamicMapServiceLayer,
         ImageParameters,
         Field,//Q&T
         Search,
         Legend,
         QueryTask,//Q&T
         Query,//Q&T
         Memory,//Q&T
         ComboBox,//Q&T
         //              Color,//Q&T,
         arrayUtils,
         array,
         arrayUtil, 
         LayerList,
         on,
         //                dom,
         registry,
         ToggleButton,
         Dialog,
         Print,
         PrintTemplate,//
         Graphic, 
         Point,
         graphicsUtils,
         RelationshipQuery,
         //                ColorPicker, 
         ready,
         Button,
         TextBox,Textarea,MultiSelect,
         RadioButton, 
         ColorPicker,                 
         CheckBox,
         domStyle
        ) {

    //-------------------------NavtoolBar-----------------------------------------//          
   
   
    var navToolbar;
//    dijit.byId("equle").on("click", function () {
//        //        console.log(dijit.byId("equle").value)
//    });

    navToolbar = new Navigation(map);
    on(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

    registry.byId("zoomin").on("click", function () {
        navToolbar.activate(Navigation.ZOOM_IN);
    });

    registry.byId("zoomout").on("click", function () {
        navToolbar.activate(Navigation.ZOOM_OUT);
    });

    //    registry.byId("zoomfullext").on("click", function () {
    //        navToolbar.zoomToFullExtent();
    //    });

    registry.byId("zoomprev").on("click", function () {
        navToolbar.zoomToPrevExtent();
    });

    registry.byId("zoomnext").on("click", function () {
        navToolbar.zoomToNextExtent();
    });

    registry.byId("pan").on("click", function () {
        navToolbar.activate(Navigation.PAN);
    });

    registry.byId("deactivate").on("click", function () {
        navToolbar.deactivate();
    });

    function extentHistoryChangeHandler () {
        registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
        registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
    };
    //---------------------End Of Nav Toolbar          
        });