define([
  "dojo/_base/declare",
  // "dojo/_base/array",
  // "dojo/_base/lang",
  "dojo/dom",
  "dojo/dom-style",
  // "dojo/dom-construct",
  // "appMain/Pop",

  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_OnDijitClickMixin",

  "dojo/text!./templates/queryForm.html",
  //  "dijit/registry",
  //  "dijit/layout/TabContainer",
  //  "dijit/layout/BorderContainer",
  //  "dijit/layout/ContentPane",
], function (
  declare,
  // arrayUtils,
  // lang,
  dom,
  domStyle,
  // domConstruct,
  // PopUp,
  _WidgetBase,
  _TemplatedMixin,
  _OnDijitClickMixin,
  dijitTemplate
  //  registry,
  //  TabContainer,
  //   ContentPane
) {
  return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
    baseClass: "widget-left globalWidget",
    declaredClass: "globalWidget",
    templateString: dijitTemplate,
    constructor: function (options, srcRefNode) {
      if (typeof srcRefNode === "string") {
        srcRefNode = dom.byId(srcRefNode);
      }
      // this.map = options.map || null;
      this.position=options.position;
      this.domNode = srcRefNode;
    },

    show: function () {
      domStyle.set(this.domNode, "display", "block");
      domStyle.set("layerlist-widget", "display", "none");
    },
    hide: function () {
      domStyle.set(this.domNode, "display", "none");
      if (
        this._mapClickHandler &&
        typeof this._mapClickHandler.remove === "function"
      ) {
        this._mapClickHandler.remove();
      }
    },
    getvalue: function (evt) {
      $("#STA_result").insertAtCaret(" " + evt.target.value);
    },

  });
});


