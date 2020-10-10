define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/dom",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_OnDijitClickMixin",

  "dojo/text!./templates/report_map.html",

  "esri/tasks/IdentifyParameters",
  "esri/tasks/IdentifyTask",
  "esri/map",

  "dojo/store/Memory",
  "dijit/tree/ObjectStoreModel",
  "dijit/Tree",
  "dijit/registry",
  
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane",
  "dijit/layout/TabContainer",
], function (
  declare, arrayUtils, lang,
  dom, domStyle,
  domConstruct,
  _WidgetBase, _TemplatedMixin, _OnDijitClickMixin,
  dijitTemplate,
  IdentifyParameters, IdentifyTask,
  map,
  Memory, ObjectStoreModel, Tree,
  registry
) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

      baseClass: "map-left-up globalWidget",
      // declaredClass: "globalWidget",
      templateString: dijitTemplate,
      constructor: function (options, srcRefNode, kwArgs) {
        lang.mixin(this, kwArgs);

        if (typeof srcRefNode === "string") {
          srcRefNode = dom.byId(srcRefNode)
        }
        this.domNode = srcRefNode;
      },
      openwind:function(own){
        // domStyle.set("identify-widget", "display", 'none');
        // domStyle.set("report-popUp-widget", "display", 'none');
        // domStyle.set("query-popUp-widget", "display", 'none');

        domStyle.set(this.domNode, "display", own);
      },

      show: function () {
        this.openwind('block');
        this.addmap()

      },
      hide: function () {
        this.openwind('none');

      },
      addmap:function(){
        var map = new Map("mapP", {
           basemap:'osm',
          sliderStyle: "small",
          attributionWidth: 0.8,
          autoResize: true,
          showAttribution: false,
          logo: false,
          showLabels: true,
        });
      }

    });
  });
