<%@ Page Language="C#" AutoEventWireup="true" CodeFile="WorkWithRepeater.aspx.cs" Inherits="WorkWithRepeater" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Repeater ID="rptrDataItems" runat="server" 
            onitemdatabound="rptrDataItems_ItemDataBound" 
            ondatabinding="rptrDataItems_DataBinding">
        <ItemTemplate>
        <div>
            <asp:Label ID="lblId" runat="server" Text='<%# Bind("ID") %>'></asp:Label>
            <asp:TextBox ID="tbName" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox>
            <asp:TextBox ID="tbEmail" runat="server" Text='<%# Bind("Email") %>'></asp:TextBox>
        </div>
        </ItemTemplate>
        </asp:Repeater>
    </div>
    <div>
        <asp:Button ID="Button1" runat="server" Text="Button" onclick="Button1_Click" />
    </div>
    <div id="output" runat="server">
        
    </div>
    </form>
</body>
</html>
