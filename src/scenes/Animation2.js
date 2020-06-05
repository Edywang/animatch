class Animation2 extends Phaser.Scene {
    constructor(){
        super("animation2Scene");
    }
    preload() {
        //--------------------------
        //WARNING
        //THIS IS INCOMPLETE
        //--------------------------
        //--------------------------
        //--------------------------
        
        //320x240 Animation
        this.load.image('frame0','./assets/playDog/frame_00_delay-0.08s.gif');
        this.load.image('frame1','./assets/playDog/frame_01_delay-0.08s.gif');
        this.load.image('frame2','./assets/playDog/frame_02_delay-0.08s.gif');
        this.load.image('frame3','./assets/playDog/frame_03_delay-0.08s.gif');
        this.load.image('frame4','./assets/playDog/frame_04_delay-0.08s.gif');
        this.load.image('frame5','./assets/playDog/frame_05_delay-0.08s.gif');
        this.load.image('frame6','./assets/playDog/frame_06_delay-0.08s.gif');
        this.load.image('frame7','./assets/playDog/frame_07_delay-0.08s.gif');
        this.load.image('frame8','./assets/playDog/frame_08_delay-0.08s.gif');
        this.load.image('frame9','./assets/playDog/frame_09_delay-0.08s.gif');
        this.load.image('frame10','./assets/playDog/frame_10_delay-0.08s.gif');
        this.load.image('frame11','./assets/playDog/frame_11_delay-0.08s.gif');
        this.load.image('frame12','./assets/playDog/frame_12_delay-0.08s.gif');
        this.load.image('frame13','./assets/playDog/frame_13_delay-0.08s.gif');
        this.load.image('frame14','./assets/playDog/frame_14_delay-0.08s.gif');
        this.load.image('frame15','./assets/playDog/frame_15_delay-0.08s.gif');
        this.load.image('frame16','./assets/playDog/frame_16_delay-0.08s.gif');
        this.load.image('frame17','./assets/playDog/frame_17_delay-0.08s.gif');
        this.load.image('frame18','./assets/playDog/frame_18_delay-0.08s.gif');
        this.load.image('frame19','./assets/playDog/frame_19_delay-0.08s.gif');
        this.load.image('frame20','./assets/playDog/frame_20_delay-0.08s.gif');
        this.load.image('frame21','./assets/playDog/frame_21_delay-0.08s.gif');
        this.load.image('frame22','./assets/playDog/frame_22_delay-0.08s.gif');
        this.load.image('frame23','./assets/playDog/frame_23_delay-0.08s.gif');
    }
    
    create(){
        this.anims.create({
            key: 'dogPlay',
            frames: [
                { key: 'frame0' },
                { key: 'frame1' },
                { key: 'frame2' },
                { key: 'frame3' },
                { key: 'frame4' },
                { key: 'frame5' },
                { key: 'frame6' },
                { key: 'frame7' },
                { key: 'frame8' },
                { key: 'frame9' },
                { key: 'frame10' },
                { key: 'frame11' },
                { key: 'frame12' },
                { key: 'frame13' },
                { key: 'frame14' },
                { key: 'frame15' },
                { key: 'frame16' },
                { key: 'frame17' },
                { key: 'frame18' },
                { key: 'frame19' },
                { key: 'frame20' },
                { key: 'frame21' },
                { key: 'frame22' },
                { key: 'frame23' },
            ],
            frameRate: 10,
            repeat: 0
        });
        var animation = this.add.sprite(80, 200, 'frame0').play('dogPlay').setOrigin(0,0);
        animation.on('animationcomplete', function (animation, frame){
            this.scene.start("creditScene"); //Goes to credits
        }, this);
    }
    update() {
        //
    }
}