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
        //let tileSelected1 = null;
        //let tileSelected2 = null;
        //let possible = false;
        typeList = ['White','Red','Green','Blue'];
        tileArray = [
            [1,2,3,4,5,6,7],
            [2,2,3,4,5,6,7],
            [3,2,3,4,5,6,7],
            [4,2,3,4,5,6,7],
            [5,2,3,4,5,6,7],
            [6,2,3,4,5,6,7],
            [7,2,3,4,5,6,7],
            [8,2,3,4,5,6,7],
            [9,2,3,4,5,6,7],
            [10,2,3,4,5,6,7],
            [11,2,3,4,5,6,7],
        ];
        //Initialize
        //Length
        for(var i = 0; i < tileArray[0].length; i++){
            //Height
            for(var j = 0; j < tileArray.length; j++){
                var createTile = this.newTile(i,j);
                tileArray[j][i] = createTile;
            }
        }
    }
    update() { 
    }
    newTile(i, j) {
        var type = Phaser.Math.Between(0,typeList.length-1);
        var tempTile = new Tile(this,40*i + 100,40*j + 100,typeList[type],0).setScale(1,1).setOrigin(0, 0); 
        return tempTile;
    }
}