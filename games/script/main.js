enchant(); // enchant.jsの使用開始を宣言する

/////////////
//const
var PANEL_WIDTH = 100;
var GAME_FPS = 24;

///////////////////
//main
window.onload = function() { // ウィンドウがロードされたら呼び出される
  game = new Game(320, 320); // 解像度320x320のゲーム画面を作る
  game.fps = GAME_FPS;

  game.preload('./img/chieri.png', './img/tri.png', './img/four.png', './img/player.png'); // ゲーム開始時にロードする画像ファイルを指定する

  game.onload = function() { // ゲーム開始時の処理を記述する
    //title
    var createTitleScene = function() {
      var scene = new Scene();
      var label = new Label("title\n touch start");

      scene.addChild(label);
      scene.backgroundColor = 'rgba(255,230,0,1)';

      scene.addEventListener(Event.TOUCH_START, function(e) {
        game.replaceScene(createGameScene());
      })
      return scene;
    }

    //game main
    var createGameScene = function() {
      var scene = new Scene();
      var label = new Label("title\n main start");

      var score = 0;
      var lv = 2;
      var timer = GAME_FPS * 72;


      label.y = 30;

      scene.addChild(label);
      scene.backgroundColor = 'rgba(255,190,0,1)';

      //sprite設定
      var chieri = new Sprite(128, 128); // スプライトを作る

      chieri.image = game.assets['./img/chieri.png']; //画像ファイルを指定
      chieri.scale(0.7, 0.7);
      chieri.moveTo(-16, 80);
      scene.addChild(chieri); //画面に画像を表示する

      //クローバー絡み
      var fieldscam = new Cam(scene,170, 120);
      var camlabel = new Label(fieldscam.x+"::"+fieldscam.y);
      scene.addChild(fieldscam);

      var clfields = new Field(scene,lv,fieldscam);

      //仮想パッド作成とその操作
      var pad = new Pad();
      pad.moveTo(0, scene.height - 100);
      scene.addChild(pad);

      scene.addEventListener('enterframe', function() {
          if (game.input.up) {
            pad.frame = 1;
            pad.rotation = 0;
            fieldscam.y -= fieldscam.v;
          }
          if (game.input.down) {
            pad.frame = 1;
            pad.rotation = 180;
            fieldscam.y += fieldscam.v;
          }
          if (game.input.right) {
            pad.frame = 1;
            pad.rotation = 90;
            fieldscam.x += fieldscam.v;
          }
          if (game.input.left) {
            pad.frame = 1;
            pad.rotation = 270;
            fieldscam.x -= fieldscam.v;
          }
        })
        //シーンによる毎フレーム処理


      /*
      scene.addEventListener(Event.TOUCH_START, function(e) {
        game.pushScene(createGameoverScene());
      })
      */
      return scene;
    }

    var createGameoverScene = function() {
      var scene = new Scene();
      var label = new Label("gameover\n retry?");
      label.y = 60;
      scene.addChild(label);
      scene.backgroundColor = 'rgba(0,0,255,0.5)';

      scene.addEventListener(Event.TOUCH_START, function(e) {
        game.popScene();
      })
      return scene;
    }
    game.replaceScene(createTitleScene());
  }

  game.start(); //ゲーム開始
}


//////////////////////
//class
var Player = Class.create(Sprite, {
  initialize: function(currentscene, x, y) {
    Sprite.call(this, 32, 32);

    this.image = game.assets['./img/player.png'];
    this.x = x;
    this.y = y;
    this.v = 4;
    this.frame = 0;
    currentscene.addChild(this);
  }
});

var Clover = Class.create(Sprite, {
  initialize: function(curscene, x, y) {
    Sprite.call(this, 64, 64);
    this.image = game.assets['./img/tri.png'];
    this.x = x;
    this.y = y;
    curscene.addChild(this);
  }
});

var FLeaf = Class.create(Clover, {
  initialize: function(curscene, x, y) {
    Clover.call(this, curscene, x, y);
    this.image = game.assets['./img/four.png'];
  }
});

var Cam = Class.create({
  initialize: function(scene,x, y) {
    this.field = new Sprite(x,y);
    this.field.v = 4;
    scene.addchild(this.field);
  }

});

var Field = Class.create({
  initialize: function(curscene,lv,cam) {
    this.info = [];
    for (var i = 0; i < 10; i++) {
      this.info[i] = [];
      for (var j = 0; j < 10; j++){
        this.info[i][j] = 0;
      }
    }
    console.log(lv);
    for (var i = 0; i < lv; i++) {
      for (var j = 0; i < lv; j++) {
        if (j>=lv || i>=lv) {
          break;
        }
        console.log("hoge");
        this.info[i][j] = 3;
      }
    }
    //四葉設定
    this.info[Math.floor(Math.random() * lv)][Math.floor(Math.random() * lv)]  = 4;

    //画像設定
    for (var i = 0; i < lv; i++) {
      for (var j = 0; i < lv; j++) {
        if (i>=lv || j>=lv) {
          break;
        }
        if (this.info[i][j] == 3) {
          this.info[i][j].image = new Clover(curscene,j*64 + cam.x, i*64 + cam.y);
        }
        else if (this.info[i][j] == 4) {
          this.info[i][j].image = new FLeaf(curscene,j*64 + cam.x, i*64 + cam.y);
        }
      }
    }
  }
  curscene.addEventListener('enterframe', function(){
        for (var i = 0; i < lv; i++) {
      for (var j = 0; i < lv; j++) {
          this.info[i][j].image.x = j*64 + cam.x;
          this.info[i][j].image.y = i*64 + cam.y;
        }
      }
  })
  
});

/////////////////////
