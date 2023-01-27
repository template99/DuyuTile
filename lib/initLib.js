window.onload = function() {
    console.log(`MAIN INIT(new function lib)`);
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");


    // run main init here?

        // ENTRY POINT
        function init()
        {   
            gameState = gameStates.init; 
            console.clear(); 
            console.log("MAIN INIT");
            canvas.addEventListener("mousedown", onMouseDown);  
            canvas.addEventListener("onkeydown",onKeyDown);
            // initialize the tile grid - mandatory 
            for (var thisColumn=0; thisColumn<TOTALCOLUMNS; thisColumn++) {
                level.tiles[thisColumn] = []; 
                for (var thisRow=0; thisRow<TOTALROWS; thisRow++) {
                    level.tiles[thisColumn][thisRow] =  new gameTile2(thisColumn,thisRow,1,returnRandomTileColor()); 
                }
            }        
            drawGUI(); // works
            gameState = gameStates.ready;
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