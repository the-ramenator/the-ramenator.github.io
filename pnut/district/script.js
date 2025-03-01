//Add easter egg in credits for all 30 acorns

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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};




var game = new Phaser.Game(config);

function preload() {
    this.load.setBaseURL('https://raw.githubusercontent.com/the-ramenator/dcsdtechfair2025/refs/heads/main/district/real');

    this.load.spritesheet('pnut', 'PNUTWalk.webp', {frameWidth: 111, frameHeight: 208});
    this.load.spritesheet('door', 'door.webp', {frameWidth: 170, frameHeight: 250});
    this.load.image('tiles', 'assets_stonefix.png');
    this.load.image('mg6', 'mg6.png');
    this.load.image('mg5', 'mg5.png');
    this.load.image('mg4', 'mg4.png');
    this.load.image('bg', 'background.webp');
    this.load.image('acornimg', 'acorn.png')

    this.load.audio('acornmp3', 'acorn.mp3');
    this.load.audio('cavemp3', 'cave.mp3');
    this.load.audio('diemp3', 'die.mp3');
    this.load.audio('grasslandsmp3', 'grasslands.mp3');
    this.load.audio('jumpmp3', 'jump.mp3');
    this.load.audio('victorymp3', 'victory.mp3');
    this.load.audio('doormp3', 'door.mp3');

    this.load.tilemapTiledJSON('tilemap', 'finaltilemap.json');
    this.gameWidth = this.sys.game.canvas.width;
    this.gameHeight = this.sys.game.canvas.height;

}

var score = 0;
var scoreText = document.getElementById('score');

var xbound = 30750;
var ybound = 6300;
var shift = -2000;
var hitboxes, acorngroup, doorgroup, luhdoor, luhsoundOn;

let acornmp3,diemp3,jumpmp3,victorymp3,doormp3,intromp3,grasslandsmp3,cavemp3;

