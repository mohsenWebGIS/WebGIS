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

    "dojo/text!./templates/queryPopUp.html",
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
    dom, domStyle,
    domConstruct,
    _WidgetBase, _TemplatedMixin, _OnDijitClickMixin,
    dijitTemplate,
    IdentifyParameters, IdentifyTask,
    Memory, ObjectStoreModel, Tree,
    registry,
    Extent, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Graphic, Color
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
            domStyle.set(this.domNode, "display", own);
            // dom.byId("locationBox").innerHTML = "";
            // registry.remove("tree")
            // domConstruct.destroy("tree");
            // domConstruct.destroy("customerspoppop");
            // domConstruct.destroy("L0pop");
            // domConstruct.destroy("L1pop");
        },
        show: function() {
            // this.openwind('block')
            domStyle.set(this.domNode, "display", 'block');
            // this._mapClickHandler = this.map.on("click", lang.hitch(this, this._onMapClick));
        },
        hide: function() {
            this.openwind('none');
            // if (this._mapClickHandler && typeof this._mapClickHandler.remove === "function") {
            // this._mapClickHandler.remove();
            // }
        },

        _onMapClick: function(event) {

            function fillLocation() {
                // dijit.byId("locationBox").setContent("x: "+ event.mapPoint.x + "," +"y: "+ event.mapPoint.y)
                dom.byId("locationBox").innerHTML = "X :" + event.mapPoint.x.toFixed(2) + ", " + "Y :" + event.mapPoint.y.toFixed(2);
            }
            fillLocation();
            var params = new IdentifyParameters(),
                defResults, layerID;

            function che() {
                if (dijit.byId("LayerName").item) {
                    return layerID = [dijit.byId("LayerName").item.id];
                } else {
                    return layerID = [8]
                }
            }
            params.geometry = event.mapPoint;
            params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            params.layerIds = che();
            params.mapExtent = this.map.extent;
            params.returnGeometry = true;
            params.width = this.map.width;
            params.height = this.map.height;
            params.spatialReference = this.map.spatialReference;
            params.tolerance = 10;
            this.map.graphics.clear();
            defResults = this.identifyTask.execute(params).addCallback(lang.hitch(this, this._onIdentifyComplete));
        },
        showresult: function(results) {
            console.log(results)
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

            registry.remove("treepop")
            domConstruct.destroy("treepop");
            domConstruct.destroy("customerspop");

            function infoTablebuild(req, c) {
                if (Object.keys(req).length) {
                    if (c == 0) {
                        var j = req['features'][0]['attributes'];
                    } else {
                        var j = req['feature']['attributes'];
                    }
                    var row = domConstruct.toDom("<table id='customerspop' class='tableRep'><th>" + "فیلد" + "</th>" + "<th>" + "مقادیر" + "</th></table>");
                    domConstruct.place(row, "attributeTablepop", "after");
                    var rowtab;
                    for (var i in j) {
                        rowtab = domConstruct.toDom("<tr><td> " + i + "</td>" + "<td>" + j[i] + "</td></tr>");
                        domConstruct.place(rowtab, "customerspop");
                    }
                } else {
                    var noresult = domConstruct.toDom("<div id='customerspop' class='tableRep' ><div id=warnings> هیچ عارضه ای یافت نشد </div></div>");
                    domConstruct.place(noresult, "attributeTablepop", "after");
                }
            }
            infoTablebuild(results, 0)
                //--------build tree------//
            var memo_tree = memoBuild(results, "displayFieldName", "parent", "features", "geometryType")
            memo_tree.data.unshift({
                id: "parent",
                name: dijit.byId('LayerName').value
            });

            function memoBuild(evt, name, parent, feature, geometryType) {

                var info = arrayUtils.map(evt[feature], function(ev, index) {
                    return { id: index, name: ev['attributes'][evt[name]], parent: parent, feature: evt[feature][index], geometryType: evt[geometryType] }
                });
                console.log(info)
                var info = arrayUtils.filter(info, function(item) {
                    return item.parent != -1;
                });
                // console.log(info)
                return memo = new Memory({
                    data: info,
                    getChildren: function(object) {
                        return this.query({ parent: object.id });
                    }
                });
            }
            var myModel = new ObjectStoreModel({
                store: memo_tree,
                query: { id: "parent" }
            });
            var tree = domConstruct.toDom("<div data-dojo-type='dijit/Tree' id='treepop' ></div>");
            domConstruct.place(tree, "queryWereBoxpop", "after");

            function addgraphExt(ext, item) {
                switch (item['geometryType']) {
                    case "esriGeometryPolyline":
                        map.graphics.clear();
                        map.graphics.add(new Graphic(ext, line));
                        map.setExtent(defineExtent(ext.paths[0], 15));
                        break;
                    case "esriGeometryPoint":
                        map.graphics.clear();
                        map.graphics.add(new Graphic(ext, marker));
                        var extent = new Extent({
                            type: "extent",
                            xmin: ext['x'] - 20,
                            ymin: ext['y'] - 20,
                            xmax: ext['x'] + 20,
                            ymax: ext['y'] + 20,
                            spatialReference: { wkid: 32641 }
                        });
                        console.log(ext, extent)
                        map.setExtent(extent)
                        break;
                    case "esriGeometryPolygon":
                        map.graphics.clear();
                        map.graphics.add(new Graphic(ext, fill));
                        map.setExtent(defineExtent(ext.rings[0], 15));
                        break
                }
            };
            if (results.length == 1) {
                addgraphExt(results[0]['feature']['geometry'], results[0])
            }
            var tree = new Tree({
                model: myModel,
                onClick: function(item, node, event) {
                    domConstruct.destroy("customerspop");
                    infoTablebuild(item, 1)
                    var ext = item['feature']['geometry'];
                    addgraphExt(ext, item)
                },
            }, "treepop").startup();

            function defineExtent(arr, l) {
                xarr = [], yarr = []
                for (var i in arr) {
                    xarr.push(arr[i][0]);
                    yarr.push(arr[i][1]);
                }

                var extent = new Extent({
                    type: "extent",
                    xmin: min(xarr) - l,
                    ymin: min(yarr) - l,
                    xmax: max(xarr) + l,
                    ymax: max(yarr) + l,
                    spatialReference: { wkid: 32641 }
                });
                return extent;
            }

            function min(input) {
                if (toString.call(input) !== "[object Array]")
                    return false;
                return Math.min.apply(null, input);
            }

            function max(input) {
                if (toString.call(input) !== "[object Array]")
                    return false;
                return Math.max.apply(null, input);
            }

        },
    });
});