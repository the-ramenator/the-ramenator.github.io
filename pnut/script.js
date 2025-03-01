// look up cameraFilter property for tilesprite minimap

const xmapoffsets = [0,-8, -1, -12, -11, -13, -3, 0, -5, 0, 0]; //0,0 at the beginning added for referencing
const ymapoffsets = [0,-15, -15, -11, -13, -3, -12, -2, -10, -15, 0];
const xworldbounds = [0, 32, 70, 42, 82, 46, 74, 132, 119, 101, 206];
const yworldbounds = [0, 14, 14, 10, 12, 14, 28, 30, 37, 42, 110];
const playerxoffsets = [0,4,5,6,6,1,3,9.5,8,5,7];
const playeryoffsets = [0,8,6,7,5,11,21,18,30,15,18];
const acornTotals = [3,6,5,4,8,8,9,9,19,27];
let acornsSaved;
let unlockedLevels;
let key=1;
let gameOver = false;
let luhvictory = false;
let dashing = false;
let cooldownOver = true;
let luhsoundOn = false;
let cloudVelocity = 0;
var score = 0;
var scoreText = document.getElementById('score');
let leveloffsetx, leveloffsety;
let scene;
let objectData = {};
let clickedButton = false;
let victoryCalled = false;

let cavemp3, grasslandsmp3, cloudsmp3, junglemp3, beachmp3;

document.getElementById("alert").style.opacity = 0;
document.getElementById("fader").style.opacity = 0;
//document.getElementById("fader").style.display = 'none';

function gridLevels() {
    document.getElementById('levels').innerHTML = '';
    if(localStorage.getItem('unlockedLevels')){
        var string = localStorage.getItem('unlockedLevels');
        unlockedLevels = string.split(",");
        for (let i = 0; i < unlockedLevels.length; i++) {
            unlockedLevels[i] = parseInt(unlockedLevels[i]);
        }
    }
    else{
        unlockedLevels = [1,0,0,0,0,0,0,0,0,0];
    }
    if(localStorage.getItem('acornsSaved')){
        var string = localStorage.getItem('acornsSaved');
        acornsSaved = string.split(",");
        for (let i = 0; i < acornsSaved.length; i++) {
            acornsSaved[i] = parseInt(acornsSaved[i]);
        }
    }
    else{
        acornsSaved = [0,0,0,0,0,0,0,0,0,0];
    }
    for (let i = 1; i < 11; i++) {
        this.obj = document.createElement("img");
        this.obj.src = 'https://raw.githubusercontent.com/the-ramenator/dcsdtechfair2025/refs/heads/main/state/level-icons/levelselect'+i+'.webp';
        this.obj.id = i;
        if(unlockedLevels[i-1] == 0){
            this.obj.classList.add("disabled");   
        }
        else{
            this.obj.addEventListener("click", function() {
                clickedButton = this.id;
                key = parseInt(this.id);
                document.getElementById('homescreen-container').style.display = 'none';
                document.getElementById('game-container').style.display = 'block';
                document.getElementById("pause").style.display = "block";  
                document.getElementById('introAudio').pause();

            });
        }
        if(acornTotals[i-1] == acornsSaved[i-1]){
            this.obj.classList.add("completed");
        }
        this.obj.height = 0.125*window.innerHeight;
        this.obj.width = 0.125*window.innerHeight;
        document.getElementById('levels').appendChild(this.obj);
    }
}
gridLevels();

function returnHome(){
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('homescreen-container').style.display = 'block';
    document.getElementById("pause-bg").style.display = "none";
    document.getElementById("pause").style.display = "none";  
    if(luhsoundOn == 'true'){
        document.getElementById('introAudio').play();
        cloudsmp3.pause();
        grasslandsmp3.pause();
        cavemp3.pause();
        beachmp3.pause();
        junglemp3.pause();
    }
    score = 0;
    gridLevels();
}



class Main extends Phaser.Scene {

