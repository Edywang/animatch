class Level1 extends Phaser.Scene {
    constructor(){
        super("level1");
    }
    preload() {
        //this.load.image('Black',"assets/Black.png");
        this.load.image('White',"assets/White.png");
        this.load.image('Red',"assets/Red.png");
        this.load.image('Green',"assets/Green.png");
        this.load.image('Blue',"assets/Blue.png");
    }
    create() {
        //Config
        tileSelected1 = null;
        tileSelected2 = null;
        offsetX = 90;
        offsetY = 70;
        spacing = 50;
        //let possible = false;
        typeList = ['White','Red','Green','Blue'];
        //tileArray[height][length]
        tileArray = [
            [1,2,3,4,5,6],
            [2,2,3,4,5,6],
            [3,2,3,4,5,6],
            [4,2,3,4,5,6],
            [5,2,3,4,5,6],
            [6,2,3,4,5,6],
            [7,2,3,4,5,6],
            [8,2,3,4,5,6],
            [9,2,3,4,5,6],
            [10,2,3,4,5,6],
        ];
        //Initialize
        //Length
        for(var i = 0; i < tileArray[0].length; i++){
            //Height
            for(var j = 0; j < tileArray.length; j++){
                //Choose random tile
                var type = Phaser.Math.Between(0,typeList.length-1);
                var tempTile = new Tile(this,spacing*i + offsetX,spacing*j + offsetY,typeList[type],0).setScale(1,1).setOrigin(0, 0); 
                //Allow tile to be clickable
                tempTile.setInteractive();
                tempTile.on('clicked',this.selected,this);
                tileArray[j][i] = tempTile;
            }
        }
        //Add clicked action
        this.input.on('gameobjectup', function (pointer, gameObject){
            gameObject.emit('clicked', gameObject);
        }, this);
    }
    update() {
        if(tileSelected2 != null){
            //If adjacent swap tiles
            checkAdjacent();
        }
    }
    //If you select the tile
    selected(tempTile){
        //No previous selected tile
        if(tileSelected1 == null){
            //Store the array values of the tile
            tileSelected1 = [(tempTile.y-offsetY)/spacing,(tempTile.x-offsetX)/spacing];
            //Make the selected tile slightly bigger
            tileArray[tileSelected1[0]][tileSelected1[1]].setScale(1.1,1.1).setOrigin(0.05,0.05);
        }
        //Selected a tile previously
        else{
            //Store the array values of the tile
            tileSelected2 = [(tempTile.y-offsetY)/spacing,(tempTile.x-offsetX)/spacing];
            if(tileSelected2[0] == tileSelected1[0] && tileSelected2[1] == tileSelected1[1]){
                tileArray[tileSelected1[0]][tileSelected1[1]].setScale(1,1).setOrigin(0,0);
                tileSelected1 = null;
                tileSelected2 = null;
            }
        }
    }
}
//Check Adjacent Function
checkAdjacent=function(){
    //Check if adjacent
    if(((tileSelected2[0] <= tileSelected1[0]+1 && tileSelected2[0] >= tileSelected1[0]-1
        && tileSelected2[1] == tileSelected1[1] && tileSelected2[1] == tileSelected1[1])
        || (tileSelected2[0] == tileSelected1[0] && tileSelected2[0] == tileSelected1[0]
        && tileSelected2[1] <= tileSelected1[1]+1 && tileSelected2[1] >= tileSelected1[1]-1))
        && tileArray[tileSelected1[0]][tileSelected1[1]].texture.key != tileArray[tileSelected2[0]][tileSelected2[1]].texture.key){
        //Temp the tiles
        var holdTile = tileArray[tileSelected1[0]][tileSelected1[1]];
        var holdTile2 = tileArray[tileSelected2[0]][tileSelected2[1]];
        //Adjust the tiles
        holdTile.x = spacing*tileSelected2[1] + offsetX;
        holdTile.y = spacing*tileSelected2[0] + offsetY;
        holdTile2.x = spacing*tileSelected1[1] + offsetX;
        holdTile2.y = spacing*tileSelected1[0] + offsetY;
        tileArray[tileSelected1[0]][tileSelected1[1]] = holdTile2;
        tileArray[tileSelected2[0]][tileSelected2[1]] = holdTile;
        holdTile.setScale(1,1).setOrigin(0,0);
        //Reset tiles selected
        console.log(tileSelected2[0],tileSelected2[1]);
        checkInARow(tileSelected2[0],tileSelected2[1]);
        tileSelected1 = null;
        tileSelected2 = null;
        holdTile = null;
        holdTile2 = null;
    }
    //Else reset 2nd tile
    else{
        tileSelected2 = null;
    }
}
checkInARow=function(y1,x1){
    console.log('\nup');
    console.log(tileArray[y1][x1].texture.key);
    console.log(tileArray[y1+1][x1].texture.key);
    if(y1+1 < tileArray.size-1 && (tileArray[y1][x1].texture.key == tileArray[y1+1][x1].texture.key)){
        console.log('in a row up');
    }
    console.log('\ndown');
    console.log(tileArray[y1][x1].texture.key);
    console.log(tileArray[y1-1][x1].texture.key);
    if(y1-1 > 0 && (tileArray[y1][x1].texture.key == tileArray[y1-1][x1].texture.key)){
        console.log('in a row down');
    }
    console.log('\nright');
    console.log(tileArray[y1][x1].texture.key);
    console.log(tileArray[y1][x1+1].texture.key);
    if(x1+1 < tileArray.size-1 && (tileArray[y1][x1].texture.key == tileArray[y1][x1+1].texture.key)){
        console.log('in a row right');
    }
    console.log('\nleft');
    console.log(tileArray[y1][x1].texture.key);
    console.log(tileArray[y1][x1-1].texture.key);
    if(x1-1 > 0 && (tileArray[y1][x1].texture.key == tileArray[y1][x1-1].texture.key)){
        console.log('in a row left');
    }
}