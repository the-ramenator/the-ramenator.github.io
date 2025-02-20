// look up cameraFilter property for tilesprite minimap

const xmapoffsets = [0,-8, -1, -12, -11, -13, -3, 0, -5, 0, 0]; //0,0 at the beginning added for referencing
const ymapoffsets = [0,-15, -15, -11, -13, -3, -12, -6, -10, -15, 0];
const xworldbounds = [0, 32, 70, 42, 82, 46, 74, 132, 119, 101, 206];
const yworldbounds = [0, 15, 14, 82, 12, 14, 28, 26, 37, 42, 110];
const playerxoffsets = [0,4,5,6,6,1,3,9.5,8,5,7];
const playeryoffsets = [0,8,6,7,5,11,21,14,30,15,18];
let key = 1;
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
class Main extends Phaser.Scene {

    constructor ()
    {
        super('Main');
    }

    preload (){
        this.load.setBaseURL('https://raw.githubusercontent.com/the-ramenator/dcsdtechfair2025/refs/heads/main/state');

        this.load.spritesheet('pnut', 'pnut.png', {frameWidth: 128, frameHeight: 161});
        this.load.spritesheet('tilesheet', 'OfficialTileset.png', {frameWidth: 128, frameHeight: 128});
        this.load.image('tiles', 'OfficialTileset.png');
        this.load.image('regdam', 'damageblock.png');
        this.load.image('acornimg', 'acorn.webp')


        for (let i = 1; i < 11; i++) {
            this.load.tilemapTiledJSON(('level'+i), ('tilemaps/level'+i+'.tmj'));
        }
        for (let i = 1; i < 5; i++) {
            this.load.image(('sky'+i), ('backgrounds/sky'+i+'-flipped.png'));
        }
        for (let i = 1; i < 5; i++) {
            this.load.image(('jungle'+i), ('backgrounds/jungle'+i+'.png'));
        }
        //this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');

        this.gameWidth = this.sys.game.canvas.width;
        this.gameHeight = this.sys.game.canvas.height;


    }

