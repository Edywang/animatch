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
        let tileSelected1 = null;
        let tileSelected2 = null;
        //let possible = false;
        typeList = ['White','Red','Green','Blue'];
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
                var type = Phaser.Math.Between(0,typeList.length-1);
                var tempTile = new Tile(this,50*i + 90,50*j + 70,typeList[type],0).setScale(1,1).setOrigin(0, 0); 
                tileArray[j][i] = tempTile;
            }
        }
    }
    update() {

    }
}