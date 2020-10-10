require([
    "dojo/parser",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",
    "dojo/_base/array",
    "dojo/dom-style",
    "dojo/on",
    "dojo/keys",
    "dojo/query",

    "esri/map",
    "esri/SnappingManager",
    "esri/geometry/webMercatorUtils",
    "esri/dijit/OverviewMap",
    "esri/dijit/Scalebar",
    "esri/geometry/Extent",
    "esri/request",
    "esri/config",
    "esri/Color",
    "esri/symbols/TextSymbol",
    "esri/layers/LabelClass",
    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ImageParameters",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/tasks/PrintTemplate",
    "esri/tasks/PrintTask",
    "esri/dijit/Legend",
    "esri/dijit/LayerList",
    "esri/toolbars/navigation",
    "esri/dijit/HomeButton",
    "esri/sniff",
    "esri/SnappingManager",
    "esri/dijit/Measurement",
    "esri/tasks/GeometryService",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "esri/dijit/Search",
    "esri/toolbars/draw",
    "esri/graphic",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",

    "appMain/Pop",
    "appMain/legend",
    "appMain/layerlist",
    "appMain/printW",
    "appMain/label",
    "appMain/queryF",
    "appMain/querypopUp",
    "appMain/locator",
    "appMain/report",
    "appMain/report_result",
    "appMain/Isolationselect",
    "appMain/isolationProcess",


    "jquery",

    "dijit/form/ComboBox",
    "dijit/registry",
    "dijit/form/Button",
    "dijit/form/ToggleButton",
    "dijit/form/CheckBox",
    "dijit/form/ValidationTextBox",
    "dijit/form/TextBox",
    "dijit/form/SimpleTextarea",
    "dijit/form/Select",
    "dijit/form/DateTextBox",
    "dijit/form/NumberSpinner",
    "dijit/ColorPalette",
    "dijit/TitlePane",

    "dojox/date/persian/Date",
    "dojox/widget/ColorPicker",

    "dijit/Toolbar",
    "dijit/layout/ContentPane",
    "dijit/layout/TabContainer",
    "dijit/layout/BorderContainer",
    "dijit/form/SimpleTextarea",
    "dojo/domReady!"
], function(
    parser,
    lang,
    domConstruct,
    dom,
    domAttr,
    Memory,
    ObjectStore,
    arrayUtils,
    domStyle,
    on,
    keys,
    query,

    Map,
    SnappingManager,
    webMercatorUtils,
    OverviewMap,
    Scalebar,
    Extent,
    esriRequest,
    esriConfig,
    Color,
    TextSymbol,
    LabelClass,
    FeatureLayer,
    ArcGISDynamicMapServiceLayer,
    ArcGISTiledMapServiceLayer,
    ImageParameters,
    ArcGISImageServiceLayer,
    PrintTemplate,
    PrintTask,
    Legend,
    LayerList,
    Navigation,
    HomeButton,
    has,
    SnappingManager,
    Measurement,
    GeometryService,
    QueryTask,
    Query,
    Search,
    Draw,
    Graphic,
    SimpleLineSymbol,
    SimpleFillSymbol,

    PopUp,
    widgetlegend,
    widgetlaylist,
    widgetprint,
    widgetLabel,
    widgetquery,
    widgetQresult,
    widgetlocator,
    widgetreport,
    widgetrepResult,
    widgetIsolation,
    widgetIsolationProcess,
    $,
    ComboBox,
    registry,
    Button,
    ToggleButton,
    CheckBox,
    ValidationTextBox,
    TextBox,
    SimpleTextarea,
    Select,
    DateTextBox,
    NumberSpinner,
    ColorPalette,
    TitlePane,
    Date,

) {
    clientsid = 9;
    valveid = 7;
    var isolateConst;
    parser.parse();
    //---------↓ define url for mapservices and image services and Geometry services--------  ↓
    esriConfig.defaults.io.alwaysUseProxy = false;
    var osmUrl = "https://192.168.56.5:6443/arcgis/rest/services/osm/osm/MapServer";

    var mservice = "http://192.168.56.4:6080/arcgis/rest/services/Web/systanBaluchestanProvinceGDB/MapServer";
    var Prservice = "http://192.168.56.4:6080/arcgis/rest/services/GP/ExportWebMapp/GPServer/Export%20Web%20Map";
    esriConfig.defaults.geometryService = new GeometryService("http://192.168.56.4:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
    // var osmUrl = "http://192.168.56.4:6080/arcgis/rest/services/satelitePhotos/OSM/MapServer";
    var goZahedan = "http://192.168.56.4:6080/arcgis/rest/services/satelitePhotos/zahedangoogle/ImageServer";
    var gozabol = "http://192.168.56.4:6080/arcgis/rest/services/satelitePhotos/Zabol/ImageServer";
    //---------↑ define url for mapservices and image services and Geometry services-------- ↑
    var sources = []; // by this Esri geocoder search is inactivated
    var selectionToolbar;
    // ↓----jquey components----//
    // ------- jquery : inser any text at current position of mouse cursor -------------↓
    $.fn.insertAtCaret = function(text) {
        return this.each(function() {
            if (document.selection && this.tagName == 'TEXTAREA') {
                //IE textarea support
                this.focus();
                sel = document.selection.createRange();
                sel.text = text;
                this.focus();
            } else if (this.selectionStart || this.selectionStart == '0') {
                //MOZILLA/NETSCAPE support
                startPos = this.selectionStart;
                endPos = this.selectionEnd;
                scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos + text.length;
                this.selectionEnd = startPos + text.length;
                this.scrollTop = scrollTop;
            } else {
                // IE input[type=text] and other browsers
                this.value += text;
                this.focus();
                this.value = this.value; // forces cursor to end
            }
        });
    };
    //------↑ jquery : inser any text at current position of mouse cursor ↑ --------
    //----Map------
    map = new Map("map", {
        // basemap: "osm",
        center: [60.86, 29.5], // long, lat
        //zoom: 12,
        sliderStyle: "small",
        attributionWidth: 0.8,
        autoResize: true,
        showAttribution: false,
        logo: false,
        showLabels: true,
    });
    //------map-----

    var OSMmap = new ArcGISDynamicMapServiceLayer(osmUrl, {
        "opacity": .8,
        showAttribution: false,
    });

    // google earth images
    var imageParameters = new ImageParameters();
    //Takes a URL to a non cached map service.
    var googlezahedan = new ArcGISImageServiceLayer(goZahedan, {
        "opacity": .55,
        "imageParameters": imageParameters,
        // showAttribution: false,

        //  initialExtent:iniExtend,
    });
    var googlezabol = new ArcGISImageServiceLayer(gozabol, {
        "opacity": .55,
        "imageParameters": imageParameters,
        // showAttribution: false,

        //  initialExtent:iniExtend,
    });


    map.addLayer(OSMmap);
    // ----HomeButton--------
    var zahedanextent = new Extent({
        type: "extent",
        xmin: 268524.0843547862,
        ymin: 3249559.9070633994,
        xmax: 306716.5121196926,
        ymax: 3279901.4125549877,
        spatialReference: { wkid: 32641 }
    });
    var zabolextent = new Extent({
        type: "extent",
        xmin: 354441.2984920292,
        ymin: 3433416.462451934,
        xmax: 362045.4387003096,
        ymax: 3436369.2183574457,
        spatialReference: { wkid: 32641 }
    })
    map.setExtent(zahedanextent);
    map.on("load", function() {
        //after map loads, connect to listen to mouse move & drag events
        map.on("mouse-move", showCoordinates);
        map.on("mouse-drag", showCoordinates);
    });

    function showCoordinates(evt) {
        //the map is in web mercator but display coordinates in geographic (lat, long)
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        //display mouse coordinates
        var xC, yC;
        XYc = webMercatorUtils.lngLatToXY(mp.x, mp.y);

        // dom.byId("infoXY").innerHTML = "X :" + XYc[0].toFixed(3) + ", " + "Y :" + XYc[1].toFixed(3);
        dom.byId("infoXY").innerHTML = "X :" + mp.x.toFixed(3) + ", " + "Y :" + mp.y.toFixed(3);

    }
    //--------↓ overview -----------

    var overviewMapDijit = new OverviewMap({
        map: map,
        // baseLayer: OSMmap,
        visible: false,
        attachTo: "bottom-right",
        expandFactor: 10
    });
    overviewMapDijit.startup();

    //----↓---scalebar button----
    var scalebar = new Scalebar({
        map: map,
        attachTo: "bottom-left",
        scalebarUnit: 'metric'
    }, dojo.byId("scale-widget"));
    //----↑---scalebar button----
    // ----Print requests build print page-------
    var printInfo = esriRequest({
        "url": Prservice,
        "content": { "f": "json" }
    });
    printInfo.then(handlePrintInfo, handleprintError);
    //-----Print requests ↑----------------
    //-----mapservice request build layer and fields combo boxes----↓
    var lays = esriRequest({
        "url": mservice,
        "content": { "f": "json" }
    });
    lays.then(handleInfo, handleinfoError);
    // -----mapservice request----↑

    map.on("load", initSelectToolbar); // call draw toolboxes
    // --------- ↓ symbol for border of selection tool------//
    var linesym = new SimpleLineSymbol();
    linesym.setWidth(3.5);
    linesym.setColor(new Color([87, 255, 246, 1]));

    var fillsym = new SimpleFillSymbol();
    fillsym.setColor(new Color([115, 255, 205, 0.19]));
    fillsym.setOutline(linesym);
    // --------- ↑ symbol for border of selection tool------//
    function initSelectToolbar(event) {
        selectionToolbar = new Draw(event.map);
        selectionToolbar.setFillSymbol(fillsym)
        selectionToolbar.setLineSymbol(linesym)
        on(selectionToolbar, "draw-complete", function(evt) {
            map.graphics.clear();
            map.setExtent(evt.geometry.getExtent())

            switch (evt.geometry.__proto__.type) {
                case 'polygon':
                    map.graphics.add(new Graphic(evt.geometry, evt.target.fillSymbol));
                    break;
                case 'polyline':
                    map.graphics.add(new Graphic(evt.geometry, evt.target.lineSymbol));
                    break;
                case 'extent':
                    map.graphics.add(new Graphic(evt.geometry, evt.target.lineSymbol));
                    break;
            }
            selectionToolbar.deactivate();
            switch (global) {
                case 1:
                    // for( var i in parentinfo){
                    reportResultwidget.identyPara(evt, fL);
                    // }
                    reportResultwidget.show();
                    break;
                case 10:
                    valuecontroler = 0
                    if (dijit.byId('idcombo').item) {
                        isolationprocesswidget.spatialSelection(evt, fL)

                    } else {
                        alert('لایه ای که قرار است انتخاب بر اساس آن انجام شود را انتخاب نمایید')

                    }
                    break;
            }

        });
    }
    // ----navigation toolbar
    var navToolbar;

    function navSelectedWarning(i) {
        if (i == 0) {
            document.getElementById("footer-id").innerHTML = "ابزار ناوبری انتخاب شده است";
        } else {
            document.getElementById("footer-id").innerHTML = "";
        }
    }
    navToolbar = new Navigation(map);
    on(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

    registry.byId("zoomin").on("click", function() {
        navSelectedWarning(0);
        navToolbar.activate(Navigation.ZOOM_IN);
    });
    registry.byId("zoomout").on("click", function() {
        navSelectedWarning(0);
        navToolbar.activate(Navigation.ZOOM_OUT);
    });
    registry.byId("zoomprev").on("click", function() {
        navSelectedWarning(0);
        navToolbar.zoomToPrevExtent();
    });
    registry.byId("zoomnext").on("click", function() {
        navSelectedWarning(0);
        navToolbar.zoomToNextExtent();
    });
    registry.byId("deactivate").on("click", function() {
        navSelectedWarning(1);
        navToolbar.deactivate();
    });

    function extentHistoryChangeHandler() {
        registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
        registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
    };

    // ↑ -------navigation finished 


    //---↓---search button-----
    var search = new Search({
        enableLabel: true,
        enableInfoWindow: false,
        showInfoWindowOnSelect: false,
        expanded: true,
        maxResults: Infinity,
        maxSuggestions: Infinity,
        enableSuggestions: true,
        exactMatch: false,
        map: map
    }, "search");

    sources.push({
        featureLayer: new FeatureLayer(osmUrl + "/118", {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            //              supportsPagination : true
            //            infoTemplate: new InfoTemplate("اطلاعات پارسل"),
            //            showLabels:true, 
        }),
        searchFields: ["name"],
        displayField: "name",
        // exactMatch: false,
        outFields: ["*"],
        name: "جستجوی خیابان ها و معابر",
        placeholder: "نام خیابان یا معابر ",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        // showInfoWindowOnSelect:false,
        zoomScale: 1800,
        //Create an InfoTemplate and include three fields
        //        infoTemplate: popupTemplate_alamak,
        // enableSuggestions: true,
        // minCharacters: 0,
        enableLabel: false,
    });
    sources.push({
        featureLayer: new FeatureLayer(osmUrl + "/117", {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            //              supportsPagination : true
            //            infoTemplate: new InfoTemplate("اطلاعات پارسل"),
            //            showLabels:true, 
        }),
        searchFields: ["name"],
        displayField: "name",
        // exactMatch: false,
        outFields: ["*"],
        name: "جستجوی ساختمان، مکان های خاص",
        placeholder: " نام مکان مورد نظر ",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        // showInfoWindowOnSelect:false,
        zoomScale: 1800,
        //Create an InfoTemplate and include three fields
        //        infoTemplate: popupTemplate_alamak,
        // enableSuggestions: true,
        // minCharacters: 0,
        enableLabel: false,
    });
    sources.push({
        featureLayer: new FeatureLayer(mservice + "/3"),
        searchFields: ["OBJECTID", "S_GisCode", "S_Num", "S_Name", "S_Type", "S_Capacity", "s_adress"],
        displayField: "result",
        // exactMatch: false,
        name: "جستجوی ایستگاه ها",
        outFields: ["*"],
        placeholder: "شماره ایستگاه ، نام ، نوع ، ظرفیت  و..",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        //Create an InfoTemplate
        //        infoTemplate: popupTemplate_Sta,
        // enableSuggestions: true,
        // minCharacters: 0,
        showInfoWindowOnSelect: true,

    });
    sources.push({
        featureLayer: new FeatureLayer(mservice + "/10"),
        searchFields: ["R_Num", ],
        displayField: "result",
        // exactMatch: false,
        outFields: ["*"],
        name: "جستجوی شماره علمک",
        placeholder: " نوع علمک، شماره قرارداد، شماره علمک",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        showInfoWindowOnSelect: true,
        //        zoomScale:200,
        //Create an InfoTemplate and include three fields
        //        infoTemplate: popupTemplate_alamak,
        enableSuggestions: true,
        // minCharacters: 0,
        enableLabel: true,

    });
    sources.push({
        featureLayer: new FeatureLayer(mservice + "/21"),
        searchFields: ["P_GisCode"],
        displayField: "P_GisCode",
        // exactMatch: false,
        outFields: ["*"],
        name: "جستجوی علمک شناسه خط لوله",
        placeholder: "شناسه خط لوله علمک",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        showInfoWindowOnSelect: true,
        //        zoomScale:2000,
        //Create an InfoTemplate and include three fields
        //        infoTemplate: popupTemplate_alamak,
        // enableSuggestions: true,
        // minCharacters: 0
    });
    sources.push({
        featureLayer: new FeatureLayer(mservice + "/4"),
        searchFields: ["Name", "FamilyName", "Adress", "Consume_type", "Iran_ID_Num", "PostalCode", "AdressCode", "FolderNum", "IdCode", ],
        displayField: "RepForSearch",
        // exactMatch: false,
        outFields: ["*"],
        name: "جستجوی مشترکین",
        placeholder: "نام، نام خوانوادگی، کد آدرس، کد پستی، شماره شناسایی ملی",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        showInfoWindowOnSelect: true,
        //        zoomScale:2000,
        //Create an InfoTemplate and include three fields
        //        infoTemplate: popupTemplate_alamak,
        // enableSuggestions: true,
        // minCharacters: 0
    });
    sources.push({
        featureLayer: new FeatureLayer(mservice + "/23"),
        searchFields: ["P_Line"],
        displayField: "P_Line",
        // exactMatch: false,
        name: "جستجوی شماره لوله",
        outFields: ["*"],
        placeholder: "شماره خط لوله",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        //Create an InfoTemplate
        //        infoTemplate: popupTemplate_Pipe,
        // enableSuggestions: true,
        // minCharacters: 0,
        showInfoWindowOnSelect: true,

    });
    sources.push({
        featureLayer: new FeatureLayer(mservice + "/19"),
        searchFields: ["V_Num", "V_GisCode"],
        displayField: "V_Num",
        // exactMatch: false,
        name: "جستجوی شیر",
        outFields: ["*"],
        placeholder: "شماره شیر-شماره کد شیر-",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        //Create an InfoTemplate
        //        infoTemplate: popupTemplate_Valve,
        // enableSuggestions: true,
        // minCharacters: 0,
        showInfoWindowOnSelect: true,
    });
    sources.push({
        featureLayer: new FeatureLayer(mservice + "/27"),
        searchFields: ["ADBS", "D", "A", "B", "S", "khateseir", "NAME", "NAME_PLAK", "code"],
        displayField: "Rep_For_Search",
        // exactMatch: false,
        name: "جستجوی پارسل",
        outFields: ["*"],
        placeholder: " شماره-کد-خط سیر-نام-نوع و...",
        // maxResults: Infinity,
        // maxSuggestions: Infinity,
        //Create an InfoTemplate
        //        infoTemplate: new InfoTemplate("مشخصات منطقه "),
        // enableSuggestions: true,
        // minCharacters: 0,
        //        showInfoWindowOnSelect:true,
        // enableSuggestionsMenu:true,

    });

    function pushSearch(layerinf, plh, na, dsf, sfd) {
        sources.push({
            featureLayer: layerinf,
            searchFields: sfd,
            displayField: dsf,
            name: " جستجوی سریع  " + na,
            outFields: ["*"],
            placeholder: plh,
        });
    }
    search.set("sources", sources);
    search.startup();
    search.clear();


    //----- measurement widget ↓


    var measurement = new Measurement({
        map: map,

    }, "measurementDiv");

    measurement.startup();

    // -----end of measurement widget ↑
    map.on("layers-add-result", function(evt) {

        var layerInfos = []
        var snapManager = map.enableSnapping({
            snapKey: has("mac") ? keys.META : keys.CTRL
        });
        layerInfo = arrayUtils.map(evt.layers, function(layer, index) {
            layerInfos.push({
                layer: layer.layer
            });


            return { layer: layer.layer, title: layer.layer.name };
        });
        if (layerInfo.length > 0) {
            var legendDijit = new Legend({
                map: map,
                layerInfos: layerInfo,
                autoUpdate: true,
                font: { // autocast as, esri/symbols/Font
                    size: 20,
                    family: 'CalciteWebCoreIcons'
                },
            }, "legendDiv");
            legendDijit.startup();
            var myLayerList = new LayerList({
                map: map,
                showLegend: true,
                showSubLayers: true,
                showOpacitySlider: true,
                visible: true,
                layers: [] // show all layers
            }, "layerList");
            myLayerList.startup();
        };
        // search.set("sources", sources);
        // search.startup();
        // search.clear();
        snapManager.setLayerInfos(layerInfos);
    });
    //---↓ add feature Layer to map
    var fL = [];

    function addFeatureL(evt) {
        for (var i in evt.data) {
            var feature = new FeatureLayer(mservice + "/" + evt.data[i].id, {
                "id": evt.data[i].name,
                "mode": FeatureLayer.MODE_ONDEMAND,
                showLabels: true,
                visible: evt.data[i].defaultVisibility
            });
            fL.push(feature);
        };
        map.addLayers(fL);

        return fL
    }
    //---↑ add feature Layer to map

    // ---define widgets----
    var info = new PopUp({
        map: map,
        mapService: mservice,
        queryreq: "",
    }, "identify-widget");
    var legend = new widgetlegend({
        map: map,
        mapService: mservice
    }, "legend-widget");
    var layList = new widgetlaylist({
        map: map,
        mapService: mservice
    }, "layerlist-widget");
    var printwidjet = new widgetprint({
        printService: Prservice
    }, "print-widget");
    var lebelwidget = new widgetLabel({
        labelservice: mservice
    }, "label-widget");

    var querywidget = new widgetquery({
        labelservice: mservice
    }, "query-widget");
    var queryResult = new widgetQresult({
        mapService: mservice
    }, "query-popUp-widget");
    var locatorwidget = new widgetlocator({
        mapService: mservice
    }, "locator-widget");
    var reportwidget = new widgetreport({
        mapService: mservice
    }, "report-widget");

    var reportResultwidget = new widgetrepResult({
        map: map,
        mapService: mservice
    }, "report-popUp-widget");

    var isolationwidget = new widgetIsolation({
        mapService: mservice
    }, "IsolationInput-widget");

    var isolationprocesswidget = new widgetIsolationProcess({
        map: map,
        mapService: mservice
    }, "Isolationprocess-widget");

    // var labelBtn = registry.byId("label-btn");
    // labelBtn.on("click", lang.hitch(lebelwidget, "show"));

    // var measureBtn = registry.byId("measure-btn");
    // measureBtn.on("click", lang.hitch(measurewidget, "show"));

    var cle = registry.byId("ClearSelection");
    cle.on("click", function() {
        map.graphics.clear();
    });
    var queryBtn = registry.byId("query-btn");
    queryBtn.on("click", lang.hitch(querywidget, "show"));
    var locatorBtn = registry.byId("locator-btn");
    locatorBtn.on("click", lang.hitch(locatorwidget, "show"));

    // esriConfig.defaults.io.proxyUrl = "/proxy/";
    //****------------- */get info about Mapservices
    //-----Esri Query----- ↓
    function doQuery(pos, w, ret, sp, outF, func, Efunc) {
        var query = new Query();
        var queryTask = new QueryTask(fL[pos]['url']);
        query.where = w //"1=1";
        query.returnGeometry = ret;
        query.outSpatialReference = sp;
        query.outFields = outF //["*"]
        queryTask.execute(query, func, Efunc);
    }

    function returnNames(req) {
        var field = dijit.byId('FieldNamelist')['item']['id'];
        var arr = [];
        if (req['fields'][0]['type'] == 'esriFieldTypeString') {
            for (var i in req['features']) {
                arr.push("'" + req['features'][i]['attributes'][field] + "'")
            };
        } else {
            for (var i in req['features']) {
                arr.push(req['features'][i]['attributes'][field])
            };
        }

        var unique = arr.filter((v, i, a) => a.indexOf(v) === i);
        unique = unique.sort();
        var string = '';
        for (var i = 0; i < (unique.length); i++) {
            string += "<br>" + "<option value= " + unique[i] + ">" + unique[i] + "</option>";
        }
        dom.byId("justgetuniqe").innerHTML = string;
    }

    function returnNamesIso(req) {
        var field = dijit.byId('filedcombo')['item']['id'];
        var arr = [];
        if (req['fields'][0]['type'] == 'esriFieldTypeString') {
            for (var i in req['features']) {
                arr.push("'" + req['features'][i]['attributes'][field] + "'")
            };
        } else {
            for (var i in req['features']) {
                arr.push(req['features'][i]['attributes'][field])
            };
        }

        var unique = arr.filter((v, i, a) => a.indexOf(v) === i);
        unique = unique.sort();
        var string = '';

        for (var i = 0; i < (unique.length); i++) {
            string += "<br>" + "<option value= " + unique[i] + ">" + unique[i] + "</option>";
        }
        dom.byId("Iso_result").innerHTML = string;
    }

    function advancesearch(req) {
        $('#L0pop').html(dijit.byId("LayerName").value);
        $('#L1pop').html(" ( " + req['features']['length'] + " )" + " عارضه");
        queryResult.showresult(req, 0)
        queryResult.show();
    }

    function queryEror(err) {
        console.log(err)
    }
    dom.byId('Iso_result').addEventListener('click', function(e) {
            document.getElementById("spanisovalue").innerHTML = e.target.value;
            valuecontroler = 1;
        })
        // element=document.getElementById("justgetuniqe");
    dom.byId('justgetuniqe').addEventListener('dblclick', function(e) {
        event.preventDefault();
        $('#STA_result').insertAtCaret(e.target.text);
    })

    //-----Esri Query------ ↑
    //--------------Dom creations use for All Widgets-------------
    function memoryBuild(info) {
        return memo = new Memory({
            data: info,
        });
    }

    function dstoreBuild(evt, name, cond) { // ← build memory
        switch (cond) {
            case 1:
                var info = arrayUtils.map(evt, function(evt, index) {
                    return { name: evt[name], id: index, defaultVisibility: evt['defaultVisibility'] };
                });
                // var info = arrayUtils.filter(info, function(item) {
                //     return item.parent != -1;
                // });
                break;
            case 2:
                var info = arrayUtils.map(evt, function(evt) {
                    return { name: evt, id: evt };
                });
                break;
            case 5:
                var info = arrayUtils.map(evt, function(evt, index) {
                    return { name: evt[name], id: index };
                });
                info.unshift({ name: "همه لایه ها " })
                break;

        }
        return info
    }
    var position;

    function comboBuild(memory, id, visibility, tittle, style, firstvalue, onchangeCond, idcon, spanset) { // ← build dijitComboBox

        var combo = new ComboBox({
            disabled: visibility,
            id: id,
            name: id,
            value: firstvalue,
            store: memory,
            searchAttr: "name",
            style: style,
            title: tittle,
            onChange: function(evt) {
                switch (onchangeCond) {
                    case 1:
                        position = dijit.byId(id)['item']['id'];
                        var fieldInfos = arrayUtils.map(fL[position].fields, function(field) {
                            return {
                                "id": field.name,
                                "name": field.alias,
                                'type': field.type,
                            }
                        });
                        var templatem = new Memory({
                            data: fieldInfos
                        });
                        dijit.byId(idcon).attr('store', templatem);
                        $('#spanname').html(evt).css({ "font-size": "1.2rem" });
                        dijit.byId("STA_result").attr('value', '');
                        break;
                    case 2:
                        $('#STA_result').insertAtCaret(" " + dijit.byId(id)['item']["id"]);
                        break;

                    case 3:
                        var field = dijit.byId('filedcombo')['item']['id'];
                        doQuery(position, "1=1", false, map.spatialReference, [field], returnNamesIso, queryEror)
                        break;
                    default:
                        break;
                }
                if (spanset) {
                    document.getElementById(spanset).innerHTML = dijit.byId(id)["item"]["name"];
                }
            },
            onDblClick: function(evt) {
                if (onchangeCond == 2) {
                    $('#STA_result').insertAtCaret(" " + dijit.byId(id)['item']["id"]);
                }
            }

        }, id).startup();
    }

    function val_TB(dis, id, regExp, inm, require, propercase, promptMessage, trim, style) { // ←build dijitValidationTextBox 
        var combo1 = new ValidationTextBox({
            disabled: dis,
            id: id,
            name: id,
            regExp: regExp,
            invalidMessage: inm,
            required: require,
            propercase: propercase,
            promptMessage: promptMessage,
            trim: trim,
            style: style
        }, id).startup();
    };

    function s_TB(id, value, placeholder, style) { // ← dijitbuild TextBox
        var textbox = new TextBox({
            id: id,
            name: id,
            value: value,
            placeholder: placeholder,
            style: style,
        }, id).startup()
    };

    function s_TA(name, rows, cols, style) { // ← dijitbuild SimpleTextarea
        var textbox = new SimpleTextarea({
            name: name,
            rows: rows,
            cols: cols,
            style: style,
        }, name).startup()
    };

    function sel_F(id, str, size, style) {
        new Select({
            name: id,
            store: str,
            size: size,
            style: style
        }, id).startup();
    }

    function time_B(id, value, style) { // ← build dijitDateTextBox 
        var datebix = new DateTextBox({
            id: id,
            name: id,
            value: value,
            // placeholder:placeholder,
            // required:require,
            style: style,
        }, id).startup()
    };

    function checkboxBasedId(baseId, referedId, check) { // ←build dijitCheckBox
        var checkBox = new CheckBox({
            name: baseId,
            checked: check,
            onChange: function(check) {
                for (var i in referedId) {
                    dijit.byId(referedId[i]).setDisabled(check == false);
                }
            }
        }, baseId).startup();
    }

    //----handle and error function of esri request

    function handleInfo(req) {
        childinfo = [];
        parentinfo = [];
        mainstore = dstoreBuild(req.layers, "name", 1); //layername Memo
        mainstore2 = dstoreBuild(req.layers, "name", 5); //layername Memo

        for (var i in mainstore) {
            childinfo.push(mainstore[i].id)
        }

        var mem = memoryBuild(mainstore) //all layer memory without anythings 
        var memfL = memoryBuild(mainstore2) // add "همه لایه ها" to mainstore

        var mem_is = [];
        for (var i in mem.data) {
            switch (mem.data[i].name) {
                case "مشترک":
                    mem_is.push(mem.data[i])
                    break;
                case "شیر توزیع ":
                    mem_is.push(mem.data[i])
                    break;
                case "علمک":
                    mem_is.push(mem.data[i])
                    break;
                    // case "پارسل":
                    //     mem_is.push(mem.data[i])
                    //     break;
                default:
                    break;
            }
        }
        memiso = memoryBuild(mem_is)
        comboBuild( //combo box for info button or popUp widget
            memfL,
            "info_LayerNames",
            "",
            "لایه ای که قرار است اطلاعات توصیفی آنها نمایش داده شود را انتخاب نمایید",
            "width :100% ; display:block; left:0px ",
            "همه لایه ها",
            "",
            "",
            "",
            // mainstore[0].name
        );
        comboBuild( ////combo box for info button or advance search
            mem,
            "LayerName",
            "",
            "لایه ای که قرار است جستجوی توصیفی روی آن انجام شود را انتخاب نمایید",
            "width :100% ; display:block; left:0px ",
            "",
            1,
            "FieldNamelist"
        );
        comboBuild(
            memiso,
            "idcombo",
            "",
            "لایه ای که قرار است جستجوی توصیفی روی آن انجام شود را انتخاب نمایید",
            "width :100% ; left:0px ",
            "",
            1,
            "filedcombo",
            "spanisolayer"
        );
        comboBuild(
            "",
            "FieldNameLabel",
            "",
            "فیلد مد نظر را انتخاب نمایید",
            ""
        )

        comboBuild(
            "",
            "filedcombo",
            "",
            "فیلد مد نظر را انتخاب نمایید",
            "width :100% ; display:block; left:0px ",
            "",
            3,
            "",
            "spanisofield"
        )

        comboBuild(
            "",
            "FieldNamelist",
            "",
            "فیلد مد نظر را انتخاب نمایید",
            "width :100% ; display:block; left:0px ",
            "",
            2
        )
        comboBuild(
            mem,
            "LayerNameLabel",
            "",
            "لایه ای  که قرار است برچسب نویسی روی آن اجرا شود را انتخاب نمایید",
            "",
            "",
            1,
            "FieldNameLabel"
        );
        // comboBuild(
        //     "",
        //     "Iso_result",
        //     "",
        //     "لایه ای  که قرار است برچسب نویسی روی آن اجرا شود را انتخاب نمایید",
        //     "width :100% ;",
        //     "",
        //     "",
        //     ""
        // );
        addFeatureL(mem);
    }

    function handleinfoError(req) {
        console.log("error :", req)
    }
    //----print div prepration
    var valTBH = val_TB('disabled', "heightcustom", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "طول کاغذ",
        true, "right: 0%; width: 20%;");
    var valTBW = val_TB('disabled', "widthcustom", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "عرض کاغذ",
        true, "right: 0%; width: 20%;");
    var valTB = val_TB('disabled', "CustomScale", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "مقیاس نقشه",
        true, "right: 0%; width: 60%;");
    var valTBX = val_TB('', "xcoor", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "را وارد نمایید  X مختصات",
        true, "left: 0%; width: 30%;");
    var valTBY = val_TB('', "ycoor", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "را وارد نمایید  X مختصات",
        true, "left: 0%; width: 30%;");
    dijit.byId('xcoor').setDisabled(false);
    dijit.byId('ycoor').setDisabled(false);

    var valTb = s_TB('authorPrint', '', '', '');
    var valTt = s_TB('tiitleOfPrint', '', '', '');
    // sel_F("justgetuniqe","",7,"display:none")
    // s_TA("justgetuniqe",7,"","width: 100%; resize:none");
    s_TA("STA_result", 3, "", " width:100%;resize:none");

    // checkboxBasedId("dpicheck", ["Customdpi"], false);
    // checkboxBasedId("sizecheck", ["widthcustom", "heightcustom"], false);
    // checkboxBasedId("preserverScelech", ["CustomScale"], false);
    //------label div
    var valTb = s_TB('PrefixLabel', '', '', '');
    var valTb = s_TB('SuffixLabel', '', '', '');
    // ↓ font type combobox 
    var slider = new NumberSpinner({
        value: 7,
        smallDelta: 1,
        constraints: { min: 2, max: 80, places: 0 },
        id: "Font_Size",
        // style: "width:100%"
    }, "Font_Size").startup();

    var FontType = new Memory({
        data: [
            { name: "B Aria", id: "B Aria" },
            { name: "B Arshia", id: "B Arshia" },
            { name: "B Badr", id: "B Badr" },
            { name: "B Homa", id: "B Homa" },
            { name: "B Kamran", id: "B Kamran" },
            { name: "B Lotus", id: "B Lotus" },
            { name: "B Nazanin", id: "B Nazanin" },
            { name: "B Tir", id: "B Tir" },
            { name: "B Yagut", id: "B Yagut" },
            { name: "B Zar", id: "B Zar" },

        ]
    });
    var FontTypeComboBox = new ComboBox({
        id: "Font_Type",
        name: "operation",
        store: FontType,
        searchAttr: "name"
    }, "Font_Type").startup();
    dijit.byId("Font_Type").attr('value', "B Nazanin");
    //-- font size slider
    var myPalette = new ColorPalette({
        palette: "7x10",
        onChange: function(val) {

        }
    }, "Font_Color").startup();
    dijit.byId("Font_Color").attr("value", "#000000");

    function handlePrintInfo(resp) {
        var layoutTemplate, templateNames, mapOnlyIndex, formatExp;

        layoutTemplate = arrayUtils.filter(resp.parameters, function(param, idx) {
            return param.name === "Layout_Template";
        });
        formatExp = arrayUtils.filter(resp.parameters, function(param, idx) {
            return param.name === "Format";
        });
        if (layoutTemplate.length === 0) {
            // console.log("print service parameters name for templates must be \"Layout_Template\"");
            return;
        }
        templateNames = layoutTemplate[0].choiceList;

        var dpi = [96, 150, 300, 600, 720, 1200];
        formatNames = formatExp[0].choiceList;
        // console.log(formatNames)
        mapOnlyIndex = arrayUtils.indexOf(templateNames, "MAP_ONLY");
        if (mapOnlyIndex > -1) {
            var mapOnly = templateNames.splice(mapOnlyIndex, mapOnlyIndex + 1)[0];
            templateNames.push(mapOnly);
        }
        var store = dstoreBuild(formatNames, '', 2);
        var mem = memoryBuild(store)
        console.log(mem)
        comboBuild(
            mem,
            "formatExoprt",
            "",
            "فرمت خروجی را انتخاب کنید",
            "",
            mem.data[0].name
        );
        var store = dstoreBuild(templateNames, '', 2);
        var mem = memoryBuild(store)
        comboBuild(
            mem,
            "layoutTemp",
            "",
            "طرح بندی الگو را انتخاب نمایید",
            "",
            mem.data[0].name
        );
        var store = dstoreBuild(dpi, '', 2);
        var mem = memoryBuild(store)
        comboBuild(
            mem,
            "Customdpi",
            "disabled",
            "کیفیت dpi خروجی را تعیین نمایید  ",
            "",
            mem.data[0].name
        );
    }

    function handleprintError(err) {
        console.log("Something broke: ", err);
        // alert(err)
    }

    function doprintTask() {
        var scaleL, autorText, titlelText;
        if (dijit.byId("authorPrint").value == "") {
            autorText = "";
        } else {
            autorText = dijit.byId("authorPrint").value;
        }
        if (dijit.byId("tiitleOfPrint").value == "") {
            titlelText = "";
        } else {
            titlelText = dijit.byId("tiitleOfPrint").value;
        }

        if (dijit.byId('preserverScelech').checked) {
            scaleL = "مقیاس نقشه:  " + dojo.byId("CustomScale").value + " :1 "
        } else {
            scaleL = "مقیاس نقشه:  " + Math.round(map.getScale()) + " :1 "
        }
        var printTask = new PrintTask(Prservice, { async: true });
        var plate = new PrintTemplate();
        plate.layout = plate.label = dijit.byId("layoutTemp").value;
        plate.format = dijit.byId("formatExoprt").value;
        plate.layoutOptions = {
                "authorText": autorText,
                // "copyrightText": "<copyright info here>",
                //  "legendLayers": ["layer1","layer2"], 
                "titleText": titlelText,
                "scalebarUnit": "meters",
                "customTextElements": [{
                    "ref": scaleL
                }],
            },
            plate.exportOptions = {
                "width": 794,
                "height": 1123,
                "dpi": dijit.byId("Customdpi").value
            },
            plate.preserveScale = dijit.byId('preserverScelech').checked;
        if (plate.preserveScale) {
            plate.outScale = dojo.byId("CustomScale").value;
        }
        var params = new esri.tasks.PrintParameters();
        params.map = map;
        //  params.outSpatialReference = map.getScale();
        params.template = plate;
        // console.log(params)
        printTask.execute(params, printResult, printError);
    }
    // ------define Buttons ----- ↓
    var querynlist = query("#Querytool")[0]['children']
    var reportnlist = query("#btnContainer")[0]['children'] // create childern list of report widjets
    var reportnlistiso = query("#btnContaineriso")[0]['children'] // create childern list of Isolation widjets
    var infof = arrayUtils.filter(querynlist, function(item) {
        return item['localName'] != 'br';
    });
    var infor = arrayUtils.filter(reportnlist, function(item) {
        return item['localName'] == 'div';
    }); // get all div from main div to create component list
    var inforiso = arrayUtils.filter(reportnlistiso, function(item) {
        return item['localName'] == 'div';
    }); // get all div from main div to create component list

    var inputforIsolation;

    function btnBuild(list, c, func, nn) {
        if (nn) {
            for (var i in list) {
                var j = list[i].id;
                j = j.replace('_iso', '')
                    // console.log(j)
                var btns = new Button({
                        label: list[i]['attributes'][2]['nodeValue'],
                        title: list[i].title,
                        name: j,
                        class: c,
                        onClick: func
                    },
                    list[i]["id"]);
            };
        } else {
            for (var i in list) {
                var btns = new Button({
                        label: list[i]['attributes'][2]['nodeValue'],
                        title: list[i].title,
                        name: list[i].id,
                        class: c,
                        onClick: func
                    },
                    list[i]["id"]);
            };
        }
    }
    btnBuild(infof, "BT",
        function(event) {
            event.preventDefault();
            $('#STA_result').insertAtCaret(" " + this.label);
        }
    )
    btnBuild(infor, "BTdraw",
        function(evt) {
            var t = evt.target.name;
            t = t.toUpperCase();
            global = 1
            selectionToolbar.activate(Draw[t])
        }
    )
    btnBuild(inforiso, "BTdraw",
        function(evt) {

            var t = evt.target.name;
            t = t.toUpperCase();
            global = 10

            selectionToolbar.activate(Draw[t])
        }, 1
    )

    var locator_btn = new Button({
        tittle: "جستجو بر اساس مختصات",
        label: "جستجو بر اساس مختصات",
        style: "	margin: 10px 2px 10px 2px;",
        onClick: function() {
            var x = dijit.byId("xcoor").value;
            var y = dijit.byId("ycoor").value;
            var sp = map.spatialReference;

            locatorwidget.locate(x, y, sp);
            locatorwidget.show();

        }
    }, "xyshow");

    var locator_btn = new Button({
        tittle: "پاک کردن مختصات های وارد شده",
        label: "ورود مجدد اطلاعات",
        style: "	margin: 10px 2px 10px 2px;",
        onClick: function() {
            locatorwidget.clean();
        }
    }, "xyclean");

    // var label_btn = new Button({
    //     label: "اجرای برچسب",
    //     onClick: function() {
    //         doLabel();
    //     }
    // }, "LabelOk");

    new Button({
        label: "اجرا ",
        title: "اجرای جستجوی پیشرفته",
        class: "BTOK",
        onClick: function() {
            var input = dijit.byId('STA_result').value;
            var res = doQuery(position, input, true, map.spatialReference, ['*'], advancesearch, queryEror);

        }
    }, "queryRun");
    new Button({
        label: "انتخاب همه ",
        title: "انتخاب تمام عوارض",
        class: "BTOK",
        onClick: function() {
            var input = dijit.byId('STA_result').value;
            var res = doQuery(position, '1=1', true, map.spatialReference, ['*'], advancesearch, queryEror);

        }
    }, "queryAll");

    new Button({
        label: "مشاهده کل مقادیر ",
        class: "BT1",
        style: "display:block",
        onClick: function() {
            var field = dijit.byId('FieldNamelist')['item']['id'];
            doQuery(position, "1=1", false, map.spatialReference, [field], returnNames, queryEror)
        }
    }, "getUniqueValue");

    // var button = new Button({
    //     label: "پرینت",
    //     onClick: function() {
    //         dijit.byId("print_button").set("label", "در حال پرینت");
    //         // domStyle.set("pi", "visibility", "visible")
    //             // Do something:
    //         doprintTask();
    //     }
    // }, "print_button");

    // var button2 = new Button({
    //     label: "تنظیم مجدد",
    //     onClick: function() {
    //         resetPrint();
    //     }
    // }, "print_reset");

    new Button({
        title: "ایجاد گزارش  از المان های موجود در شبکه گاز ",
        label: "تولید گزارش",
        class: "topbtn",
        onClick: function() {
            reportwidget.show()
                // selectionToolbar.activate(Draw.FREEHAND_POLYGON)
        }
    }, "report-btn");

    new Button({
        label: "  ایزولاسیون",
        class: "topbtn",
        onClick: function() {
            isolationwidget.show()
                // selectionToolbar.activate(Draw.FREEHAND_POLYGON)
        }
    }, "isolation-btn");

    // function doQuery(pos, w, ret, sp, outF, func, Efunc) {
    //     var query = new Query();
    //     // console.log(fL[pos]['url'])
    //     var queryTask = new QueryTask(fL[pos]['url']);
    //     query.where = w //"1=1";
    //     query.returnGeometry = ret;
    //     query.outSpatialReference = sp;
    //     query.outFields = outF //["*"]
    //     queryTask.execute(query, func, Efunc);
    // }
    function sameValues(arr) {
        return arr.filter((v, i, a) => v === a[0]).length === arr.length;
    }

    function fn(rep) {
        // console.log(rep)
        if (rep.features.length > 1 & dijit.byId('idcombo').item.id != clientsid) {
            alert('تعداد عوارض انتخاب شده بیشتر از مقدار مجاز است')
        } else if (rep.features.length > 1 & dijit.byId('idcombo').item.id == clientsid) {
            var x = [],
                y = [];
            for (var i in rep.features) {
                x.push(rep.features[i].attributes.x)
                y.push(rep.features[i].attributes.y)
            }
            if (sameValues(x) & sameValues(y)) {
                globalnode = rep.features["0"].attributes.node
                globalV = rep.features["0"].attributes.V
                isolationprocesswidget.show(globalnode, globalV, fL)

            } else {
                alert('تعداد عوارض انتخاب شده بیشتر از مقدار مجاز است')
            }
            // globalnode=
            //Run
        } else {
            if (rep.features["0"].attributes.node) {
                //Run
                globalnode = rep.features["0"].attributes.node
                globalV = rep.features["0"].attributes.V
                isolationprocesswidget.show(globalnode, globalV, fL)

            } else {
                alert('عارضه انتخاب شده در محدوده ایزولاسیون نمی باشد یا مقداردهی آن به عارضه های دیگر نزدیک به آن انجام شده است.')
            }
        }
    }

    new Button({
        label: "  اجرای ایزولاسیون",
        class: "topbtn",
        title: "اجرای فرآیند ایزولاسیون در اساس انتخاب عارضه انجام گرفته",

        onClick: function() {
            // console.log(valuecontroler)
            if (valuecontroler) {
                var id = dijit.byId('idcombo').item.id;
                var field = dijit.byId('filedcombo').item.id
                if (dijit.byId('filedcombo').item.type == "esriFieldTypeString") {
                    var st = field + "=" + "'" + document.getElementById("spanisovalue").innerHTML + "'";
                } else {
                    var st = field + "=" + document.getElementById("spanisovalue").innerHTML;
                }
                var ref = fL[id].spatialReference;
                var res = doQuery(id, st, false, ref, ["*"], fn, queryEror);


                // isolationprocesswidget.show(globalnode, globalV, fL)

            } else {
                isolationprocesswidget.show(globalnode, globalV, fL)
            }


            // selectionToolbar.activate(Draw.FREEHAND_POLYGON)
        }
    }, "RunisolationP");

    // -----------------------------------------

    function convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }


    function exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);

        var csv = convertToCSV(jsonObject);

        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    var headers = {
        name: 'name',
        familyname: "family name",
        phone: "phone",
    };
    var fileTitle = 'orders'; // or 'my-unique-title'

    // -----------------------------------------

    new Button({
        dir: 'rtl',
        label: " خروجی CSV",
        class: "topbtn",
        title: "دریافت خروجی مشترکینی که گاز آنها قطع خواهد شد ",
        style: { 'disabled': true },
        onClick: function() {
            // isolationwidget.show()
            exportCSVFile(headers, feedforcsv, fileTitle); // call the exportCSVFile() function to p

            // selectionToolbar.activate(Draw.FREEHAND_POLYGON)
        }
    }, "csvexport");
    // new Button({
    //     label: "کنترل  ",
    //     class: "topbtn",
    //     title: "کنترل نمودن انتخاب توصیفی، و اطمینان از انتخاب تنها یک عارضه ",
    //     onClick: function() {
    //         var field = dijit.byId('filedcombo')['item']['id'];
    //         var st = field + '=' + valueforIso;
    //         // doQuery(position, st, true, map.spatialReference, ["*"], isoSelect, queryEror)
    //         // var input = dijit.byId('STA_result').value;
    //         // var res = doQuery(position, '1=1', true, map.spatialReference, ['*'], advancesearch, queryEror);

    //         // selectionToolbar.activate(Draw.FREEHAND_POLYGON)
    //     }
    // }, "checkIsoSelect");

    function isoSelect(req) {
        if (req['features']['length'] > 1) {
            alert("تعداد عارضه های انتخاب شده بیشتر از یک عدد می باشد لطفا عارضه مد نظر را مجدد انتخاب نمایید")
        } else {
            // console.log(req)
            inputforIsolation = req;
        }
        // console.log(req)
    };
    // new Button({
    //     // label: "",
    //     class: "topbtn",
    //     title: "بزرگنمایی اولیه نسبت به شهر زاهدان ",
    //     onClick: function() {
    //         alert('googooli')
    //     }
    // }, "zahedanExtetn");


    registry.byId("zahedanExtetn").on("click", function() {
        map.setExtent(zahedanextent);
    });
    registry.byId("zabolExtetn").on("click", function() {
        map.setExtent(zabolextent);
    });

    //----------------------------------toogles↓
    new ToggleButton({
        showLabel: true,
        checked: false,
        onChange: function(val) {
            if (val) {
                domStyle.set("mes", "display", "block");
            } else {
                domStyle.set("mes", "display", "none");
            }
        },
        title: "اندازه گیری",
        // class:'left'
    }, "measure-btn").startup();

    new ToggleButton({
        showLabel: true,
        checked: false,
        onChange: function(val) {
            if (val) {
                printwidjet.show();
            } else {
                printwidjet.hide();
            }
        },
        title: "پرینت",
        class: 'btnhover',
    }, "print-btn").startup();

    new ToggleButton({
        showLabel: true,
        checked: false,
        onChange: function(val) {
            if (val) {
                info.show();
            } else {
                info.hide();
            }
        },
        title: "نمایش اطلاعات توصیفی",
        class: 'btnhover',
    }, "identify-btn").startup();

    new ToggleButton({
        showLabel: true,
        checked: false,
        onChange: function(val) {
            if (val) {
                // domStyle.set("mes", "display", "block");
                legend.show()
            } else {
                // domStyle.set("mes", "display", "none");
                legend.hide()
            }
        },
        title: "راهنمای نقشه",
        // class:'left'
    }, "legend-btn").startup();

    new ToggleButton({
        // showLabel: true,
        checked: false,
        onChange: function(val) {
            if (val) {
                layList.show()
                    // domStyle.set("mes", "display", "block");
            } else {
                layList.hide()

                // domStyle.set("mes", "display", "none");
            }
        },
        // label: "لایه های نقشه",
        title: "لایه های نقشه",
        // class:'left'
    }, "layerlist-btn").startup();

    var ge = new ToggleButton({
        //        showLabel: true,
        //        checked: false,
        // label:"نقشه  پایه گوگل",
        title: "نقشه پایه  گوگل ارث",
        // class:'left',

        onChange: function(val) {

            if (val) {

                if (map.extent.xmin < zahedanextent.xmax & map.extent.xmax > zahedanextent.xmin) {
                    if (map.extent.ymin < zahedanextent.ymax & map.extent.ymax > zahedanextent.ymin) {
                        document.getElementById("footer-id2").innerHTML = "نقشه پایه گوگل شهر زاهدان اضافه شده است";
                        map.addLayer(googlezahedan);
                    }
                } else if (map.extent.xmin < zabolextent.xmax & map.extent.xmax > zabolextent.xmin) {
                    if (map.extent.ymin < zabolextent.ymax & map.extent.ymax > zabolextent.ymin) {
                        document.getElementById("footer-id2").innerHTML = "نقشه پایه گوگل شهر زابل اضافه شده است";
                        map.addLayer(googlezabol);
                    }
                } else {
                    document.getElementById("footer-id2").innerHTML = " محدوده مورد نظر، خارج از محدوده شهر زاهدان و زابل می باشد";

                }

            } else {
                document.getElementById("footer-id2").innerHTML = "";
                map.removeLayer(googlezahedan);
                map.removeLayer(googlezabol);

            }

        },
        //        label: "G"
    }, "googleButton-btn");

    // Osm Toggle map
    new ToggleButton({
        // label:"OSM نقشه  پایه  ",
        // class:'left',

        title: "نقشه پایه خیابان ها- OSM ",
        onChange: function(val) {
            if (val) {
                map.removeLayer(OSMmap);
                document.getElementById("footer-id2").innerHTML = "نقشه پایه خیابان ها و معابر حذف شد";

            } else {
                map.addLayer(OSMmap);
                document.getElementById("footer-id2").innerHTML = "";

            }

        },
        //        label: "O"
    }, "osmToggleButton-btn")


    function printResult(result) {
        // domStyle.set("pi", "visibility", "hidden")
        // dijit.byId("print_button").set("label", "پرینت");
        window.open(result.url, "_blank")
    }

    function printError(error) {
        console.log(error)
            // alert(error);
    }

    function resetPrint() {
        var reset = {
            "formatExoprt": { "value": "PDF" },
            "layoutTemp": { "value": "ISO A0 Landscape" },
            "Customdpi": { "value": 96 },
            "dpicheck": { "checked": false },
            "sizecheck": { "checked": false },
            "widthcustom": { "value": "" },
            "heightcustom": { "value": "" },
            "preserverScelech": { "checked": false },
            "CustomScale": { "value": "" },
            "tiitleOfPrint": { "value": "" },
            "authorPrint": { "value": "" },
        }
        for (var i in reset) {
            registry.byId(i).set(Object.keys(reset[i])[0], Object.values(reset[i])[0])
        }
    }

    function doLabel() {
        var statesColor = new Color(dijit.byId("Font_Color").value);
        var LabelV = new TextSymbol().setColor(statesColor);

        var s = dijit.byId("Font_Size").value + "pt";

        LabelV.font.setSize(s);
        LabelV.font.setFamily(dijit.byId("Font_Type").value);
        // //        //this is the very least of what should be set within the JSON
        var x = dijit.byId('FieldNameLabel').item.id;
        // console.log("x:", x);

        var json = {
            "labelExpression": { "value": dojo.byId("PrefixLabel").value + "{" + x + "}" + dojo.byId("SuffixLabel").value }
        };
        // //create instance of LabelClass (note: multiple LabelClasses can be passed in as an array)
        var labelClass = new LabelClass(json);
        // console.log("labelClass:", labelClass);

        labelClass.symbol = LabelV; // symbol also can be set in LabelClass' json
        // console.log("labelClass:", labelClass);
        // console.log("position:", position);

        // console.log(fL[position])
        fL[position].setLabelingInfo([labelClass]);

    }

});