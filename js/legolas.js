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

    movimientoHorizontalDerecha() {
        // Con el if, impedimos que Legolas se salga del Game Box por la derecha
        if((this.x + this.w +5) <= gameBoxNode.offsetWidth) {
        this.x += this.speed;
        this.node.style.left = `${this.x}px`;
        }
    }

    movimientoHorizontalIzquierda() {
        // Con el if, impedimos que Legolas se salga del Game Box por la izquierda
        if(this.x -5 >= 0) {
            this.x -= this.speed;
            this.node.style.left = `${this.x}px`;
        }
    }

    movimientoVerticalAbajo() {
        // Con el if, impedimos que Legolas se salga del Game Box por abajo
        if((this.y + this.h + 5) <= gameBoxNode.offsetHeight) {
            this.y += this.speed;
            this.node.style.top = `${this.y}px`;
        }
    }

    movimientoVerticalArriba() {
        // Con el if, impedimos que Legolas se salga del Game Box por arriba
        if(this.y - 5 >= 0) {
            this.y -= this.speed;
            this.node.style.top = `${this.y}px`;
        }
    }

    // Los condicionales se usan para delimitar el movimiento de Legolas en el Game Box. Los offset son los valores finales de la Game Box, mientras que el inicial es 0.






}
