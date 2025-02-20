class Legolas {
    constructor() {
        // Propiedades de Legolas

        // Creamos nodo y lo añadimos a la Game Box
        this.node = document.createElement("img");
        this.node.src = "./images/Legolas_02.png";

        // Creamos la barra de progreso
        this.nodeBarra = document.createElement("div");
        this.nodeBarra.setAttribute("id", "barra-disparo");
        this.nodeBarra.style.height = "10px";
        this.nodeBarra.style.width = "50%";
        this.nodeBarra.style.color = "red";
        this.nodeBarra.style.backgroundColor = "red";


        // Añadimos el nodo
        gameBoxNode.append(this.node);
        gameBoxNode.append(this.nodeBarra);



        // Atributos de Legolas
        this.x = 60     // Eje X
        this.y = 50     // Eje Y
        this.w = 80;    // Ancho Legolas
        this.h = 90;    // Alto Legolas

        // Atributos de la Barra de Disparo
        this.largoBarra = this.x + 10;
        this.alturaBarra = this.y + this.h;

        this.node.style.position = "absolute" // Para ubicarlo dentro de la caja del juego
        this.nodeBarra.style.position = "absolute";

        // Posición y tamaño Legolas
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        // Posición de la barra de disparo
        this.nodeBarra.style.left = `${this.largoBarra}px`;
        this.nodeBarra.style.top = `${this.alturaBarra}px`;


        // Propiedades adicionales
        this.speed = 3;
        this.isMovingRight = false;
        this.isMovingLeft = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.canShoot = true;

    }



    // Métodos de Legolas


    movimientoLegolas () {
        if(this.isMovingRight) {
            if((this.x + this.w +5) <= gameBoxNode.offsetWidth) {
                this.x += this.speed;
                this.node.style.left = `${this.x}px`;
                }
        }

        if(this.isMovingLeft) {
            if(this.x -5 >= 0) {
                this.x -= this.speed;
                this.node.style.left = `${this.x}px`;
            }
        }

        if(this.isMovingUp) {
            if(this.y - 5 >= 0) {
                this.y -= this.speed;
                this.node.style.top = `${this.y}px`;
            }
        }

        if(this.isMovingDown) {
            if((this.y + this.h + 5) <= gameBoxNode.offsetHeight) {
                this.y += this.speed;
                this.node.style.top = `${this.y}px`;
            }
        }

    }

/*
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
*/





}
