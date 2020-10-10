define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/query",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/store/Memory",

    "dojo/text!./templates/popUp.html",

    "esri/tasks/IdentifyParameters",
    "esri/tasks/IdentifyTask",
    "esri/geometry/Extent",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "esri/Color",
    "esri/geometry/projection",
    "esri/map",

    "jquery",

    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",

    "dijit/Tree",
    "dijit/registry",
    "dijit/tree/ObjectStoreModel",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/TabContainer",
], function (
    declare,
    arrayUtils,
    lang,
    dom,
    query,
    domStyle,
    domConstruct,
    Memory,

    dijitTemplate,
    IdentifyParameters,
    IdentifyTask,
    Extent,
    SimpleLineSymbol,
    SimpleFillSymbol,
    PictureMarkerSymbol,
    Graphic,
    Color,
    projection,
    Map,

    $,

    _WidgetBase,
    _TemplatedMixin,
    _OnDijitClickMixin,

    Tree,
    registry,
    ObjectStoreModel,

) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

        baseClass: "info-right-top globalWidget",
        // declaredClass: "globalWidget",
        templateString: dijitTemplate,
        constructor: function (options, srcRefNode) {

            if (typeof srcRefNode === "string") {
                srcRefNode = dom.byId(srcRefNode)
            }

            this.identifyTask = new IdentifyTask(options.mapService);
            this.map = options.map || null;
            this.domNode = srcRefNode;
            this.queryRequst = options.queryreq;
        },
        openwind: function (own) {
            domStyle.set(this.domNode, "display", own);
        },
        show: function () {
            this.openwind('block')
            this.map.graphics.clear();
            // this._mapClickHandler = this.map.on("click", lang.hitch(this, this._onMapClick));

        },
        hide: function () {
            // this.openwind('none');
            domStyle.set(this.domNode, "display", 'none');
            this.map.graphics.clear();

        },
        _fillLocation: function (evt,lt) {
            projection.load().then(function () {
                var newp = projection.project(evt[lt], wik_web)
                $("#locationBox").html("X :" + newp.x.toFixed(2) + "<br>" + "Y :" + newp.y.toFixed(2))
            });
        },
        _onMapClick: function (event) {
            this._fillLocation(event,'mapPoint');
            var params = new IdentifyParameters(),
                defResults, layerID;
            function che() {
                if ((dijit.byId("info_LayerNames").value | dijit.byId("info_LayerNames").value == "همه لایه ها")) {

                } else {
                    return layerID = [dijit.byId("info_LayerNames").item.id];
                }
            }
            var consVisible = $("#VisibleConstants").val();
            params.geometry = event.mapPoint;
            params.layerOption = IdentifyParameters[consVisible];
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
        _onIdentifyComplete: function (results) {

            var line = new SimpleLineSymbol();
            line.setWidth(3.5);
            line.setColor(new Color([87, 255, 246, 1]));
            var marker = new PictureMarkerSymbol();
            marker.setOffset(0, 20);
            marker.setHeight(40);
            marker.setWidth(40);
            marker.setUrl("../GIS/asset/SVG/placeholder.svg");

            var line2 = new SimpleLineSymbol();
            line2.setWidth(1);
            var fill = new SimpleFillSymbol();
            fill.setColor(new Color([115, 255, 223, 0.19]));
            fill.setOutline(line2);

            registry.remove("tree")
            domConstruct.destroy("tree");
            domConstruct.destroy("customers");
            domConstruct.destroy("L1");

            // var row = domConstruct.create("label", { id: 'L1', for: 'LabelQW' }, "LabelQW", 'after');
            // domConstruct.create("b", { innerHTML: " ( " + results.length + " ) عدد" }, row, 'last');


            function infoTablebuild(req, c) {

                if (Object.keys(req).length) {
                    if (c == 0) {
                        var j = req[c]['feature']['attributes'];
                    } else {
                        var j = req.feature.attributes;
                    }

                    var row = domConstruct.create("div", { class: 'container-fluid' }, 'attributeTable', 'only')
                    var row = domConstruct.create("table", { id: 'customers', class: 'table table-hover' }, row, 'last')
                    var row = domConstruct.create("thead", { class: 'thead-dark' },row, 'last')
                    domConstruct.create("tr", '', row, 'last')
                    domConstruct.create("th", { innerHTML: "فیلد" }, row, 'last')
                    domConstruct.create("th", { innerHTML: "مقادیر" }, row, 'last')

                    for (var i in j) {
                        domConstruct.create('tbody', '', row, 'last');
                        domConstruct.create('tr', '', row, 'last');
                        domConstruct.create('td', { innerHTML: i }, row, 'last');
                        domConstruct.create('td', { innerHTML: j[i] }, row, 'last');
                    }
                }

            }
            // --------build tree------//
          var memo_tree = memoBuild(results, ["layerName", "displayFieldName", "value"], "parent", "feature", "geometryType")
            memo_tree.data.unshift({
                id: "parent",
                name: "عارضه های انتخابی"
            });

            function memoBuild(evt, name, parent, feature, geometryType, refer,map) {
                var info = arrayUtils.map(evt, function (evt, index) {
                    return {
                        id: index,
                        name: evt[name[0]] + " : " + evt[name[1]] + " : " + evt[name[2]],
                        // parent: parent,
                        feature: evt[feature],
                        geometryType: evt[geometryType],
                        refer: evt[name[0]],
                    };
                });
                console.log("info:" , info)
                var info = arrayUtils.filter(info, function (item) {
                    return item.parent != -1;
                });
                return memo = new Memory({
                    data: info,
                    getChildren: function (object) {
                        return this.query({ parent: object.id });
                    }
                });
            }
            var myModel = new ObjectStoreModel({
                store: memo_tree,
                query: { id: "parent" }
            });
            var tree = domConstruct.toDom("<div data-dojo-type='dijit/Tree' id='tree' ></div>");

            domConstruct.place(tree, "queryWereBox", "after");

            function addgraphExt(ext, item,mapp) {

                switch (item['geometryType']) {
                    case "esriGeometryPolyline":
                        mapp.graphics.clear()
                        mapp.graphics.add(new Graphic(ext, line));
                        mapp.setExtent(defineExtent(ext.paths[0], 15));
                        break;
                    case "esriGeometryPoint":
                        mapp.graphics.add(new Graphic(ext, marker));
                        var extent = new Extent({
                            type: "extent",
                            xmin: ext['x'] - 20,
                            ymin: ext['y'] - 20,
                            xmax: ext['x'] + 20,
                            ymax: ext['y'] + 20,
                            spatialReference: { wkid: 32641 }
                        });
                        // Map.setExtent(extent)
                        break;
                    case "esriGeometryPolygon":
                        mapp.graphics.add(new Graphic(ext, fill));
                        mapp.setExtent(defineExtent(ext.rings[0], 15));
                        break
                }
            };
            if (results.length == 1) {
                addgraphExt(results[0]['feature']['geometry'], results[0])
            }
            var mapp=this.map
            var tree = new Tree({
                model: myModel,
                onClick: function (item, node, event,mapp) {
                    console.log(registry.byId('map'))
                    if (item.geometryType == "esriGeometryPoint") {
                        projection.load().then(function () {
                            var newp = projection.project(item.feature.geometry, wik_web)
                            $("#locationBox").html("X :" + newp.x.toFixed(2) + "<br>" + "Y :" + newp.y.toFixed(2))
                        });
                    }
                    domConstruct.destroy("customers");
                    infoTablebuild(item, 1)
                    var ext = item['feature']['geometry'];
                    addgraphExt(ext, item,mapp)
                    var link = "http://192.168.56.6/ServiceRieser/" + item.feature.attributes.link;
                    domConstruct.destroy("imgReiser");

                    if (item.refer == "علمک") {
                        var pTag = domConstruct.create("p", { id: "imgReiser", class: 'p' }, 'locationBox', 'last');
                        var aTag = domConstruct.create("a", { href: link, title: "دسترسی به کروکی علمک ", innerHTML: "کروکی علمک", target: "_blank" }, pTag, 'last');
                    }
                },
            }, "tree").startup();

            function defineExtent(arr, k, c) {
                xarr = [], yarr = []
                if (c == 1) {
                    for (var i in arr) {
                        xarr += arr[i][0];
                        yarr += arr[i][1];
                    }

                    return xarr / arr.length, yarr / arr.length
                } else {
                    for (var i in arr) {
                        xarr.push(arr[i][0]);
                        yarr.push(arr[i][1]);
                    }

                    var extent = new Extent({
                        type: "extent",
                        xmin: min(xarr) - k,
                        ymin: min(yarr) - k,
                        xmax: max(xarr) + k,
                        ymax: max(yarr) + k,
                        spatialReference: { wkid: 32641 }
                    });
                    return extent;
                }

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
        }
    });
});