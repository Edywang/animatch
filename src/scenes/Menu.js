// Phaser Scene Steps:
// 1. init() - Prepare data for scene (Specifically for little bits of data like variables passed between scenes)
// 2. preload() - Prepare assets for scene (Specifically for assets)
// 3. create() - Add assets to scene
// 4. update() - Loops continuously for duration of scene at chosen frame rate

class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload() {
        //580 x 220 Start Button
        this.load.image('start','./assets/Start.png');
        //580 x 220 Credits Button
        //this.load.image('credits','./assets/Credits.png');
        //this.load.audio('bg_music', './assets/bg_music.mp3');
        //this.load.audio('blip', './assets/blip.wav');
        //
    }
    
    create(){
        // Displaying the Title
        /*let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '56px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.title = this.add.text(320, 100, "Infinite Football", titleConfig);
        this.title.x = 320 - this.title.width/2; 

        // Displaying the score
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.scoreLeft = this.add.text(180, 180, 'Press ↑ to go up and ↓ to go down', textConfig);*/
        //Start Button
        var button = this.add.sprite(95,200,`start`).setScale(0.5,0.5).setOrigin(0,0).setInteractive();
        //Mouse Hover Button
        button.on('pointerover',function(){});
        //Mouse Leaves Button
        button.on('pointerout',function(){});
        //Mouse Clicks Button
        button.on('pointerup',function(){
            this.scene.start("level1");
        },this);
    }

    update() { 
    }
}