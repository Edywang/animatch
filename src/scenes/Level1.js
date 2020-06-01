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
        this.load.image('Black',"assets/Black.png");
        this.load.image('Purple',"assets/Purple.png");
        this.load.image('Yellow',"assets/Yellow.png");
        this.load.image('Player',"assets/Player.png");
        this.load.audio('bark', './assets/bark.wav');
        this.load.audio('beep', './assets/beep.wav');
        this.load.image('mom', './assets/mom.png');

    }
    create() {
        //Config (self explanatory names)
        toRemove = [];
        toRemoveTemp = []
        toSwap = [];
        toAdd = [];
        tileSelected1 = null;
        tileSelected2 = null;
        offsetX = 90;
        offsetY = 70;
        spacing = 50;
        moves = 0; //extremely tentative
        rollOver = false;
        typeList = ['White','Red','Green','Blue','Purple','Player'];
        specialTiles = 1;
        //tileArray[height][length]
        tileArray = [
            [1,2,3,4,5],
            [2,2,3,4,5],
            [3,2,3,4,5],
            [4,2,3,4,5],
            [5,2,3,4,5],
            [6,2,3,4,5],
            [7,2,3,4,5],
            [8,2,3,4,5],  
            [9,2,3,4,5],
            [10,2,3,4,5],
        ];
        //settings tentative
        let movesConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        movesLeft = this.add.text(80, 30, moves, movesConfig);

        //place mom
        this.add.sprite(335, 325, 'mom').setOrigin(0,0);

        //Initialize
        //Length
        var playerTileX =  0;//Phaser.Math.Between(0,tileArray[0].length-1);
        var playerTileY =  0;//Phaser.Math.Between(0,4);
        var type;
        for(var i = 0; i < tileArray[0].length; i++){
            //Height
            for(var j = 0; j < tileArray.length; j++){
                //Choose random tile
                if(i == playerTileX && j == playerTileY){
                    type = typeList.length-1;
                }else{
                    type = Phaser.Math.Between(0,typeList.length-1 - specialTiles);
                }
                var tempTile = new Tile(this,spacing*i + offsetX,spacing*j + offsetY,typeList[type],0).setScale(1,1).setOrigin(0, 0);
                //Allow tile to be clickable
                tempTile.setInteractive();
                tempTile.on('clicked',this.selected,this);
                tileArray[j][i] = tempTile;
                //Hide tile
                tempTile.alpha = 0;
            }
        }
        setVisible(tileArray.length-1,tileArray[0].length-1);
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
        if(tileArray[5][4].texture.key == 'Player')
        {
            console.log("success");
            this.scene.start("animation1Scene");
        }   
    }
    //If you select the tile
    selected(tempTile){
        //No previous selected tile
        console.log((tempTile.y-offsetY)/spacing,(tempTile.x-offsetX)/spacing);
        if(tileSelected1 == null){
            //Store the array values of the tile
            tileSelected1 = [(tempTile.y-offsetY)/spacing,(tempTile.x-offsetX)/spacing];
            //Make the selected tile slightly bigger
            tileArray[tileSelected1[0]][tileSelected1[1]].setScale(1.1,1.1).setOrigin(0.05,0.05);
            game.sound.play('beep');
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
//--------------------------
//Global Functions
//(Level functions that will be repetitivly used)
//--------------------------
//--------------------------
//--------------------------
//Set tiles to Visible
setVisible=function(i,j){
    setTimeout(function(){
        if(i < 0 || j <0){
            return;
        }
        if(j == 0){
            setVisible(i-1,tileArray[0].length-1);
        }else{
            setVisible(i,j-1);
        }
        tileArray[i][j].alpha = 1;
    },40);
}
//Check if adjacent tile is different type
checkAdjacent=function(){
    //Check if adjacent
    if(((tileSelected2[0] <= tileSelected1[0]+1 && tileSelected2[0] >= tileSelected1[0]-1
            && tileSelected2[1] == tileSelected1[1] && tileSelected2[1] == tileSelected1[1])
            || (tileSelected2[0] == tileSelected1[0] && tileSelected2[0] == tileSelected1[0]
            && tileSelected2[1] <= tileSelected1[1]+1 && tileSelected2[1] >= tileSelected1[1]-1))
            && tileArray[tileSelected1[0]][tileSelected1[1]].texture.key != tileArray[tileSelected2[0]][tileSelected2[1]].texture.key){
        //Stuff
        //Temp the tiles
        var holdTile = tileArray[tileSelected1[0]][tileSelected1[1]];
        var holdTile2 = tileArray[tileSelected2[0]][tileSelected2[1]];
        //Adjust the tiles
        holdTile.y = spacing*tileSelected2[0] + offsetY;
        holdTile.x = spacing*tileSelected2[1] + offsetX;
        holdTile2.y = spacing*tileSelected1[0] + offsetY;
        holdTile2.x = spacing*tileSelected1[1] + offsetX;
        tileArray[tileSelected1[0]][tileSelected1[1]] = holdTile2;
        tileArray[tileSelected2[0]][tileSelected2[1]] = holdTile;
        holdTile.setScale(1,1).setOrigin(0,0);
        console.log(tileSelected2[0],tileSelected2[1]);
        checkInARow(tileSelected2[0],tileSelected2[1]);
        //console.log(tileSelected1[0],tileSelected1[1]);
        checkInARow(tileSelected1[0],tileSelected1[1]);
        if(toRemove.length == 0){
            holdTile2.y = spacing*tileSelected2[0] + offsetY;
            holdTile2.x = spacing*tileSelected2[1] + offsetX;
            holdTile.y = spacing*tileSelected1[0] + offsetY;
            holdTile.x = spacing*tileSelected1[1] + offsetX;
            tileArray[tileSelected1[0]][tileSelected1[1]] = holdTile;
            tileArray[tileSelected2[0]][tileSelected2[1]] = holdTile2;
            //holdTile2.setScale(1.1,1.1).setOrigin(0,0);
        }
        for(var m=0;m<toRemove.length-1;m++){
            console.log(toRemove[m]);
        }   
        //Reset tiles selected
        removeTile();
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
//Check if tiles are in a row
checkInARow=function(y1,x1){
    //console.log(tileArray[y1][x1].texture.key);
    if((checkDown(y1,x1) + checkUp(y1,x1)) >= 2 && (checkRight(y1,x1) + checkLeft(y1,x1)) >= 2){
        toRemoveTemp.push([y1,x1]);
        //console.log("Length: " + toRemoveTemp.length);
        game.sound.play('bark');
        while(toRemoveTemp.length > 0){
            var temp = toRemoveTemp.pop();
            //console.log("Temp: " + temp);
            toRemove.push(temp);
        }
        //console.log("remove verticle and horizontal");
        moves++;
        movesLeft.text = moves;
        return;
    } else {
        toRemoveTemp = [];
    }
    //Check Verticle
    if((checkDown(y1,x1) + checkUp(y1,x1)) >= 2){
        toRemoveTemp.push([y1,x1]);
        //console.log("Length: " + toRemoveTemp.length);
        game.sound.play('bark');
        while(toRemoveTemp.length > 0){
            var temp = toRemoveTemp.pop();
            //console.log("Temp: " + temp);
            toRemove.push(temp);
        }
        //console.log("remove vertical");
        moves++;
        movesLeft.text = moves;
        return;
    } else {
        toRemoveTemp = [];
    }
    //Check Horizontal
    if((checkRight(y1,x1) + checkLeft(y1,x1)) >= 2){
        toRemoveTemp.push([y1,x1]);
        //console.log("Length: " + toRemoveTemp.length);
        game.sound.play('bark');
        while(toRemoveTemp.length > 0){
            var temp = toRemoveTemp.pop();
            //console.log("Temp: " + temp);
            toRemove.push(temp);
        }   
        //console.log("remove horizontal");
        moves++;
        movesLeft.text = moves;
        return;
    } else {
        toRemoveTemp = [];
    }
}
//Helper function
checkDown=function(y1,x1){
    if(y1+1 <= tileArray.length-1 && (tileArray[y1][x1].texture.key == tileArray[y1+1][x1].texture.key)){
        //console.log("Push: " + [y1+1,x1]);
        toRemoveTemp.push([y1+1,x1]);   
        return checkDown(y1+1,x1) + 1;
    }
    return 0;
}
//Helper function
checkUp=function(y1,x1){
    if(y1-1 >= 0 && (tileArray[y1][x1].texture.key == tileArray[y1-1][x1].texture.key)){
        //console.log("Push: " + [y1-1,x1]);
        toRemoveTemp.push([y1-1,x1]);
        return checkUp(y1-1,x1) + 1;
    }
    return 0;
}
//Helper function
checkRight=function(y1,x1){
    if(x1+1 <= tileArray[y1].length-1&& (tileArray[y1][x1].texture.key == tileArray[y1][x1+1].texture.key)){
        //console.log("Push: " + [y1,x1+1]);
        toRemoveTemp.push([y1,x1+1]);
        return checkRight(y1,x1+1) + 1;
    }
    return 0;
}
//Helper function
checkLeft=function(y1,x1){
    if(x1-1 >= 0 && (tileArray[y1][x1].texture.key == tileArray[y1][x1-1].texture.key)){
        //console.log("Push: " + [y1,x1-1]);
        toRemoveTemp.push([y1,x1-1]);
        return checkLeft(y1,x1-1) + 1;
    }
    return 0;
}
//Helper function
removeTile=function(){
    var tempRemove;
    while(toRemove.length>0){
        tempRemove = toRemove.pop()
        tileArray[tempRemove[0]][tempRemove[1]].alpha = 0;
    }
    reorganize();
}
//Reorganizes tiles so they fall down
reorganize=function(){
    //Length
    for(var i = tileArray[0].length-1; i >= 0; i--){
        //Height
        for(var j = tileArray.length-1; j >= 1; j--){
            //If invisible
            if(tileArray[j][i].alpha == 0){
                //Find nearest visible block
                for(var k = j-1; k >= 0; k--){
                    if(tileArray[k][i].alpha != 0){
                        //Drop all blocks
                        for(var x=k;x>=0;x--){
                            toSwap.push([x,x+(j-k),i]);
                        }                        
                        break;
                    }
                }
                break; 
            }
        }
    }
    reorganize2();
}
//Recursion
reorganize2=function(){
    setTimeout(function(){
        if(toSwap.length > 0){
            var swapTemp = toSwap.shift();
            var holdTile = tileArray[swapTemp[0]][swapTemp[2]];
            var holdTile2 = tileArray[swapTemp[1]][swapTemp[2]];
            //Adjust locations
            holdTile.y = spacing*swapTemp[1] + offsetY;
            holdTile.x = spacing*swapTemp[2] + offsetX;
            holdTile2.y = spacing*swapTemp[0] + offsetY;
            holdTile2.x = spacing*swapTemp[2] + offsetX;
            //Changes position in array
            tileArray[swapTemp[1]][swapTemp[2]] = holdTile;
            tileArray[swapTemp[0]][swapTemp[2]] = holdTile2;
            reorganize2();
        }else{
            checkPlayer();
        }
        return;
    },100);
}
checkPlayer=function(){
    for(var i = 0; i< tileArray[0].length; i++){         
        if(tileArray[tileArray.length-1][i].texture.key == 'Player')
        {
             tileArray[tileArray.length-1][i].alpha = 0;
             rollOver = true;
             playerPosX = i  ;
             console.log("bottom reached");
             reorganize();
             return;
        } 
     }
     newTile();
}
//Adds new tiles to the empty slots
newTile=function(){
    //Length
    for(var i = tileArray[0].length-1; i >= 0; i--){
        //Height
        for(var j = tileArray.length-1; j >= 0; j--){
            if(tileArray[j][i].alpha == 0){
                toAdd.push([j,i])
            }
        }
    }   
    newTile2();
}
newTile2=function(){
    setTimeout(function(){
        if(toAdd.length > 0){
            var newTemp = toAdd.shift();
            var type = Phaser.Math.Between(0,typeList.length - 1 - specialTiles);
            //if(tileArray[newTemp[0]][newTemp[1]].texture.key != 'Player')
            //{
            if (rollOver == true && newTemp[1] == playerPosX){
                tileArray[newTemp[0]][playerPosX].setTexture('Player');
                tileArray[newTemp[0]][playerPosX].alpha = 1;
                console.log("rolled over");
                rollOver = false;
            }else{
                tileArray[newTemp[0]][newTemp[1]].setTexture(typeList[type]);
                tileArray[newTemp[0]][newTemp[1]].alpha = 1;
            }
            //}
            newTile2();
        }
        return;
    },100)
}