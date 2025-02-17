class Legolas {
    constructor() {
        // Propiedades de Legolas

        // Creamos nodo y lo añadimos a la Game Box
        this.node = document.createElement("img");
        this.node.src = "./images/Legolas_01.png";

        // Añadimos el nodo
        gameBoxNode.append(this.node);



        // Atributos de Legolas
        this.x = 60     // Eje X
        this.y = 50     // Eje Y
        this.w = 50;    // Ancho Legolas
        this.h = 60;    // Alto Legolas

        this.node.style.position = "absolute" // Para ubicarlo dentro de la caja del juego

        // Posición y tamaño Legolas
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;


        // Propiedades adicionales
        this.speed = 10;
    }



    // Métodos de Legolas

    movimientoHorizontal() {
        this.x += this.speed;
        this.node.style.left = `${this.x}px`;
    }

    movimientoVertical() {
        this.y += this.speed;
        this.node.style.top = `${this.y}px`;
    }








}
