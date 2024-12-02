let target, vehicle;
let vehicles = [];
let sliderVitesseMaxVehicules;

// la fonction setup est appelée une fois au démarrage du programme par p5.js
function setup() {
  console.log("setup");
  // on crée un canvas de 800px par 800px
  createCanvas(800, 800);

  // on crée un vecteur pour stocker la position de la souris
  target = createVector(0, 0);

  // on crée un véhicule
  //vehicle = new Vehicle(400, 400);

  // On crée un tableau de véhicules
  creerVehicules(10);

  // "label", min, max, val, pas, posX, posY, couleur, propriété à changer
  createMonSlider("maxSpeed", 1, 50, 10, 1, 10, 0, "white", "maxSpeed");
  createMonSlider("maxForce", 0.05, 4, 0.25, 0.01, 10, 30, "white", "maxForce");

}

function creerVehicules(nbVehicules) {
  for (let i = 0; i < nbVehicules; i++) {
    let vehicle = new Vehicle(random(width), random(height));
    vehicles.push(vehicle);
  }
}

function createMonSlider(label, min, max, val, step, x, y, color, prop) {
  // On crée un slider pour régler la vitesse max
  // des véhicules
  // slider les paramètres : Min, Max, Valeur, Pas
  let slider = createSlider(min, max, val, step);
  // on positionne le slider en haut à gauche du canvas
  slider.position(100, y + 17);
  // Label à gauche du slider "maxSpeed"
  labelHTML = createP(label);
  // label en blanc
  labelHTML.style('color', 'white');
  // on le positionne en x=10 y = 10
  labelHTML.position(x, y);
  // On affiche la valeur du slider à droite du slider
  let labelValue = createP(slider.value());
  labelValue.style('color', color);
  labelValue.position(250, y);
  // on veut que la valeur soit mise à jour quand on déplace
  // le slider
  slider.input(() => {
    labelValue.html(slider.value());
    // On change la propriété de tous les véhicules
    vehicles.forEach(vehicle => {
      vehicle[prop] = slider.value();
    });
  });
}

// la fonction draw est appelée en boucle par p5.js, 60 fois par seconde par défaut
// Le canvas est effacé automatiquement avant chaque appel à draw
function draw() {
  // On efface le canvas avec un fond noir, params = couleurs
  background("black");

  // A partir de maintenant toutes les formes pleines seront en rouge
  fill("red");
  // pas de contours pour les formes.
  // epaisseur du trait par défaut 1px;
  stroke("white")

  // mouseX et mouseY sont des variables globales de p5.js, elles correspondent à la position de la souris
  // on les stocke dans un vecteur pour pouvoir les utiliser avec la méthode seek (un peu plus loin)
  // du vehicule

  target.x = mouseX;
  target.y = mouseY;

  // Dessine un cercle de rayon 32px à la position de la souris
  // la couleur de remplissage est rouge car on a appelé fill(255, 0, 0) plus haut
  // pas de contours car on a appelé noStroke() plus haut
  // x, y, diametre (et pas rayon)
  circle(target.x, target.y, 32);

  vehicles.forEach((vehicle) => {
    // je déplace et dessine le véhicule
    vehicle.applyBehaviors(target);
    vehicle.update();
    // Si le vehicule sort de l'écran
    // on le fait réapparaitre de l'autre côté
    vehicle.edges();

    // Je calcule la distance entre target et la position du véhicule
    let distance = p5.Vector.dist(target, vehicle.pos);
    // ou.... distance = target.dist(vehicle.pos);
    if (distance < vehicle.r + 16) {
      // collision !
      // on met le véhicule à une positon aléatoire
      vehicle.pos.x = random(width);
      vehicle.pos.y = random(height);
    }

    vehicle.show();

    // TODO: boucle sur le tableau de véhicules
    // pour chaque véhicule : seek, update, show
  });
}
