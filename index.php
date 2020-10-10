<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <title> سامانه مدیریت شبکه گاز </title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="../GIS/asset/icon/favicon.ico">

  <link rel="shortcut icon" href="../GIS/asset/icon/favicon.ico" type="image/x-icon">
  <link rel="icon" href="../GIS/asset/icon/favicon.ico" type="image/x-icon">


  <!-- Bootstrap CSS -->
  <link rel="stylesheet"
    href="http://192.168.56.5/arcgis_js_v333_api/arcgis_js_api/library/3.33/3.33/dijit/themes/nihilo/nihilo.css">
  <link rel="stylesheet"
    href="http://192.168.56.5/arcgis_js_v333_api/arcgis_js_api/library/3.33/3.33/esri/css/esri.css" />
  <link rel="stylesheet" href="../GIS/asset/bootstrap.min.css">
  <script src="../GIS/asset/jquery.min.js"></script>
  <script src="../GIS/asset/popper.min.js"></script>
  <script src="../GIS/asset/bootstrap.min.js"></script>
  <link rel="stylesheet" href="../GIS/css/style.css">


  <script type="text/javascript">
    dojoConfig = {
      packages: [{
        name: 'appmain',
        location: location.pathname.replace(/\/[^\/]*$/, '') + '/app/'
      }, {
        name: 'jquery',
        location: location.pathname.replace(/\/[^\/]*$/, '') + '/Jquery_3.3.1',
        main: "jquery"
      },]
    };
  </script>
  <script src="http://192.168.56.5/arcgis_js_v333_api/arcgis_js_api/library/3.33/3.33/init.js"></script>

</head>

<body>
  <div class="container-fluid">
    <div class="row" dir="rtl">
      <div class="col-sm-12 text-right text-white bg-secondary  m-1">
        <table>
          <tr>
            <td>
              <a name="" id="" class="btn btn-warning  text-gray p-2 m-1 btw" href="#" role="button" data-toggle="tooltip"
                title="جهت خروج از سایت بر روی دکمه کلیک کنید">
                خروج از سایت
              </a>
            </td>
            <td>
              <a class="btn btn-warning  text-gray p-2 m-1 btw" id="qsearch-btn" data-toggle="tooltip"
                title="جهت جستجوی ساده توصیفی کلیک نمایید">
                جستجوی سریع
              </a>




              <!-- <a  id="qsearch-btn" class="btn btn-warning  text-gray p-2 m-1 btw"  data-toggle="tooltip"
                title="جهت جستجوی ساده توصیفی کلیک نمایید">
                جستجو
                <b>
                  سریع توصیفی
                </b>
              </a> -->
            </td>
            <td>
              <a id="locationsearch-btn" class="btn btn-warning  text-gray p-2 m-1 btw" data-toggle="tooltip"
                title="جهت جستجوی بر اساس مختصات کلیک نمایید">
                جستجو 
                <b>
                  مختصاتی
                </b>
              </a>
            </td>
            <td>
              <a id="queryForm-btn" class="btn btn-warning  text-gray p-2 m-1 btw" data-toggle="tooltip" title="جهت  جستجوی ترکیبی بر اساس  فرم های 
              SQL کلیک نمایید">
                جستجو
                <b>
