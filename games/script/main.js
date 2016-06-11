enchant(); // enchant.jsの使用開始を宣言する
window.onload = function() { // ウィンドウがロードされたら呼び出される
  game = new Game(320, 320); // 解像度320x320のゲーム画面を作る
  game.fps = 24;

  game.preload('./img/chieri.png', './img/four.png'); // ゲーム開始時にロードする画像ファイルを指定する

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
      bear.x = 50; //x座標を指定
      bear.y = 50; //y座標を指定
      scene.addChild(bear); //画面に画像を表示する
      //scene.backgroundColor = '#7ecef4';

      scene.addEventListener(Event.TOUCH_START, function(e) {
        game.pushScene(createGameoverScene());
      })
      return scene;
    }

    var createGameoverScene = function(){
      var scene = new Scene();
      var label = new Label("gameover\n retry?");
      label.y = 60;
      scene.addChild(label);
      scene.backgroundColor = 'rgba(0,0,255,0.5)';

      scene.addEventListener(Event.TOUCH_START, function(e){
        game.popScene();
      })
      return scene;
    }
    game.replaceScene(createTitleScene());
  }

  game.start(); //ゲーム開始
}
