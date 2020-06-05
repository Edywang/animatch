class Credits extends Phaser.Scene {
    constructor(){
        super("creditScene");
    }
    preload() {
        //580 x 220 Start Button
        this.load.image('start','./assets/Start.png');
    }
    
    create(){
        //Start Button
        var button = this.add.sprite(95,200,`start`).setScale(0.5,0.5).setOrigin(0,0).setInteractive();
        //Mouse Hover Button
        button.on('pointerover',function(){});
        //Mouse Leaves Button
        button.on('pointerout',function(){});
        //Mouse Clicks Button
        button.on('pointerup',function(){
            this.scene.start("animation2Scene");
        },this);
    }

    update() { 
    }
}