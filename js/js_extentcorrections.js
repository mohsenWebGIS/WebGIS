//     /* code goes here */
require([


  "esri/map",
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




  "app/navigationbar",

  "dojo/on",
  "dojo/dom",
  "dojo/parser",
  "dojo/dom-style",
  "dojo/domReady!"


], function (

  Map,
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

  widget_navigation,

  on,
  dom,
  parser,
  domStyle
) {
  parser.parse();
  //  -------esri defualt config--------------//
  var gsv = new GeometryService("https://192.168.56.5:6443/arcgis/rest/services/Utilities/Geometry/GeometryServer");
  esriConfig.defaults.geometryService = gsv;


  // -------define variables/links----------//
  var osmUrl = "https://192.168.56.5:6443/arcgis/rest/services/osm/osm/MapServer";

  //----------------------------------------//

  var map = new Map("map", {
    //  basemap:'osm',
    sliderStyle: "small",
    attributionWidth: 0.8,
    autoResize: true,
    showAttribution: false,
    logo: false,
    showLabels: true,
  });

  domStyle.set("map", "height", getPageHeight() + "px");
  domStyle.set("map", "width", getPagewidth() + "px");
  //-------------diplay map inside perfect area------------------//
  function getPageHeight() {
    var n = $(".row").height()
    var body = document.body,
      html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight) - n;
    return height;
  }

  function getPagewidth() {
    var n = $("#rc").width()
    console.log(n)
    var body = document.body,
      html = document.documentElement;
    var height = Math.max(body.scrollWidth, body.offsetWidth,
      html.clientWidth, html.scrollWidth, html.offsetWidth) - n;
    return n;
  }





  //---------------add layer-------------------------------------//
  //  ---add osm dynamic layer--------------

  var OSMmap = new ArcGISDynamicMapServiceLayer(osmUrl, {
    "opacity": .8,
    showAttribution: false,

  });
  map.addLayer(OSMmap);
  // -----------------------------extnet for maps---------------------------------//
  var zahedanextent = new Extent({
    type: "extent",
    xmin: 278679.621791593,
    ymin: 3255746.9272052944,
    xmax: 306066.45903770305,
    ymax: 3271090.467567784,
    spatialReference: {
      wkid: 32641
    }

  });
  var zabolextent = new Extent({
    type: "extent",
    xmin: 354441.2984920292,
    ymin: 3433416.462451934,
    xmax: 362045.4387003096,
    ymax: 3436369.2183574457,
    spatialReference: {
      wkid: 32641
    }
  })
  var iranshahrextent = new Extent({
    type: "extent",
    xmin: 253063.27295980437,
    ymin: 3002046.059992162,
    xmax: 286372.16285154794,
    ymax: 3017216.812737956,
    spatialReference: {
      wkid: 32641
    }
  })
  var ostanextnet = new Extent({
    type: "extent",
    xmin: -226149.02386459816,
    ymin: 2718434.581978149,
    xmax: 839735.4526711968,
    ymax: 3203898.669843561,
    spatialReference: {
      wkid: 32641
    }
  })
  var iranextent = new Extent({
    type: "extent",
    xmin: -2266352.8010111307,
    ymin: 2053129.534664718,
    xmax: 1997185.1051320503,
    ymax: 3994985.886126367,
    spatialReference: {
      wkid: 32641
    }
  })
  wik_web = new SpatialReference({ wkid: 102100 });
  function extnetToPoints(ex) {

  }

  if (!projection.isSupported()) {
    alert("client-side projection is not supported");
    return;
  }

  // projection.load().then(function(){
  //   zahedanextent= projection.project(zahedanextent,wik_web)
  //   zabolextent= projection.project(zabolextent,wik_web)
  //   iranshahrextent= projection.project(iranshahrextent,wik_web)
  //   ostanextnet= projection.project(ostanextnet,wik_web)
  //   iranextent= projection.project(iranextent,wik_web)
  //   });

  // -----extent buttons--------//

  // map.setExtent(zahedanextent)
  b = dom.byId("zahedanE");
  on(b, "click", function (evt) {
    map.setExtent(zahedanextent);
  });
  b = dom.byId("iranshahrE")
  on(b, "click", function (evt) {
    map.setExtent(iranshahrextent);
  });
  b = dom.byId("zabolE")
  on(b, "click", function (evt) {
    map.setExtent(zabolextent);
  });
  b = dom.byId("ostanE")
  on(b, "click", function (evt) {
    map.setExtent(ostanextnet);
  });
  b = dom.byId("iranE")
  on(b, "click", function (evt) {
    map.setExtent(iranextent);
  });


  //--------↓ overview -----------

  var overviewMapDijit = new OverviewMap({
    map: map,
    visible: false,
    attachTo: "bottom-right",
    expandFactor: 10,
    height: 400
  });
  overviewMapDijit.startup();

  //----↓---scalebar button----
  var scalebar = new Scalebar({
    map: map,
    attachTo: "bottom-left",
    scalebarUnit: 'dual'
  }, dojo.byId("scale-widget"));
  //----↑---scalebar button----

  map.on("load", function () {

    //after map loads, connect to listen to mouse move & drag events

    map.on("mouse-move", showCoordinates);
    map.on("mouse-drag", showCoordinates);
  });
  map.setExtent(zahedanextent);

  function showCoordinates(evt) {
    projection.load().then(function () {
      // zahedanextent= projection.project(zahedanextent,wik_web)
      // zabolextent= projection.project(zabolextent,wik_web)
      // iranshahrextent= projection.project(iranshahrextent,wik_web)
      // ostanextnet= projection.project(ostanextnet,wik_web)
      // iranextent= projection.project(iranextent,wik_web)
      var newp = projection.project(evt.mapPoint, wik_web)




      //the map is in web mercator but display coordinates in geographic (lat, long)
      // var cd=webMercatorUtils.project(evt.mapPoint,wik_web)
      // var latlon=webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y)
      // // console.log(latlon)
      // var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
      // // console.log(evt)
      // //display mouse coordinates
      // var xC, yC;
      // XYc = webMercatorUtils.lngLatToXY(mp.x, mp.y);
      latlong = webMercatorUtils.xyToLngLat(newp.x, newp.y)

      // var st='<table class="table-hover"><tr><th>مختصات بر حسب x,y</th><td>'+ "X :" +newp.x.toFixed(3) + ", " + "Y :" + newp.y.toFixed(3)+'</td></tr>';
      // st=st+'<th> طول و عرض جغرافیلیی</th><td>'+'log: '+latlong[0].toFixed(3)+'lat :'+latlong[1].toFixed(3) +'</td></tr></table>';

      st = '<div class="container"><table class="table table-striped table-hover"><thead><tr><th>مختصات بر حسب x,y</th><th> طول و عرض جغرافیلیی</th></tr></thead>'
      st = st + '<tbody><tr><td>' +'X :' +newp.x.toFixed(3) + "<br>" + "Y :" + newp.y.toFixed(3) + '</td> <td>' + 'long: '+ latlong[0].toFixed(3) +'<br>'+ 'lat :' + latlong[1].toFixed(3)
      st + st + '</td></tr></tbody></table></div>'

      dom.byId("infoXY").innerHTML = st;


    });
  }




});