پیشزفته
                </b>
              </a>
            </td>
            <!-- <td>
            <div id="search"></div>

            </td> -->

            <td>
              <!-- <div class="dropdown">
                <button type="button" class="btn btn-warning  text-gray p-2 m-1 btw dropdown-toggle" data-toggle="dropdown"
                  data-toggle="tooltip"
                  title="جهت انجام جستجو های ترکیبی بین جسنجوی مکانی و جستجوی توصیفی از این آیکن استفاده نمایید ">
                  روش ترکیب
                  <b>
                    انتخاب ها
                  </b>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item tj" href="#" data-toggle="tooltip"
                    title="در این روش کلیه انتخاب های موجود در نقشه حذف شده و انتخاب جدید انجام میگیرد  &#xA این روش در حالت پیشفرض بکار می رود">روش
                    <b> انتخاب جدید </b> </a>
                  <a class="dropdown-item tj" href="#" data-toggle="tooltip"
                    title="در این روش انتخاب جدید به انتخاب های موجود اضافه می شود">روش <b> اضافه کردن به انتخاب موجود
                    </b></a>
                  <a class="dropdown-item tj" href="#" data-toggle="tooltip"
                    title="در این روش انتخاب جدید انجام شده از انتخاب های موجود حذف میشود">روش <b>حذف از انتخاب موجود
                    </b></a>
                  <a class="dropdown-item tj" href="#">روش <b>انتخاب از عارضه انتخاب شده </b></a>
                </div>
              </div> -->
            </td>
            <td>
              <form action="report.php">
                <!-- <label for="report-btn">گزارش گیری</label> -->
                <input type="submit" name="" id="report-btn" class="btn btn-warning  text-gray p-2 m-1 btw"  role="button" data-toggle="tooltip"
                value="گزارش گیری"
                title="جهت گزارش گیری بر روی این گذینه کلیک نمایید">
              </form>

                
              
            </td>

            <td>
              <div class="dropdown">
                <button type="button" class="btn btn-warning  text-gray p-2 m-1 btw dropdown-toggle" data-toggle="dropdown"
                  data-toggle="tooltip" title=" انجام تحلیل های مربوط به ایزولاسیون ، قطع جریان و ارتباطات شبکه  ">
                  انجام
                  <b>
                    تحلیل
                  </b>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item tj" href="#" data-toggle="tooltip"
                    title="انجام ایزولاسیون شبکه بر اساس انتخاب  توصیفی یا مکانی علمک">
                    ایزولاسیون شبکه بر اساس انتخاب توصیفی یا مکانی <b>علمک</b> </a>

                  <a class="dropdown-item tj" href="#" data-toggle="tooltip"
                    title="انجام ایزولاسیون شبکه بر اساس انتخاب  توصیفی یا مکانی مشترکین">
                    ایزولاسیون شبکه بر اساس انتخاب توصیفی یا مکانی <b>مشترکین</b> </a>

                  <a class="dropdown-item tj" href="#" data-toggle="tooltip"
                    title="انجام ایزولاسیون شبکه بر اساس انتخاب  توصیفی یا مکانی شیر">
                    ایزولاسیون شبکه بر اساس انتخاب توصیفی یا مکانی <b>شیر</b> </a>

                  <a class="dropdown-item tj" href="#" data-toggle="tooltip"
                    title="انجام ایزولاسیون شبکه بر اساس انتخاب  توصیفی یا مکانی خط لوله">
                    ایزولاسیون شبکه بر اساس انتخاب توصیفی یا مکانی <b>خط لوله</b> </a>


                </div>
              </div>
            </td>
            <td>
              <a name="" id="heatmap-btn" class="btn btn-warning  text-gray  btw"  data-toggle="tooltip"
                title="گزارش هیت مپ مشترکین بلقوه در شهر">
                نقشه هیت مپ
              </a>
            </td>


          </tr>
        </table>
      </div>
    </div>
    <div class="row " dir="rtl">
      <div class="col-sm-1  text-white p-1" style="width: 3%;
              flex: 0 0 3%;max-width: 3%;">
        <table>
          <tr>
            <td>
              <a class="btn p-2 bc m-2" id="navigation-btn" data-toggle="tooltip" title=" دسترسی به ابزار ناوبری ">
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a class="btn p-2 bc m-2" id="identify-btn" data-toggle="tooltip"
                title=" دسترسی به اطلاعات توصیفی لایه ها ">
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a class="btn p-2 bc m-2" id="measure-btn" data-toggle="tooltip" title=" ابزار اندازه گیری  ">
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" class="btn p-2 bc m-2" id="print-btn" data-toggle="tooltip"
                title="  تولید پرینت سفارشی شده ">
              </button>
            </td>
          </tr>

          <tr>
            <td class="dropdown dropleft">
              <button type="button" class="btn p-2 m-2  dropdown-toggle " data-toggle="dropdown" id="basemap-btn"
                data-toggle="tooltip" title=" دسترسی به نقشه های پایه">
              </button>
              <div class="dropdown-menu">
                <table>
                  <tr>
                    <td id='osm'></td>
                  </tr>
                  <tr>
                    <td id='googlemap'></td>
                  </tr>
                  <tr>
                    <td id='parcel'></td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" class="btn p-2 bc m-2" id="layerlist-btn" data-toggle="tooltip"
                title=" دسترسی به لایه های نقشه">
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <a type="button" class="btn p-2 bc m-2" id="legend-btn" data-toggle="tooltip" title=" راهنمای نقشه ">
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" class="btn p-2 bc m-2" id="featureTable-btn" data-toggle="tooltip"
                title="دسترسی به جدول اطلاعات توضیفی لایه ها">
              </button>
            </td>
          </tr>
        </table>

      </div>
      <div id="rc" class="col-sm-10  text-white p-0" style="width: 97%;
              flex: 0 0 97%;max-width: 97%;">
        <div id="overviewMapDiv"></div>
        <div id="map"></div>
        <div id="se">
          <div id="search"></div>
        </div>
        <div id="mes">
          <div dir="rtl" data-dojo-type="dijit/TitlePane"
            data-dojo-props="title:'ابزار اندازه گیری', closable:false ,open:true">
            <div id="measurementDiv"></div>
            <span dir="rtl" style="font-size:smaller;padding:5px 5px;">کلید <b>CTRL</b> را فشار دهید تا اسنپ
              فعال شود.</span>
          </div>
        </div>
        <div id="Isolationprocess-widget"></div>
        <div id="identify-widget"></div>
        <div id="table-widget"></div>
        <div id="print-widget"></div>
        <div id="query-popUp-widget"></div>
        <div id="report-popUp-widget"></div>
        <div id="locationsearch-widget"> </div>
        <div id="legend-widget"></div>
        <div id="layerlist-widget"></div>
        <div id="label-widget"></div>
        <div id="query-widget"></div>
        <div id="report-widget"></div>
        <div id="IsolationInput-widget"></div>
        <div id="navigation-widget"></div>
        <div id="heatmap-widget"></div>
        <div id="featureTable-widget"></div>
        <div id="featureTablelayerlist-widget"></div>
        <div id="selectFeaturelayerlist-widget"></div>
        <div id="coordinate_scale-widget"></div>


        <button type="button" class="btn p-2 bc" id="scaleInfo-btn" data-toggle="tooltip"
                title="دسترسی به مقیاس و مختصات نقشه">
              </button>
      </div>

    </div>



  </div>



  </div>
  </div>




  <script src="../GIS/js/js.js"></script>
</body>

</html>