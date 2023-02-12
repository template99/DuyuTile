// ditch the window onload function? 
// the main lib
// high level stuff


window.onload = function() {
    console.log(`MAIN INIT(new function lib)`);
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // stuff everything into here
    var gameCore = {
        canvas : document.getElementById("viewport"),
        context : canvas.getContext("2d"),
        gameState : 0,
        animationState : 0,
        delayTime : 0,
        BACKGROUNDCOLOR : "#d0d0d0",
        XCANVASOFFSET :  250,         // X position of canvas?(for coords 0,0)
        YCANVASOFFSET :  113,         // Y position
        TOTALCOLUMNS:  8,     // Number of tile columns
        TOTALROWS :  8,        // Number of tile rows
        TILEWIDTH :  40,  // Visual width of a tile
        TILEHEIGHT :  40, // Visual height of a tile 
        countertime: 10,
        currentLevel : level // per level
    }

    var Buttons = [ { x: 30, y: 210, width: 120, height: 40, text: "New Game"},
    { x: 30, y: 240, width: 120, height: 40, text: "Zap tile 1,1"},    
    { x: 30, y: 280, width: 120, height: 40, text: "Refresh tiles"}];  


    // setInterval(() => {
                
    // }, interval);    

    // maybe put drawing functions
    // in a queue?
    setInterval(function() {
        gameCore.countertime=-1;
        if (countertime==0)
        {
            gameCore.countertime = 10
        }
        // any code here or call a funciton
        //console.log('test timer') 
        }, 20000);

    // run main init here

        // ENTRY POINT
        function init()
        {   
            // EXPERIMENTAL
            clearInterval();
            gameCore.gameState = 0; 
            console.log("(initlib) MAIN INIT");
            canvas.addEventListener("mousedown", onMouseDown);  
            canvas.addEventListener("onkeydown",onKeyDown);
            // initialize the tile grid - mandatory 
            for (var thisColumn=0; thisColumn<TOTALCOLUMNS; thisColumn++) {
                level.tiles[thisColumn] = []; 
                for (var thisRow=0; thisRow<TOTALROWS; thisRow++) {
                    level.tiles[thisColumn][thisRow] =  new gameTile(thisColumn,thisRow,1,returnRandomTileColor()); 
                }
            }        
            drawGUI(); 
            gameCore.gameState = gameStates.ready;
        }
    
        // not working
        function onKeyDown(event){
            var keyCode = ('which' in event) ? event.which : event.keyCode;
            console.log(`you presed: ${keyCode}`);
        }
     

        

    // CLICK FUNCTION EVENT
    // branches between button clicks or tile clicks, or nothing
    function onMouseDown(event){
        var mousePos = getMousePosition(canvas, event); // Get the mouse position
        mt = getMouseTile(mousePos);
        if (mt.validTileClick) {
                PlayTileTurn(mt.x,mt.y);
        }
        
        for (var gameButtons=0; gameButtons<Buttons.length; gameButtons++) {
            if (mousePos.x >= Buttons[gameButtons].x && mousePos.x < Buttons[gameButtons].x+Buttons[gameButtons].width &&
                mousePos.y >= Buttons[gameButtons].y && mousePos.y < Buttons[gameButtons].y+Buttons[gameButtons].height)
                 {

                    if (gameButtons == 0) {
                        startNewGame(); 
                    }
                     else if (gameButtons == 1) {
                        zap1_1_tile();
                    } 
                    else if (gameButtons == 2) {
                        destroyColumn(3);
                        drawTheGrid();
                   }  
                                   
                }                   
            }
        
    
    }
    
    // primary entry point
    init();

}