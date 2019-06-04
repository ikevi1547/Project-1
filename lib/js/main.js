var list_item_selected = new Array();
var cart_page = document.getElementById("data_cart_list");
var customer_name;
var customer_email;
var customer_card;
var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();

function close_alert_page()
{
    document.getElementById("alertPage").style.display="none";
    document.getElementById("payment_box").style.display="none";
}
function openPaymentPage()
{
    document.getElementById("alertPage").style.display = "block";
    document.getElementById("payment_box").style.display = "block";
    document.getElementById("invoice_box").style.display = "none";
}
var re = /^[A-Za-z ]+$/;
var emailcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function payment(name,email,card)
{
    if(name==""||email==""||card=="")
    {
        alert("Please fill all the fields to continue payment");
    }
    else if(!re.test(name))
    {
            alert("Invalid Name");        
    }
    else if(!emailcheck.test(email))
    {
            alert("Invalid Email ID");        
    }
    else if(isNaN(parseInt(card))||card.length!=16)
    {
        alert("Card Number Invalid");
    }
    else
    {
        customer_name = name;
        customer_email = email;
        customer_card = card;
        document.getElementById("payment_box").style.display = "none";
        document.getElementById("invoice_box").style.display = "block";
        document.getElementById("bill_name").innerHTML = name;
        document.getElementById("bill_email").innerHTML = email;
        document.getElementById("bill_card").innerHTML = card;
        document.getElementById("bill_date").innerHTML = day+"-"+month+"-"+year;
        text = "";
        list_item_selected.forEach(PrintItems);
        document.getElementById("bill_table").innerHTML = text;
        function PrintItems(value) {
            console.log(value[2]);
            text += "<tr>";
        text += "<td>" + value[2] + " </td><td> "+ value[0] +"</td><td> "+ value[1] +"$</td><td>"+ parseInt(value[0])*parseInt(value[1]) +"$</td>";
        text += "</tr>";
        }
        let totalAmount = 0;
        for(let i=0; i<list_item_selected.length; i++)
            {
                totalAmount += (list_item_selected[i][0]*list_item_selected[i][1]);
            }
        document.getElementById("total_amount_bill").innerHTML = totalAmount+"$";
    }
}
function addToCart(id_inp,price,name)
{
    if(list_item_selected.length!=0)
        {
            let flag = false;
            for(let i=0;i<list_item_selected.length;i++)
                {
                    if(list_item_selected[i][2].includes(name))
                    {
                        list_item_selected[i] = [document.getElementById(id_inp).value,price,name];
                        flag = true;
                    }
                }
                if(flag==false)
                {
                    list_item_selected.push([document.getElementById(id_inp).value,price,name]);
                }
        }
        else
        {
            list_item_selected.push([document.getElementById(id_inp).value,price,name]);
        }
        document.getElementById("addcart_badge").innerHTML = list_item_selected.length;
}
function buyNow(id_inp,price,name)
{
    list_item_selected = [];
    list_item_selected.length = 0;
    list_item_selected.push([document.getElementById(id_inp).value,price,name]);
    document.getElementById("alertPage").style.display = "block";
    document.getElementById("payment_box").style.display = "block";
    document.getElementById("invoice_box").style.display = "none";
}
function OpencartFunction(){
if(list_item_selected.length!=0)
    {
        document.getElementById("btn_buy_cart_list").style.display = "block";
    }
    text = "<ul>";
    list_item_selected.forEach(PrintItems);
    text += "</ul>";
    document.getElementById("data_cart_list").innerHTML = text;
    function PrintItems(value) {
    text += "<li>" + value[2] + " | ( <b>QTY</b> -> "+ value[0] +" ) | ( <b>TotalPrice</b> -> "+ value[1]*value[0] +"$ ) </li>";
} 
}