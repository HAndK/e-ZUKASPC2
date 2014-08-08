var stage, label, shape, oldPt, oldMidPt, size, color;
var fstTouchFlg = true, fstTouchX, fstTouchY;

function init() {
  stage = new createjs.Stage("demoCanvas");
  stage.enableDOMEvents(true);
  label = new createjs.Text("ぬりえ", "24px Arial");
  label.x = label.y = 10;
  
  shape = new createjs.Shape();
  stage.addChild(shape, label);
  stage.mouseMoveOutside = true;
  //set up our defaults:
  //color = "#0FF";
  //size = 10;

  stage.addEventListener("stagemousedown", mouseDown);
  stage.addEventListener("stagemouseup", mouseUp);

  stage.update();
}
  
function mouseDown(evt) {
  size = $("#setSize").val();
  color = $("#setColor").val();
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
