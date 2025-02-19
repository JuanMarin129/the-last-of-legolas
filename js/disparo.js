class Flecha {
    constructor (posicionX,posicionY) {
        // Propiedades del proyectil

        this.node = document.createElement("img");
        this.node.src = "./images/Arrow03.png";
        gameBoxNode.append(this.node);

        this.x = posicionX;
        this.y = posicionY;
        this.w = 100;
        this.h = 100;

        // Propiedades adicionales
        this.speed = 5;

    }


    // Métodos

    movimientoFlecha() {
        this.x += this.speed;
        this.node.style.left = `${this.x}px`
    }



}
