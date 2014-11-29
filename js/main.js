var stage, label, shape, oldPt, oldMidPt, size, color, actBtnC, actBtnS, cnt, test[];
// ?pict=画像名 取得
var picpath = "img/" + location.search.split("=")[1] + ".jpg";

function init() {
  // canvasの設定
  stage = new createjs.Stage("demoCanvas");
  stage.enableDOMEvents(true);
  stage.canvas.height = window.innerHeight - 250;
  stage.canvas.width = window.innerWidth - 50;
  createjs.Touch.enable(stage);

  // ぬりえ画像
  backcontainer = new createjs.Container();
  backImage = new createjs.Bitmap(picpath);
  backcontainer.addChild(backImage);

  shape = new createjs.Shape();
  stage.addChild(shape, backcontainer);
  stage.mouseMoveOutside = true;

  stage.addEventListener("stagemousedown", mouseDown);
  stage.addEventListener("stagemouseup", mouseUp);
  $('.btnColor').on("click", btnColorClick);
  $('.btnSize').on("click", btnSizeClick);
  $('.btnClear').on("click", btnClearClick);
  stage.update();
}

/**
 * [mouseDown description]
 * @return {[type]} [description]
 */
function mouseDown() {
  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt;
  stage.addEventListener("stagemousemove", mouseMove);
  shape = new createjs.Shape();
  stage.addChild(shape, backcontainer);
}

/**
 * [mouseUp description]
 * @return {[type]} [description]
 */
function mouseUp() {
  stage.removeEventListener("stagemousemove", mouseMove);
}

/**
 * [mouseMove description]
 * @return {[type]} [description]
 */
function mouseMove() {
  var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);
  shape.graphics.beginStroke(color)
       .setStrokeStyle(size, "round", "round")
       .moveTo(midPt.x, midPt.y)
       .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
  oldPt.x = stage.mouseX;
  oldPt.y = stage.mouseY;
  oldMidPt.x = midPt.x;
  oldMidPt.y = midPt.y;

  stage.update();
}

// 色選択, ボタンの押された風な動き
function btnColorClick() {
  // 同じボタンを連続で押させない
  if($(this).get(0)==$(actBtnC).get(0)) return;
  color = $(this).css("background-color");
  $(this).css({'box-shadow':'none', 'transform':'translateY(8px)'});
  if(actBtnC) {
    $(actBtnC).css({'box-shadow':'0 8px 0 #088', 'transform':'translateY(0)'});
  }
  actBtnC = $(this);
}

// サイズ選択, ボタンの押された風な動き
function btnSizeClick() {
  // 同じボタンを連続で押させない
  if($(this).get(0)==$(actBtnS).get(0)) return;
  size = $(this).val();
  $(this).css({'box-shadow':'none', 'transform':'translateY(8px)'});
  if(actBtnS) {
    $(actBtnS).css({'box-shadow':'0 8px 0 #088', 'transform':'translateY(0)'});
  }
  actBtnS = $(this);
}

function btnClearClick() {
  stage.clear(false);
}