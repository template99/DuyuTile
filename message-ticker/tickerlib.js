// just some functions
//

function topRightTime()
{
    var today = new Date();
    var secondsMarker = today.getSeconds();
     if(secondsMarker < 10){
          secondsMarker = "0" + secondsMarker;
     }
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); // not used
    var time = today.getHours() + ":" + today.getMinutes() + ":" + secondsMarker;
     if(today.getMinutes() < 10){
         var time = today.getHours() + ':0' + today.getMinutes();
     }
    document.getElementById("currentTime").innerHTML = time;
    //
}


// adds a message to the stack/queue
// id: tickerCoreA
// works
function AddMessageToQueue(newMessage)
{
    var ticker = document.getElementById("tickerCoreA");
    var ticker2 = document.getElementById("tickerCoreB");
    var newEl = document.createElement("span");
    newEl.innerHTML = newMessage;
    newEl.className  = "item";
    ticker.appendChild(newEl);
    ticker2.appendChild(newEl);
}

function clearQueue()
{
    var ticker = document.getElementById("tickerCoreA");
    ticker.textContent = "";
}


function Mainer()
{
    console.log('ticker initted');
    var t = setInterval(topRightTime,100);  // fires up the clock
}


function createTicker()
{


}


//Mainer();
//setInterval(topRightTime(), 400);

