function Obstacle(type) {
    
    if (type == 0) {
        this.pos = createVector(width/2, height/2);
        this.r = 50;
    } else if (type == 1) {
        this.pos = createVector(width/2 + 70, 100);
        this.r = 35;
    } else if (type == 2) {
        this.pos = createVector(width/2 - 70, 100);
        this.r = 35;
    }
    
    this.show = function() {
        noStroke();
        fill(200);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
    
}