let playerx;
function create() {
    this.physics.world.TILE_BIAS = 150;
    const mg3 = this.add.tileSprite(0, 2000, 1800, 2000, 'bg').setScrollFactor(0.1).setScale(6);
    const mg6 = this.add.tileSprite(0, 1250, 5000, 460, 'mg6').setScrollFactor(0.2).setScale(3);
    const mg5 = this.add.tileSprite(0, 1700, 7000, 465, 'mg5').setScrollFactor(0.3).setScale(3);
    const mg4 = this.add.tileSprite(0, 2450, 8000, 570, 'mg4').setScrollFactor(0.4).setScale(3);
    mg4.setTint(0x69ff6e);
    mg5.setTint(0x42e147);
    mg6.setTint(0x32d137);
    const map = this.make.tilemap({ key: 'tilemap', tileWidth:150, tileHeight: 150});
    const tileset = map.addTilesetImage('MAINAssets-removebg', 'tiles');
    const treefoliage = map.createLayer("TreeFoliage", tileset,12000,0+shift);
    treefoliage.setTint(0x16a91b);
    const cavebackground = map.createLayer("CaveBackground", tileset,21600,0+shift);
    cavebackground.setTint(0x969696);

    doorgroup = this.physics.add.group()

    const doors = map.getObjectLayer('PhatDoot',tileset); 
    doors.objects.forEach(object => {
        luhdoor = this.add.sprite((object.x+2400), (object.y+2675), 'door');
        doorgroup.add(luhdoor);
    }); 

    const mainlayer = map.createLayer('MainLayer', tileset,0,0+shift);
    hitboxes = map.createLayer("Hitboxes", tileset,0,2400+shift);

    this.add.text(150, 5250+shift, 'WASD/Arrow keys to move ', {color: '#ffffff', fontSize: 45}).setDepth(0).preFX.addShadow(-0.5, -0.5, 0.06, 2, 0x000000, 2, 1);
    this.add.text(160, 5300+shift, '& jump/double jump', {color: '#ffffff', fontSize: 45}).setDepth(0).preFX.addShadow(-0.5, -0.5, 0.06, 2, 0x000000, 2, 1);
    this.add.text(9650, 5300+shift, 'Water kills you, but you can jump on the lilypads', {color: '#ffffff', fontSize: 45}).setDepth(0).preFX.addShadow(-0.5, -0.5, 0.06, 2, 0x000000, 2, 1);


    hitboxes.setVisible(false); 



    acorngroup = this.physics.add.group()

    const acorns = map.getObjectLayer('Acorns',tileset); 
    acorns.objects.forEach(object => {
        var luhacorn = this.add.sprite((object.x+2450), (object.y+2750), 'acornimg').setScale(0.75);
        acorngroup.add(luhacorn);
    }); 

    player = this.physics.add.sprite(300, 5475+shift, 'pnut').setScale(0.6);


    this.physics.add.overlap(player, acorngroup, collectAcorn, null, this);    

    hitboxes.setCollisionByExclusion([-1]);
    this.physics.add.collider(player, hitboxes);

    player.setBounce(0);
    this.physics.world.setBounds(0, 0, xbound, ybound+shift);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(1000);




    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('pnut', {
            start: 1,
            end: 5
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'pnut',
            frame: 6
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('pnut', {
            start: 7,
            end: 11
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'open',
        frames: this.anims.generateFrameNumbers('door', {
            start: 0,
            end: 4
        }),
        frameRate: 3,
        repeat: 0
    });

    hitboxes.setTileIndexCallback(68, death, this);
    hitboxes.setTileIndexCallback(69, death, this);
    hitboxes.setTileIndexCallback(70, victory, null, this);

    jumpmp3 = this.sound.add('jumpmp3');
    diemp3 = this.sound.add('diemp3');
    acornmp3 = this.sound.add('acornmp3');
    victorymp3 = this.sound.add('victorymp3');
    doormp3 = this.sound.add('doormp3');
    doormp3.setVolume(0.1);

    grasslandsmp3 = this.sound.add('grasslandsmp3');
    cavemp3 = this.sound.add('cavemp3');

    grasslandsmp3.setLoop(true);
    cavemp3.setLoop(true);

    this.cameras.main.setBounds(0, 0,xbound,ybound+shift);
    this.cameras.main.startFollow(player);
    this.cameras.main.zoomTo(0.7, 2000, Phaser.Math.Easing.Back.Out); 

    cavemp3.play();
    cavemp3.pause();
    grasslandsmp3.play();
    grasslandsmp3.pause();
    grasslandsmp3.setVolume(0.5);
    detectMusic(player.x);
}

var gameOver = false;
function update() {
    luhsoundOn = localStorage.getItem('soundOn'); //maybe inneficient but we'll see
    cursors = this.input.keyboard.createCursorKeys();

    playerx = player.x;
    // Detect whether you've passed the title screen bc you shouldn't be able to move while in the title screen;
    if (gameOver == false){
        if (cursors.left.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)).isDown) {
            player.setVelocityX(-660);

            player.anims.play('left', true);
        } else if (cursors.right.isDown || (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)).isDown) {
            player.setVelocityX(660);

            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        var didPressJump = Phaser.Input.Keyboard.JustDown(cursors.up) || Phaser.Input.Keyboard.JustDown(cursors.space) || Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W));

        if (didPressJump) {
            if (player.body.blocked.down) {
                this.canDoubleJump = true;
                player.body.setVelocityY(-800);
                if(luhsoundOn == 'true'){
                    jumpmp3.play();
                }
            } else if (this.canDoubleJump) {
                this.canDoubleJump = false; //should be false
                player.body.setVelocityY(-600);
                if(luhsoundOn == 'true'){
                    jumpmp3.play();
                }
            }
        }
        if((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)).isDown){
            reset();
        }
        /*   else if((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)).isDown){
            player.setPosition(12000, 2000+shift);
        }
        else if((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)).isDown){
            player.setPosition(23000, 4300+shift);
        }
        else if((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)).isDown){
            player.setPosition(30600, 5500+shift);
        }
        else if((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)).isDown){
            if(hitboxes.visible){
                hitboxes.setVisible(false);
            }
            else{
                hitboxes.setVisible(true);
            }
        }*/
    }
}
function collectAcorn (player, acorn){
    //this is for sure the dumbest way to do this i promise ill be smarter if we move on
    if(acorn.visible){
        acorn.setVisible(false);
        score += 1;
        scoreText.innerHTML = 'Acorns: ' + score + '/30 &nbsp;';
        player.anims.play('right', true);
        if(luhsoundOn == 'true'){
            acornmp3.play();
        }    
    }
}
let luhvictory = false;
function victory(player,block){
    if(score >= 24 && luhvictory == false){
        luhvictory = true;
        luhdoor.anims.play('open', true);
        if(luhsoundOn == 'true'){
            doormp3.play();
        }
        setTimeout(function() {
            if(luhsoundOn == 'true'){
                victorymp3.play();
                clearInterval(musicInterval);
                grasslandsmp3.pause();
                cavemp3.pause();
            } 
        }, 2000);
        setTimeout(function() {
            fadeOutEffect();
        }, 2500);
    }

}
function fadeOutEffect() {
    var fadeTarget = document.getElementById("end-container");
    fadeTarget.style.display = 'block';
    fadeTarget.style.opacity = 0;
    setTimeout(function (){
        fadeTarget.style.opacity = 1; 
    }, 200);
}

function death() {
    gameOver = true;
    player.setTint(0xff0000);
    player.anims.play('turn');
    player.setVelocity(0);
    player.body.setGravityY(0);
    if(luhsoundOn == 'true'){
        diemp3.play();
    }    
    const myTimeout = setTimeout(reset, 500);

}
function reset(){
    gameOver = false;
    score = 0;
    scoreText.innerHTML = 'Acorns: ' + score + '/30 &nbsp;';
    acorngroup.setVisible(true);
    player.setPosition(300, 3475);
    player.body.setGravityY(1000);
    player.clearTint();
}

function detectMusic(pos){
    if(luhsoundOn == 'true' && document.getElementById('title-container').style.display == 'none'){
        if(pos >= 24000){
            grasslandsmp3.pause();
            cavemp3.resume();
        }
        else{
            cavemp3.pause();
            grasslandsmp3.resume();
        }
    }
}
const musicInterval = setInterval(function() {
    detectMusic(playerx);
}, 1000);
