class Target extends Vehicle {
    constructor(color, r) {
        super(random(width), random(height));

        this.vel = createVector(random(0.5),random(0.5));
        //this.vel.mult(0.2);
        this.color = color;
        this.r = r;
    }

    deplaceToiChangeVitesse() {
        this.vel.x = random(0.5);
        this.vel.y = random(0.5);
        //this.vel.mult(0.2);

        this.pos.x = random(width);
        this.pos.y = random(height);
    }
    show() {
        // On va dessiner un gros cercle rouge

        // on sauvegarde le contexte graphique, couleurs, épaisseurs    
        // des traits, position et rotation du repère de référence etc.
        push();
        // couleur de remplissage rouge
        fill(this.color);
        // pas de contour
        noStroke();
        // on se place à la position du vehicule
        translate(this.pos.x, this.pos.y);
        // on dessine un cercle de rayon 32
        circle(0, 0, this.r);
        pop();

        this.drawVelocityVector();
    }
}