var canvas;
var ctx;
var x = 20; 
var y = 80;
const DELAY = 30;
const RADIUS = 10;

function init() {
    
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    
    setInterval(move_ball, DELAY);
}

function draw() {        
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "cadetblue";
    ctx.arc(x, y, RADIUS, 0, 2*Math.PI);
    ctx.fill();
}

function move_ball() {
    
    x += 1;
    
    if (x > canvas.width + RADIUS) {
        x = 0;
    }
    
    y = Math.sin(x/32)*30 + 80;
    draw();
} 