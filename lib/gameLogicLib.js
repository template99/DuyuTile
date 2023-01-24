// game logic goes here


    // resets the turn
    function resetTurn()
    {
        thisTurn.colorInPlay = -1; 
        thisTurn.clickedTileCol = -1;
        thisTurn.clickedTileRow = -1;
        thisTurn.colorInPlay = -1;
        thisTurn.foundMatchedTiles = false;
        thisTurn.foundanyNeighbor = false;    
        pasvFoundMatches = 0;     
        thisTurn.markedNeighbors = 0; 
        thisTurn.otherMarkedTiles = 0;
        thisTurn.totalErasedTiles =0;
        clearAllMarks(); 
    }


    
    // THE BIG TURN
    // 
    function PlayTileTurn(column,row){
        console.log(`playing tile ${column},${row}`);          
        if (level.tiles[column][row].tileType == 1) // works
        {
            
            thisTurn.colorInPlay = level.tiles[column][row].tileColor
            console.log(`total tiles for color ${thisTurn.colorInPlay} is ${tilesForColor(thisTurn.colorInPlay)}`);
            if ( checkNeighbors(column,row,false) == true)  // OOPS!
            {
            if (thisTurn.markedNeighbors>0){
                console.log(`found matched tiles, erasing`);
                if (checkNeighbors(column,row,true))
                {
                   activeCheckNeighbors();  
                   eraseMarkedPieces(); 
                   fallDownPieces();  
                   replenishTiles();
                   console.log(`total marked erased pieces ${thisTurn.totalErasedTiles}`); // erased tiles per turn
                   resetTurn(); 
                }
            }
            else
            {
                console.log(`no marked neighbors found`);
            }
        }
        }
        else
        {
            console.log('non-tile clicked(future expansion)');
        }        
        drawTheGrid(); // refresh board
        
    }


    // now find neigboring tiles we haven't found yet
    // TODO: better
    function activeCheckNeighbors(){
        //console.log(`recursive check neighbors`);
        for (let row = 0; row < TOTALROWS; row++) {            
            for (let column = 0; column < TOTALCOLUMNS; column++) {
                //console.log(` RCR: ${column}${row}`);
                if (level.tiles[column][row].tileColor == thisTurn.colorInPlay && 
                    level.tiles[column][row].markedTile == true)
                    {     
                        checkNeighbors(column,row,true);
                    }
            }
        }     

        // now, recheck the already-marked neighbors for neighbors
        for (let row = 0; row < TOTALROWS; row++) {                    
        for (let column = 0; column < TOTALCOLUMNS; column++) {
            //console.log(` RCR: ${column}${row}`);
            if (level.tiles[column][row].tileColor == thisTurn.colorInPlay && 
                level.tiles[column][row].markedTile == true)                        
                {
                    checkNeighbors(column,row,true);
                }
            }
        }
    }


    

    // 2. erase marked tiles
    function eraseMarkedPieces(){
        //console.log(`about to erase marked pieces.`);  
        for (let row = 0; row < TOTALROWS; row++) {
            for (let column = 0; column < TOTALCOLUMNS; column++) {
                if (level.tiles[column][row].markedTile == true)
                {           
                    level.tiles[column][row].eraseTile(); 
                    thisTurn.totalErasedTiles+=1;
                }
            }
        }         
    }


