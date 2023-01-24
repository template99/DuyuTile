
    function drawGUI(){  
        drawGridFrame();
        drawButtons();  
        drawTheGrid(); // draw tile grid
    }



    // Draw a frame with a border
    // blanks it all out
    function drawGridFrame() {
        context.fillStyle = "gray";
        context.fillRect(0, 0, canvas.width, 65);

        context.fillStyle = "darkgreen";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = BACKGROUNDCOLOR; 
        context.fillRect(1, 1, canvas.width-2, canvas.height-2); 

        // Draw title top bar
        // all of this will change
        context.fillStyle = "black";
        context.font = "24px Verdana";
        context.fillText("Duyu Tile", 230, 30);
        console.log('drawing grid frame FINISHED');
    }




    // Draw buttons
    function drawButtons() {
        for (var thisButton=0; thisButton<Buttons.length; thisButton++) {
            context.fillStyle = "white";
            context.fillRect(Buttons[thisButton].x, Buttons[thisButton].y, Buttons[thisButton].width, Buttons[thisButton].height);
            context.fillStyle = "black";
            context.font = "18px Verdana"; 
            var textdim = context.measureText(Buttons[thisButton].text);
            context.fillText(Buttons[thisButton].text, Buttons[thisButton].x + (Buttons[thisButton].width-textdim.width)/2, Buttons[thisButton].y+30);
        }
    }    

    
    // Get the mouse position
    function getMousePosition(canvas, event) {
        var boundingRectangle = canvas.getBoundingClientRect();
        return {
            x: Math.round((event.clientX - boundingRectangle.left)/(boundingRectangle.right - boundingRectangle.left)*canvas.width),
            y: Math.round((event.clientY - boundingRectangle.top)/(boundingRectangle.bottom - boundingRectangle.top)*canvas.height)
        };        
    }


    // just for drawing tiles
    function getTileCoordinate(column, row, columnOffset, rowOffset) {
        var translatedTileX =  column + (column + columnOffset) * TILEWIDTH;  
        var translatedTileY = row + (row + rowOffset) * TILEHEIGHT;  
        return { tilex: translatedTileX, tiley: translatedTileY};
    }


    // draw grid tiles
    // the outer loop
    function drawTheGrid(){
        for (let column=0; column<TOTALCOLUMNS; column++) {
            for (let row=0; row<TOTALROWS; row++) {
                        drawTile(column,row);                    
                }
            }
    }

    // for post-move
    function regenerateTiles(){
        for (var column=0; column<TOTALCOLUMNS; column++) {
            for (var row=0; row<TOTALROWS; row++) {
                        level.tiles[column][row].Regenerate();
                }
            } 
    }


    function drawTile(column,row){
        var myCoordinates = getTileCoordinate(column, row, 6, 3);     
        //console.log(`drawing tile; ${col} ${row} type${thisTile.tileType}`);
        if (level.tiles[column][row].tileType == 0){
            context.fillStyle = BACKGROUNDCOLOR; //  
            context.fillRect(myCoordinates.tilex + 2, myCoordinates.tiley + 2, TILEWIDTH - 4, TILEHEIGHT - 4);
            // practice drawing x
            // context.fillStyle = "black";
            // context.beginPath(); // draw X
            // context.moveTo(myCoordinates.tilex , myCoordinates.tiley );
            // context.lineTo(myCoordinates.tilex + 40, myCoordinates.tiley + 40); // right
            // context.stroke();
            // context.beginPath();
            // context.moveTo(myCoordinates.tilex  +40, myCoordinates.tiley );
            // context.lineTo(myCoordinates.tilex  , myCoordinates.tiley + 40);
            // context.stroke();            
        }

        else if (level.tiles[column][row].tileType   == 1)  
        {            
            context.fillStyle = tilecolors[level.tiles[column][row].tileColor]; 
            context.fillRect(myCoordinates.tilex + 2, myCoordinates.tiley + 2, TILEWIDTH - 4, TILEHEIGHT - 4); 
        }

        else if (level.tiles[column][row].tileType == 2){
            console.log('bomb');
        }

    }

    function drawXonTile(column,row){
        //console.log(`drawing x`);
        var myCoordinates = getTileCoordinate(column, row, 6, 3);     
        context.fillStyle = "black";
        context.beginPath(); // draw X
        context.moveTo(myCoordinates.tilex , myCoordinates.tiley );
        context.lineTo(myCoordinates.tilex + 40, myCoordinates.tiley + 40); // right
        context.stroke();
        context.beginPath();
        context.moveTo(myCoordinates.tilex  +40, myCoordinates.tiley );
        context.lineTo(myCoordinates.tilex  , myCoordinates.tiley + 40);
        context.stroke();  
    }


    function returnRandomTileColor() {
        var myValue = Math.floor(Math.random() * tilecolors.length); 
        return myValue;
    }    
