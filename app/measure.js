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

  "dojo/text!./templates/measurement.html",
   "dijit/registry",
   "dijit/layout/TabContainer",
  //  "dijit/layout/BorderContainer",
   "dijit/layout/ContentPane",

], function (
  declare, arrayUtils, lang,
  dom, domStyle,
  domConstruct,
  _WidgetBase, _TemplatedMixin, _OnDijitClickMixin,
  dijitTemplate,
   registry,
   TabContainer, ContentPane
) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

      baseClass: "measure",
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
        domStyle.set(this.domNode, "display", "block");
        // domStyle.set("mes", "display", "block");
        }
,
      hide: function () {
        domStyle.set(this.domNode, "display", "none");
      },


    });
  });
