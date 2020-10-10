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

  "report/navigationbar",
  "report/Pop",
  "report/legend",
  "report/layerlist",
  "report/printW",
  "report/tableOfInfo",
  "report/LocSearch",
  "report/queryForm",
  "report/heatmap",
  "report/featureTable",
  "report/featureTableLayerList",
  "report/selectFeatureLayerList",
  // ↓guage
  "dojox/gauges/AnalogGauge",
  "dojox/gauges/AnalogArrowIndicator",
  "dojox/gauges/AnalogLineIndicator",
  "dojox/gauges/TextIndicator",
  // pie ↓
  "dojox/charting/Chart2D",
  "dojox/charting/plot2d/Pie",
  "dojox/charting/action2d/Highlight",
  "dojox/charting/action2d/MoveSlice",
  "dojox/charting/action2d/Tooltip",
  "dojox/charting/themes/Ireland",
  "dojox/charting/themes/Bahamation",
  "dojox/charting/themes/Algae",
  "dojox/charting/themes/Electric",
  "dojox/charting/themes/Charged",
  "dojox/charting/themes/CubanShirts",

  // "dojox/charting/themes/BlueDusk",
  "dojox/charting/widget/Legend",
  "dojox/charting/plot2d/ClusteredColumns",

  "dojox/charting/widget/SelectableLegend",

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

  AnalogGauge,
  AnalogArrowIndicator,
  AnalogLineIndicator,
  TextIndicator,

  Chart2D,
  Pie,
  Highlight,
  MoveSlice,
  Tooltip,
  Ireland,
  Bahamation,
  Algae,
  Electric,
  Charged,
  CubanShirts,
  // BlueDusk,

  Legend,
  ClusteredColumns,

  SelectableLegend,

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

  var line2 = new SimpleLineSymbol();
  line2.setWidth(1);
  var fill = new SimpleFillSymbol();
  // fill.setColor(new Color([115, 255, 223, 0.19]));
  fill.setColor(new Color([255, 0, 0, 0.19]));
  fill.setOutline(line2);
  var map = new Map("reportmap", {
    // basemap: "osm",
    // center: [60.86, 29.5], // long, lat

    // zoom: 8,
    sliderStyle: "small",
    attributionWidth: 0.8,
    autoResize: true,
    showAttribution: false,
    logo: false,
    showLabels: true,
  });


  var OSMmap = new ArcGISDynamicMapServiceLayer(osmUrl, {
    opacity: 0.5,
    showAttribution: false,
    displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  });
  console.log(cityextent)
  map.addLayers([OSMmap]);
  map.setExtent(cityextent[0]['zahedanextent']);


  $(".dropdown-menu [name=selc_extent]").click(function (e) {
    $("#exttype").text($(this).text());
    F_extent = cityextent[$(this).attr("value")][$(this).attr("title")];
    map.setExtent(F_extent)
  });
var fId=[3,5,7,8,10]
var fNames=['cleints','reiser','azbuiltD','designD','AzbuiltF']
var querysitation=[1,1,2,2,2]
  // {'3':'client'},{'5':'reiser'}]

  featureLasyers=[]
for (var i in fId){
  addfeature(fId[i],fNames[i])

}

 function addfeature(id,name){
  var feature = new FeatureLayer(mservice + "/" + id, {
    id: name,
    mode: FeatureLayer.MODE_ONDEMAND,
    showLabels: true,
    visible: true,
    advancedQueryCapabilities: {
      supportsPagination: true,
      supportsQueryWithDistance: true,
      supportsReturningQueryExtent: true,
      supportsStatistics: true,
      supportsOrderBy: true,
      supportsDistinct: true,
      supportsQueryWithCacheHint: true,
    },
    // description: description,
    outFields: ["*"],
  });
  map.addLayer(feature)
  featureLasyers.push(feature)
 }
