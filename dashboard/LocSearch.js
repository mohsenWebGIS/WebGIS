define([
  "dojo/_base/declare",
  "dojo/dom",
  "dojo/dom-style",

  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_OnDijitClickMixin",
  "dojo/text!./templates/LocationSearch.html",

  "esri/symbols/PictureMarkerSymbol",
  "esri/graphic",
  "esri/geometry/Point",

], function (
  declare,
  dom,
  domStyle,

  _WidgetBase,
  _TemplatedMixin,
  _OnDijitClickMixin,
  dijitTemplate,

  PictureMarkerSymbol,
  Graphic,
  Point


) {
  return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

    baseClass: "search-base",
    declaredClass: "globalwidget",
    templateString: dijitTemplate,
    constructor: function (srcRefNode) {

      if (typeof srcRefNode === "string") {
        srcRefNode = dom.byId(srcRefNode)
      }
      this.domNode = srcRefNode;
    },
    openwind: function (own) {
      domStyle.set(this.domNode, "display", own);
    },
    show: function () {
      this.openwind('block');
    },
    hide: function () {
      this.openwind('none');
      vLocqsearch = 0
    }

  });
});