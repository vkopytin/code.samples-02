using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Hosting;
using System.Threading;
using System.Web.Script.Services;
using System.Web.Services;
using System.Xml;
using System.Net;
using System.Web.Script.Serialization;
using System.IO;
using System.Xml.Serialization;

[ScriptService]
public partial class LongWaitTask : System.Web.UI.Page
{
    public class LongTask : IRegisteredObject
    {
        private bool isRunning = true;
        private string sessionId;

        public LongTask(string sessionId)
        {
            this.sessionId = sessionId;
            HostingEnvironment.RegisterObject(this);
        }

        public void Stop(bool immediate)
        {
            this.isRunning = !immediate;
        }

        public void DoLongTask()
        {
            while (isRunning)
            {
                PutDate(DateTime.Now);

                Thread.Sleep(1000);
            }
        }

        Data PutDate(DateTime date)
        {
            try
            {
                string dataDate = date.ToString("o");

                string uri = "http://66.175.41.241/(S(" + this.sessionId + "))/LongWaitTask.aspx/TestMethod";
                var args = HttpUtility.ParseQueryString("");
                args["date"] = "test";
                string locationUrl = string.Join("?", uri, args);
                HttpWebRequest webRequest = WebRequest.Create(locationUrl) as HttpWebRequest;
                webRequest.ContentType = "application/json";
                webRequest.Method = "GET";
                ((WebRequest)webRequest).Headers.Add("X-Requested-With", "XMLHttpRequest");
                webRequest.Referer = "http://66.175.41.241/(S(temp))/LongWaitTask.aspx";
                webRequest.Accept = "application/json";
                webRequest.KeepAlive = false;
                webRequest.ProtocolVersion = HttpVersion.Version10;
                WebResponse response = webRequest.GetResponse();
                JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
                Data data = jsonSerializer.Deserialize<Data>(new StreamReader(response.GetResponseStream()).ReadToEnd());

                return data;
            }
            catch
            {
                throw;
            }
        }
    }

    public class Customer
    {
        public int ID { get; set; }
    }

    public class Customer2
    {
        [XmlAttribute]
        public int ID { get; set; }
        [XmlText]
        public string CustomerName { get; set; }
    }

    public class AccountInfo
    {
        public int CustomerId { get; set; }
    }

    public class DataInfo
    {
        public Customer2 Customer { get; set; }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["task"] == "start")
        {
            LongTask task = new LongTask(Session.SessionID);
            System.Threading.Tasks.Task.Factory.StartNew(task.DoLongTask);

            Response.ContentType = "application/json; charset=utf-8";
            Response.Write("{\"result\":\"started\"}");
            Response.End();
        }
        else if (Request["task"] == "current")
        {
            Response.ContentType = "application/json; charset=utf-8";
            Response.Write(string.Join("", "{\"lastActivity\":\"", Session["longRunningCounter"], "\"}"));
            Response.End();
        }
        else if (Request["task"] == "xml")
        {
            Response.ContentType = "text/xml";
            XmlSerializer sr = new XmlSerializer(typeof(Customer));
            sr.Serialize(new StreamWriter(Response.OutputStream), new Customer { ID = 12344 });
            Response.End();
        }
        else if (Request["task"] == "xml2")
        {
            Response.ContentType = "text/xml";
            XmlSerializer sr = new XmlSerializer(typeof(DataInfo));
            sr.Serialize(new StreamWriter(Response.OutputStream), new DataInfo { Customer = new Customer2 { ID = 12344, CustomerName = "Customer Name" } });
            Response.End();
        }

        else if (Request["task"] == "xml3")
        {
            Response.ContentType = "text/xml";
            Response.Write("<customer Id=\"2314324\">Customer Name</customer>");
            Response.End();
        }
    }

    public class Data
    {
        public string result { get; set; }
        public string lastActivity { get; set; }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet=true)]
    public static Data TestMethod()
    {
        HttpContext.Current.Session["longRunningCounter"] = HttpContext.Current.Request["date"];

        return new Data { result = "OK" };
    }
}