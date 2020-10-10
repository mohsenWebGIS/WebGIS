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
        identyPara: function(event) {

            domConstruct.destroy('report' + 'count')
            domConstruct.destroy('report' + 'size')
            domConstruct.destroy('report' + 'length')
            domConstruct.destroy('report' + 'length' + 'all')
            var table = domConstruct.create("table", { class: 'tableRep' }, this.domNode, 'last');
            domAttr.set(table, "dir", "rtl");
            domAttr.set(table, "id", "report" + 'count');
            var table = domConstruct.create("table", { class: 'tableRep' }, this.domNode, 'last');
            domAttr.set(table, "dir", "rtl");
            domAttr.set(table, "id", "report" + 'size');
            var table = domConstruct.create("table", { class: 'tableRep' }, this.domNode, 'last');
            domAttr.set(table, "dir", "rtl");
            domAttr.set(table, "id", "report" + 'length');
            var table = domConstruct.create("table", { class: 'tableRep' }, this.domNode, 'last');
            domAttr.set(table, "dir", "rtl");
            domAttr.set(table, "id", "report" + 'length' + "all");

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

            for (var i in parent) {
                // var i = 2;
                var layerID = [];
                if (parent[i].parentId.name != 'no') {

                    for (var j in parent[i].childs) {
                        layerID.push(parent[i].childs[j].id)
                    }
                    switch (parent[i].parentId.name) {
                        case 'count':
                            params.layerIds = layerID;
                            defResults = this.identifyTask.execute(params).addCallback(lang.hitch(this, this._onIdentifyComplete));

                            break;
                        case 'size':
                            for (var j in layerID) {
                                params.layerIds = [layerID[j]];
                                // console.log("params:", params);

                                defResults = this.identifyTask.execute(params).addCallback(lang.hitch(this, this._onIdentifyComplete));
                            }
                            break;
                        case 'length':
                            for (var j in layerID) {

                                params.layerIds = [layerID[j]];
                                defResults = this.identifyTask.execute(params).addCallback(lang.hitch(this, this._onIdentifyComplete));
                            }
                            break;
                    }
                    // global.j=layerID;
                    // params.layerIds = layerID;
                    // defResults = this.identifyTask.execute(params).addCallback(lang.hitch(this, this._onIdentifyComplete));
                }
            }
        },
        _onIdentifyComplete: function(results) {
            // console.log("results:", results);
            function arrsum(arr) {
                return arr.reduce(function(a, b) {
                    return a + b
                }, 0);
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

            if (results.length) {
                var j = childinfo.lastIndexOf(results[0].layerId)
                var ii = mainstore[j]['parent'];
                var jj = parentinfo.lastIndexOf(ii)
                var th_name = parent[jj].tabname;

                // var table = domConstruct.create("table", { class: 'tableRep' }, this.domNode, 'last');
                // domAttr.set(table, "dir", "rtl");
                // domAttr.set(table, "id", "report");

                // var tr = domConstruct.create("tr", null, table, 'last');
                // for (var i in th_name) {
                //   var th = domConstruct.create("th", { innerHTML: th_name[i] }, table, 'last');
                // }
                // var trd = domConstruct.create("tr", null, table, 'last');

                const unique = (value, index, self) => {
                    return self.indexOf(value) === index;
                }
                switch (parent[jj].parentId.name) {
                    case 'count':
                        // var table = domConstruct.create("table", { class: 'tableRep' }, this.domNode, 'last');
                        // domAttr.set(table, "dir", "rtl");
                        // domAttr.set(table, "id", "report"+'count');
                        var table = 'report' + 'count';
                        var tr = domConstruct.create("tr", null, table, 'last');
                        for (var i in th_name) {
                            var th = domConstruct.create("th", { innerHTML: th_name[i] }, table, 'last');
                        }
                        var trd = domConstruct.create("tr", null, table, 'last');
                        var arr = [];
                        // var unique = arr.filter((v, i, a) => a.indexOf(v) === i);
                        for (var i in results) {
                            arr.push(results[i]['layerName'])
                        }
                        var arrUniqe = arr.filter(unique)
                        var numOfrepeate = findUniques(arr)
                        for (var i in arrUniqe) {
                            domConstruct.create("td", { innerHTML: arrUniqe[i] }, table, 'last');
                            domConstruct.create("td", { innerHTML: numOfrepeate[arrUniqe[i]] }, table, 'last');
                            domConstruct.create("tr", null, table, 'last');
                        }
                        break;
                    case 'size':
                        // if (dom.byid('report'+'size'))
                        var table = 'report' + 'size';
                        if (dom.byId(table)) {
                            var tr = domConstruct.create("tr", null, table, 'last');
                            for (var i in th_name) {
                                var th = domConstruct.create("th", { innerHTML: th_name[i] }, table, 'last');
                            }
                            var trd = domConstruct.create("tr", null, table, 'last');
                            var arrname = [];
                            var arr = []
                                // var unique = arr.filter((v, i, a) => a.indexOf(v) === i);
                            for (var i in results) {
                                arr.push(results[i].feature.attributes.size) //['layerName'])
                                arrname.push(results[i]['layerName'])
                            }
                            var arrUniqe = arr.filter(unique)
                            var numOfrepeate = findUniques(arr)
                            var arrUniqe_name = arrname.filter(unique)

                            // for (var i in arrUniqe) {
                            //   arrUniqe_name.push(arrUniqe_name[0])
                            // }
                            // console.log("arrUniqe_name:", arrUniqe_name);
                            // console.log("arrUniqe:", arrUniqe);

                            for (var i in arrUniqe) {
                                domConstruct.create("td", { innerHTML: arrUniqe_name[0] }, table, 'last');
                                domConstruct.create("td", { innerHTML: arrUniqe[i] }, table, 'last');
                                domConstruct.create("td", { innerHTML: numOfrepeate[arrUniqe[i]] }, table, 'last');
                                domConstruct.create("tr", null, table, 'last');
                            }
                        }
                        break;
                    case 'length':
                        var table = 'report' + 'length';
                        var tableall = 'report' + 'length' + "all";
                        if (dom.byId(table)) {
                            var tr = domConstruct.create("tr", null, table, 'last');
                            for (var i in th_name) {
                                var th = domConstruct.create("th", { innerHTML: th_name[i] }, table, 'last');
                            }
                            var trd = domConstruct.create("tr", null, table, 'last');
                            var arrname = [];
                            var arr = [];
                            var arrLen = [];
                            var arrlres = [];
                            // var unique = arr.filter((v, i, a) => a.indexOf(v) === i);
                            for (var i in results) {
                                arr.push(results[i].feature.attributes.size) //['layerName'])
                                arrLen.push(results[i].feature.attributes.Shape_Length) //['layerName'])
                                arrname.push(results[i]['layerName'])
                            }
                            // console.log("arr:", arr);
                            // console.log("arrLen:", arrLen);
                            var arrUniqe = arr.filter(unique)
                                // console.log("arrUniqe:", arrUniqe);

                            for (var i in arrUniqe) {
                                var indexes = getAllIndexes(arr, arrUniqe[i])
                                console.log("indexes:", indexes);
                                var d = [];
                                for (var j in indexes) {
                                    d.push(Number(arrLen[indexes[j]]));
                                }
                                arrlres.push(Math.round(arrsum(d)))
                            }
                            // console.log("arrlres:", arrlres);

                            var numOfrepeate = findUniques(arr)
                            var arrUniqe_name = arrname.filter(unique)


                            for (var i in arrUniqe) {
                                domConstruct.create("td", { innerHTML: arrUniqe_name[0] }, table, 'last');
                                domConstruct.create("td", { innerHTML: arrUniqe[i] }, table, 'last');
                                domConstruct.create("td", { innerHTML: arrlres[i] }, table, 'last');
                                domConstruct.create("tr", null, table, 'last');
                            }
                            domConstruct.create("tr", null, tableall, 'last');
                            domConstruct.create("th", { innerHTML: "نام عارضه" }, tableall, 'last');
                            domConstruct.create("th", { innerHTML: 'مجموع طول کل ' }, tableall, 'last');
                            domConstruct.create("tr", null, tableall, 'last');

                            domConstruct.create("td", { innerHTML: arrUniqe_name[0] }, tableall, 'last');
                            domConstruct.create("td", { innerHTML: arrsum(arrlres) }, tableall, 'last');
                        }
                        console.log('length')
                        break;
                    default:
                        console.log('no one');
                }
            }


        }
    });
});