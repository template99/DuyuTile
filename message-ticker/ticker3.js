/* just some supplimental code for the ticker3.html */

const randomWords = ["apple","orange","banana","kiwi","grapes"];


function testFunction()
{
    return "test function return";
}

// use for top right
function currentTimeDate()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}



function randomTickerMessage()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var outMessage = "Today's date is " + date; 
    // current month
    //const currentMonthNumber
    // what day of the month is it?
    //const dayofMonth =
    // what hour of the day is it?
    //const hourOfDay
    //
    // what minute of the day is it?

}

