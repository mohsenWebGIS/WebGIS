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

  "dojo/text!./templates/print.html",

  "esri/tasks/IdentifyParameters",
  "esri/tasks/IdentifyTask",
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
  Memory, ObjectStoreModel, Tree,
  registry
) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

      baseClass: "info-right globalWidget",
      // declaredClass: "globalWidget",
      templateString: dijitTemplate,
      constructor: function ( srcRefNode) {

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

      },
      hide: function () {
        this.openwind('none');

      },

    });
  });
