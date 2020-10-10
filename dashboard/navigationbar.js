define([
    "dojo/_base/declare",
    // "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-style",
    // "dojo/dom-construct",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
  
    "dojo/text!./templates/navigationbar.html",
  
    // "esri/tasks/IdentifyParameters",
    // "esri/tasks/IdentifyTask",
    // "dojo/store/Memory",
    // "dijit/tree/ObjectStoreModel",
    // "dijit/Tree",
    // "dijit/registry",
    
    // "dijit/layout/BorderContainer",
    // "dijit/layout/ContentPane",
    // "dijit/layout/TabContainer",
  ], function (
    declare,
    //  arrayUtils,
      lang,
    dom, 
    domStyle,
    // domConstruct,
    _WidgetBase,
     _TemplatedMixin,
      _OnDijitClickMixin,
    dijitTemplate,
    // IdentifyParameters,
    //  IdentifyTask,
    // Memory,
    //  ObjectStoreModel,
      // Tree,
    // registry
  ) {
      return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
  
        baseClass: "navigation-base",
        declaredClass: "y2k.Census",
        templateString: dijitTemplate,
        constructor: function ( options,srcRefNode) {
  
          if (typeof srcRefNode === "string") {
            srcRefNode = dom.byId(srcRefNode)
          }
          this.map=options.map;
          this.domNode = srcRefNode;
          this.cityextent=options.cityextent
          this.linesymbol=options.linesymbol;
          this.fillsymbol=options.fillsymbol;
        },
        openwind:function(own){
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

    