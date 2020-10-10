define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/_base/lang",
  
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
    'dijit/_WidgetsInTemplateMixin',
    "dijit/layout/_ContentPaneResizeMixin",
    "dojo/text!./templates/featureTable.html",
  

    "esri/dijit/FeatureTable",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane"
  
  ], function (
    declare,
    dom,
    domStyle,
    lang,
  
    _WidgetBase,
    _TemplatedMixin,
    _OnDijitClickMixin,
    _WidgetsInTemplateMixin,
    _ContentPaneResizeMixin,
    dijitTemplate,
    FeatureTable,

  
  
  ) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin, _WidgetsInTemplateMixin,_ContentPaneResizeMixin], {
  
      baseClass: "widget_table",
      declaredClass: "",
      templateString: dijitTemplate,
      constructor: function (options,srcRefNode,kwArgs) {
          lang.mixin(this, kwArgs);
       
  
        if (typeof srcRefNode === "string") {
          srcRefNode = dom.byId(srcRefNode)
        }
        this.domNode = srcRefNode;
        this.map=options.map;

      },
      postCreate : function() {
        this.inherited(arguments);
        // var domNode = this.domNode;
      },
  
      startup : function(args) {
        this.inherited(arguments);
        // this.placeAt(dojo.doc.body);
      },
      openwind: function (own) {
        domStyle.set(this.domNode, "display", own);
      },
      show: function () {
        this.openwind('block');

      },
      hide: function () {
        this.openwind('none');
        vFtable = 0;
            },
    });
  });