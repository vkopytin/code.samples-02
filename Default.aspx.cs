using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;
using System.Collections.Specialized;
using System.Text;
using System.Runtime.InteropServices;
using System.Configuration;
using System.Web.Services;

public partial class _Default : System.Web.UI.Page
{
    protected Dictionary<string, string> Step2Args = new Dictionary<string, string>(){
                {"TransactionID", "1"},
                {"RSTOCustomerID", "1"},
                {"Name", "Test Name"},
                {"CompanyName", "My TestCompany"},
                {"Address1", "My Address1"},
                {"Address2", "My Address2"},
                {"City", "TestCity"},
                {"County", "CA"},
                {"Postcode", "ab11ab"},
                {"Email", "test@test.org"},
                {"Phone", "111 222 3333"}
            };

    [WebMethod]
    public static string SayHello()
    {
        return "Hello";
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!string.IsNullOrEmpty(Request["Success"]))
        {
            Session[Request["ExternalOrderID"]] = Request["Success"];
        }

        if (!IsPostBack)
        {
            string timeSpan = DateTime.Now.Ticks.ToString();
            tbExternalOrderID.Text = timeSpan.Substring(timeSpan.Length - 7);

            //dynamic sha256 = Marshal.BindToMoniker("script:" + Server.MapPath("sha256.wsc"));
            //tbHMAC.Text = sha256.b64_hmac_sha256(ConfigurationManager.AppSettings["rstosecretkey"], tbExternalOrderID.Text);
        }
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        rsto.RSTOWebClient rstoClient = new rsto.RSTOWebClient("https://securetest.electronic-payments.co.uk");
        rstoClient.OnGetResponse += x => { lblResult.Text += "<div>" + x + "</div>"; };

        Dictionary<string, string> args = new Dictionary<string, string>();

        args["ExternalOrderID"] = tbExternalOrderID.Text;
        args["RSTOCustomerID"] = tbRSTOCustomerID.Text;
        args["PartnerID"] = tbPartnerID.Text;
        args["ChannelID"] = tbChannelID.Text;
        args["NetPrice"] = "7950";
        //args["ItemCollection"] = tbItemCollection.Text;
        args["ItemCollection[0].ExternalID"] = "1381";
        args["ItemCollection[0].Quantity"] = "50";
        args["ItemCollection[0].Price"] = "15.91";
        args["ItemCollection[0].NetPrice"] = "79550";

        args["Mode"] = tbMode.Text;
        args["Currency"] = tbCurrency.Text;
        var getArgs = HttpUtility.ParseQueryString("");
        getArgs["InvoiceId"] = args["ExternalOrderID"];
        args["ReturnURL"] = string.Join("?", tbReturnURL.Text, getArgs);
        //args["HMAC"] = tbHMAC.Text;

        lblResult.Text = string.Empty;
        try
        {
            InitializeResult res = rstoClient.Initialize(args);

            lblResult.Text += "------------------------------------------\r\n";

            res.GetType().GetProperties()
                .Select(x => lblResult.Text += string.Format("<div>{0}: {1}</div>", x.Name, x.GetValue(res, null)))
                .ToArray();

            Step2Args["TransactionID"] = res.TransactionID;
        }
        catch (Exception ex)
        {
            lblResult.Text += string.Format("<div>Unable to deserializes: {0}</div>", ex.Message);
        }
    }

    protected void btRefresh_Click(object sender, EventArgs e)
    {
        string timeSpan = DateTime.Now.Ticks.ToString();
        tbExternalOrderID.Text = timeSpan.Substring(timeSpan.Length - 7);
    }
}