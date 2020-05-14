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
                var type = Phaser.Math.Between(0,typeList.length-1);
                var tempTile = new Tile(this,spacing*i + offsetX,spacing*j + offsetY,typeList[type],0).setScale(1,1).setOrigin(0, 0); 
                tempTile.setInteractive();
                tempTile.on('clicked',this.selected,this);
                tileArray[j][i] = tempTile;
            }
        }
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
        gameObject.emit('clicked', gameObject);
        }, this);
    }
    update() {
        if(tileSelected2 != null){
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
            //Reset tiles selected
            tileSelected1 = null;
            tileSelected2 = null;
            console.log('swapped');
        }
        //Length
        /*for(var i = 0; i < tileArray[0].length; i++){
            //Height
            for(var j = 0; j < tileArray.length; j++){
                tileArray[j][i].update();
                //console.log('updating');
            }
        }*/
    }
    selected(tempTile){
        if(tileSelected1 == null){
            tileSelected1 = [(tempTile.y-offsetY)/spacing,(tempTile.x-offsetX)/spacing];
            console.log(tileArray[tileSelected1[0]][tileSelected1[1]].texture.key);

        }else{
            tileSelected2 = [(tempTile.y-offsetY)/spacing,(tempTile.x-offsetX)/spacing];
            console.log(tileArray[tileSelected2[0]][tileSelected2[1]].texture.key);

        }
        console.log(tempTile.x);
        console.log(tempTile.y);
    }
}