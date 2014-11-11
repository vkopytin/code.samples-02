<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div>
<code>
RSTO Payment gateway test CC:
VISA
4012001038443335
749
post code
ab11ab
</code>
</div>
<div style="float:left;margin: 10px;background-color: Silver;">
    <ol>
        <li>
            <asp:Label ID="Label0" runat="server" Text="External Order ID:"></asp:Label>
            <asp:TextBox ID="tbExternalOrderID" runat="server" Text="0520703"></asp:TextBox>
        </li>
        <li>
            <asp:Label ID="Label1" runat="server" Text="RSTO Customer ID:"></asp:Label>
            <asp:TextBox ID="tbRSTOCustomerID" Text="1" runat="server"></asp:TextBox>
        </li>
        <li>
            <asp:Label ID="Label2" runat="server" Text="Partner ID:"></asp:Label>
            <asp:TextBox ID="tbPartnerID" Text="1" runat="server"></asp:TextBox>
        </li>
        <li>
            <asp:Label ID="Label3" runat="server" Text="Channel ID:"></asp:Label>
            <asp:TextBox ID="tbChannelID" Text="1" runat="server"></asp:TextBox>
        </li>
        <li>
            <ul>
                <li>
                    <asp:Label ID="Label4ExternalID" runat="server" Text="Item Collection:"></asp:Label>
                    <asp:TextBox ID="tbItemCollectionExternalID" Text="1381" runat="server"></asp:TextBox>
                </li>
                <li>
                    <asp:Label ID="Label4Quantity" runat="server" Text="Item Collection:"></asp:Label>
                    <asp:TextBox ID="tbItemCollectionQuantity" Text="50" runat="server"></asp:TextBox>
                </li>
                <li>
                    <asp:Label ID="Label4Price" runat="server" Text="Item Collection:"></asp:Label>
                    <asp:TextBox ID="tbItemCollectionPrice" Text="15.91" runat="server"></asp:TextBox>
                </li>
                <li>
                    <asp:Label ID="Label4NetPrice" runat="server" Text="Item Collection:"></asp:Label>
                    <asp:TextBox ID="tbItemCollectionNetPrice" Text="79550" runat="server"></asp:TextBox>
                </li>
            </ul>
        </li>
        <li>
            <asp:Label ID="Label5" runat="server" Text="Transaction Mode:"></asp:Label>
            <asp:TextBox ID="tbMode" Text="0" runat="server"></asp:TextBox>
        </li>
        <li>
            <asp:Label ID="Label6" runat="server" Text="Transaction Currency:"></asp:Label>
            <asp:TextBox ID="tbCurrency" Text="0" runat="server"></asp:TextBox>
        </li>
        <li>
            <asp:Label ID="Label7" runat="server" Text="Return URL:"></asp:Label>
            <asp:TextBox ID="tbReturnURL" Text="http://66.175.41.241/Default.aspx" runat="server"></asp:TextBox>
        </li>
        <li runat="server" visible="false">
            <asp:Label ID="Label8" runat="server" Text="HMAC:"></asp:Label>
            <asp:TextBox ID="tbHMAC" runat="server"></asp:TextBox>
        </li>
    </ol>
    <div><asp:Label ID="lblRun" Text="Test Payment gateway" runat="server" 
            AssociatedControlID="Button1" /><asp:Button ID="Button1" runat="server" 
            Text="Run Init" onclick="Button1_Click" />
        <asp:Button ID="btRefresh" runat="server" Text="Refresh Input" 
            onclick="btRefresh_Click" />
    </div>
    <div style="overflow:auto;"><asp:Label ID="lblResult" runat="server" Text="Label"></asp:Label></div>
</div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="customForm" runat="server">
<div style="margin:10px;">
<form method="post" action="https://securetest.electronic-payments.co.uk/Realex/SendRequest">
<div><input name="TransactionID" value="<%= this.Step2Args["TransactionID"] %>" /></div>
<div><input name="RSTOCustomerID" value="1" /></div>
<div><input name="Name" value="Test Name" /></div>
<div><input name="CompanyName" value="My Test Company" /></div>
<div><input name="Address1" value="My Address 1" /></div>
<div><input name="Address2" value="My Address 2" /></div>
<div><input name="City" value="Test City" /></div>
<div><input name="County" value="CA" /></div>
<div><input name="Postcode" value="ab11ab" /></div>
<div><input name="Email" value="test@test.org" /></div>
<div><input name="Phone" value="111 222 3333" /></div>
<div><input type="submit" value="Step 3" /></div>
</form>
<div>Invoice id <%=Request["InvoiceId"] %> is <%=Session[Request["InvoiceId"]]%>.</div>
</div>
</asp:Content>
