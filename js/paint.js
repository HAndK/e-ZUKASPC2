var stage, label, shape, oldPt, oldMidPt, size, color, actBtn;
// ?pict=画像名 取得
//var picpath = "img/" + location.search.split("=")[1] + ".jpg";

function init() {
  // canvasの設定
  var picpath = "../img/balloon.gif"
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
  $('.btn').on("click", btnClick);

  stage.update();
}

/**
 * [mouseDown description]
 * @return {[type]} [description]
 */
function mouseDown() {
  size = $("#setSize").val();
  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt;
  stage.addEventListener("stagemousemove", mouseMove);
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
function btnClick() {
  // 同じボタンを連続で押させない
  if($(this).get(0)==$(actBtn).get(0)) return;
  color = $(this).css("background-color");
  $(this).css({'box-shadow':'none', 'transform':'translateY(5px)'});
  if(actBtn) {
    $(actBtn).css({'box-shadow':'0 5px 0 #0e8c73', 'transform':'translateY(0)'});
  }
  actBtn = $(this);
}