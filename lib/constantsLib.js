// constants go here



    // constants
    // depcreiated for gameCore
    // 
    var BACKGROUNDCOLOR = "#d0d0d0";
    var XCANVASOFFSET=  250         // X position of canvas?(for coords 0,0)
    var YCANVASOFFSET=  113         // Y position
    var TOTALCOLUMNS=  8     // Number of tile columns
    var TOTALROWS=  8        // Number of tile rows
    var TILEWIDTH=  40  // Visual width of a tile
    var TILEHEIGHT=  40 // Visual height of a tile  


    console.log(`constants lib loaded`);


    const myTileTypes = {
        plainTile: Symbol("plainTile"),
        empty: Symbol("empty"),
        Bomb: Symbol("bomb"),
        horizRocket: Symbol("horizRocket"),
        vertRocket: Symbol("vertRocket")
    }


        // numeric tile types
    // 0 - empty
    // 1 - plain tile
    // 2 - bomb 

    var tilecolors = ["Blue",
                        "Crimson",
                        "DarkGreen",
                        "DarkOrange",
                        "Sienna"];
