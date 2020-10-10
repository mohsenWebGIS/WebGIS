define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/query",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
    "dojo/dom-attr",

    "dojo/text!./templates/reportPopUp.html",
    "esri/tasks/IdentifyParameters",
    "esri/tasks/IdentifyTask",
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    "dijit/Tree",
    "dijit/registry",
    "esri/geometry/Extent",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "esri/Color",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/TabContainer",
], function(
    declare, arrayUtils, lang,
    dom, query,
    domStyle,
    domConstruct,
    _WidgetBase, _TemplatedMixin, _OnDijitClickMixin,
    domAttr,
    dijitTemplate,
    IdentifyParameters, IdentifyTask,
    Memory, ObjectStoreModel, Tree,
    registry,
    Extent, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Graphic, Color,

) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

        baseClass: "info-right",
        declaredClass: "y2k.Census",
        templateString: dijitTemplate,
        constructor: function(options, srcRefNode) {

            if (typeof srcRefNode === "string") {
                srcRefNode = dom.byId(srcRefNode)
            }

            this.identifyTask = new IdentifyTask(options.mapService);
            this.map = options.map || null;
            this.domNode = srcRefNode;
            this.queryRequst = options.queryreq;
        },
        openwind: function(own) {

            domStyle.set("print-widget", "display", 'none');
            domStyle.set("report-popUp-widget", "display", 'none');


            domStyle.set(this.domNode, "display", own);
            dom.byId("locationBox").innerHTML = "";
            registry.remove("tree")
            domConstruct.destroy("tree");
            domConstruct.destroy("customers");
            domConstruct.destroy("L0");
            domConstruct.destroy("L1");
        },
        show: function() {
            this.openwind('block')
        },
        hide: function() {
            this.openwind('none');
        },
        symready: function() {
            var line = new SimpleLineSymbol();
            line.setWidth(3.5);
            line.setColor(new Color([87, 255, 246, 1]));
            var marker = new PictureMarkerSymbol();
            marker.setOffset(0, 20);
            marker.setHeight(40);
            marker.setWidth(40);
            marker.setUrl("/css/SVG/placeholder.svg");

            var line2 = new SimpleLineSymbol();
            line2.setWidth(1);
            var fill = new SimpleFillSymbol();
            fill.setColor(new Color([115, 255, 223, 0.19]));
            fill.setOutline(line2);
        },
        identyPara: function(event, fL) {
            var r = 'report',
                co = 'count',
                si = 'size',
                le = 'length',
                cou = 'code';

            domConstruct.destroy(r + 'all') //rep=1
            domConstruct.destroy(r + co) //rep=1
            domConstruct.destroy(r + co + si) //rep=2
            domConstruct.destroy(r + le + si) //rep=3
            domConstruct.destroy(r + co + cou) //rep=4


            tableall = domConstruct.create("table", { class: 'tableRep', dir: 'rtl' }, this.domNode, 'last');
            domAttr.set(tableall, "id", r + 'all'); //'reportAll overal
            tablecount = domConstruct.create("table", { class: 'tableRep', dir: 'rtl' }, this.domNode, 'last');
            domAttr.set(tablecount, "id", r + co); //'reportcount' rep :1
            tablecountsize = domConstruct.create("table", { class: 'tableRep', dir: 'rtl' }, this.domNode, 'last');
            domAttr.set(tablecountsize, "id", r + co + si); //'reportcountsize' rep:2
            tablelenghtsize = domConstruct.create("table", { class: 'tableRep', dir: 'rtl' }, this.domNode, 'last');
            domAttr.set(tablelenghtsize, "id", r + le + si); //'reportlengthsize rep:3
            tablelcountcode = domConstruct.create("table", { class: 'tableRep', dir: 'rtl' }, this.domNode, 'last');
            domAttr.set(tablelcountcode, "id", r + co + cou); //'reportcountcode' rep:4

            var params = new IdentifyParameters(),
                defResults;
            params.geometry = event.geometry;
            params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            params.mapExtent = this.map.extent;
            params.returnGeometry = true;
            params.width = this.map.width;
            params.height = this.map.height;
            params.spatialReference = this.map.spatialReference;
            params.tolerance = 10;
            for (var i in fL) {
                params.layerIds = [i];
                defResults = this.identifyTask.execute(params).addCallback(lang.hitch(this, this._onIdentifyreport));
            }
            // defResults = this.identifyTask.execute(params).addCallback(lang.hitch(this, this._onIdentifyComplete));

        },
        _onIdentifyreport: function(results) {
            if (results.length) {
                console.log('yes')
                var rep = results[0].feature.attributes['rep'];
                if (rep) {

                } else {
                    var rep = results[0].feature.attributes['Rep'];
                }
                switch (~~rep) {
                    case 1: //use reportCount
                        r_Count();

                        break;
                    case 2: //use reportcountsize
                        r_countsize();
                        break;
                    case 3: //use reportlengthsize

                        r_lengthsize();
                        break;
                    case 4: //use reportcountcode
                        break;


                    default:
                        break;
                }
            }




            function findUniques(array, occurrences) {
                if (!occurrences) {
                    occurrences = {};
                }
                //checking if parameter passed is an array
                if (Array.isArray(array)) {
                    for (let i = 0; i < array.length; i++) {
                        //if item is a nested array, call findUniques again
                        if (Array.isArray(array[i])) {
                            occurrences = findUniques(array[i], occurrences);
                        } else {
                            //add to/update count in occurrences object
                            occurrences[array[i]] = occurrences[array[i]] + 1 || 1;
                        }
                    }
                }

                return occurrences;
            };

            function getAllIndexes(arr, val) {
                var indexes = [],
                    i = -1;
                while ((i = arr.indexOf(val, i + 1)) != -1) {
                    indexes.push(i);
                }
                return indexes;
            };

            function arrsum(arr) {
                return arr.reduce(function(a, b) {
                    return a + b
                }, 0);
            }
            //--------------------------------------------------------------------------↓
            function r_Count() {
                var arrname = results[0]['layerName'];

                var final = results.length;
                domConstruct.create("tr", { innerHTML: arrname, style: 'font-weight: bold;' }, tablecount, 'last');
                // domConstruct.create("th", { innerHTML: arrname }, tablelenghtsize, 'last');
                domConstruct.create("tr", null, tablecount, 'last');
                domConstruct.create("th", { innerHTML: 'تعداد عارضه:' }, tablecount, 'last');
                domConstruct.create("th", { innerHTML: results.length }, tablecount, 'last');
            }

            //-----------------------------------------------------------------------------↑
            // ----------------------------------------------------------------------------↓
            function r_countsize() {
                var arrname = results[0]['layerName'];
                var arr = []
                const unique = (value, index, self) => {
                    return self.indexOf(value) === index;
                }
                for (var i in results) {
                    arr.push(results[i].feature.attributes.size) //['layerName'])
                }
                var arrUniqe = arr.filter(unique)

                var numOfrepeate = findUniques(arr)
                domConstruct.create("tr", { innerHTML: arrname, style: 'font-weight: bold;' }, tablecountsize, 'last');
                // domConstruct.create("th", { innerHTML: arrname }, tablelenghtsize, 'last');
                domConstruct.create("tr", null, tablecountsize, 'last');
                domConstruct.create("th", { innerHTML: 'سایز عارضه' }, tablecountsize, 'last');
                domConstruct.create("th", { innerHTML: ' تعداد عارضه در محدوده' }, tablecountsize, 'last');
                for (var i in arrUniqe) {
                    domConstruct.create("tr", null, tablecountsize, 'last');
                    domConstruct.create("td", { innerHTML: arrUniqe[i] }, tablecountsize, 'last');
                    domConstruct.create("td", { innerHTML: numOfrepeate[arrUniqe[i]] }, tablecountsize, 'last');
                }

            }

            //-----------------------------------------------------------------↑
            function r_lengthsize() {
                const unique = (value, index, self) => {
                    return self.indexOf(value) === index;
                }

                var arrname = results[0]['layerName'];
                var arr = [];
                var arrLen = [];
                var arrlres = [];
                // var unique = arr.filter((v, i, a) => a.indexOf(v) === i);
                for (var i in results) {
                    arr.push(results[i].feature.attributes.size) //['layerName'])
                    arrLen.push(results[i].feature.attributes.Length) //['layerName'])
                }
                var arrUniqe = arr.filter(unique)
                for (var i in arrUniqe) {
                    var indexes = getAllIndexes(arr, arrUniqe[i])
                        // console.log("indexes:", indexes);
                    var d = [];
                    for (var j in indexes) {
                        d.push(Number(arrLen[indexes[j]]));
                    }
                    arrlres.push(Math.round(arrsum(d)))
                }
                domConstruct.create("tr", { innerHTML: arrname, style: 'font-weight: bold;' }, tablelenghtsize, 'last');
                // domConstruct.create("th", { innerHTML: arrname }, tablelenghtsize, 'last');
                domConstruct.create("tr", null, tablelenghtsize, 'last');
                domConstruct.create("th", { innerHTML: 'سایز عارضه' }, tablelenghtsize, 'last');
                domConstruct.create("th", { innerHTML: ' مجموع طول عارضه : متر' }, tablelenghtsize, 'last');
                for (var i in arrUniqe) {
                    domConstruct.create("tr", null, tablelenghtsize, 'last');
                    domConstruct.create("td", { innerHTML: arrUniqe[i] }, tablelenghtsize, 'last');
                    domConstruct.create("td", { innerHTML: arrlres[i] }, tablelenghtsize, 'last');
                }
            }

        }
    });
});