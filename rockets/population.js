function Population() {
    
    this.rockets = [];
    this.numRockets = 50;
    for (var i=0; i<this.numRockets; i++) {
        this.rockets.push(new Rocket());
    }
    
    this.lifeSpan = 300;
    
    this.numMadeTarget = null;
    
    this.currentGen = 0;
    this.age = 0;
    
    this.live = function() {
        for (var i=0; i<this.numRockets; i++) {
            this.rockets[i].show(this.currentGen, this.age);
            this.rockets[i].update(this.currentGen, this.age);
        }
        
        this.writeProgress();
        
        this.age++;
        if (this.age > this.lifeSpan) {
            this.createNextGen();
        }
    }
    
    this.writeProgress = function() {
        if (this.numMadeTarget === null) {
            // do nothing
        } else {
            textSize(30);
            fill(255);
            var percent = ((this.numMadeTarget/this.numRockets) * 100) * 100 / 100;
            text("Gen " + (this.currentGen-1) + ": " + percent + "%", 5, height-9);
        }
    }
    
    this.createNextGen = function() {
        console.log("generation " + this.currentGen + " over");
        
        this.numMadeTarget = 0;
        for (var i=0; i<this.numRockets; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].foundTarget) {
                this.numMadeTarget++;
            }
        }
        
        var genepool = [];
        for (var i=0; i<this.numRockets; i++) {
            for (var j=0; j<this.rockets[i].fitness; j++) {
                genepool.push(this.rockets[i].dna);
            }
        }
        
        for (var i=0; i<this.numRockets; i++) {
            var rand = floor(random(genepool.length));
            var dna = genepool[rand];
            var newDNA = this.rockets[i].makeNewDNA(dna);
            newDNA = this.mutateDNA(newDNA);
            this.rockets[i].reset(newDNA);
        }
        
        this.age = 0;
        
        this.currentGen++;
    }
    
    this.mutateDNA = function(dna) {
        for (var i=0; i<dna.length; i++) {
            var rand = random(1);
            if (rand < 0.05) {
                var vel = p5.Vector.random2D();
                vel.setMag(0.03);
                dna[i] = dna[i].add(vel);
            }
        }
        return dna;
    }
    
}





