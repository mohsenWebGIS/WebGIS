define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-style",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
  
    "dojo/text!./templates/tableOfInfo.html",

  ], function (
    declare,
    dom, 
    domStyle,
    _WidgetBase,
     _TemplatedMixin,
      _OnDijitClickMixin,
    dijitTemplate,

  ) {
      return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
  
        baseClass: "info-right-buttom globalWidget",
        declaredClass: "y2k.Census",
        templateString: dijitTemplate,
        constructor: function ( srcRefNode) {
  
          if (typeof srcRefNode === "string") {
            srcRefNode = dom.byId(srcRefNode)
          }
          this.domNode = srcRefNode;
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