    constructor ()
    {
        super('Main');

    }

    preload (){
        this.load.setBaseURL('https://raw.githubusercontent.com/the-ramenator/dcsdtechfair2025/refs/heads/main/state');

        this.load.spritesheet('pnut', 'pnut.png', {frameWidth: 128, frameHeight: 161});
        this.load.spritesheet('tilesheet', 'OfficialTileset.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('waterDeath', 'waterDeath.png', {frameWidth: 128, frameHeight: 64});
        this.load.spritesheet('leafDeath', 'leafDeath.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('door', 'door.png', {frameWidth: 128, frameHeight: 256});
        this.load.image('tiles', 'OfficialTileset.png');
        this.load.image('regdam', 'damageblock.png');
        this.load.image('acornimg', 'acorn.webp');

        this.load.audio('acornmp3', 'audio/acorn.mp3');
        this.load.audio('dashmp3', 'audio/dash-cut.mp3');
        this.load.audio('deathmp3', 'audio/death.mp3');
        this.load.audio('jumpmp3', 'audio/jump-cut.mp3');
        this.load.audio('victorymp3', 'audio/victory.mp3');

        this.load.audio('cloudsmp3', 'audio/clouds.mp3');
        this.load.audio('grasslandsmp3', 'audio/grasslands.mp3');
        this.load.audio('cavemp3', 'audio/cave.mp3');
        this.load.audio('beachmp3', 'audio/beach.mp3');
        this.load.audio('junglemp3', 'audio/jungle.mp3');


        for (let i = 1; i < 11; i++) {
            this.load.tilemapTiledJSON(('level'+i), ('tilemaps/level'+i+'.tmj'));
        }
        for (let i = 1; i < 5; i++) {
            this.load.image(('sky'+i), ('backgrounds/sky'+i+'-flipped.png'));
        }
        for (let i = 1; i < 5; i++) {
            this.load.image(('jungle'+i), ('backgrounds/jungle'+i+'.png'));
        }

        this.gameWidth = this.sys.game.canvas.width;
        this.gameHeight = this.sys.game.canvas.height;


    }

    create (){
        this.jumpmp3 = this.sound.add('jumpmp3');
        this.deathmp3 = this.sound.add('deathmp3');
        this.acornmp3 = this.sound.add('acornmp3');
        this.victorymp3 = this.sound.add('victorymp3');
        this.dashmp3 = this.sound.add('dashmp3');

        this.cloudsmp3 = this.sound.add('cloudsmp3');
        this.grasslandsmp3 = this.sound.add('grasslandsmp3');
        this.cavemp3 = this.sound.add('cavemp3');
        this.junglemp3 = this.sound.add('junglemp3');
        this.beachmp3 = this.sound.add('beachmp3');


        this.cloudsmp3.setLoop(true);
        this.grasslandsmp3.setLoop(true);
        this.cavemp3.setLoop(true);
        this.beachmp3.setLoop(true);
        this.junglemp3.setLoop(true);

        this.cloudsmp3.play();
        this.cloudsmp3.pause();
        this.grasslandsmp3.play();
        this.grasslandsmp3.pause();
        this.cavemp3.play();
        this.cavemp3.pause();
        this.junglemp3.play();
        this.junglemp3.pause();
        this.beachmp3.play();
        this.beachmp3.pause();

        cavemp3 = this.cavemp3;
        grasslandsmp3 = this.grasslandsmp3;
        cloudsmp3 = this.cloudsmp3;
        beachmp3 = this.beachmp3;
        junglemp3 = this.junglemp3;

        scene = this.scene.get('Main');
        this.physics.world.TILE_BIAS = 150;
        //new TileSprite(scene, x, y, width, height, textureKey, [frameKey])
        this.player = this.physics.add.sprite(128*playerxoffsets[key],128*playeryoffsets[key], 'pnut').setScale(0.6).setDepth(2);
        if(localStorage.getItem('unlockedLevels')){
            var string = localStorage.getItem('unlockedLevels');
            unlockedLevels = string.split(",");
            for (let i = 0; i < unlockedLevels.length; i++) {
                unlockedLevels[i] = parseInt(unlockedLevels[i]);
            }
        }
        else{
            unlockedLevels = [0,0,0,0,0,0,0,0,0,0];
        }
        scene.tweens.add({
            targets: this.player,
            alpha: { from: 1, to: 0 },
            ease: 'Sine.InOut',
            delay: 0,
            duration: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pnut', {
                start: 0,
                end: 6
            }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'neutral',
            frames: [{
                key: 'pnut',
                frame: 7
            }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('pnut', {
                start: 8,
                end: 14
            }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'dash',
            frames: this.anims.generateFrameNumbers('pnut', {
                start: 20,
                end: 24
            }),
            duration: 120
        });
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('door', {
                start: 0,
                end: 5
            }),
            frameRate: 3,
            repeat: 0
        });

        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        if(key == 7){
            this.player.body.setGravityY(1200);
        }
        else{
            this.player.body.setGravityY(1800);
        }

        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoomTo(0.7, 2000, Phaser.Math.Easing.Back.Out); 

        this.minimap = this.cameras.add(0, this.gameHeight-yworldbounds[key]*10, xworldbounds[key]*10, yworldbounds[key]*10).setZoom(0.07).setName('mini');     

        this.loadLevel(key);

        this.debug = this.physics.world.createDebugGraphic();
        this.debug.setVisible(false);

    }
    update(time, delta){
        luhsoundOn = localStorage.getItem('soundOn');
        if(document.getElementById('pause-bg').style.display == 'none'){
            if (gameOver == false){
                if(clickedButton != false){
                    this.loadLevel(clickedButton);
                    clickedButton = false;
                }
                this.handleAnimateTiles(this, delta);
                this.minimap.scrollX = this.player.x
                this.minimap.scrollY = this.player.y
                this.cursors = this.input.keyboard.createCursorKeys();
                let dashKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)) ||Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K))
                if(dashKey && cooldownOver == true){
                    if (this.cursors.right.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)).isDown) {
                        this.player.anims.play('dash');
                        if(luhsoundOn == 'true'){
                            this.dashmp3.play();
                        }
                        dashing = true;
                        this.player.setVelocityX(4000);
                        cooldownOver = false;
                        setTimeout(() => {
                            this.player.setVelocityX(0);
                            dashing = false;
                            this.player.setTint(0xaaaaaa);
                        },120);
                        setTimeout(() => {
                            cooldownOver = true;
                            this.player.clearTint();
                        },1000); //300
                    }
                    else if (this.cursors.left.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)).isDown) {
                        this.player.anims.play('dash');
                        if(luhsoundOn == 'true'){
                            this.dashmp3.play();
                        }
                        dashing = true;
                        this.player.setVelocityX(-4000);
                        cooldownOver = false;
                        setTimeout(() => {
                            this.player.setVelocityX(0);
                            dashing = false;
                            this.player.setTint(0xaaaaaa);
                        },120);
                        setTimeout(() => {
                            cooldownOver = true;
                            this.player.clearTint();
                        },1000);
                    }

                }
                if ((this.cursors.left.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)).isDown) && dashing == false) {
                    this.player.setVelocityX(-460+cloudVelocity);
                    this.player.anims.play('left', true);
                } else if ((this.cursors.right.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)).isDown) && dashing == false) {
                    this.player.setVelocityX(460+cloudVelocity);
                    this.player.anims.play('right', true);
                } else {
                    if(dashing == false){
                        this.player.setVelocityX(cloudVelocity);
                        this.player.anims.play('neutral');
                    }
                }

                var didPressJump = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.cursors.space) || Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W));

                if (didPressJump) {
                    if (this.player.body.blocked.down) {
                        this.canDoubleJump = true;
                        this.player.body.setVelocityY(-675*1.5);
                        if(luhsoundOn == 'true'){
                            this.jumpmp3.play();
                        }
                    } else if (this.canDoubleJump) {
                        this.canDoubleJump = false; //should be false
                        this.player.body.setVelocityY(-525*1.5);
                        if(luhsoundOn == 'true'){
                            this.jumpmp3.play();
                        }
                    }
                }
                if((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)).isDown){
                    this.reset(this.player);
                }


                /*    if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N))){
                    if(key < 10){
                        key++;
                    }
                    this.loadLevel(key)
                }
                if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H))){
                    if(this.hitboxes.visible){
                        this.hitboxes.setVisible(false);
                        this.debug.setVisible(false);
                    }
                    else{
                        this.hitboxes.setVisible(true);
                        this.debug.setVisible(true);
                    }
                }*/
            }
        }
    }
    fishDeath(player,block){
        if(block.index == 91){
            this.death(this.player, block);
        }
    }
    loadLevel(key){
        luhvictory = false;
        //     document.getElementById("fader").style.display = 'block';
        document.getElementById("fader").style.opacity = 1;
        scoreText.innerHTML = 'Acorns: ' + score + '/'+acornTotals[key-1]+'&nbsp;';
        scene.tweens.add({
            targets: this.player,
            alpha: { from: 0, to: 1 },
            ease: 'Sine.InOut',
            delay: 0,
            duration: 500,
            repeat: 0
        });
        unlockedLevels[key-1] = 1;
        localStorage.setItem('unlockedLevels',unlockedLevels);
        try{
            this.bg1.destroy();
            this.bg2.destroy();
            this.bg3.destroy();
            this.bg4.destroy();
            this.physics.world.colliders.destroy();
            let objectLayers = this.level.getObjectLayerNames();
            for (let layerName of objectLayers) {
                window['this.'+layerName+'group'].clear(true);
                window['this.'+layerName+'group'].destroy();
                window['this.'+layerName+'group'] = null;
            }
            setTimeout(() => {
                document.getElementById("fader").style.opacity = 0;
            }, 1000);
            /*    setTimeout(() => {
                document.getElementById("fader").style.display = 'none';
            }, 2000);*/


            this.level.destroy();

        }catch(error){}
        if(key == 7){
            this.player.body.setGravityY(1200);
        }
        else{
            this.player.body.setGravityY(1800);
        }
        let scaley = 1.75*(this.gameHeight/512);
        let scalex = scaley;
        if(key > 0 && key < 5 || key == 7){
            this.bg1 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.1*128*xworldbounds[key], 512, 'sky1').setScrollFactor(0.1).setScale(scalex,scaley); 
            this.bg2 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.2*128*xworldbounds[key], 512, 'sky2').setScrollFactor(0.2).setScale(scalex,scaley); 
            this.bg3 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.3*128*xworldbounds[key], 512, 'sky3').setScrollFactor(0.3).setScale(scalex,scaley); 
            this.bg4 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.4*128*xworldbounds[key], 512, 'sky4').setScrollFactor(0.4).setScale(scalex,scaley); 
            this.bg1.originY = this.bg2.originY = this.bg3.originY = this.bg4.originY = this.bg1.originX = this.bg2.originX = this.bg3.originX = this.bg4.originX = 0;
            this.minimap.ignore(this.bg1);
            this.minimap.ignore(this.bg2);
            this.minimap.ignore(this.bg3);
            this.minimap.ignore(this.bg4);


        }
        else if(key >= 5 && key < 10){
            if(key == 8){
                this.bg1 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.1*128*xworldbounds[key], 512, 'jungle1').setScrollFactor(0.1).setScale(scalex*1.6,scaley*1.6); 
                this.bg2 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.2*128*xworldbounds[key], 512, 'jungle2').setScrollFactor(0.2).setScale(scalex*1.7,scaley*1.7); 
                this.bg3 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.3*128*xworldbounds[key], 512, 'jungle3').setScrollFactor(0.3).setScale(scalex*1.8,scaley*1.8); 
                this.bg4 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.4*128*xworldbounds[key], 512, 'jungle4').setScrollFactor(0.4).setScale(scalex*1.9,scaley*1.9); 

            }
            else{
                this.bg1 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.1*128*xworldbounds[key], 512, 'jungle1').setScrollFactor(0.1).setScale(scalex*1.3,scaley*1.3); 
                this.bg2 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.2*128*xworldbounds[key], 512, 'jungle2').setScrollFactor(0.2).setScale(scalex*1.4,scaley*1.4); 
                this.bg3 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.3*128*xworldbounds[key], 512, 'jungle3').setScrollFactor(0.3).setScale(scalex*1.5,scaley*1.5); 
                this.bg4 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.4*128*xworldbounds[key], 512, 'jungle4').setScrollFactor(0.4).setScale(scalex*1.6,scaley*1.6); 
            }
            this.bg1.originY = this.bg2.originY = this.bg3.originY = this.bg4.originY = this.bg1.originX = this.bg2.originX = this.bg3.originX = this.bg4.originX = 0;
            this.minimap.ignore(this.bg1);
            this.minimap.ignore(this.bg2);
            this.minimap.ignore(this.bg3);
            this.minimap.ignore(this.bg4);

        }
        else{
            //  console.log('no cave bg so dont load');
        }


        this.level = this.make.tilemap({ key: 'level'+key, tileWidth:128, tileHeight: 128});
        this.tileset = this.level.addTilesetImage('Tileset C3', 'tiles'); //try to use a tile extruder for this
        this.mainlayer = this.level.createLayer('Tile Layer 1', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(1);
        try{this.backround = this.level.createLayer('Backround', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(0);} catch(error){}
        try{this.torch = this.level.createLayer('Torch', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(0);}catch(error){}
        try{this.background = this.level.createLayer('Background', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(0);}catch(error){}
        try{this.hiddensection = this.level.createLayer('HiddenSection', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(0);}catch(error){}
        try{this.lilypads = this.level.createLayer('Lilypads', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(1);}catch(error){}
        try{this.foreground = this.level.createLayer('ForwardLayer', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        try{this.treeholes = this.level.createLayer('TreeHoles', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        try{this.leaves = this.level.createLayer('Leaves', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        try{this.lava = this.level.createLayer('Lava', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        try{this.deco = this.level.createLayer('Deco', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        try{this.fishhitboxes = this.level.createLayer('FishHitboxes', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);
            this.physics.add.overlap(this.player, this.fishhitboxes, this.fishDeath, null, this)
            this.fishhitboxes.setVisible(false);
           }catch(error){}
        this.hitboxes = this.level.createLayer('Hitboxes', this.tileset, xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(10);


        leveloffsetx = 0;
        leveloffsety = 0;

        const objoffsets = {
            Door: {
                x: -64,
                y: 0
            },
            Acorns: {
                x: -16,
                y: -105
            },
            WatDam: {
                x: -60,
                y: -50
            },
            Deco: {
                x: -63,
                y: -65
            },
            RegDam: {
                x: -40,
                y: -110
            },            
            ObjectHitboxes: {
                x: -7615,
                y: -3080
            },
            HorizontalRegClouds: {
                x: -0,
                y: -0
            },
            VerticalRegClouds: {
                x: -0,
                y: -0
            },
            HorizontalRegHitboxes: {
                x: -0,
                y: -0
            },
            VerticalRegHitboxes: {
                x: -0,
                y: -0
            },
            DamageClouds: {
                x: -13200,
                y: -400
            },
            DamageHitboxes: {
                x: -0,
                y: -0
            },
            LeafDam: {
                x: -64, //-320?
                y: -100
            },
            RegDamFlower: {
                x: 0,
                y: -80
            }
        };

        let objectLayers = this.level.getObjectLayerNames();
        for (let layerName of objectLayers) {
            //console.log(layerName);
            leveloffsetx = objoffsets[layerName]['x'] + this.level.getObjectLayer(layerName,this.tileset).objects[this.level.getObjectLayer(layerName,this.tileset).objects.length-1].x;
            leveloffsety = objoffsets[layerName]['y'] + this.level.getObjectLayer(layerName,this.tileset).objects[this.level.getObjectLayer(layerName,this.tileset).objects.length-1].y;
            window['this.'+layerName] = this.level.getObjectLayer(layerName,this.tileset);
            window['this.'+layerName+'group'] = this.physics.add.group();
            if(layerName == 'Door'){
                var loadedDoor = false;
                window['this.'+layerName].objects.forEach(object => {
                    if(loadedDoor == false){
                        var doorleveloffsetx = leveloffsetx;
                        var doorleveloffsety = leveloffsety;
                        if(key == 7){
                            doorleveloffsety -= 128*5;
                        }
                        var newObject = this.add.sprite((object.x-doorleveloffsetx), (object.y-doorleveloffsety), 'door');
                        window['this.'+layerName+'group'].add(newObject);
                        loadedDoor = true;
                    }
                });
            }
            else{
                window['this.'+layerName].objects.forEach(object => {
                    var newObject;
                    if(layerName == 'Acorns' && key == 7){
                        newObject = this.add.sprite((object.x-leveloffsetx+2750), (object.y-leveloffsety+1900+128*4), 'tilesheet', (object.gid-1));
                    }
                    else if(layerName == 'RegDam' && key == 7){
                        newObject = this.add.sprite((object.x-leveloffsetx+15150), (object.y-leveloffsety+1820), 'tilesheet', (object.gid-1));
                    }
                    else if(layerName == 'LeafDam' && key == 7){
                        newObject = this.add.sprite((object.x-leveloffsetx+6700), (object.y-leveloffsety+128*4), 'tilesheet', (object.gid-1));
                    }
                    else{
                        if(key == 7){
                            newObject = this.add.sprite((object.x-leveloffsetx), (object.y-leveloffsety+128*4), 'tilesheet', (object.gid-1));
                        }
                        else{
                            newObject = this.add.sprite((object.x-leveloffsetx), (object.y-leveloffsety), 'tilesheet', (object.gid-1));
                        }
                    }
                    if(layerName == 'RegDamFlower'){
                        newObject.scaleY = object.width/200;
                        newObject.scaleX = object.height/128;
                    }
                    else{
                        newObject.scaleX = object.width/128;
                        newObject.scaleY = object.height/128;
                    }
                    window['this.'+layerName+'group'].add(newObject);
                });         
            }
        }
        this.player.setPosition(128*playerxoffsets[key],128*playeryoffsets[key]);
        this.hitboxes.setVisible(false);
        this.hitboxes.setTileIndexCallback(88, this.victory, null, this);
        this.hitboxes.setTileIndexCallback(89, this.death, null, this);
        this.hitboxes.setTileIndexCallback(90, this.death, null, this);
        this.hitboxes.setTileIndexCallback(91, this.death, null, this);
        this.physics.add.collider(this.player, this.hitboxes);
        this.hitboxes.setCollisionByExclusion([-1]);

        try{
            window['this.HorizontalRegHitboxesgroup'].children.iterate(child => {
                child.body.setImmovable(true); 
                child.body.setAllowGravity(false);
                child.body.setVelocityX(30);
                setInterval(this.touchingCloud, 100, this.player, child, false);
            });
            window['this.VerticalRegHitboxesgroup'].children.iterate(child => {
                child.body.setImmovable(true); 
                child.body.setAllowGravity(false);
                child.body.setVelocityY(30);
                setInterval(this.touchingCloud, 100, this.player, child, false);
            });
            this.physics.add.collider(this.player, window['this.HorizontalRegHitboxesgroup'], this.touchingCloud, null, this, true);
            window['this.HorizontalRegHitboxesgroup'].setVisible(false);
            this.physics.add.collider(this.player, window['this.VerticalRegHitboxesgroup'], this.touchingCloud, null, this, true);
            window['this.VerticalRegHitboxesgroup'].setVisible(false);

        }catch(error){}
        try{
            window['this.ObjectHitboxesgroup'].children.iterate(child => {
                child.body.setImmovable(true); 
                child.body.setAllowGravity(false);
                child.body.checkCollision.down = false;
                child.body.checkCollision.right = false;
                child.body.checkCollision.left = false;
            });
            this.physics.add.collider(this.player, window['this.ObjectHitboxesgroup']);
            window['this.ObjectHitboxesgroup'].setVisible(false);

        }catch(error){}
        try{this.physics.add.overlap(this.player, window['this.Acornsgroup'], this.collectAcorn, null, this);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.RegDamgroup'], this.death, null, this);
            window['this.RegDamgroup'].setVisible(false);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.RegDamFlowergroup'], this.death, null, this);
            window['this.RegDamFlowergroup'].setVisible(false);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.LeafDamgroup'], this.death, null, this);
            window['this.LeafDamgroup'].setVisible(false);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.WatDamgroup'], this.death, null, this);
            window['this.WatDamgroup'].setVisible(false);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.Doorgroup'], this.victory, null, this);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.DamageHitboxesgroup'], this.death, null, this);
            window['this.DamageHitboxesgroup'].setVisible(false);}catch(error){}
        this.cameras.main.setBounds(0, 0,128*xworldbounds[key], 128*yworldbounds[key]);
        this.physics.world.setBounds(0, 0, 128*xworldbounds[key], 128*yworldbounds[key]);
        this.minimap.setBounds(0, 0,128*xworldbounds[key], 128*yworldbounds[key]);

        this.animatedTiles = [];
        const tileData = this.tileset.tileData;
        for (let tileid in tileData) {
            this.level.layers.forEach(layer  => {
                layer.data.forEach(tileRow => {
                    tileRow.forEach(tile => {
                        if(tile != null){
                            if (tile.index-1 == parseInt(tileid)){
                                this.animatedTiles.push({
                                    tile,
                                    tileAnimationData: tileData[tileid].animation,
                                    firstgid: 1,
                                    elapsedTime:0,
                                });
                            }
                        }
                    });
                });

            });
        }

        /*     let color = 0xffff00;
        let alpha = 0.5;
        this.minimapBorder = this.add.graphics();
        this.minimapBorder.fillStyle(color, alpha);
        this.minimapBorder.fillRect(32 * i, 32 * i, 256, 256);*/
        if(luhsoundOn == 'true' && document.getElementById('homescreen-container').style.display == 'none'){
            if(key == 7){
                this.cloudsmp3.resume();
                this.grasslandsmp3.pause();
                this.cavemp3.pause();
                this.junglemp3.pause();
                this.beachmp3.pause();
            }
            else if(key == 9 || key == 10){
                this.cloudsmp3.pause();
                this.grasslandsmp3.pause();
                this.cavemp3.resume();
                this.junglemp3.pause();
                this.beachmp3.pause();  
            }
            else if(key == 3 || key == 4){
                this.cloudsmp3.pause();
                this.grasslandsmp3.pause();
                this.cavemp3.pause();
                this.junglemp3.pause();
                this.beachmp3.resume();
            }
            else if(key == 5 || key == 6 || key == 8){
                this.cloudsmp3.pause();
                this.grasslandsmp3.pause();
                this.cavemp3.pause();
                this.junglemp3.resume();
                this.beachmp3.pause();
            }
            else{
                this.cloudsmp3.pause();
                this.grasslandsmp3.resume();
                this.cavemp3.pause();
                this.junglemp3.pause();
                this.beachmp3.pause();
            }
        }

    }
    handleAnimateTiles(scene, delta){
        scene.animatedTiles.forEach(tile => {
            if (!tile.tileAnimationData){return}
            else{
                let durationsList = [];
                let animationFrames = [];
                let animationDuration = 0;
                for (let i = 0; i < tile.tileAnimationData.length; i++) {
                    animationDuration += tile.tileAnimationData[i].duration;
                    animationFrames.push(i);
                    durationsList.push(animationDuration);
                }
                tile.elapsedTime += delta;
                tile.elapsedTime %= animationDuration;
                let animationFrameIndex = 0;
                for (let i = durationsList.length-1; i >= 0; i--) {
                    if(durationsList[i] <= tile.elapsedTime){
                        tile.tile.index = tile.tileAnimationData[animationFrameIndex].tileid + tile.firstgid;

                    }
                    else{
                        animationFrameIndex = animationFrames[i];
                        tile.tile.index = tile.tileAnimationData[animationFrameIndex].tileid + tile.firstgid;
                    }
                } 
            }
        });

    };

    collectAcorn (player, acorn){
        acorn.destroy();
        score += 1;
        scoreText.innerHTML = 'Acorns: ' + score + '/'+acornTotals[key-1]+'&nbsp;';
        player.anims.play('right', true);
        if(luhsoundOn == 'true'){
            this.acornmp3.play();
        }    
    }
    victory(player,block){
        let requiredAcorns = Math.floor(acornTotals[key-1]*0.75);
        if(requiredAcorns-score <= 0 && luhvictory == false){
            victoryCalled = true;
            luhvictory = true;
            if(key != 8){
                block.anims.play('open', true);
            }
            if(luhsoundOn == 'true'){
                this.victorymp3.play();
            }
            try{            
                scene.tweens.add({
                    targets: this.player,
                    alpha: { from: 1, to: 0 },
                    ease: 'Sine.InOut',
                    delay: 2000,
                    duration: 500,
                    repeat: 0
                });
            }
            catch(error){}
            document.getElementById("alert").style.opacity = 0;


            setTimeout(() => {
                // document.getElementById("fader").style.display = 'block';
                document.getElementById("fader").style.opacity = 1;
                if(acornsSaved[key-1] <= score){
                    acornsSaved[key-1] = score;
                }
                localStorage.setItem('acornsSaved',acornsSaved);
                score = 0;
            }, 2000);
            setTimeout(() => {
                key ++;
                scene.loadLevel(key);
                victoryCalled = false;
            }, 2500);
        }
        else if(victoryCalled == false){
            if(requiredAcorns-score <= 0){
                //seems to be tweaking so this is a fallback
            }
            else{
                document.getElementById("onlyHave").innerHTML = requiredAcorns-score;
                document.getElementById("alert").style.opacity = 1;
                setTimeout(() => {
                    document.getElementById("alert").style.opacity = 0;
                }, 500);

            }
        }
    }
    death(player, block) {
        gameOver = true;
        player.setTint(0xff0000);
        player.anims.play('neutral');
        player.setVelocity(0);
        player.body.setGravityY(0);
        if(luhsoundOn == 'true'){
            this.deathmp3.play();
        }
        const myTimeout = setTimeout(() => {
            scene.reset(player); 
        }, 500);
    }
    reset(player){
        gameOver = false;
        player.setPosition(128*playerxoffsets[key],128*playeryoffsets[key]);
        if(key == 7){
            player.body.setGravityY(1200);
        }
        else{
            player.body.setGravityY(1800);
        }
        player.clearTint();
    }
    touchingCloud(luhplayer, cloud, fromCloud){
        if(fromCloud != false && this.player.body.blocked.down){ //!player.body.touching.none; problem here is that when i set it to true it acts as undefined???
            cloudVelocity = cloud.body.velocity.x;
        }
        else{
            cloudVelocity = 0;
        }
    }
}

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: Main

};
var game = new Phaser.Game(config);
