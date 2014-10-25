var stage, label, shape, oldPt, oldMidPt, size, color;
// ?pict=画像名 取得
var picpath = "img/" + location.search.split("=")[1] + ".jpg";

function init() {
  // canvasの設定
  stage = new createjs.Stage("demoCanvas");
  stage.enableDOMEvents(true);
  stage.canvas.height = window.innerHeight - 100;
  stage.canvas.width = window.innerWidth;

  // ぬりえ画像
  backcontainer = new createjs.Container();
  backImage = new createjs.Bitmap(picpath);
  backcontainer.addChild(backImage);

  shape = new createjs.Shape();
  stage.addChild(shape, backcontainer);
  stage.mouseMoveOutside = true;

  stage.addEventListener("stagemousedown", mouseDown);
  stage.addEventListener("stagemouseup", mouseUp);
  $('.btn').on("click", getColor);

  stage.update();
}

function mouseDown(evt) {
  size = $("#setSize").val();
  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt;
  stage.addEventListener("stagemousemove", mouseMove);
}

function mouseUp(evt) {
  stage.removeEventListener("stagemousemove", mouseMove);
}

function mouseMove(evt) {
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

// 色選択
function getColor() {
  color = $(this).css("background-color");
}