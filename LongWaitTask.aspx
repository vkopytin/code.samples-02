<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LongWaitTask.aspx.cs" Inherits="LongWaitTask" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link type="text/css" rel="stylesheet" href="/js/themes/smoothness/jquery-ui.css" />
    <script type="text/javascript" src="/js/js/jquery-1.9.0.min.js"></script>
    <script type="text/javascript" src="/js/ui/jquery-ui.js"></script>
    <script type="text/javascript" src="/js/js/i18n/grid.locale-en.js"></script>
    <script type="text/javascript" src="/js/js/jquery.jqGrid.src.js"></script>
    <link type="text/css" rel="stylesheet" href="/js/css/ui.jqgrid.css" />
    <script type="text/javascript" src="/js/json2.js"></script>
    <script type="text/javascript" src="/js/underscore.js"></script>
    <script type="text/javascript" src="/js/backbone.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {

            setInterval(function () {

                $.ajax({
                    url: "/LongWaitTask.aspx?task=current",
                    type: "get",
                    contentType: "application/json",
                    success: function (x) {

                        $("#result").html(JSON.stringify(x));
                    }
                });
            }, 3000);
        });

        function TestMethod() {
            $.ajax({
                url: "/(S(temp))/LongWaitTask.aspx/TestMethod",
                type: "get",
                data: { test: "1" },
                dataType: "json",
                contentType: "application/json",
                success: function (x) {
                }
            });
        }

        function startActivity() {
            $.ajax({
                url: "/LongWaitTask.aspx?task=start",
                type: "get",
                contentType: "application/json",
                success: function (x) {

                    $("#result").html(JSON.stringify(x));
                }
            });
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <button onclick="startActivity(); return false;">Start Activity</button>
        <button onclick="TestMethod(); return false;">Test Method</button>
    </div>
    <div id="result">
    </div>
    </form>
</body>
</html>
