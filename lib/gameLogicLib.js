// game logic goes here



    // Game states
    var gameStates = { init: 0, ready: 1, inProgress: 3 };
    var animationState = {};
    var gameState = gameStates.init;       


    // Level object
    var level = {
        x: 250,         // X position of canvas?
        y: 113,         // Y position
        DIVERSITYLEVEL: 5, // how diverse are the colors? 
        tiles: [],      // The two-dimensional tile array
        score: 0,
        colorInPlay: -1, // positive - tileColor when clicked
        totalTurns: 0,
        totalScore: 0
    };

    var thisTurn = {
        pasvFoundMatches: 0,
        markedNeighbors: 0,
        colorInPlay: -1,
        clickedTileCol: -1,
        clickedTileRow: -1,
        foundMatchedTiles: 0,
        totalErasedTiles: 0,
        otherMarkedTiles: 0, // better?
        foundanyNeighbor: false
    }




    // todo: use reset turn to start
    function startNewGame(){
        console.log('starting new game');
        level.totalTurns = 0; 
        regenerateTiles(); 
        level.targetColor = -1;        
        drawTheGrid(); 
        gameState = gameStates.inProgress;
    }

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


   
    // checks if the tile has any neighbors
    // but doesn't set off the ball
    // deterines if it is a valid move
    // just 1-square NESW match
    function checkNeighbors(column,row,active){
        if (active) {level.tiles[column][row].markTile();}  // mark self tile
        //console.log(`pasv: ${col},${row}   color/type seeking: ${tilecolors[level.tiles[col][row].tileColor]}`); 
        var foundAnyNeighbor = false;
        if (column==0) // left edge case
            {
                if (checkEastNeighbor(column,row,active))
                {
                    thisTurn.markedNeighbors+=1;
                    foundAnyNeighbor = true; 
                }    
            }                    
        if (column>0 && column<TOTALCOLUMNS-1)
            {
            // check right                  
            if ( checkEastNeighbor(column,row,active))
                {
                    thisTurn.markedNeighbors+=1;
                    foundAnyNeighbor = true; 
                }                                  
            // check west
            if ( checkWestNeighbor(column,row,active))
                {
                    thisTurn.markedNeighbors+=1;
                    foundAnyNeighbor = true; 
                }                           
           }
        if  (column==TOTALCOLUMNS-1)  // right edge case(double check this)
        {
            //console.log('rightmost edge case');
            if ( checkWestNeighbor(column,row,active))
            {
                thisTurn.markedNeighbors+=1;
                foundAnyNeighbor = true; 
            }         
        }

        
        // topmost, south match only
        if (row==0)
        {
            //console.log(`topmost row`);
            if ( checkSouthNeighbor(column,row,active))            
            {                   
                thisTurn.markedNeighbors+=1;
                foundAnyNeighbor = true;                   
            }
            
        }
        else if  (row>0 && row<TOTALROWS-1) // in between
        {       
            if ( checkSouthNeighbor(column,row,active))            
            {                   
                thisTurn.markedNeighbors+=1;
                foundAnyNeighbor = true;                   
            }
            // check north
            if (checkNorthNeighbor(column,row,active))            
            {                   
                thisTurn.markedNeighbors+=1;
                foundAnyNeighbor = true;                   
            }

        }
        else if  (row==TOTALROWS-1) // bottom edge case
        {
            //console.log(`bottom edge case`);
            if (checkNorthNeighbor(column,row,active))            
            {                   
                thisTurn.markedNeighbors+=1;
                foundAnyNeighbor = true;                   
            }
        }

        // END OF NEIGHBOR CHECK

        if (foundAnyNeighbor==false)
        {
            console.log(`no matches found`);
        }
        //console.log(`this turn's marked neighbors ${thisTurn.markedNeighbors}`); // works()
        return foundAnyNeighbor; 
    }
 





        // clear marked attribute from all tiles
    //
    function clearAllMarks(){
        for (let row = 0; row < TOTALROWS; row++) {            
            for (let column = 0; column < TOTALCOLUMNS; column++) {
                level.tiles[column][row].markedTile = false;
            }
        }
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


    
    function tilesForColor(myColor){
        let foundCounter = 0; 
        for (let row = 0; row < TOTALROWS; row++) {            
            for (let column = 0; column < TOTALCOLUMNS; column++) {
                if (level.tiles[column][row].tileColor == myColor){
                    foundCounter+=1;
                }
            }
        }
        return foundCounter;
    }

    

    // check east neighbor
    // x- x value of tile
    // y - y value of tile
    // shouldmark(bool) - mark for deletion?
    function checkEastNeighbor(col,row,shouldMark){
        var foundAnyNeighbor = false;
        if (level.tiles[col+1][row].tileColor == thisTurn.colorInPlay)
        {
            thisTurn.pasvFoundMatches+=1;
            foundAnyNeighbor = true; 
            if (shouldMark) { level.tiles[col+1][row].markTile(); }
        }  
        return foundAnyNeighbor; 
    }

    function checkWestNeighbor(col,row,shouldMark){
        var foundAnyNeighbor = false;
            //console.log(`(middle)west color: ${tilecolors[level.tiles[x-1][y].tileColor]}`);
            if ( level.tiles[col-1][row].tileColor == level.tiles[col][row].tileColor)
                {
                    thisTurn.pasvFoundMatches+=1;
                    foundAnyNeighbor = true; 
                    if (shouldMark) { level.tiles[col-1][row].markTile(); }
                }            
                return foundAnyNeighbor;                                            
        }
    

    function checkSouthNeighbor(col,row,shouldMark){
        var foundAnyNeighbor = false;
            if ( level.tiles[col][row+1].tileColor == thisTurn.colorInPlay)            
            {                               
                thisTurn.pasvFoundMatches+=1;
                foundAnyNeighbor = true;
                if (shouldMark) { level.tiles[col][row+1].markTile(); }   
            }
        return foundAnyNeighbor;             
    }


    // check upward    
    function checkNorthNeighbor(col,row,shouldMark){
        var foundAnyNeighbor = false;
            //console.log(`north color: ${tilecolors[level.tiles[x][y-1].tileColor]}`);
            if ( level.tiles[col][row-1].tileColor == thisTurn.colorInPlay)            
            {               
                thisTurn.pasvFoundMatches+=1;
                foundAnyNeighbor = true;
                if (shouldMark) { level.tiles[col][row-1].markTile(); }   
            }
            return foundAnyNeighbor; 
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


    
   
    // down to up
    // needs rebuilding
    // go column by column individually
    // this.tileType = 0;
    // needs a rewrite
    function fallDownPieces()
    {
        console.log(`** falling down pieces **`);
        for  (let column=0; column<TOTALCOLUMNS; column++) {  
                if (anyBlanksOnColumn(column)>0) 
                {                    
                    fallVerticalGrabLoop(column);
                    redrawColumn(column);
                }
        }
        //console.debug(`fall pieces done`);
    }


    // works
    function anyBlanksOnColumn(col){
        var foundBlanks = 0; 
        for (var thisRow = 0; thisRow<TOTALROWS; thisRow++){
                if (level.tiles[col][thisRow].tileType ==0 )
                {                    
                    foundBlanks+=1;
                }
        }        
        return foundBlanks;
    }

    // can use for redraw
    // temporarily disabling
    function destroyColumn(column){
        //console.log(`destroying column ${column}`);
        for (var thisRow = 0; thisRow<TOTALROWS; thisRow++){
            level.tiles[column][thisRow].tileType = 0;
            drawTile(column,thisRow);
        }
        redrawColumn(column);
    }

    function redrawColumn(column){
        //console.log(`redrawing column ${column}`);
        for (var thisRow = 0; thisRow<TOTALROWS-1; thisRow++){
            drawTile(column,thisRow);  
        }    
    }

    // a totally new function
    // will need top fill
    // just re-do the stack
    function fallVerticalGrabLoop(currentColumn)
    {
        var nonBlankTiles = []; // collage all non blank tiles
        var upCounter=0;
        for (let myRow = TOTALROWS-1; myRow > -1; myRow--) {
                    //console.log(`backwards counter ${myRow}`); // found it
                    if ( level.tiles[currentColumn][myRow].tileType  != 0 ) // look for non blanks
                    { 
                       var newTile = new gameTile(currentColumn,myRow,
                       level.tiles[currentColumn][myRow].tileType, // column is wrong!
                       level.tiles[currentColumn][myRow].tileColor);
                       nonBlankTiles[upCounter++] = newTile; 
                    }
        }
        //console.log(`total nonblanktiles for col ${currentColumn} reconstruct tile length::${nonBlankTiles.length}`);  // works
        
        // clean column for redraw
        destroyColumn(currentColumn);

        // now, rebuild!
        var rowOffset = TOTALROWS - nonBlankTiles.length;
        //console.log(`calculated offset: ${rowOffset}`);
        var upCounter = 0;
        var newUpCounter = TOTALROWS-1;
        nonBlankTiles.forEach(movedTile => {
            level.tiles[currentColumn][newUpCounter].tileColor = movedTile.tileColor; 
            level.tiles[currentColumn][newUpCounter].tileType = 1; // element.tileType; 
            upCounter+=1;
            newUpCounter-=1;
        });

    // fresh tiles
    function replenishTiles()
    {
        var replenishedTiles = 0;
        console.log(`filling erased tiles`);
        for (let row = 0; row < TOTALROWS; row++) {
            for (let column = 0; column < TOTALCOLUMNS; column++) {
                if (level.tiles[column][row].tileType == 0)
                {           
                    level.tiles[column][row].Regenerate();
                }
            }
        }          
        console.log(`replenished tiles: ${replenishedTiles}`);
    }


        
    }     
 
