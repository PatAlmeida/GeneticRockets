var population;
var obstacles = [];
var target;

function setup() {
	createCanvas(600, 550);
    
    population = new Population();
    for (var i=0; i<1; i++) {
        obstacles.push(new Obstacle(i));
    }
    target = new Target();
}

function draw() {
    background(0);
    
    population.live();
    for (var i=0; i<obstacles.length; i++) {
        obstacles[i].show();
    }
    target.show();
}






