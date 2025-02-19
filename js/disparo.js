class Flecha {
    constructor (posicionX,posicionY) {
        // Propiedades del proyectil

        this.node = document.createElement("img");
        this.node.src = "./images/arrow_02.gif";
        gameBoxNode.append(this.node);

        this.node.style.position = "absolute" // Para ubicarlo dentro de la caja del juego

        this.x = posicionX;
        this.y = posicionY;
        this.w = 50;
        this.h = 50;


        // Posición y tamaño de la flecha
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        // Propiedades adicionales
        this.speed = 4;

    }


    // Métodos

    movimientoFlecha() {
        this.x += this.speed;
        this.node.style.left = `${this.x}px`;
    }

}
