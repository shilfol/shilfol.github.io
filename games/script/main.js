enchant(); // enchant.jsの使用開始を宣言する
window.onload = function(){ // ウィンドウがロードされたら呼び出される
  game = new Game(320,320); // 解像度320x320のゲーム画面を作る
  game.fps = 24;

  game.preload('./img/chieri.png','./img/four.png'); // ゲーム開始時にロードする画像ファイルを指定する

  game.onload = function(){ // ゲーム開始時の処理を記述する
    var bear = new Sprite(32,32); // スプライトを作る

    bear.image = game.assets['./img/chieri.png']; //画像ファイルを指定
    bear.x = 50; //x座標を指定
    bear.y = 50; //y座標を指定
    game.rootScene.addChild(bear); //画面に画像を表示する
    game.rootScene.backgroundColor = '#7ecef4';
  }

  game.start(); //ゲーム開始
}
