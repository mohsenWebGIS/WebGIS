define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-style",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
  
    "dojo/text!./templates/coordinate_scale.html",

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
  
        baseClass: "info-left-buttom globalWidget",
        declaredClass: "y2k.Census",
        templateString: dijitTemplate,
        constructor: function ( srcRefNode) {
  
          if (typeof srcRefNode === "string") {
            srcRefNode = dom.byId(srcRefNode)
          }
          this.domNode = srcRefNode;
          this.BG=1
          this.MA=1
          this.width ='25%' ;
          this.height = '30%';
        },
        openwind:function(own){
         domStyle.set(this.domNode, "display", own);
        },
          show: function () {
          this.openwind('block');
          $('#scaleInfo-btn').css('display','none')
          },
        hide: function () {
          this.openwind('none');
          $('#scaleInfo-btn').css('display','block')
          },
          Bground:function(){
              if(this.BG){
                domStyle.set(this.domNode,"background-color","white")
                this.BG=0
              }else{
                domStyle.set(this.domNode,"background-color","")
                this.BG=1
              }              
          },
          max_min:function(){
            if(this.MA){
                domStyle.set(this.domNode,{width:"100%",height:'100%'})
                $("#maximize").html('&#x25a3;')
                this.MA=0
              }else{
                domStyle.set(this.domNode,{width:this.width,height:this.height})
                $("#maximize").html('&#10064;')
                this.MA=1
              }   
          }
  
      });
    });