map.on('extent-change',executequery)
function executequery(){
// for(var i in fNames ){
doQuery(featureLasyers,2,'1=1',map.extent,efunc,Efunc,2)
// }
// console.log(map.extent)
}
function doQuery(fl,pos, w,geo,efunc, Efunc,qi) {
  var query = new Query();
  var queryTask = new QueryTask(fl[pos]["url"]);
  query.where = w; //"1=1";
  query.geometry = geo;
  query.returnGeometry = false;
  query.outSpatialReference = map.spatialReference;
  query.outFields = ["*"]
  if(qi==1){
    queryTask.executeForCount(query, efunc, Efunc);
  }else{
    queryTask.execute(query, efunc, Efunc);
  }
}
function efunc(req){
  console.log(req)
}
function Efunc(req){
  console.log(req)
}
  // var secondGuage=initg('gauge2',26,15)
  var t1 = "درصد شبکه توزیع که تزریق گاز شده است";
  var t2 = "درصد شبکه تغذیه که تزریق گاز شده است";
  var c1 = "blue";
  var c2 = "black";
  var t3 = "درصد شبکه توزیع که اجرا شده است";
  var t4 = "درصد شبکه تغذیه که اجرا شده است";
  var firstGauge = initg("gauge1", [
    arrowInd(55, t1, c1),
    arrowInd(25, t2, c2),
  ]);
  var firstGauge = initg("gauge2", [
    arrowInd(70, t3, c1),
    arrowInd(15, t4, c2),
  ]);

  function arrowInd(inputV, t, c) {
    var ar = new AnalogArrowIndicator({
      // 'id': 'value',
      value: inputV,
      width: 5,
      label: inputV,
      font: {
        family: "Helvetica",
        weight: "bold",
        style: "italic",
        size: "14pt",
        rotated: true,
      },
      title: t,
      offset: 0,
      color: c,
      tooltip: inputV + "%",
      noChange: true,
    });
    return ar;
  }
  function initg(donId, ind) {
    var gauge;
    var ranges1 = [
      { low: 0, high: 30, hover: "5 - 10", color: "red" },
      { low: 30, high: 60, hover: "5 - 10", color: "orange" },
      { low: 60, high: 100, hover: "5 - 10", color: "green" },
    ];
    gauge = dojo.byId(donId);
    gauge = new AnalogGauge(
      {
        id: donId,
        width: "100%",
        height: 150,
        cx: 300,
        cy: 140,
        radius: 105,
        title: "درصد شبکه توزیع که تزریق گاز شده است",
        ranges: ranges1,
        startAngle: -90,
        endAngle: 90,
        min: 0,
        max: 100,
        tooltip: "ssss",
        useTooltip: false,
        hideValues: true,
        minorTicks: {
          offset: 105,
          interval: 5,
          length: 5,
          color: "red",
        },
        majorTicks: {
          offset: 105,
          interval: 10,
          length: 10,
          color: "blue",
        },
        indicators: ind,
      },
      gauge
    );
    gauge.startup();
    return gauge;
  }
  var spie = piechartr("chartTwo0", "legendTwo0", "Charged");

  var fpie = piechartr("chartTwo", "legendTwo", "CubanShirts");


  var i = 0;
  $("#check").click(function () {
    var r = registry.byId("gauge1");
    r.destroy();
    var row = domConstruct.create(
      "div",
      { id: "gauge1" },
      "base_gaue1",
      "last"
    );
    var firstGauge = initg("gauge1", [
      arrowInd(5 + i, t3, c1),
      arrowInd(10 + i, t4, c2),
    ]);
    i += 5;
    // firstGauge.destroy()
    // var firstGauge=initg('gauge1',85)//.indicators[arrowInd(55)]
    // gauge.set(gauge.indicators[0].value, 12);
  });
  $("#c2").click(function () {
    spie.removeSeries("Series A");
    spie.addSeries("Series b", [
      { y: 4200, text: "B", stroke: "black", tooltip: "Red is 50%" },
      { y: 900, text: "V", stroke: "black", tooltip: "Red is 50%" },
    ]);
    spie.render();
  });

  function piechartr(mainId, legId, theme) {
    var dc = dojox.charting;
    var chartTwo = new Chart2D(mainId);
    chartTwo
      .setTheme(dc.themes[theme])
      .addPlot("default", {
        type: "Pie",
        font: "normal normal 11pt Tahoma",
        fontColor: "white",
        labelOffset: -10,
        radius: 130,
      })
      .addSeries("Series A", [
        { y: 4200, text: "B", stroke: "black", tooltip: "Red is 50%" },
        { y: 900, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 120, text: "C", stroke: "black", tooltip: "Red is 50%" },
        { y: 60, text: "D", stroke: "black", tooltip: "Red is 50%" },
        { y: 180, text: "F", stroke: "black", tooltip: "Red is 50%" },
        { y: 60, text: "H", stroke: "black", tooltip: "Red is 50%" },
        { y: 120, text: "G", stroke: "black", tooltip: "Green is 25%" },
        { y: 60, text: "B", stroke: "black", tooltip: "I am feeling Blue!" },
      ])
      .resize(300, 300);
    var anim_a = new MoveSlice(chartTwo, "default");
    var anim_b = new Highlight(chartTwo, "default");
    var anim_c = new Tooltip(chartTwo, "default");
    chartTwo.render();
    var selectableL = new SelectableLegend({ chart: chartTwo }, legId);
    return chartTwo;
  }

  var cl01 = clustercolumn("columchrt01", "legcolumchrt01", "Charged");
  console.log(cl01.fullGeometry());
  clustercolumn("columchrt02", "legcolumchrt02", "CubanShirts");
  function clustercolumn(mainId, legId, theme) {
    // draw ClusteredBars horizontal chart
    var dc = dojox.charting;
    var chartTwo = new Chart2D(mainId);
    chartTwo
      .setTheme(dc.themes[theme])
      .addPlot("default", {
        type: "ClusteredColumns",
        font: "normal normal 11pt Tahoma",
        fontColor: "black",
        labelOffset: -10,
        // radius: 100,
      })
      .addAxis("x")
      .addAxis("y", { vertical: true, includeZero: true })
      .addSeries("Series A", [
        { y: 4200, text: "8in", stroke: "black", tooltip: "Red is 50%" },
        { y: 900, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 120, text: "C", stroke: "black", tooltip: "Red is 50%" },
        { y: 900, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 120, text: "C", stroke: "black", tooltip: "Red is 50%" },
        { y: 900, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 120, text: "C", stroke: "black", tooltip: "Red is 50%" },
        { y: 900, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 120, text: "C", stroke: "black", tooltip: "Red is 50%" },
      ])
      .addSeries("Series B", [
        { y: 2200, text: "B", stroke: "black", tooltip: "Red is 50%" },
        { y: 500, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 60, text: "C", stroke: "black", tooltip: "Red is 50%" },
        { y: 2200, text: "B", stroke: "black", tooltip: "Red is 50%" },
        { y: 500, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 60, text: "C", stroke: "black", tooltip: "Red is 50%" },
        { y: 2200, text: "B", stroke: "black", tooltip: "Red is 50%" },
        { y: 500, text: "V", stroke: "black", tooltip: "Red is 50%" },
        { y: 60, text: "C", stroke: "black", tooltip: "Red is 50%" },
      ])
      .resize(450, 300);
    var anim_a = new MoveSlice(chartTwo, "default");
    var anim_b = new Highlight(chartTwo, "default");
    var anim_c = new Tooltip(chartTwo, "default");
    chartTwo.render();
    var selectableL = new SelectableLegend({ chart: chartTwo }, legId);
    // var legendTwo = new Legend(
    //   { chart: chartTwo },
    //   legId
    // );
    return chartTwo;
  }
});
// --------------------------------------------------------------------//
