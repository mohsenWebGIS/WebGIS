//     /* code goes here */
require([
  "esri/map",
  "esri/graphic",
  "esri/config",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/geometry/Extent",
  "esri/dijit/OverviewMap",
  "esri/dijit/Scalebar",
  "esri/geometry/webMercatorUtils",
  "esri/SpatialReference",
  "esri/tasks/ProjectParameters",
  "esri/tasks/GeometryService",
  "esri/geometry/coordinateFormatter",
  "esri/geometry/projection",
  "esri/layers/WMSLayer",
  "esri/layers/WMSLayerInfo",
  "esri/request",
  "esri/SnappingManager",
  "esri/dijit/Measurement",
  "esri/sniff",
  "esri/layers/FeatureLayer",
  "esri/dijit/Legend",
  "esri/dijit/LayerList",
  "esri/toolbars/navigation",
  "esri/tasks/IdentifyParameters",
  "esri/tasks/IdentifyTask",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/Color",
  "esri/units",
  "esri/dijit/Search",
  "esri/geometry/Point",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",
  "esri/tasks/QueryTask",
  "esri/tasks/query",
  "esri/dijit/FeatureTable",
  "esri/toolbars/draw",
  "dojo/i18n!esri/nls/jsapi",
  "esri/tasks/PrintTask",
  "esri/tasks/PrintParameters",
  "esri/tasks/PrintTemplate",


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
  "dijit/Tree",
  "dijit/tree/ObjectStoreModel",
  "dojo/store/Observable",
  "dijit/form/ValidationTextBox",
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",

  "appmain/navigationbar",
  "appmain/Pop",
  "appmain/legend",
  "appmain/layerlist",
  "appmain/printW",
  "appmain/tableOfInfo",
  "appmain/LocSearch",
  "appmain/queryForm",
  "appmain/heatmap",
  "appmain/featureTable",
  "appmain/featureTableLayerList",
  "appmain/selectFeatureLayerList",
  "appmain/info_scale",

  "appmain/dojolearning/person",
  "appmain/dojolearning/Employee",
  "appmain/dojolearning/Boss",
  "appmain/dojolearning/Blizzard",

  "dojo/dnd/Moveable",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dojo/dom-attr",
  "dojo/store/Memory",
  "dojo/data/ObjectStore",
  "dojo/_base/array",
  "dojo/keys",
  "dojo/query",
  "dojo/on",
  "dojo/dom",
  "dojo/parser",
  "dojo/dom-style",
  "dojo/domReady!",
], function (
  Map,
  Graphic,
  esriConfig,
  ArcGISDynamicMapServiceLayer,
  Extent,
  OverviewMap,
  Scalebar,
  webMercatorUtils,
  SpatialReference,
  ProjectParameters,
  GeometryService,
  coordinateFormatter,
  projection,
  WMSLayer,
  WMSLayerInfo,
  esriRequest,
  SnappingManager,
  Measurement,
  has,
  FeatureLayer,
  Legend,
  LayerList,
  Navigation,
  IdentifyParameters,
  IdentifyTask,
  SimpleLineSymbol,
  SimpleFillSymbol,
  PictureMarkerSymbol,
  SimpleMarkerSymbol,
  Color,
  Units,
  Search,
  Point,
  TextSymbol,
  Font,
  QueryTask,
  Query,
  FeatureTable,
  Draw,
  bundle,
  PrintTask,
  PrintParameters,
  PrintTemplate,

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
  Tree,
  ObjectStoreModel,
  Observable,
  ValidationTextBox,
  TabContainer,
  ContentPane,

  widget_navigation,
  widget_popUp,
  widget_legend,
  widget_layerlist,
  widjet_print,
  widjet_table,
  widjet_Losearch,
  widjet_queryform,
  widjet_heatmap,
  widget_featureTable,
  widget_featureTableLayerList,
  widget_selectFeatureLayerList,
  widget_info_scale,

  Person,
  Employee,
  Boss,
  Blizzard,

  Moveable,
  lang,
  domConstruct,
  domAttr,
  Memory,
  ObjectStore,
  arrayUtils,
  keys,
  query,
  on,
  dom,
  parser,
  domStyle
) {
  parser.parse();
  $("#alert_slid").hide();

  //------------test-----------------//
  // var kathryn = new Boss("Kathryn", 26, "Minnesota", 9000),
  //   matt = new Employee("Matt", 33, "California", 1000);

  // console.log(kathryn.askForRaisee(), matt.askForRaisee());
  // var yummyTreat = new Blizzard();

  //----------------------------------------

  //  -------esri defualt config--------------//
  var gsv = new GeometryService(
    "http://192.168.56.8:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"
  );
  esriConfig.defaults.geometryService = gsv;
  esriConfig.defaults.io.alwaysUseProxy = false;
  var Prservice =
    "http://192.168.56.8:6080/arcgis/rest/services/gp/ExportWebMap/GPServer/Export%20Web%20Map";

  // -------define variables/links----------//
  var osmUrl =
    "http://192.168.56.8:6080/arcgis/rest/services/basemap/osm/MapServer";
  // var mservice = "http://192.168.56.5:6080/arcgis/rest/services/Web/webGIS/MapServer";
  var mservice =
    "http://192.168.56.8:6080/arcgis/rest/services/web/web/MapServer";
  var heatservice =
    "http://192.168.56.8:6080/arcgis/rest/services/web/heatmap/MapServer/0";

  // ********************************constants and symbols ***************************************
  var position;
  var gl;
  // ********************************* → Constants ← *********************************

  var cityextent = [
    {
      zahedanextent: new Extent({
        type: "extent",
        xmin: 278679.621791593,
        ymin: 3255746.9272052944,
        xmax: 306066.45903770305,
        ymax: 3271090.467567784,
        spatialReference: {
          wkid: 32641,
        },
      }),
    },
    {
      zabolextent: new Extent({
        type: "extent",
        xmin: 354441.2984920292,
        ymin: 3433416.462451934,
        xmax: 362045.4387003096,
        ymax: 3436369.2183574457,
        spatialReference: {
          wkid: 32641,
        },
      }),
    },
    {
      iranshahrextent: new Extent({
        type: "extent",
        xmin: 253063.27295980437,
        ymin: 3002046.059992162,
        xmax: 286372.16285154794,
        ymax: 3017216.812737956,
        spatialReference: {
          wkid: 32641,
        },
      }),
    },
    {
      bazmanextent: new Extent({
        type: "extent",
        xmin: 217624.37815681877,
        ymin: 3081883.6962126936,
        xmax: 225951.60062975532,
        ymax: 3086442.619490109,
        spatialReference: {
          wkid: 32641,
        },
      }),
    },
    {
      dalganextent: new Extent({
        type: "extent",
        xmin: 145845.2043758003,
        ymin: 3042165.085192418,
        xmax: 154172.4268487369,
        ymax: 3046724.0084698335,
        spatialReference: {
          wkid: 32641,
        },
      }),
    },
    {
      ostanextnet: new Extent({
        type: "extent",
        xmin: -310920.35399599036,
        ymin: 2811338.228469325,
        xmax: 754964.1225398058,
        ymax: 3394880.4079784416,
        spatialReference: {
          wkid: 32641,
        },
      }),
    },
    {
      iranextent: new Extent({
        type: "extent",
        xmin: -2551552.469825271,
        ymin: 2529886.8556761113,
        xmax: 1711985.43631791,
        ymax: 4864055.573712574,
        spatialReference: {
          wkid: 32641,
        },
      }),
    },
  ];
  console.log("city", cityextent);

  var zahedanextent = new Extent({
    type: "extent",
    xmin: 278679.621791593,
    ymin: 3255746.9272052944,
    xmax: 306066.45903770305,
    ymax: 3271090.467567784,
    spatialReference: {
      wkid: 32641,
    },
  });
  var zabolextent = new Extent({
    type: "extent",
    xmin: 354441.2984920292,
    ymin: 3433416.462451934,
    xmax: 362045.4387003096,
    ymax: 3436369.2183574457,
    spatialReference: {
      wkid: 32641,
    },
  });
  var iranshahrextent = new Extent({
    type: "extent",
    xmin: 253063.27295980437,
    ymin: 3002046.059992162,
    xmax: 286372.16285154794,
    ymax: 3017216.812737956,
    spatialReference: {
      wkid: 32641,
    },
  });
  var ostanextnet = new Extent({
    type: "extent",
    xmin: -310920.35399599036,
    ymin: 2811338.228469325,
    xmax: 754964.1225398058,
    ymax: 3394880.4079784416,
    spatialReference: {
      wkid: 32641,
    },
  });

  var iranextent = new Extent({
    type: "extent",
    xmin: -2551552.469825271,
    ymin: 2529886.8556761113,
    xmax: 1711985.43631791,
    ymax: 4864055.573712574,
    spatialReference: {
      wkid: 32641,
    },
  });

  var bazmanextent = new Extent({
    type: "extent",
    xmin: 217624.37815681877,
    ymin: 3081883.6962126936,
    xmax: 225951.60062975532,
    ymax: 3086442.619490109,
    spatialReference: {
      wkid: 32641,
    },
  });
  var dalganextent = new Extent({
    type: "extent",
    xmin: 145845.2043758003,
    ymin: 3042165.085192418,
    xmax: 154172.4268487369,
    ymax: 3046724.0084698335,
    spatialReference: {
      wkid: 32641,
    },
  });

  wik_web = new SpatialReference({ wkid: 102100 });

  var line0 = new SimpleLineSymbol();
  line0.setWidth(1);
  var marker = new SimpleMarkerSymbol();
  marker.setOutline(line0);
  marker.setSize(14);
  marker.setOffset(0, 0);
  marker.setAngle(0);
  marker.setColor(new Color([0, 230, 169, 0.9]));

  var line = new SimpleLineSymbol();
  line.setWidth(3.5);
  line.setColor(new Color([87, 255, 246, 1]));
  // var marker = new PictureMarkerSymbol();
  // marker.setOffset(0, 20);
  // marker.setHeight(40);
  // marker.setWidth(40);
  // marker.setUrl("../GIS/asset/SVG/placeholder.svg");

  var line2 = new SimpleLineSymbol();
  line2.setWidth(1);
  var fill = new SimpleFillSymbol();
  // fill.setColor(new Color([115, 255, 223, 0.19]));
  fill.setColor(new Color([255, 0, 0, 0.19]));
  fill.setOutline(line2);

  var textSymbol = new TextSymbol("")
    .setColor(new Color([128, 0, 0]))
    .setAlign(Font.ALIGN_START)
    .setAngle(0)
    .setFont(new Font("12pt").setWeight(Font.WEIGHT_BOLD));

  var loT = "";

  // ------map------///
  var map = new Map("map", {
    //  basemap:'osm',
    sliderStyle: "small",
    attributionWidth: 0.8,
    autoResize: true,
    showAttribution: false,
    logo: false,
    showLabels: true,
  });

  var tablefeaturewidget = new widget_featureTable(
    {
      map: map,
      mapService: mservice,
    },
    "featureTable-widget"
  );
  var tablefeaturelayerlistwidget = new widget_featureTableLayerList(
    {
      map: map,
      mapService: mservice,
    },
    "featureTablelayerlist-widget"
  );

  var selctfeaturelayerlistwidget = new widget_selectFeatureLayerList(
    {
      map: map,
      mapService: mservice,
    },
    "selectFeaturelayerlist-widget"
  );
  var info_scalewidget = new widget_info_scale(
    {
      map: map,
      mapService: mservice,
    },
    "coordinate_scale-widget"
  );
  info_scalewidget.show();

  domStyle.set("map", "height", getPageHeight() + "px");
  domStyle.set("map", "width", getPagewidth() + "px");

  //*********************esri request*************//
  // ----Print requests build print page-------
  var printInfo = esriRequest({
    url: Prservice,
    content: { f: "json" },
  });
  printInfo.then(handlePrintInfo, handleprintError);
  //-----Print requests ↑----------------
  //-----mapservice request build layer and fields combo boxes----↓
  var lays = esriRequest({
    url: mservice,
    content: { f: "json" },
  });
  lays.then(handleInfo, handleinfoError);

  // -----mapservice request----↑

  //*****************************-add layer**************************************//
  //  ---add osm dynamic layer--------------
  map.setExtent(zahedanextent);

  var OSMmap = new ArcGISDynamicMapServiceLayer(osmUrl, {
    opacity: 0.5,
    showAttribution: false,
    displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  });

  // ****************************widget definitions************************************//
  // ---define widgets----
  var infoPopUp = new widget_popUp(
    {
      map: map,
      mapService: mservice,
      queryreq: "",
    },
    "identify-widget"
  );
  var legend = new widget_legend(
    {
      map: map,
      mapService: mservice,
    },
    "legend-widget"
  );
  var layList = new widget_layerlist(
    {
      map: map,
      mapService: mservice,
    },
    "layerlist-widget"
  );

  var search = new Search(
    {
      enableLabel: true,
      enableInfoWindow: false,
      showInfoWindowOnSelect: false,
      expanded: true,
      maxResults: Infinity,
      maxSuggestions: Infinity,
      enableSuggestions: true,
      exactMatch: false,
      map: map,
    },
    "search"
  );
  var sources = []; // by this Esri geocoder search is inactivated
  sources.push({
    featureLayer: new FeatureLayer(osmUrl + "/255", {
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
  search.set("sources", sources);
  search.startup();
  search.clear();

  // ----navigation toolbar------------------------
  var navb = new widget_navigation(
    {
      map: map,
      mapService: mservice,
      cityextent: cityextent,
      linesymbol: line,
      fillsymbol: fill,
    },
    "navigation-widget"
  );
  var navToolbar;

  navToolbar = new Navigation(map);
  on(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

  function extentHistoryChangeHandler() {
    registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
    registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
  }

  // ↑ -------navigation finished ------------------

  var printwidjet = new widjet_print(
    {
      printService: Prservice,
    },
    "print-widget"
  );
  var tablewidjet = new widjet_table(
    {
      mapService: mservice,
    },
    "table-widget"
  );
  var locationsearchwidjet = new widjet_Losearch(
    {
      map: map,
      mapService: mservice,
    },
    "locationsearch-widget"
  );

  var querywidget = new widjet_queryform(
    {
      // map: map,
      // mapService: mservice
    },
    "query-widget"
  );

  var heatmapwidget = new widjet_heatmap(
    {
      map: map,
      mapService: heatservice,
    },
    "heatmap-widget"
  );

  // -*************************************************
  // -----------------------------extnet for maps---------------------------------//

  if (!projection.isSupported()) {
    alert("client-side projection is not supported");
    return;
  }
  var layer1 = new WMSLayerInfo({
    name: "iranshar",
    title: "iranshar",
  });

  // Iranshahr
  var xmin = 6739911.406421574;
  var xmax = 6761925.269871958;
  var ymin = 3144313.5952570965;
  var ymax = 3156543.520503535;
  var resourceInfo = {
    extent: new Extent(xmin, ymin, xmax, ymax, {
      wkid: 3857,
    }),
    layerInfos: [layer1], //, layer2]
  };
  var wmsLayer = new WMSLayer(
    "http://192.168.56.3:8080/geoserver/P_410029/wms",
    {
      resourceInfo: resourceInfo,
      visibleLayers: ["iranshar"],
    }
  );

  //--------↓ overview -----------

  var overviewMapDijit = new OverviewMap({
    map: map,
    visible: false,
    attachTo: "bottom-right",
    expandFactor: 10,
    height: 400,
  });
  overviewMapDijit.startup();
  //-------- overview -----------
  //----↓---scalebar button----
  var scalebar = new Scalebar(
    {
      map: map,
      attachTo: "bottom-left",
      scalebarUnit: "dual",
    },
    dojo.byId("scale-widget")
  );
  //----↑---scalebar button----
  // -----measurement widget-------------//
  var measurement = new Measurement(
    {
      map: map,
      advancedLocationUnits: true,
      defaultLengthUnit: Units.METERS,
      defaultAreaUnit: Units.SQUARE_METERS,
    },
    "measurementDiv"
  );

  measurement.startup();
  // measurement.hideTool("location");

  //***************************** ↓ unorders functions ↓ ****************************//
  function initSelectToolbar(event) {
    selectionToolbar = new Draw(event.map);

    selectionToolbar.setFillSymbol(fill);
    selectionToolbar.setLineSymbol(line);
    selectionToolbar.setMarkerSymbol(marker);
    on(selectionToolbar, "draw-complete", function (evt) {
      map.graphics.clear();

      map.setExtent(evt.geometry.getExtent());

      switch (evt.geometry.__proto__.type) {
        case "polygon":
          map.graphics.add(new Graphic(evt.geometry, evt.target.fillSymbol));
          break;
        case "polyline":
          map.graphics.add(new Graphic(evt.geometry, evt.target.lineSymbol));
          break;
        case "extent":
          map.graphics.add(new Graphic(evt.geometry, evt.target.lineSymbol));
          break;
      }

      selectionToolbar.deactivate();
      switch (gl) {
        case 1: // simple layer selection by select icons
          $("#refreshselect-btn").css("display", "block"); //displaye refereshh button at the end of widget
          var p = $("input[name=selectLcheckB][type=checkbox]:checked"); //return selected feature layerId
          var selType = "SELECTION_NEW"; //
          if ($("#seltype0").text()) {
            console.log($("#seltype0").text());
            selType = $("#seltype0").attr("title");
          }
          for (var i in p) {
            selectionFeatureLayer(
              p[i]["value"],
              "1=1",
              true,
              selType,
              ["*"],
              evt.geometry,
              queryEror,
              queryEror
            );
          }

          break;
        case 10:
          valuecontroler = 0;
          if (dijit.byId("idcombo").item) {
            isolationprocesswidget.spatialSelection(evt, fL);
          } else {
            alert(
              "لایه ای که قرار است انتخاب بر اساس آن انجام شود را انتخاب نمایید"
            );
          }
          break;
      }
    });
  }
  function textfill(x, y) {
    var text = " X: " + x + " Y: " + y + " مختصات انتخاب شده";
    textSymbol.setText(text);
  }
  function gotoLocation(x, y, sp) {
    map.graphics.clear();
    var r = parseInt($('input[name="optradio"]:checked').val());
    if (r) {
      // console.log('latlong')
      var point = new Point(x, y);
    } else {
      // console.log('xy')
      var wik_web = new SpatialReference({ wkid: sp });
      var point = new Point(x, y, wik_web);
    }
    projection.load().then(function () {
      var newp = projection.project(point, map.extent.spatialReference);
      var loP = new Graphic(newp, marker);
      if ($("#doeslocLabelneed").is(":checked")) {
        textfill(x, y);
        loT = new Graphic(newp, textSymbol);
      }
      map.graphics.add(loP);
      map.graphics.add(loT);
      var searchpPExtent = loP._extent;
      searchpPExtent.xmin = parseFloat(searchpPExtent.xmin) - 150;
      searchpPExtent.xmax = parseFloat(searchpPExtent.xmax) + 150;
      searchpPExtent.ymin = parseFloat(searchpPExtent.ymin) - 150;
      searchpPExtent.ymax = parseFloat(searchpPExtent.ymax) + 150;
      map.setExtent(searchpPExtent);
    });
  }
  function val_TB(
    id, //id of do:string
    regExp, //regular expression :string
    inm, //Tooltip text that appears when the content of the text box is invalid. :string
    require, //define is it require or not :boolian
    propercase, //Tooltip text that appears when the text box is empty and on focus. Null by default.:string
    promptMessage, //Tooltip text that appears when the text box is empty and on focus. Null by default.:string
    trim, //Removes leading and trailing whitespace if true :boolian
    clas, //CSS class :sting Class name
    ph //PlaceHolder
  ) {
    // ←build dijitValidationTextBox
    var validTextBox = new ValidationTextBox(
      {
        id: id,
        name: id,
        regExp: regExp,
        invalidMessage: inm,
        required: require,
        propercase: propercase,
        promptMessage: promptMessage,
        trim: trim,
        class: clas,
        placeholder: ph,
      },
      id
    ).startup();
  }

  function infoTablebuild(req, c) {
    //function for build information Table in onclick event on any selected features in identify widget
    if (Object.keys(req).length) {
      if (c == 0) {
        var j = req[c]["feature"]["attributes"];
      } else {
        var j = req.feature.attributes;
      }

      var row = domConstruct.create(
        "div",
        { class: "container-fluid" },
        "attributeTable",
        "only"
      );
      var row = domConstruct.create(
        "table",
        { id: "customers", class: "table" },
        row,
        "last"
      );
      var row = domConstruct.create(
        "thead",
        { class: "thead-dark" },
        row,
        "last"
      );
      domConstruct.create("tr", "", row, "last");
      domConstruct.create("th", { innerHTML: "فیلد" }, row, "last");
      domConstruct.create("th", { innerHTML: "مقادیر" }, row, "last");

      for (var i in j) {
        domConstruct.create("tbody", "", row, "last");
        domConstruct.create("tr", "", row, "last");
        domConstruct.create("td", { innerHTML: i }, row, "last");
        domConstruct.create("td", { innerHTML: j[i] }, row, "last");
      }
    }
  }
  function min(input) {
    //calculate minimum at array
    if (toString.call(input) !== "[object Array]") return false;
    return Math.min.apply(null, input);
  }

  function max(input) {
    //calculate maximum at array
    if (toString.call(input) !== "[object Array]") return false;
    return Math.max.apply(null, input);
  }
  function defineExtent(arr, k, c) {
    //create extent base on point coordinate
    (xarr = []), (yarr = []);
    if (c == 1) {
      for (var i in arr) {
        xarr += arr[i][0];
        yarr += arr[i][1];
      }

      return xarr / arr.length, yarr / arr.length;
    } else {
      for (var i in arr) {
        xarr.push(arr[i][0]);
        yarr.push(arr[i][1]);
      }

      var extent = new Extent({
        type: "extent",
        xmin: min(xarr) - k,
        ymin: min(yarr) - k,
        xmax: max(xarr) + k,
        ymax: max(yarr) + k,
        spatialReference: { wkid: 32641 },
      });
      return extent;
    }
  }

  function addgraphExt(ext, item) {
    //add graphic layer to map based on extent and geometry type
    switch (item["geometryType"]) {
      case "esriGeometryPolyline":
        map.graphics.clear();
        map.graphics.add(new Graphic(ext, line));
        map.setExtent(defineExtent(ext.paths[0], 15));
        break;
      case "esriGeometryPoint":
        map.graphics.clear();

        map.graphics.add(new Graphic(ext, marker));
        var extent = new Extent({
          type: "extent",
          xmin: ext["x"] - 20,
          ymin: ext["y"] - 20,
          xmax: ext["x"] + 20,
          ymax: ext["y"] + 20,
          spatialReference: { wkid: 32641 },
        });
        map.setExtent(extent);
        break;
      case "esriGeometryPolygon":
        map.graphics.clear();
        map.graphics.add(new Graphic(ext, fill));
        map.setExtent(defineExtent(ext.rings[0], 15));
        break;
    }
  }
  // ------- jquery : inser any text at current position of mouse cursor -------------↓
  $.fn.insertAtCaret = function (text) {
    return this.each(function () {
      if (document.selection && this.tagName == "TEXTAREA") {
        //IE textarea support
        this.focus();
        sel = document.selection.createRange();
        sel.text = text;
        this.focus();
      } else if (this.selectionStart || this.selectionStart == "0") {
        //MOZILLA/NETSCAPE support
        startPos = this.selectionStart;
        endPos = this.selectionEnd;
        scrollTop = this.scrollTop;
        this.value =
          this.value.substring(0, startPos) +
          text +
          this.value.substring(endPos, this.value.length);
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
  function showCoordinates(evt) {
    projection.load().then(function () {
      // domStyle.set(dom.byId("downcontainer"), "display", "inline-block");
      var newp = projection.project(evt.mapPoint, wik_web);
      latlong = webMercatorUtils.xyToLngLat(newp.x, newp.y);
      $("#info_x").text("x: " + newp.x.toFixed(3));
      $("#info_y").text("y: " + newp.y.toFixed(3));
      $("#info_long").text("long: " + latlong[1].toFixed(3));
      $("#info_lat").text("lat: " + latlong[0].toFixed(3));

      // dom.byId("infoXY").innerHTML = st;
    });
  }
  function fillLocation(evt, lt, id) {
    // convert coordinated of point to 101200 wkid and display in place
    //evt :event , It property of event ,id :id of dom that result should be refer to
    projection.load().then(function () {
      var newp = projection.project(evt[lt], wik_web);
      $("#" + id).html(
        "X :" + newp.x.toFixed(2) + "<br>" + "Y :" + newp.y.toFixed(2)
      );
    });
  }
  //-------------diplay map inside perfect area------------------//
  function getPageHeight() {
    var n = $(".row").height();
    var body = document.body,
      html = document.documentElement;
    var height =
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) - n;
    return height;
  }

  function getPagewidth() {
    var n = $("#rc").width();
    console.log(n);
    var body = document.body,
      html = document.documentElement;
    var height =
      Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      ) - n;
    return n;
  }
  //-----jquery related functions -----------//
  // alert function
  function alertplacing(
    pretext, //prefex text
    sufftext, //suffix text
    bpart, //bold part
    id, //id of dom (refer to alert)
    removeclass, //class to remove
    addclass, //class to add
    coloor, //background-color to set
    btnId // if it has value then this dom's colore will change to coloor
  ) {
    $(id).removeClass(removeclass);
    $(id).addClass(addclass);
    var str = "<div dir='rtl' class='text-right'><p>";
    str = str + pretext + "<b>" + bpart + "</b>" + sufftext + "</p></div>";
    $(id).html(str);
    $(id)
      .fadeTo(2000, 0.9, "linear")
      .slideUp(1000, "linear", function () {
        $(id).slideUp(1000, "linear");
      });
    if (btnId) {
      $("#" + btnId).css("background-color", coloor);
    }
  }

  function memoryBuild(info) {
    //create memory based on info array
    return (memo = new Memory({
      data: info,
    }));
  }

  function dstoreBuild(evt, name, cond) {
    //creation of info array as feed for memory creation
    // ← build memory
    switch (cond) {
      case 1: // info for queryform layerlist
        var info = arrayUtils.map(evt, function (evt, index) {
          return {
            name: evt[name],
            id: index,
            defaultVisibility: evt["defaultVisibility"],
            description: evt["description"],
          };
        });
        break;
      case 2:
        var info = arrayUtils.map(evt, function (evt) {
          return { name: evt, id: evt };
        });
        break;
      case 3: //prepration parent for tree use in identify widgrt every layer should be pass as an subparent and main parent is just parent
        var info = arrayUtils.map(evt, function (evt, index) {
          return { id: evt["name"], name: evt["name"], parent: "main" };
        });

        break;
      case 5:
        var info = arrayUtils.map(evt, function (evt, index) {
          return { name: evt[name], id: index };
        });
        info.unshift({ name: "همه لایه ها " });
        break;
    }
    return info;
  }

  function comboBuild(
    memory, //memory already created
    id, // id of scrdom
    visibility, //Should this widget respond to user input? In markup, this is specified as "disabled='disabled'", or just "disabled".
    tittle, //HTML title attribute.
    style, // css stytle
    firstvalue, //Corresponds to the native HTML <input> element's attribute.
    onchangeCond, // condition for change event on combobox
    idcon, // id of child combobox which is use in prev variable at 1
    spanset,
    classvalue, // Css class
    plcholder // placeholder
  ) {
    // ← build dijitComboBox

    var combo = new ComboBox(
      {
        disabled: visibility,
        id: id,
        name: id,
        value: firstvalue, //Corresponds to the native HTML <input> element's attribute.
        store: memory,
        searchAttr: "name",
        style: style,
        title: tittle,
        onChange: function (evt) {
          switch (onchangeCond) {
            case 1:
              position = dijit.byId(id)["item"]["id"];
              var fieldInfos = arrayUtils.map(fL[position].fields, function (
                field
              ) {
                return {
                  id: field.name,
                  name: field.alias,
                  type: field.type,
                };
              });
              var templatem = new Memory({
                data: fieldInfos,
              });
              dijit.byId(idcon).attr("store", templatem);
              $("#spanname").html(evt).css({ "font-size": "1.1rem" });
              // dijit.byId("STA_result").attr("value", "");
              break;
            case 2:
              $("#STA_result").insertAtCaret(
                " " + dijit.byId(id)["item"]["id"]
              );
              break;

            case 3:
              var field = dijit.byId("filedcombo")["item"]["id"];
              doQuery(
                position,
                "1=1",
                false,
                map.spatialReference,
                [field],
                returnNamesIso,
                queryEror
              );
              break;
            default:
              break;
          }
          if (spanset) {
            document.getElementById(spanset).innerHTML = dijit.byId(id)["item"][
              "name"
            ];
          }
        },
        onDblClick: function (evt) {
          if (onchangeCond == 2) {
            $("#STA_result").insertAtCaret(" " + dijit.byId(id)["item"]["id"]);
          }
        },
        class: classvalue,
        placeholder: plcholder,
      },
      id
    ).startup();
  }

  function s_TB(id, value, placeholder, style) {
    // ← dijitbuild TextBox
    var textbox = new TextBox(
      {
        id: id,
        name: id,
        value: value,
        placeholder: placeholder,
        style: style,
      },
      id
    ).startup();
  }

  function s_TA(name, rows, cols, style) {
    // ← dijitbuild SimpleTextarea
    var textbox = new SimpleTextarea(
      {
        name: name,
        rows: rows,
        cols: cols,
        style: style,
      },
      name
    ).startup();
  }
  //-----Esri Query----- ↓
  function doQuery(pos, w, ret, sp, outF, func, Efunc) {
    var query = new Query();
    var queryTask = new QueryTask(fL[pos]["url"]);
    query.where = w; //"1=1";
    query.returnGeometry = ret;
    query.outSpatialReference = sp;
    query.outFields = outF; //["*"]
    queryTask.execute(query, func, Efunc);
  }
  // --------Selection on Feature Layer--------------//
  function selectionFeatureLayer(
    pos,
    w,
    ret,
    selectType,
    outF,
    geo,
    func,
    Efunc
  ) {
    var query = new Query();
    query.geometry = geo;
    query.where = w;
    query.returnGeometry = ret;
    query.outFields = outF; //["*"]
    fL[pos].selectFeatures(query, FeatureLayer[selectType], func, Efunc);
    switch (fL[pos]["geometryType"]) {
      case "esriGeometryPolyline":
        fL[pos].setSelectionSymbol(line);
        break;
      case "esriGeometryPolygon":
        fL[pos].setSelectionSymbol(fill);
        break;
      case "esriGeometryPoint":
        fL[pos].setSelectionSymbol(marker);
        break;
      default:
        break;
    }
  }

  function returnNames(req) {
    var field = dijit.byId("FieldNamelist")["item"]["id"];
    var arr = [];
    if (req["fields"][0]["type"] == "esriFieldTypeString") {
      for (var i in req["features"]) {
        arr.push("'" + req["features"][i]["attributes"][field] + "'");
      }
    } else {
      for (var i in req["features"]) {
        arr.push(req["features"][i]["attributes"][field]);
      }
    }

    var unique = arr.filter((v, i, a) => a.indexOf(v) === i);
    unique = unique.sort();
    var string = "";
    for (var i = 0; i < unique.length; i++) {
      string +=
        "<br>" + "<option value= " + unique[i] + ">" + unique[i] + "</option>";
    }
    dom.byId("justgetuniqe").innerHTML = string;
  }

  // ******************************************* ↑ Functions ↑ *****************************************************************

  //----handle and error function of esri request
  var mainstore_identift;
  var lyerIdList = []; // previous version is lyernamelist // list of input id based on mapservice order
  var lyerNameList = []; // list of layer name based on mapservice order
  function handleInfo(req) {
    // console.log(req);
    for (var i in req["layers"]) {
      lyerIdList.push(req["layers"][i]["id"]);
      lyerNameList.push(req["layers"][i]["name"]);
    }
    tablefeaturelayerlistwidget.lyerIdList = lyerIdList;
    tablefeaturelayerlistwidget.lyerNameList = lyerNameList;
    tablefeaturewidget.lyerIdList = lyerIdList;
    tablefeaturewidget.lyerNameList = lyerNameList;
    selctfeaturelayerlistwidget.lyerIdList = lyerIdList;
    selctfeaturelayerlistwidget.lyerNameList = lyerNameList;

    childinfo = [];
    parentinfo = [];
    var mainstore = dstoreBuild(req.layers, "name", 1); //for Feature layer definition or fL on map on load

    mainstore_identift = dstoreBuild(req.layers, "name", 3); //layername info list use in identify task

    var mainstore2 = dstoreBuild(req.layers, "name", 5); //layername Memo

    // for (var i in mainstore) {
    //   childinfo.push(mainstore[i].id);
    // }
    var mem = memoryBuild(mainstore); //all layer name memory use in combobox of layername at query box

    var memfL = memoryBuild(mainstore2); // add "همه لایه ها" to mainstore

    //----------use in report section ↓↓ ---------
    var mem_is = [];
    for (var i in mem.data) {
      switch (mem.data[i].name) {
        case "مشترک":
          mem_is.push(mem.data[i]);
          break;
        case "شیر توزیع ":
          mem_is.push(mem.data[i]);
          break;
        case "علمک":
          mem_is.push(mem.data[i]);
          break;
        // case "پارسل":
        //     mem_is.push(mem.data[i])
        //     break;
        default:
          break;
      }
    }
    memiso = memoryBuild(mem_is);
    // --------------use in report section ↑↑--------------
    comboBuild(
      //filed combobox for query from widget which is empty and fill by onclick at layename combobox
      "",
      "FieldNamelist",
      "",
      "فیلد مد نظر را انتخاب نمایید",
      "width :100% ;height: 2rem;",
      "",
      2,
      "",
      "",
      "",
      "فیلد مد نظر"
    );

    comboBuild(
      //combo box for info button or popUp widget
      memfL,
      "info_LayerNames",
      "",
      "لایه ای که قرار است اطلاعات توصیفی آنها نمایش داده شود را انتخاب نمایید",
      "background-color: white; height: 2rem; border-color: white;",
      "همه لایه ها",
      "",
      "",
      "",
      "",
      "لایه مد نظر"
      // mainstore[0].name
    );
    comboBuild(
      ////combo box for info button or query form
      mem,
      "LayerName",
      "",
      "لایه ای که قرار است جستجوی توصیفی روی آن انجام شود را انتخاب نمایید",
      "width :100% ;",
      "",
      1,
      "FieldNamelist",
      "",
      "",
      "لایه مد نظر"
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
    comboBuild("", "FieldNameLabel", "", "فیلد مد نظر را انتخاب نمایید", "");

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
    );

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
    console.log("error :", req);
  }

  //--------------Dom creations use for All Widgets-------------

  function handlePrintInfo(resp) {
    var layoutTemplate, templateNames, mapOnlyIndex, formatExp;

    layoutTemplate = arrayUtils.filter(resp.parameters, function (param, idx) {
      return param.name === "Layout_Template";
    });
    formatExp = arrayUtils.filter(resp.parameters, function (param, idx) {
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
    var store = dstoreBuild(formatNames, "", 2);
    var mem = memoryBuild(store);
    comboBuild(
      mem,
      "formatExoprt",
      "",
      "فرمت خروجی را انتخاب کنید",
      "",
      mem.data[0].name
    );
    var store = dstoreBuild(templateNames, "", 2);
    var mem = memoryBuild(store);
    comboBuild(
      mem,
      "layoutTemp",
      "",
      "طرح بندی الگو را انتخاب نمایید",
      "",
      mem.data[0].name
    );
    var store = dstoreBuild(dpi, "", 2);
    var mem = memoryBuild(store);
    comboBuild(
      mem,
      "Customdpi",
      "disabled",
      "کیفیت dpi خروجی را تعیین نمایید  ",
      "",
      mem.data[0].name
    );
    //----print div prepration
    // var valTBH = val_TB('disabled', "heightcustom", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "طول کاغذ",
    // true, "right: 0%; width: 20%;");
    // var valTBW = val_TB('disabled', "widthcustom", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "عرض کاغذ",
    //     true, "right: 0%; width: 20%;");
    // var valTB = val_TB('disabled', "CustomScale", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "مقیاس نقشه",
    //     true, "right: 0%; width: 60%;");

    // var valTBY = val_TB('', "ycoor", '^[0-9.,]+$', 'فقط عدد مجاز می باشد', true, true, "را وارد نمایید  X مختصات",
    // true, "left: 0%; width: 30%;");
    // dijit.byId('xcoor').setDisabled(false);
    // dijit.byId('ycoor').setDisabled(false);

    // var valTb = s_TB('authorPrint', '', '', '');
    // var valTt = s_TB('tiitleOfPrint', '', '', '');
    // sel_F("justgetuniqe","",7,"display:none")
    // s_TA("justgetuniqe",7,"","width: 100%; resize:none");
    // s_TA("STA_result", 3, "", "resize:none");

    // checkboxBasedId("dpicheck", ["Customdpi"], false);
    // checkboxBasedId("sizecheck", ["widthcustom", "heightcustom"], false);
    // checkboxBasedId("preserverScelech", ["CustomScale"], false);
  }
  $("#dpicheck").change(function () {
    var r = registry.byId("Customdpi");
    if (r.disabled) {
      r.disabled = "";
    } else {
      r.disabled = "disabled";
    }
  });
  $("#sizecheck").change(function (evt) {
    if ($(this).prop("checked") == true) {
      $("#widthcustom").prop("disabled", false);
      $("#heightcustom").prop("disabled", false);
    } else {
      $("#widthcustom").prop("disabled", true);
      $("#heightcustom").prop("disabled", true);
    }
  });
  $("#preserverScelech").change(function (evt) {
    if ($(this).prop("checked") == true) {
      $("#CustomScale").prop("disabled", false);
    } else {
      $("#CustomScale").prop("disabled", true);
    }
  });

  function handleprintError(err) {
    console.log("Something broke: ", err);
    // alert(err)
  }

  function doprintTask() {
    var scaleL, autorText, titlelText;
    if ($("#authorPrint").text() == "") {
      autorText = "";
    } else {
      autorText = $("#authorPrint").text();
    }
    if ($("#tiitleOfPrint").text() == "") {
      titlelText = "";
    } else {
      titlelText = $("#tiitleOfPrint").text();
    }
    // CustomScale $("#CustomScale").text()
    if ($("#preserverScelech").prop("checked") == true) {
      scaleL = "مقیاس نقشه:  " + $("#CustomScale").text() + " :1 ";
    } else {
      scaleL = "مقیاس نقشه:  " + Math.round(map.getScale()) + " :1 ";
    }
    var printTask = new PrintTask(Prservice, { async: true });
    var plate = new PrintTemplate();
    plate.layout = plate.label = dijit.byId("layoutTemp").value;
    plate.format = dijit.byId("formatExoprt").value;
    (plate.layoutOptions = {
      authorText: autorText,
      // "copyrightText": "<copyright info here>",
      //  "legendLayers": ["layer1","layer2"],
      titleText: titlelText,
      scalebarUnit: "meters",
      customTextElements: [
        {
          ref: scaleL,
        },
      ],
    }),
      (plate.exportOptions = {
        width: 794,
        height: 1123,
        dpi: dijit.byId("Customdpi").value,
      }),
      (plate.preserveScale = $("#preserverScelech").prop("checked"));
    if (plate.preserveScale) {
      plate.outScale = $("#CustomScale").text();
    }
    var params = new PrintParameters();
    params.map = map;
    //  params.outSpatialReference = map.getScale();
    params.template = plate;
    // console.log(params)
    printTask.execute(params, printResult, printError);
  }

  function checkboxBasedId(baseId, referedId, check) {
    // ←build dijitCheckBox
    var checkBox = new CheckBox(
      {
        name: baseId,
        checked: check,
        onChange: function (check) {
          // for (var i in referedId) {
          //     dijit.byId(referedId[i]).setDisabled(check == false);
          // }
        },
      },
      baseId
    ).startup();
  }
  function che() {
    console.log(dijit.byId("info_LayerNames"));
    if (
      dijit.byId("info_LayerNames").value |
      (dijit.byId("info_LayerNames").value == "همه لایه ها")
    ) {
      return (layerID = lyerIdList);
    } else {
      return (layerID = [dijit.byId("info_LayerNames").item.id]);
    }
  }
  function identifyprepration(event) {
    var params = new IdentifyParameters();
    var consVisible = document.getElementById("VisibleConstants").value;
    params.geometry = event.mapPoint;
    params.layerOption = IdentifyParameters[consVisible];
    params.layerIds = che();
    params.mapExtent = map.extent;
    params.returnGeometry = true;
    params.width = map.width;
    params.height = map.height;
    params.spatialReference = map.spatialReference;
    params.tolerance = 30;
    console.log("IdentifyParameters", params);
    return params;
  }
  function identifyjob(mapservice, parameter) {
    var identifyTask = new IdentifyTask(mapservice);
    var defResults = identifyTask.execute(
      parameter,
      onIdentifyComplete,
      onIdentifyError
    );
    return defResults;
  }
  function onIdentifyComplete(request) {
    console.log("onIdentifyComplete", request);
    var memo_tree = memoBuild(request, [
      "layerName",
      "displayFieldName",
      "value",
    ]);
    if (registry.byId("tree")) {
      console.log("widegt already created");
      domConstruct.destroy("customers");
      registry.remove("tree");
      domConstruct.destroy("tree");
      var tree = domConstruct.toDom(
        "<div data-dojo-type='dijit/Tree' id='tree' ></div>"
      );
      domConstruct.place(tree, "treeplace", "only");

      var tree = new Tree(
        {
          model: memo_tree,
          showRoot: false,
          onClick: function (item, node, event) {
            var ext = item["feature"]["geometry"];
            domConstruct.destroy("customers");
            infoTablebuild(item, 1);
            addgraphExt(ext, item);
          },
        },
        "tree"
      ).startup();
    } else {
      var tree = new Tree(
        {
          model: memo_tree,
          showRoot: false,
          onClick: function (item, node, event) {
            var ext = item["feature"]["geometry"];
            domConstruct.destroy("customers");
            infoTablebuild(item, 1);
            addgraphExt(ext, item);
          },
        },
        "tree"
      ).startup();
    }
  }
  function onIdentifyError(request) {
    alert("please check inputs");
    console.log(request);
  }

  function memoBuild(evt, name) {
    // use just for identify manager
    // new_memory.data.unshift(info)

    var info = arrayUtils.map(evt, function (evt, index) {
      return {
        id: evt["layerId"],
        parent: evt[name[0]],
        name: evt[name[0]] + " : " + evt[name[2]] + " :" + evt[name[1]],
        feature: evt["feature"],
        geometryType: evt["geometryType"],
      };
    });
    var layers = [];
    for (var i in info) {
      layers.push(info[i]["id"]);
    }
    var unique = layers.filter((v, i, a) => a.indexOf(v) === i); //non empty layer in every identify task
    console.log("unique", unique);
    var ju = [];
    for (var i in unique) {
      ju.push(mainstore_identift[unique[i]]); // return only uniqe layer names
    }

    var memo_ident = new Memory({
      data: ju, // ju is unique layer name list of nonempty result
      getChildren: function (object) {
        // getchildren use for objectstore and essential in tree dijit widget
        return this.query({ parent: object.id });
      },
    });
    for (var i in info) {
      memo_ident.data.unshift(info[i]);
    }

    memo_ident.data.unshift({
      id: "main",
      name: "عارضه های انتخابی",
    });

    memo_ident = new Observable(memo_ident);

    var myModel = new ObjectStoreModel({
      store: memo_ident,
      query: { id: "main" },
    });

    return myModel;
  }
  function queryEror(err) {
    console.log(err);
  }
  function printResult(result) {
    // domStyle.set("pi", "visibility", "hidden")
    // dijit.byId("print_button").set("label", "پرینت");
    window.open(result.url, "_blank")
}

function printError(error) {
    console.log(error)
        // alert(error);
}

  //***************************** ↑ unorders functions ↑ ****************************//

  //*************************Dom creations***********************************//

  // *************** all type of radio , checkbox ,... Buttons Events ***********************************
  // x and y text box for go to location widget creation
  val_TB(
    "xinput",
    "^[0-9.,]+$",
    "فقط عدد مجاز می باشد",
    true,
    true,
    "را وارد نمایید  X مختصات",
    true,
    "form-control",
    "مختصات x"
  );
  val_TB(
    "yinput",
    "^[0-9.,]+$",
    "فقط عدد مجاز می باشد",
    true,
    true,
    "را وارد نمایید  y مختصات",
    true,
    "form-control",
    "مختصات y"
  );

  // ----- ↓ extent buttons ↓ --------//

  b = dom.byId("zahedanE");
  on(b, "click", function (evt) {
    map.setExtent(zahedanextent);
  });
  b = dom.byId("iranshahrE");
  on(b, "click", function (evt) {
    map.setExtent(iranshahrextent);
  });
  b = dom.byId("zabolE");
  on(b, "click", function (evt) {
    map.setExtent(zabolextent);
  });
  b = dom.byId("bazmanE");
  on(b, "click", function (evt) {
    map.setExtent(bazmanextent);
  });
  b = dom.byId("dalganE");
  on(b, "click", function (evt) {
    map.setExtent(dalganextent);
  });
  b = dom.byId("ostanE");
  on(b, "click", function (evt) {
    map.setExtent(ostanextnet);
  });
  b = dom.byId("iranE");
  on(b, "click", function (evt) {
    map.setExtent(iranextent);
  });
  b = dom.byId("clearmapgraphic");
  on(b, "click", function (evt) {
    map.graphics.clear();
  });
  b = dom.byId("scaleInfo-btn");
  on(b, "click", function (evt) {
    info_scalewidget.show();
  });
  b = dom.byId("print_button");
  on(b, "click", function (evt) {
    doprintTask();
  });

  varsel = 0;
  $("#select_clear").click(function () {
    $(this).prop("disabled", true);
    selctfeaturelayerlistwidget.hide();
    map.graphics.clear();
    selectionToolbar.deactivate();
  });

  selectionTool(); // selection tool find all select- button and based on it's value we define callback
  function selectionTool() {
    var ref = $("[id^='select-']");
    for (var i = 0; i < ref.length; i++) {
      $(ref[i]).click(function (evt) {
        if (varsel == 0) {
          selctfeaturelayerlistwidget.show();
        }
        var t = evt.target.value;
        t = t.toUpperCase();
        gl = 1;
        selectionToolbar.activate(Draw[t]);
        $("#select_clear").prop("disabled", false);
      });
    }
  }

  // ------just for try
  b = dom.byId("report-btn");
  on(b, "click", function (evt) {});
  // ---------- ↑ extent buttons ↑-----------------------//

  // ---------- ↓ go to coordinated related buttons---------//

  $(".dropdown-menu [name=coor_name] ").click(function () {
    // change coordinate selection text based on user selection
    $("#cor_sisytem_selected").text($(this).text());
    $("#cor_sisytem_selected").attr("title", $(this).attr("value"));
    // console.log($($(this)).attr('value'))
  });

  $("#xy_radio").click(function (e) {
    // change  coordinate input text placeholder
    $("#yinput").attr("placeholder", "مختصات y");
    $("#xinput").attr("placeholder", "مختصات x");
  });

  $("#latlong_radio").click(function (e) {
    // change  coordinate input text placeholder
    $("#yinput").attr("placeholder", "عرض جغرافیایی Latitude");
    $("#xinput").attr("placeholder", "طول جغرافیایی Longitude");
  });
  $("#doeslocLabelneed").click(function () {
    // slider button for check of label at result
    if ($(this).is(":checked")) {
      if (loT) {
        map.graphics.add(loT);
      }
    } else {
      if (loT) {
        map.graphics.remove(loT);
      }
    }
  });
  $("#runLocationSearch-btn").click(function () {
    x = parseFloat($("#xinput").val());
    y = parseFloat($("#yinput").val());
    sp = $("#cor_sisytem_selected").attr("title");
    sp = parseInt(sp);
    console.log(sp);
    gotoLocation(x, y, sp);
  });
  $("#clearLocationSearch-btn").click(function () {
    $("#xinput").val("");
    $("#yinput").val("");
    $("#cor_sisytem_selected").text("Web_Mercator (102100)");
    $("#cor_sisytem_selected").attr("title", "102100");
  });

  // ********************* ↑ End of buttons callback and usage

  // ************* ↓ buttons for launching widgets ↓ ******************
  // ----------Query Form widget activation button-----------
  vqueryFrom = 0; // quick search button
  on(dom.byId("queryForm-btn"), "click", function () {
    // var dnd = new Moveable(dom.byId("query-widget"));

    if (vqueryFrom == 0) {
      querywidget.show();
      // domStyle.set(dom.byId('se'), 'display', 'block')
      // tablewidjet.show()
      alertplacing(
        "ابزار جستجوی بر اساس فرم، فعال شده است",
        "",
        "",
        "#alert_slid",
        "alert-danger",
        "alert-success",
        "",
        ""
      );
      vqueryFrom = 1;
    } else {
      querywidget.hide();
      // domStyle.set(dom.byId('se'), 'display', 'none')
      alertplacing(
        "ابزار جستجوی بر اساس فرم، بسته شد",
        "",
        "",
        "#alert_slid",
        "alert-success",
        "alert-danger",
        "",
        ""
      );
      vqueryFrom = 0;
    }
  });

  dom.byId("justgetuniqe").addEventListener("dblclick", function (e) {
    //select box in query form doblue click event
    e.preventDefault();
    $("#STA_result").insertAtCaret(e.target.text);
  });
  b = dom.byId("getUniqueValue"); // show unique value in query form
  on(b, "click", function (evt) {
    var field = dijit.byId("FieldNamelist")["item"]["id"];
    doQuery(
      position,
      "1=1",
      false,
      map.spatialReference,
      [field],
      returnNames,
      queryEror
    );
  });

varheat=0
$('#heatmap-btn').click(function(){
  if(varheat){
    heatmapwidget.hide()
    varheat=0
  }else{
    heatmapwidget.show()
    varheat=1
  }
})


  $(".dropdown-menu [name=seltype]").click(function () {
    //selectiuo type detection for select by attribute query form
    $("#seltype").attr("title", $(this).attr("value"));
    $("#seltype").text($(this).text());
  });

  $(".dropdown-menu [name=seltype0]").click(function () {
    //selectiuo type detection for select by  icons(location)
    $("#seltype0").attr("title", $(this).attr("value"));
    $("#seltype0").text($(this).text());
  });
  var F_extent = "";

  $(".dropdown-menu [name=selc_extent]").click(function (e) {
    console.log($(this));
    $("#exttype").text($(this).text());
    F_extent = cityextent[$(this).attr("value")][$(this).attr("title")];
    console.log(F_extent);
  });
  b = dom.byId("queryRun"); // show unique value in query form
  on(b, "click", function (evt) {
    var input = $("#STA_result").val();
    var selType = "SELECTION_NEW";
    if ($("#seltype").text) {
      selType = $("#seltype").attr("title");
    }

    if ($("#exttype").text) {
      console.log(F_extent);
    } else {
      F_extent = fL[position].geometry;
    }
    var res = selectionFeatureLayer(
      position,
      input,
      true,
      selType,
      ["*"],
      F_extent,
      queryEror,
      queryEror
    );
  });

  // -----------go to location widget activation button-----------
  vLocqsearch = 0; // quick search button
  on(dom.byId("locationsearch-btn"), "click", function () {
    new Moveable(dom.byId("locationsearch-widget"));
    if (vLocqsearch == 0) {
      locationsearchwidjet.show();
      // domStyle.set(dom.byId('se'), 'display', 'block')
      // tablewidjet.show()
      alertplacing(
        "ابزار رفتن به مختصات، فعال شده است",
        "",
        "",
        "#alert_slid",
        "alert-danger",
        "alert-success",
        "",
        ""
      );
      vLocqsearch = 1;
    } else {
      locationsearchwidjet.hide();
      // domStyle.set(dom.byId('se'), 'display', 'none')
      alertplacing(
        "رفتن به مختصات، بسته شد",
        "",
        "",
        "#alert_slid",
        "alert-success",
        "alert-danger",
        "",
        ""
      );
      vLocqsearch = 0;
    }
  });
  // -----------quci search widget activation button-------------
  vqsearch = 0; // quick search button
  on(dom.byId("qsearch-btn"), "click", function () {
    console.log("click");
    if (vqsearch == 0) {
      domStyle.set(dom.byId("se"), "display", "block");
      // tablewidjet.show()
      alertplacing(
        "ابزار جستجوی سریع فعال شده است",
        "",
        "",
        "#alert_slid",
        "alert-danger",
        "alert-success",
        "",
        ""
      );
      vqsearch = 1;
    } else {
      domStyle.set(dom.byId("se"), "display", "none");
      alertplacing(
        "ابزار جستجوی سریع بسته شد",
        "",
        "",
        "#alert_slid",
        "alert-success",
        "alert-danger",
        "",
        ""
      );
      vqsearch = 0;
    }
  });
  // --------identify widget activation button ----------------
  videntify = 0;
  on(dojo.byId("identify-btn"), "click", function () {
    console.log("click");
    if (videntify == 0) {
      infoPopUp.show();
      tablewidjet.show();
      alertplacing(
        "جهت دسترسی به اطلاعات توصیفی لایه ها، بر روی نقشه کلیک نمایید.",
        "میتوانید نوع لایه و یا سطح لایه را نیز تعیین نمایید",
        "",
        "#alert_slid",
        "alert-danger",
        "alert-success",
        "green",
        ""
      );
      videntify = 1;
    } else {
      infoPopUp.hide();
      tablewidjet.hide();
      videntify = 0;
    }
  });
  vmeasure = 0;
  on(dojo.byId("measure-btn"), "click", function () {
    if (vmeasure == 0) {
      domStyle.set("mes", "display", "block");
      vmeasure = 1;
    } else {
      domStyle.set("mes", "display", "none");
      vmeasure = 0;
    }
  });

  // ---tableatrribute layer selectiopn widget
  vLFtable = 0;
  on(dojo.byId("featureTable-btn"), "click", function () {
    if (vLFtable == 0) {
      tablefeaturelayerlistwidget.show();
      vLFtable = 1;
    } else {
      tablefeaturelayerlistwidget.hide();
      vLFtable = 0;
    }
  });
  //  table atribute widget
  vFtable = 0;
  on(dojo.byId("attributetable-btn"), "click", function () {
    if (vFtable == 0) {
      tablefeaturewidget.show();
      vFtable = 1;
    } else {
      tablefeaturewidget.hide();
      vFtable = 0;
    }
  });

  // -----------Legend widget activation button------------------------
  vlegend = 0;
  on(dojo.byId("legend-btn"), "click", function () {
    if (vlegend == 0) {
      legend.show();
      vlegend = 1;
    } else {
      legend.hide();
      vlegend = 0;
    }
  });
  vlayerlist = 0;
  on(dojo.byId("layerlist-btn"), "click", function () {
    if (vlayerlist == 0) {
      layList.show();
      vlayerlist = 1;
    } else {
      layList.hide();
      vlayerlist = 0;
    }
  });
  //  -----------------Navigaton widget activation button---------------
  varnav = 0;
  on(dojo.byId("navigation-btn"), "click", function () {
    if (varnav == 0) {
      navb.show();
      varnav = 1;
    } else {
      navb.hide();
      varnav = 0;
    }
  });
  //  -----------Navigation Buttons--------------------------
  on(dojo.byId("zoomin"), "click", function () {
    navToolbar.activate(Navigation.ZOOM_IN);
  });
  on(dojo.byId("zoomout"), "click", function () {
    navToolbar.activate(Navigation.ZOOM_OUT);
  });
  on(dojo.byId("zoomprev"), "click", function () {
    navToolbar.zoomToPrevExtent();
  });
  on(dojo.byId("zoomnext"), "click", function () {
    navToolbar.zoomToNextExtent();
  });
  on(dojo.byId("deactivate"), "click", function () {
    navToolbar.deactivate();
  });
  // -------Print widget activation button---------------------
  varprint = 0;
  on(dojo.byId("print-btn"), "click", function () {
    if (varprint == 0) {
      printwidjet.show();
      varprint = 1;
    } else {
      printwidjet.hide();
      varprint = 0;
    }
  });
  // --------Base Map buttons Creations---------------------
  new ToggleButton(
    {
      showLabel: true,
      checked: false,
      onChange: function (val) {
        if (!val) {
          alertplacing(
            "نقشه پایه آخرین تصویر ماهواره ای گوگل ارث ",
            "حذف شد ",
            "google earth",
            "#alert_slid",
            "alert-success",
            "alert-danger",
            "red",
            "googlemap"
          );
          map.removeLayer(wmsLayer);
        } else {
          alertplacing(
            "نقشه پایه آخرین تصویر ماهواره ای گوگل ارث ",
            "اضافه شد ",
            "google earth",
            "#alert_slid",
            "alert-danger",
            "alert-success",
            "green",
            "googlemap"
          );
          map.addLayers([wmsLayer]);
        }
      },
      title: "نقشه پایه آخرین تصویر ماهواره ای گوگل ارث",
    },
    "googlemap"
  ).startup();

  new ToggleButton(
    {
      showLabel: true,
      checked: false,
      onChange: function (val) {
        if (val) {
          alertplacing(
            "نقشه معابر و خیابان ها",
            "حذف شد ",
            " OSM (open street)",
            "#alert_slid",
            "alert-success",
            "alert-danger",
            "red",
            "osm"
          );

          map.removeLayer(OSMmap);
        } else {
          alertplacing(
            "نقشه معابر و خیابان ها",
            "اضافه شد ",
            " OSM (open street)",
            "#alert_slid",
            "alert-danger",
            "alert-success",
            "green",
            "osm"
          );
          map.addLayers([OSMmap]);
        }
      },
      title: "نقشه پایه معابر و خیابان ها OSM",
    },
    "osm"
  ).startup();

  new ToggleButton(
    {
      showLabel: true,
      checked: false,
      onChange: function (val) {
        console.log(val);
        if (val) {
          map.addLayers([wmsLayer]);
        } else {
          map.removeLayer(wmsLayer);
        }
      },
      title: "نقشه پایه پارسل شهر",
    },
    "parcel"
  ).startup();

  // ******************************* Add layer****************************************//
  map.addLayer(OSMmap);

  //---↓ add feature Layer to map
  var fL = []; //feature Layers
  var fT = []; //feature tables

  function addFeatureL(evt) {
    //   var tc = new TabContainer({
    //     style: "height: 100%; width: 100%;"
    // }, "ft");

    // var cp1 = new ContentPane({
    //     title: "First Tab",
    //     content: "We offer amazing food"
    // });
    // tc.addChild(cp1);

    // var cp2 = new ContentPane({
    //     title: "Second Tab",
    //     content: "We are known for our drinks."
    // });
    // tc.addChild(cp2);

    // var cp3 = new ContentPane({
    //     title: "Third Tab",
    //     content: "This Tab has the attribute 'selected: true' set.",
    //     selected: true
    // });
    // tc.addChild(cp3);

    // tc.startup();
    for (var i in evt.data) {
      var feature = new FeatureLayer(mservice + "/" + evt.data[i].id, {
        id: evt.data[i].name,
        mode: FeatureLayer.MODE_ONDEMAND,
        showLabels: true,
        visible: evt.data[i].defaultVisibility,
        advancedQueryCapabilities: {
          supportsPagination: true,
          supportsQueryWithDistance: true,
          supportsReturningQueryExtent: true,
          supportsStatistics: true,
          supportsOrderBy: true,
          supportsDistinct: true,
          supportsQueryWithCacheHint: true,
        },
        description: evt.description,
        outFields: ["*"],
      });
      // create new FeatureTable and set its properties

      // var li = domConstruct.create(
      //   "li",
      //   { class: "nav-item" },
      //   "basOffetureTable",
      //   "last"
      // );
      // // <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
      // var a_li = domConstruct.create(
      //   "a",
      //   {
      //     class: "nav-link active",
      //     "data-toggle": "tab",
      //     href: "#id_" + evt.data[i].id,
      //     innerHTML: 'number'+evt.data[i].id,
      //   },
      //   li,
      //   "only"
      // );
      // if(evt.data[i].id==0){
      //   var divTab=domConstruct.create(
      //     'div',
      //     {id:'id-'+ evt.data[i].id, class:"container tab-pane active"},
      //     'divOdtab',
      //     'last'
      //   )
      // }
      // var divTab=domConstruct.create(
      //   'div',
      //   {id:'id_'+ evt.data[i].id, class:"container tab-pane fade"},
      //   'divOdtab',
      //   'last'
      // )
      // // var brTab=domConstruct.create(
      // //   'br',
      // //   '',
      // //   divTab,
      // //   'last'
      // // )
      // var fDivTab=domConstruct.create(
      //   'p',
      //   {innerHTML:evt.data[i].name},
      //   divTab,
      //   'last'
      // )
      fL.push(feature);
    }
    map.addLayers(fL);

    tablefeaturewidget.featurelayer = fL;

    return fL;
  }
  //---↑ add feature Layer to map

  //----------------------Map Events--------------------------------//
  map.on("layer-add", function () {
    alertplacing(
      "نقشه معابر و خیابان ها",
      "اضافه شد ",
      " OSM (open street)",
      "#alert_slid",
      "alert-danger",
      "alert-success",
      "green",
      "osm"
    );
  });
  map.on("load", initSelectToolbar); // call draw toolboxes

  map.on("load", function () {
    map.on("mouse-move", showCoordinates);
    map.on("mouse-drag", showCoordinates);
  });
  map.on("layers-add-result", function (evt) {
    var layerInfos = [];
    var snapManager = map.enableSnapping({
      snapKey: has("mac") ? keys.META : keys.CTRL,
    });
    layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
      layerInfos.push({
        layer: layer.layer,
      });

      return { layer: layer.layer, title: layer.layer.name };
    });
    if (layerInfo.length > 0) {
      var legendDijit = new Legend(
        {
          map: map,
          layerInfos: layerInfo,
          autoUpdate: true,
          font: {
            // autocast as, esri/symbols/Font
            size: 20,
            family: "CalciteWebCoreIcons",
          },
        },
        "legendDiv"
      );
      legendDijit.startup();
      var myLayerList = new LayerList(
        {
          map: map,
          showLegend: true,
          showSubLayers: true,
          showOpacitySlider: true,
          visible: true,
          layers: [], // show all layers
        },
        "layerList"
      );
      myLayerList.startup();
    }
    // search.set("sources", sources);
    // search.startup();
    // search.clear();
    snapManager.setLayerInfos(layerInfos);
  });
  map.on("click", function (event) {
    console.log(videntify);
    if (videntify) {
      fillLocation(event, "mapPoint", "locationBox");
      var results = identifyjob(mservice, identifyprepration(event));
    }

    // <p> جهت دسترسی به اطلاعات توصیفی ابتدا <b> لایه مد نظر </b> را انتخاب نمایید و سپس روی نقشه
    // کلیک نمایید </p>
  });
  // --------------------------------------------------------------------//
});
