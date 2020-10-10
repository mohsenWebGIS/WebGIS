define([
  "dojo/_base/declare",
  "dojo/dom",
  "dojo/dom-style",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dojo/query",

  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_OnDijitClickMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dijit/layout/_ContentPaneResizeMixin",
  "dojo/text!./templates/featureTableLayerList.html",

  "esri/dijit/FeatureTable",
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",
], function (
  declare,
  dom,
  domStyle,
  lang,
  domConstruct,
  query,

  _WidgetBase,
  _TemplatedMixin,
  _OnDijitClickMixin,
  _WidgetsInTemplateMixin,
  _ContentPaneResizeMixin,
  dijitTemplate,

  FeatureTable
) {
  return declare(
    [
      _WidgetBase,
      _TemplatedMixin,
      _OnDijitClickMixin,
      _WidgetsInTemplateMixin,
      _ContentPaneResizeMixin,
    ],
    {
      baseClass: "widget_tablelayerlist",
      declaredClass: "",
      templateString: dijitTemplate,
      constructor: function (options, srcRefNode, kwArgs) {
        lang.mixin(this, kwArgs);

        if (typeof srcRefNode === "string") {
          srcRefNode = dom.byId(srcRefNode);
        }
        this.domNode = srcRefNode;
        this.map = options.map;
        this.rad=1;
      },
      postCreate: function () {
        this.inherited(arguments);
        // var domNode = this.domNode;
      },

      startup: function (args) {
        this.inherited(arguments);
        // this.placeAt(dojo.doc.body);
      },
      openwind: function (own) {
        domStyle.set(this.domNode, "display", own);
      },
      show: function () {
        if(this.rad){
          for (var i in this.lyerIdList){
            this.createDomForRadio(i)
          }
        }
        this.openwind("block");
      },
      hide: function () {
        domStyle.set(this.domNode, "display", 'none');
        vLFtable = 0;
        // console.log($("input[name=tableradio][type=radio]:checked").val())

      },
      createDomForRadio: function (i) {
        this.rad=0
        var divR = domConstruct.create(
          "div",
          // { type:"radio" ,name:"tableradio",value:i},
          { class: "radio" },
          "radioTable",
          "last"
        );
        var labelR = domConstruct.create(
          "label",
          { innerHTML: this.lyerNameList[i] },
          divR,
          "last"
        );
        var inputR = domConstruct.create(
          "input",
          { type: "radio", name: "tableradio", value: this.lyerIdList[i] },
          labelR,
          "last"
        );
      },
    }
  );
});
