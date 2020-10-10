define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/query",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",

    "dojo/text!./templates/locator.html",
    "esri/tasks/IdentifyParameters",
    "esri/tasks/IdentifyTask",
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    "dijit/Tree",
    "dijit/registry",
    "esri/geometry/Extent",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "esri/Color",
    "esri/geometry/Point",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/TabContainer",
], function(
    declare, arrayUtils, lang,
    dom, query,
    domStyle,
    domConstruct,
    _WidgetBase, _TemplatedMixin, _OnDijitClickMixin,
    dijitTemplate,
    IdentifyParameters, IdentifyTask,
    Memory, ObjectStoreModel, Tree,
    registry,
    Extent, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Graphic, Color,
    Point
) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

        baseClass: "locator-center",
        declaredClass: "y2k.Census",
        templateString: dijitTemplate,
        constructor: function(options, srcRefNode) {

            if (typeof srcRefNode === "string") {
                srcRefNode = dom.byId(srcRefNode)
            }

            this.identifyTask = new IdentifyTask(options.mapService);
            this.map = options.map || null;
            this.domNode = srcRefNode;
            this.queryRequst = options.queryreq;
        },
        wind: function(own) {
            domStyle.set("print-widget", "display", 'none');
            domStyle.set(this.domNode, "display", own);
            dom.byId("locationBox").innerHTML = "";
            registry.remove("tree")
            domConstruct.destroy("tree");
            domConstruct.destroy("customers");
            domConstruct.destroy("L0");
            domConstruct.destroy("L1");
        },
        show: function() {
            this.wind('block')
        },
        hide: function() {
            this.wind('none');
            this.clean();
        },
        clean: function() {
            map.graphics.clear();
            dijit.byId("xcoor").set("value", "");
            dijit.byId("ycoor").set("value", "");
        },
        locate: function(x, y, sp) {
            map.graphics.clear();
            var marker = new PictureMarkerSymbol();
            marker.setOffset(0, 20);
            marker.setHeight(40);
            marker.setWidth(40);
            marker.setUrl("/css/SVG/placeholder.svg");
            var lo = new Graphic(new Point(x, y, sp), marker);
            map.graphics.clear();
            map.graphics.add(lo);
            var searchpPExtent = lo._extent;
            searchpPExtent.xmin = parseFloat(searchpPExtent.xmin) - 60;
            searchpPExtent.xmax = parseFloat(searchpPExtent.xmax) + 60;
            searchpPExtent.ymin = parseFloat(searchpPExtent.ymin) - 60;
            searchpPExtent.ymax = parseFloat(searchpPExtent.ymax) + 60;
            map.setExtent(searchpPExtent, true);
        }
    });
});