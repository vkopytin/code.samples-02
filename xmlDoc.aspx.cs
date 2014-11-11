using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Linq;

public partial class xmlDoc : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        XmlDocument xmldoc = new XmlDocument();
        xmldoc.LoadXml("<root/>");
        xmldoc.DocumentElement.InnerXml = "<item><name/><key/></item>";

        XmlNode node = xmldoc.DocumentElement.SelectSingleNode("/root/item");
        if (node != null)
        {
            node["name"].InnerText = "Fisrt Name";
            node["key"].InnerText = "First key";
        }

        xmlText.InnerText = xmldoc.InnerXml;

        XDocument xDoc = new XDocument();
    }
}