var stage, label, oldPt, oldMidPt, size, color, actBtn, actBtnS, count, moveFlg;
var shape = [];
//画像の名前
var picname = location.search.split("=")[1]
//画像のパス
var picpath = "../img/" + location.search.split("=")[1] + ".gif";
var picmodel = "../img/" + location.search.split("=")[1] + "_color.gif";
var manifest = [{src:picpath, id:picname}];
// ?pict=画像名 取得
preload = new createjs.LoadQueue(false); // LoadQueueクラスのインスタンスを作成する
preload.loadManifest(manifest); // 配列manifestを先読みする

function init() {
  //お手本画像設定
  $('.picModel').attr('src', picmodel);

  // canvasの設定
  stage = new createjs.Stage("demoCanvas");
  stage.enableDOMEvents(true);
  stage.canvas.height = 600;
  stage.canvas.width = 650;
  createjs.Touch.enable(stage);

  // ぬりえ画像
  backcontainer = new createjs.Container();
  backImage = new createjs.Bitmap(picpath);
  backImage.x　= 100;
  backImage.y　= 100;
  backcontainer.addChild(backImage);
  stage.addChild(backcontainer);
  stage.mouseMoveOutside = true;

  // 色塗りのイベントを追加
  stage.addEventListener("stagemousedown", mouseDown);
  stage.addEventListener("stagemouseup", mouseUp);
  $('.btnColor').on("click", btnColorClick);
  $('.btnSize').on("click", btnSizeClick);
  $('.btnReMove').on("click", btnReMoveClick);
  $('.btnReMoveAll').on("click", btnReMoveAllClick);
  $('.btnSize').click();

  // 初期化
  count = 0;
  moveFlg = false;
  //表示
  stage.update();
}

/**
 * [mouseDown description]
 * @return {[type]} [description]
 */
function mouseDown() {
  shape[count] = new createjs.Shape();
  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt;
  stage.addEventListener("stagemousemove", mouseMove);
}

/**
 * [mouseUp description]
 * @return {[type]} [description]
 */
function mouseUp(e) {
  stage.removeEventListener("stagemousemove", mouseMove);
  // ドラッグした？
  if(moveFlg) count += 1;
  moveFlg = false;
}

/**
 * [mouseMove description]
 * @return {[type]} [description]
 */
function mouseMove() {
  var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);
  shape[count].graphics.beginStroke(color)
      .setStrokeStyle(size, "round", "round")
      .moveTo(midPt.x, midPt.y)
      .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
  oldPt.x = stage.mouseX;
  oldPt.y = stage.mouseY;
  oldMidPt.x = midPt.x;
  oldMidPt.y = midPt.y;

  // 画像が色の下に来るので、画像を一度消します。
  stage.removeChild(backcontainer);
  // 画像をもう一度表示します。
  stage.addChild(shape[count], backcontainer);
  stage.update();
  moveFlg = true;
}

// 色選択, ボタンの押された風な動き
function btnColorClick() {
  // 同じボタンを連続で押させない
  if($(this).get(0)==$(actBtn).get(0)) return;
  color = $(this).css("background-color");
  $(this).css({'box-shadow':'none', 'transform':'translateY(6px)'});
  if(actBtn) {
    $(actBtn).css({'box-shadow':'0 6px 0 #688', 'transform':'translateY(0)'});
  }
  actBtn = $(this);
}

// サイズ選択, ボタンの押された風な動き
function btnSizeClick() {
  // 同じボタンを連続で押させない
  if($(this).get(0)==$(actBtnS).get(0)) return;
  size = $(this).val();
  $(this).css({'box-shadow':'none', 'transform':'translateY(5px)'});
  if(actBtnS) {
    $(actBtnS).css({'box-shadow':'0 3px 0 #688', 'transform':'translateY(0)'});
  }
  actBtnS = $(this);
}

// 塗った色を消す！
function btnReMoveClick() {
  console.log(count);
  //前書いた線をremoveする
  count -= 1;
  stage.removeChild(shape[count])
  //描画
  stage.update();
}

// 全部消す！
function btnReMoveAllClick() {
  //stage上をきれいに！
  stage.removeAllChildren();
  //一度描画
  stage.update();
  //画像が消えちゃうのでもう一度追加
  stage.addChild(backcontainer);
  //きれいになったので再描画
  stage.update();
}