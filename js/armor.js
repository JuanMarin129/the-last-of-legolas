class Armor {
    constructor () {
        // Propiedades de la Armadura

        // Creamos nodo y lo añadimos a la Game Box
        this.node = document.createElement("img");
        this.node.src = "./images/armor_icon_01.png";

        // Lo añadimos al Game Box
        gameBoxNode.append(this.node);

        // Atributos de la Armadura
        this.x = 600;     // Eje X
        this.y = 500;     // Eje Y
        this.w = 60;    // Ancho
        this.h = 55;    // Alto

        // Ubicamos el objeto dentro de la caja de juego
        this.node.style.position = "absolute" 

        // Posición del icono de la armadura
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    }
}

