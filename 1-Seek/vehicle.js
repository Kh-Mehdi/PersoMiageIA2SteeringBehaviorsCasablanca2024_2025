let vehicle;
let target;
let maxSpeedSlider, maxForceSlider;

function setup() {
  createCanvas(800, 600);

  // Initialisation du véhicule et de la cible
  vehicle = new Vehicle(width / 2, height / 2);
  target = new Target(random(width), random(height));

  // Curseur pour maxSpeed
  maxSpeedSlider = createSlider(1, 20, 10, 1);
  maxSpeedSlider.position(10, height + 10);
  createP("Max Speed").position(10, height - 20);

  // Curseur pour maxForce
  maxForceSlider = createSlider(0.1, 2, 0.25, 0.05);
  maxForceSlider.position(200, height + 10);
  createP("Max Force").position(200, height - 20);
}

function draw() {
  background(51);

  // Mettre à jour les valeurs maxSpeed et maxForce en fonction des curseurs
  vehicle.maxSpeed = maxSpeedSlider.value();
  vehicle.maxForce = maxForceSlider.value();

  // Mise à jour et affichage de la cible
  target.update();
  target.show();

  // Mise à jour et affichage du véhicule
  vehicle.applyBehaviors(target);
  vehicle.update();
  vehicle.show();

  // Si le véhicule atteint la cible, on la relocalise
  if (dist(vehicle.pos.x, vehicle.pos.y, target.pos.x, target.pos.y) < target.r + vehicle.r) {
    target.relocate();
  }
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 10;
    this.maxForce = 0.25;
    this.r = 16;
  }

  applyBehaviors(target) {
    let seekForce = this.seek(target.pos);
    this.applyForce(seekForce);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill("blue");
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }
}

class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(1, 3));
    this.r = 16;
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  show() {
    noStroke();
    fill("red");
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  relocate() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(1, 3));
  }
}
