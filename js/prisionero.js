class Prisionero {
    constructor (posicionX,posicionY) {
        // Propiedades del Prisionero

        // Creamos nodo y lo añadimos a la Game Box
        this.node = document.createElement("img");
        this.node.src = "./images/prisionero_01.gif";

        // Lo añadimos al Game Box
        gameBoxNode.append(this.node);

        // Atributos de la Armadura
        this.x = posicionX;     // Eje X
        this.y = posicionY;     // Eje Y
        this.w = 160;    // Ancho
        this.h = 150;    // Alto

        // Ubicamos el objeto dentro de la caja de juego
        this.node.style.position = "absolute" 

        // Posición del icono de la armadura
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    }
}
