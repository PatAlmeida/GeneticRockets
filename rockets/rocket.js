function Rocket() {
    
    this.width = 8;
    this.height = 30;
    
    this.pos = createVector(width/2, height - 50);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.crashedVel = null;
    
    this.fitness = -1;
    
    this.foundTarget = false;
    this.crashed = false;
    this.finished = false;
    
    this.posHistory = [];
    
    this.dna = [];
    
    this.show = function(gen, age) {
        push();

        noStroke();
        //fill(230, 150);
        fill(255, 105, 180, 150);

        translate(this.pos.x, this.pos.y);
        
        if (this.crashedVel === null) {
            if (gen == 0) {
                rotate(this.vel.heading() + HALF_PI);
            } else {
                rotate(this.dna[age].heading() + HALF_PI);
            }
        } else {
            rotate(this.crashedVel.heading() + HALF_PI);
        }

        rectMode(CENTER);
        rect(0, 0, this.width, this.height);

        beginShape();
        vertex(-this.width/2 - 5, -this.height/2 + 5);
        vertex(this.width/2 + 5, -this.height/2 + 5);
        vertex(0, -this.height/2 - 10);
        endShape();

        pop();
    }
    
    this.update = function(gen, age) {
        if (gen == 0) {
            this.applyForce();
        
            if (!this.finished) {
                this.pos.add(this.vel);
            }
            this.vel.add(this.acc);
            this.acc.set(0, 0);
            
            this.dna.push(this.vel.copy());
        } else {
            if (!this.finished) {
                this.pos.add(this.dna[age]);
            }
        }
        
        this.posHistory.push(this.pos.copy());
        
        this.checkProgress(gen, age);
    }
    
    this.makeNewDNA = function(dnaB) {
        var splitIndex = floor(random(0, this.dna.length - 1)); 
        var newDNA = [];
        for (var i=0; i<this.dna.length; i++) {
            if (i < splitIndex) {
                newDNA.push(this.dna[i].copy());
            } else {
                newDNA.push(dnaB[i].copy());
            }
        }
        return newDNA;
    }
    
    this.reset = function(newDNA) {
        this.pos = createVector(width/2, height - 50);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        
        this.crashedVel = null;
    
        this.fitness = -1;

        this.foundTarget = false;
        this.crashed = false;
        this.finished = false;

        this.posHistory = [];

        this.dna = newDNA;
    }
    
    this.calcFitness = function() {
        closestIndex = 0;
        for (var i=0; i<this.posHistory.length; i++) {
            var bestD = target.pos.dist(this.posHistory[closestIndex]);
            var newD = target.pos.dist(this.posHistory[i]);
            if (newD < bestD) {
                closestIndex = i;
            }
        }
        
        var distFromTarget = target.pos.dist(this.posHistory[closestIndex]);
        this.fitness = map(distFromTarget, 0, 450, 30, 1);
        var timeFactor = map(closestIndex, 0, this.posHistory.length, 1, 0.7);
        this.fitness = floor(this.fitness * timeFactor);
        if (this.foundTarget) this.fitness += 12;
        if (this.fitness < 1) this.fitness = 1;
        
        //console.log(floor(distFromTarget) + ", " + this.fitness);
    }
    
    this.checkProgress = function(gen, age) {
        if (this.isOutsideWindow() || this.collidedWithAnObstacle()) {
            this.crashed = true;
        } else if (this.collidedWithTarget()) {
            this.foundTarget = true;
        }
        this.finished = this.crashed || this.foundTarget;
        if (this.finished && this.crashedVel === null) {
            if (gen == 0) {
                this.crashedVel = this.vel.copy();
            } else {
                this.crashedVel = this.dna[age].copy();
            }
        }
    }
    
    this.isOutsideWindow = function() {
        var rPos = this.pos;
        return (rPos.x < 0 || rPos.x > width || rPos.y < 0 || rPos.y > height);
    }
    
    // This isn't exactly right...
    this.collidedWithAnObstacle = function() {
        var crash = false;
        for (var i=0; i<obstacles.length; i++) {
            if (this.pos.dist(obstacles[i].pos) < obstacles[i].r) {
                crash = true;
            }
        }
        return crash;
    }
    
    this.collidedWithTarget = function() {
        return (this.pos.dist(target.pos) < target.r);
    }
    
    this.applyForce = function() {
        var force = p5.Vector.random2D();
        force.setMag(0.2);
        this.acc.add(force);
    }
    
}