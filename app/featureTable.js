define([
  "dojo/_base/declare",
  "dojo/dom",
  "dojo/dom-style",
  "dojo/_base/lang",
  "dojo/dom-construct",

  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_OnDijitClickMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dijit/layout/_ContentPaneResizeMixin",
  "dojo/text!./templates/featureTable.html",

  "esri/dijit/FeatureTable",
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",
], function (
  declare,
  dom,
  domStyle,
  lang,
  domConstruct,

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
      baseClass: "widget_table",
      declaredClass: "",
      templateString: dijitTemplate,
      constructor: function (options, srcRefNode, kwArgs) {
        lang.mixin(this, kwArgs);

        if (typeof srcRefNode === "string") {
          srcRefNode = dom.byId(srcRefNode);
        }
        this.domNode = srcRefNode;
        this.map = options.map;
        this.BG=1
        this.MA=1
        this.width ='25%' ;
        this.height = '30%';
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
        this.openwind("block");
        domConstruct.destroy('tableFeture')
        if(this.myFeatureTable){
          this.myFeatureTable.destroy()
        }
        this.createDomForTable();

        this.createFeatureTable($("input[name=tableradio][type=radio]:checked").val());
      },
      hide: function () {
        domStyle.set(this.domNode, "display", 'none');
        vFtable = 0;

      },
      createFeatureTable: function (i) {
        $('#layerNameAttTable').text(this.lyerNameList[i])

        this.myFeatureTable = new FeatureTable(
          {
            featureLayer: this.featurelayer[i],
            map: this.map,
            syncSelection: true,
            showRelatedRecords: true,
            showAttachments: true,
            outFields: this.featurelayer[i].outFields,
          },
          this.tF
        );
        this.myFeatureTable.showStatistics=true
        // this.myFeatureTable.refresh()
        this.myFeatureTable.startup();
      },
      createDomForTable: function () {
        this.tF = domConstruct.create(
          "div",
          { id: "tableFeture" },
          "tableBase",
          "last"
        );
      },
    //   Bground:function(){
    //     if(this.BG){
    //       domStyle.set(this.domNode,"background-color","white")
    //       this.BG=0
    //     }else{
    //       domStyle.set(this.domNode,"background-color","")
    //       this.BG=1
    //     }              
    // },
    // max_min:function(){
    //   if(this.MA){
    //       domStyle.set(this.domNode,{width:"100%",height:'100%'})
    //       $("#maximize").html('&#x25a3;')
    //       this.MA=0
    //     }else{
    //       domStyle.set(this.domNode,'class',this.baseClass)
    //       $("#maximize").html('&#10064;')
    //       this.MA=1
    //     }   
    // }
    }
  );
});
