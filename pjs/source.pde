void setup(){
  size(480,480);
}

void draw(){
  background(125);
  frameRate(30);
  fill(255);
  text("now: "+mouseX+","+mouseY, 30,30);
  loop();
}

void mouseClicked(){
  fill(128);
}

void mouseReleased(){
  fill(255);
}

