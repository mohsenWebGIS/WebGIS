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

    "dojo/text!./templates/Isolationprocess.html",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "esri/tasks/IdentifyParameters",
    "esri/tasks/IdentifyTask",

    "esri/geometry/Extent",
    "esri/Color",

    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleMarkerSymbol",

    "esri/graphic",
    "dijit/registry",
    "dijit/layout/TabContainer",
    //  "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",

], function(
    declare, arrayUtils, lang,
    dom, domStyle,
    domConstruct,
    _WidgetBase, _TemplatedMixin, _OnDijitClickMixin,
    dijitTemplate,
    QueryTask,
    Query,
    IdentifyParameters, IdentifyTask,

    Extent,
    Color,
    SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, SimpleMarkerSymbol,

    Graphic,
    registry,
    TabContainer, ContentPane
) {
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {

        baseClass: "report-right",
        declaredClass: "y2k.Census",
        templateString: dijitTemplate,
        constructor: function(options, srcRefNode) {

            if (typeof srcRefNode === "string") {
                srcRefNode = dom.byId(srcRefNode)
            }

            // this.identifyTask = new IdentifyTask(options.mapService);
            this.map = options.map || null;
            this.domNode = srcRefNode;
            // this.queryRequst = options.queryreq;
        },
        show: function(gnode, gV, fl) {

            var lay = [9, 10, 13, 16]
            for (var i in lay) {
                var where = 'node = ' + gnode;
                var sp = fl[lay[i]].spatialReference
                this.doQuery(fl, lay[i], where, true, sp, ["*"], this.queryfunc, this.queryErr)

            }



        },
        hide: function() {
            domStyle.set(this.domNode, "display", "none");
            domStyle.set("report-popUp-widget", "display", "none");

            // registry.remove("tab_V0");
            // domConstruct.destroy("tab_V0");


            // if (this._mapClickHandler && typeof this._mapClickHandler.remove === "function") {
            //   this._mapClickHandler.remove();
            // }
        },
        doQuery: function(fL, pos, w, ret, sp, outF, func, Efunc) {
            var query = new Query();
            var queryTask = new QueryTask(fL[pos]['url']);
            query.where = w //"1=1";
            query.returnGeometry = ret;
            query.outSpatialReference = sp;
            query.outFields = outF //["*"]
            queryTask.executeForExtent(query, this.queryExtent)
            queryTask.execute(query, func, Efunc)
        },
        queryExtent: function(req) {
            map.setExtent(req.extent)
        },
        queryfunc: function(results) {
            console.log(results)
                // var info;
            console.log(results.features["0"].attributes.f11)

            if (results.geometryType == "esriGeometryPoint" & results.features["0"].attributes.clients) {
                feedforcsv = [];
                feedforcsv = arrayUtils.map(results.features, function(evt, index) {
                    // console.log(evt)
                    // console.log(index)
                    return {
                        name: evt['attributes']['name'],
                        familyname: evt['attributes']['familyName'],
                        phone: evt['attributes']['phone']
                    };
                });
                console.log(feedforcsv)

            }



            var line = new SimpleLineSymbol();
            line.setWidth(3.5);
            line.setColor(new Color([87, 255, 246, 1]));
            var marker = new SimpleMarkerSymbol();
            marker.setSize(11);
            marker.setColor(new Color([0, 255, 197, 0.25]));
            marker.setStyle(SimpleMarkerSymbol.STYLE_DIAMOND);

            var line2 = new SimpleLineSymbol();
            line2.setWidth(1);
            var fill = new SimpleFillSymbol();
            fill.setColor(new Color([115, 255, 223, 0.19]));
            fill.setOutline(line2);

            // if (results.features.length == 0) {
            //     alert("بلوک ایزولاسیون مورد نظر یافت نشد، احتمالا شیر مد نظر سایز بیشتر از 90 داشته است.\n ورودی ها کنترل شود")
            // } else {
            for (var i in results.features) {
                addgraphExt(results['features'][i]['geometry'], results)
            }
            // }

            function addgraphExt(ext, item) {
                switch (item['geometryType']) {
                    case "esriGeometryPolyline":
                        map.graphics.add(new Graphic(ext, line));
                        break;
                    case "esriGeometryPoint":
                        map.graphics.add(new Graphic(ext, marker));
                        break;
                    case "esriGeometryPolygon":
                        map.graphics.add(new Graphic(ext, fill));
                        break
                }
            };

        },
        queryErr: function(err) {
            console.log(err)
        },
        spatialSelection: function(event, fl) {
            var query = new Query();
            var queryTask = new QueryTask(fl[dijit.byId('idcombo').item.id]['url']);
            query.where = "1=1";
            query.returnGeometry = true;
            query.outFields = ["*"]
            query.geometry = event.geometry;
            queryTask.execute(query, this.querytask2, this.queryErr)
        },
        queryTask3: function(res) {
            console.log(res)

        },
        querytask2: function(req) {
            if (req.features.length == 1) {
                var marker = new PictureMarkerSymbol();
                marker.setOffset(0, 20);
                marker.setHeight(40);
                marker.setWidth(40);
                marker.setUrl("/css/SVG/placeholder.svg");
                map.graphics.add(new Graphic(req['features'][0]['geometry'], marker));
                globalnode = req.features["0"].attributes.node;
                globalV = req.features["0"].attributes.V;
            } else {
                alert('تعداد غیر مجاز از عارضه انتخاب شده است، لطفا مجددا انتخاب نمایید')
            }
        }


    });
});