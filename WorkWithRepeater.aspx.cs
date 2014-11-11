using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

public class DataItem
{
    public string ID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public override string ToString()
    {
        JavaScriptSerializer sr = new JavaScriptSerializer();

        return sr.Serialize(this);
    }
}

public partial class WorkWithRepeater : System.Web.UI.Page
{
    public IEnumerable<DataItem> items = new DataItem[] {};

    public List<string> logs = new List<string>();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Session["items"] = FetchData();
            rptrDataItems.DataSource = Session["items"];
            rptrDataItems.DataBind();
        }
        else
        {
            //rptrDataItems.DataSource = Session["items"];
            //rptrDataItems.DataBind();
        }
    }

    private DataItem[] FetchData()
    {
        List<DataItem> items = new List<DataItem>();

        items.Add(new DataItem { ID = "55324", Name = "Item name 01", Email = "item01.email@email.com" });
        items.Add(new DataItem { ID = "35424", Name = "Item name 02", Email = "item02.email@email.com" });
        items.Add(new DataItem { ID = "56343", Name = "Item name 03", Email = "item03.email@email.com" });
        items.Add(new DataItem { ID = "43534", Name = "Item name 04", Email = "item04.email@email.com" });

        return items.ToArray();
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        output.InnerHtml = string.Join("",
            logs.Select(x => string.Join(x, "<div>", "</div>")));
    }

    protected void rptrDataItems_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            DataItem dataItem = e.Item.DataItem as DataItem;
            TextBox tbName = e.Item.FindControl("tbName") as TextBox;
            TextBox tbEmail = e.Item.FindControl("tbEmail") as TextBox;

            dataItem.Name = tbName.Text;
            dataItem.Email = tbEmail.Text;
        }
    }

    protected void rptrDataItems_DataBinding(object sender, EventArgs e)
    {

    }
}