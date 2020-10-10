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

  "dojo/text!./templates/layerlist.html",
  // "dojo/text!./templates/Legend.html",
   "dijit/registry",
   "dijit/layout/TabContainer",
  //  "dijit/layout/BorderContainer",
   "dijit/layout/ContentPane",

], function (
  declare, arrayUtils, lang,
  dom, domStyle,
  domConstruct,
  _WidgetBase, _TemplatedMixin, _OnDijitClickMixin,
  dijitTemplate,leg,
   registry,
   TabContainer, ContentPane
) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

      baseClass: "legend-base globalWidget ",
      declaredClass: "y2k.Census",
      templateString: dijitTemplate,
      constructor: function (options, srcRefNode) {

        if (typeof srcRefNode === "string") {
          srcRefNode = dom.byId(srcRefNode)
        }
        this.map = options.map || null;
        this.domNode = srcRefNode;
      },

      show: function () {
        domStyle.set(this.domNode, "display", "inline-block");
        domStyle.set("legend-widget", "display", "none");
     
        }
,
      hide: function () {
        domStyle.set(this.domNode, "display", "none");

        // registry.remove("tab_V0");
        // domConstruct.destroy("tab_V0");


        if (this._mapClickHandler && typeof this._mapClickHandler.remove === "function") {
          this._mapClickHandler.remove();
        }
      },


    });
  });
