function Target() {
    
    this.pos = createVector(width/2, 50);
    
    this.r = 30;
    
    this.show = function() {
        fill(230, 0, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
    
}