    create (){
        scene = this.scene.get('Main');
        this.physics.world.TILE_BIAS = 150;
        //new TileSprite(scene, x, y, width, height, textureKey, [frameKey])
        this.player = this.physics.add.sprite(128*playerxoffsets[key],128*playeryoffsets[key], 'pnut').setScale(0.6).setDepth(2);

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

        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(1800);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoomTo(0.7, 2000, Phaser.Math.Easing.Back.Out); 

        this.minimap = this.cameras.add(0, 0, 200, 100).setZoom(0.05).setName('mini');

        this.loadLevel(key);
        this.debug = this.physics.world.createDebugGraphic();
        this.debug.setVisible(false);

    }
    update(time, delta){
        if (gameOver == false){
            this.handleAnimateTiles(this, delta);
            this.minimap.scrollX = this.player.x
            this.minimap.scrollY = this.player.y
            this.cursors = this.input.keyboard.createCursorKeys();

            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)) && cooldownOver == true){
                if (this.cursors.right.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)).isDown) {
                    this.player.anims.play('dash');
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
                    },300);
                }
                else if (this.cursors.left.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)).isDown) {
                    this.player.anims.play('dash');
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
                    },300);
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
                        jumpmp3.play();
                    }
                } else if (this.canDoubleJump) {
                    this.canDoubleJump = true; //should be false
                    this.player.body.setVelocityY(-525*1.5);
                    if(luhsoundOn == 'true'){
                        jumpmp3.play();
                    }
                }
            }
            if((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)).isDown){
                this.reset(this.player);
            }


            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N))){
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
            }
        }
    }
    loadLevel(key){
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
                //console.log(layerName + ' destoyed');
            }
            this.level.destroy();

        }catch(error){}
        let scaley = 1.75*(this.gameHeight/512);
        let scalex = scaley;
        if(key > 0 && key < 5 || key == 7){
            this.bg1 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.1*128*xworldbounds[key], 512, 'sky1').setScrollFactor(0.1).setScale(scalex,scaley); 
            this.bg2 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.2*128*xworldbounds[key], 512, 'sky2').setScrollFactor(0.2).setScale(scalex,scaley); 
            this.bg3 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.3*128*xworldbounds[key], 512, 'sky3').setScrollFactor(0.3).setScale(scalex,scaley); 
            this.bg4 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.4*128*xworldbounds[key], 512, 'sky4').setScrollFactor(0.4).setScale(scalex,scaley); 
            this.bg1.originY = this.bg2.originY = this.bg3.originY = this.bg4.originY = this.bg1.originX = this.bg2.originX = this.bg3.originX = this.bg4.originX = 0;


        }
        else if(key >= 5 && key < 10){
            this.bg1 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.1*128*xworldbounds[key], 512, 'jungle1').setScrollFactor(0.1).setScale(scalex,scaley); 
            this.bg2 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.2*128*xworldbounds[key], 512, 'jungle2').setScrollFactor(0.2).setScale(scalex,scaley); 
            this.bg3 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.3*128*xworldbounds[key], 512, 'jungle3').setScrollFactor(0.3).setScale(scalex,scaley); 
            this.bg4 = this.add.tileSprite(-this.gameWidth/5, -this.gameHeight/5, 1.4*128*xworldbounds[key], 512, 'jungle4').setScrollFactor(0.4).setScale(scalex,scaley); 
            this.bg1.originY = this.bg2.originY = this.bg3.originY = this.bg4.originY = this.bg1.originX = this.bg2.originX = this.bg3.originX = this.bg4.originX = 0;

        }
        else{
            console.log('no cave bg so dont load');
        }


        this.level = this.make.tilemap({ key: 'level'+key, tileWidth:128, tileHeight: 128});
        this.tileset = this.level.addTilesetImage('Tileset C3', 'tiles'); //try to use a tile extruder for this
        this.mainlayer = this.level.createLayer('Tile Layer 1', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(1);
        try{this.backround = this.level.createLayer('Backround', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(0);} catch(error){}
        try{this.background = this.level.createLayer('Background', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(0);}catch(error){}
        try{this.lilypads = this.level.createLayer('Lilypads', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(1);}catch(error){}
        try{this.foreground = this.level.createLayer('ForwardLayer', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        try{this.treeholes = this.level.createLayer('TreeHoles', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        try{this.leaves = this.level.createLayer('Leaves', this.tileset,xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(3);}catch(error){}
        this.hitboxes = this.level.createLayer('Hitboxes', this.tileset, xmapoffsets[key]*128,ymapoffsets[key]*128).setDepth(10);


        leveloffsetx = 0;//this.level.getObjectLayer('Acorns',this.tileset).objects[this.acorns.objects.length-1].x;
        leveloffsety = 0;//this.level.getObjectLayer('Acorns',this.tileset).objects[this.acorns.objects.length-1].y;

        let objectLayers = this.level.getObjectLayerNames();
        for (let layerName of objectLayers) {
            if(layerName == 'Acorns'){
                leveloffsetx = -16+this.level.getObjectLayer(layerName,this.tileset).objects[this.level.getObjectLayer(layerName,this.tileset).objects.length-1].x;
                leveloffsety = -105+this.level.getObjectLayer(layerName,this.tileset).objects[this.level.getObjectLayer(layerName,this.tileset).objects.length-1].y;
            }
            //leveloffsetx = xmapoffsets[key]*128-10;
            //leveloffsety = ymapoffsets[key]*128-200;
            window['this.'+layerName] = this.level.getObjectLayer(layerName,this.tileset);
            window['this.'+layerName+'group'] = this.physics.add.group();
            window['this.'+layerName].objects.forEach(object => {
                //console.log(layerName+': '+(object.gid-1)+ ' || x: '+object.x+' || y: '+object.y);
                var newObject = this.add.sprite((object.x-leveloffsetx), (object.y-leveloffsety), 'tilesheet', (object.gid-1));
                if(layerName == 'Acorns'){
                    newObject.setScale(0.4);
                }
                else{
                    newObject.scaleX = object.width/128;
                    newObject.scaleY = (object.height/128);
                }
                window['this.'+layerName+'group'].add(newObject);
            });         
        }


        this.animatedTiles = [];
        const tileData = this.tileset.tileData;
        for (let tileid in tileData) {
            this.level.layers.forEach(layer  => {
                layer.data.forEach(tileRow => {
                    tileRow.forEach(tile => {
                        if(tile != null){
                            if (tile.index-1 == parseInt(tileid)){
                                //console.log(tileData[tileid].animation)
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

        this.player.setPosition(128*playerxoffsets[key],128*playeryoffsets[key]);
        this.hitboxes.setVisible(false);
        this.hitboxes.setTileIndexCallback(88, this.victory, null, this);
        this.hitboxes.setTileIndexCallback(89, this.death, null, this);
        this.hitboxes.setTileIndexCallback(90, this.death, null, this);
        this.hitboxes.setTileIndexCallback(91, this.death, null, this);
        this.physics.add.collider(this.player, this.hitboxes);
        this.hitboxes.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.hitboxes);
        try{
            window['this.MovingHitboxesgroup'].children.iterate(child => {
                child.body.setImmovable(true); 
                child.body.setAllowGravity(false);
                child.body.setVelocityX(450);
                setInterval(this.touchingCloud, 100, this.player, child, false);
            });
            this.physics.add.collider(this.player, window['this.MovingHitboxesgroup'], this.touchingCloud, null, this, true);

        }catch(error){}
        try{this.physics.add.overlap(this.player, window['this.Acornsgroup'], this.collectAcorn, null, this);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.ObjectHitboxesgroup'], this.death, null, this);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.RegDamgroup'], this.death, null, this);}catch(error){}
        try{this.physics.add.overlap(this.player, window['this.Doorgroup'], this.victory, null, this);}catch(error){}
        this.cameras.main.setBounds(0, 0,128*xworldbounds[key], 128*yworldbounds[key]);
        this.physics.world.setBounds(0, 0, 128*xworldbounds[key], 128*yworldbounds[key]);
        this.minimap.setBounds(0, 0,128*xworldbounds[key], 128*yworldbounds[key]);
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
        scoreText.innerHTML = 'Acorns: ' + score + '&nbsp;';
        player.anims.play('right', true);
        if(luhsoundOn == 'true'){
            acornmp3.play();
        }    
    }
    victory(player,block){
        if(score >= 0 && luhvictory == false){
            luhvictory = true;
            //luhdoor.anims.play('open', true);
            if(luhsoundOn == 'true'){
                doormp3.play();
            }
            console.log('you vicot !')
            setTimeout(() => {
                if(luhsoundOn == 'true'){
                    victorymp3.play();
                    clearInterval(musicInterval);
                    grasslandsmp3.pause();
                    cavemp3.pause();
                } 
            }, 2000);
            setTimeout(() => {
                key ++;
                scene.loadLevel(key);
                luhvictory = false;
            }, 500);
        }
    }
    death(player, block) {
        gameOver = true;
        player.setTint(0xff0000);
        player.anims.play('neutral');
        player.setVelocity(0);
        player.body.setGravityY(0);
        if(luhsoundOn == 'true'){
            diemp3.play();
        }
        const myTimeout = setTimeout(() => {
            scene.reset(player); 
        }, 500);
    }
    reset(player){
        gameOver = false;
        player.setPosition(128*playerxoffsets[key],128*playeryoffsets[key]);
        player.body.setGravityY(1800);
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
