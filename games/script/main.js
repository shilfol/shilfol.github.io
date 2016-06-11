enchant(); // enchant.jsの使用開始を宣言する

///////////////////
//main
window.onload = function() { // ウィンドウがロードされたら呼び出される
  game = new Game(320, 320); // 解像度320x320のゲーム画面を作る
  game.fps = 24;

  game.preload('./img/chieri.png', './img/four.png', './img/player.png'); // ゲーム開始時にロードする画像ファイルを指定する

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
      label.y = 30;

      scene.addChild(label);
      scene.backgroundColor = 'rgba(255,190,0,1)';


      var bear = new Sprite(32, 32); // スプライトを作る

      bear.image = game.assets['./img/chieri.png']; //画像ファイルを指定
      bear.moveTo(20, 50);
      scene.addChild(bear); //画面に画像を表示する
      //scene.backgroundColor = '#7ecef4';

      var pp = new Player(scene, 150, 40);

      //仮想パッド作成とその操作
      var pad = new Pad();
      pad.moveTo(0, scene.height - 100);
      scene.addChild(pad);

      scene.addEventListener('enterframe', function() {
        if (game.input.up) {
          pad.frame = 1;
          pad.rotation = 0;
          pp.y--;
        }
        if (game.input.down) {
          pad.frame = 1;
          pad.rotation = 180;
          pp.y++;
        }
        if (game.input.right) {
          pad.frame = 1;
          pad.rotation = 90;
          pp.x++;
        }
        if (game.input.left) {
          pad.frame = 1;
          pad.rotation = 270;
          pp.x--;
        }
      })

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
    this.frame = 0;
    currentscene.addChild(this);
  }
});

/////////////////////
