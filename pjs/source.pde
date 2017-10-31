void setup(){
  size(480,480);
  background(125);
  frameRate(30);
  fill(255);
}

void draw(){
  text("now: "+mouseX+","+mouseY, 30,30);
}

void mouseClicked(){
  fill(128);
}

void mouseReleased(){
  fill(255);
}

