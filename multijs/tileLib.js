

var JS2CONSTANT = 3; 



function js2(){
    console.log(`test from js2 file`);
}


  // NOTE: xcor, ycor isn't really used
    // 
    class gameTile
     {
        constructor(column,row,myTileType,tilecolor){
            //  console.log(`new tile: col${column}, row: ${row} tiletype:${myTileType}`);
            this.column = column;  
            this.row = row;            
            this.markedTile = false; 
            this.tileType  = myTileType; 
            this.tileColor  =  tilecolor; 
        }




        // works
        eraseTile() {
            this.tileType = 0; 
            this.tileColor = -1;
            this.markedTile = true; // might need to change later
            //console.log(`&&  tile ${this.column},${this.row} erased`); 
        }

        // mark tile for potential deletion
        markTile()   {
            this.markedTile = true;
        }


        redrawSelf()
        {
            drawTile(self.column,self.row);
        }

        // don't use yet
        setasPlaytile()
        {
            console.log(`>>tile ${this.column},${this.row} set as primary play tile`);
            this.markedTile  = true;
        }



        Regenerate(){ 
            this.markedTile = false;
            this.tileType = 1;
            this.tileColor  = returnRandomTileColor();  // redraw itself maybe?
            //console.log(`tile ${this.xcor},${this.ycor} regenerated`); 
        }

        // when swapping tiles
        // set ALL properties but the xcor and ycor
        // don't use yet
        reassignTile(newTileObject){
            console.log(`reassigning tile: ${self.xcor}, ${self.ycor} `);
            this.tileType = newTileObject.tileType;
            this.tileColor = newTileObject.tileColor;
            this.markedTile = false;
        }

        // for moving tiles
        // crude, but should work
        // might only allow for grafting on blank tiles
        // 
        reassignTileMk2(originalTile, newTile){
            console.log(`reassigning tile ${self.xcor} ${self.ycor}`);
            originalTile.tileType = newTile.tileType;
            originalTile.tilecolor = newTile.tilecolor; 
            this.redrawSelf(); 

        }

        killTile()
        {
            console.log('destroying tile');
            self.tileType = 0;
            self.tilecolor = -1;
            this.redrawSelf();
            return null; 
        }


    }