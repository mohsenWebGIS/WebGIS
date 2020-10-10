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
  "dojo/text!./templates/selectFeatureLayerList.html",

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
      baseClass: "widget_selectlist globalWidget",
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
        varsel=1


        console.log(this.lyerIdList);
        if(this.rad){
          for (var i in this.lyerIdList){
            this.createDomForcheck(i)
          }
        }
        this.openwind("block");
      },
      hide: function () {
        varsel=0
        domStyle.set(this.domNode, "display", 'none');
        // console.log($("input[name=tableradio][type=radio]:checked").val())

      },
      createDomForcheck: function (i) {
        this.rad=0
        var divFC = domConstruct.create(
          "div",
          // { type:"radio" ,name:"tableradio",value:i},
          { class: "form-check"},
          "selectFeatureCB",
          "last"
        );
        var labelR = domConstruct.create(
          "label",
          {class: "form-check-label" ,for: "selectionCb_"+ this.lyerIdList[i] ,innerHTML: this.lyerNameList[i]  },
          divFC,
          "last"
        );
         var inputC = domConstruct.create(
          "input",
          { type: "checkbox",class:"form-check-input", name: "selectLcheckB", value: this.lyerIdList[i] ,id:"selectionCb_"+this.lyerIdList[i] },
          labelR,
          "last"
        );
      },
    }
  );
});
