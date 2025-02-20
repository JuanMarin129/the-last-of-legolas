class Legolas {
    constructor() {
        // Propiedades de Legolas

        // Creamos nodo y lo añadimos a la Game Box
        this.node = document.createElement("img");
        this.node.src = "./images/Legolas_02.png";

        // Creamos la barra de progreso
        this.nodeBarra = document.createElement("div");
        this.nodeBarra.setAttribute("id", "barra-disparo");
        this.nodeBarra.style.height = "7px";
        this.nodeBarra.style.maxWidth = "60px";
        //this.nodeBarra.style.width = "10%";
        this.nodeBarra.style.color = "red";
        this.nodeBarra.style.backgroundColor = "red";
        this.nodeBarra.style.borderRadius = "5px";
        this.nodeBarra.style.borderColor = "black";

        // Creamos la Barrera Mágica
        this.nodeMagicShield = document.createElement("img");
        this.nodeMagicShield.src = "./images/magic_shield_01.gif";
        this.nodeMagicShield.style.maxWidth = "130px";
        this.nodeMagicShield.style.display = "none";


        // Añadimos los nodos al Game Box
        gameBoxNode.append(this.node);
        gameBoxNode.append(this.nodeBarra);
        gameBoxNode.append(this.nodeMagicShield);



        // Atributos de Legolas
        this.x = 60     // Eje X
        this.y = 50     // Eje Y
        this.w = 80;    // Ancho Legolas
        this.h = 90;    // Alto Legolas

        // Atributos de la Barra de Disparo
        this.largoBarra = this.x + 10;
        this.alturaBarra = this.y + this.h;
        this.anchoBarra = 0;

        // Atributos de la Barrera Mágica
        this.MagicShieldPosicionX = this.x - 22;
        this.MagicShieldPosicionY = this.y - 15;

        // Ubicamos los nodos dentro de la caja de juego
        this.node.style.position = "absolute" 
        this.nodeBarra.style.position = "absolute";
        this.nodeMagicShield.style.position = "absolute";

        // Posición y tamaño Legolas
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        // Posición de la barra de disparo
        this.nodeBarra.style.left = `${this.largoBarra}px`;
        this.nodeBarra.style.top = `${this.alturaBarra}px`;

        // Posición de la Barrera Mágica
        this.nodeMagicShield.style.left = `${this.MagicShieldPosicionX}px`;
        this.nodeMagicShield.style.top = `${this.MagicShieldPosicionY}px`;


        // Propiedades adicionales
        this.speed = 3;
        this.isMovingRight = false;
        this.isMovingLeft = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.canShoot = true;
        this.hasMagicShield = false;

    }



    // Métodos de Legolas


    movimientoLegolas () {
        if(this.isMovingRight) {
            if((this.x + this.w +5) <= gameBoxNode.offsetWidth) {
                this.x += this.speed;
                this.node.style.left = `${this.x}px`;

                // Rotamos el sprite
                this.node.style.transform = "scaleX(-1)";

                // Barra de disparo
                this.largoBarra += this.speed;
                this.nodeBarra.style.left = `${this.largoBarra}px`;

                // Magic Shield
                this.MagicShieldPosicionX += this.speed;
                this.nodeMagicShield.style.left = `${this.MagicShieldPosicionX}px`;
                }
        }

        if(this.isMovingLeft) {
            if(this.x -5 >= 0) {
                this.x -= this.speed;
                this.node.style.left = `${this.x}px`;

                // Rotamos el sprite
                this.node.style.transform = "scaleX(1)";

                // Barra de disparo
                this.largoBarra -= this.speed;
                this.nodeBarra.style.left = `${this.largoBarra}px`;

                // Magic Shield
                this.MagicShieldPosicionX -= this.speed;
                this.nodeMagicShield.style.left = `${this.MagicShieldPosicionX}px`;
            }
        }

        if(this.isMovingUp) {
            if(this.y - 5 >= 0) {
                this.y -= this.speed;
                this.node.style.top = `${this.y}px`;

                // Barra de disparo
                this.alturaBarra -= this.speed;
                this.nodeBarra.style.top = `${this.alturaBarra}px`;

                // Magic Shield
                this.MagicShieldPosicionY -= this.speed;
                this.nodeMagicShield.style.top = `${this.MagicShieldPosicionY}px`; 
            }
        }

        if(this.isMovingDown) {
            if((this.y + this.h + 5) <= gameBoxNode.offsetHeight) {
                this.y += this.speed;
                this.node.style.top = `${this.y}px`;

                //Barra de disparo
                this.alturaBarra += this.speed;
                this.nodeBarra.style.top = `${this.alturaBarra}px`;

                 // Magic Shield
                 this.MagicShieldPosicionY += this.speed;
                 this.nodeMagicShield.style.top = `${this.MagicShieldPosicionY}px`; 
            }
        }

    }


    actualizarBarraDisparo() {
    
        let barraDisparoID;
        this.nodeBarra.style.display = "block";
        this.anchoBarra = 0;

        barraDisparoID = setInterval( () => {
            if(this.anchoBarra >= 7) {
                clearInterval(barraDisparoID);
                this.nodeBarra.style.display = "none";
                this.nodeBarra.style.width = "0%";

            }
            else {
                this.anchoBarra += 0.08;
                this.nodeBarra.style.width = `${this.anchoBarra}%`;
            }

        },20)
    }

    actualizarMagicShield() {
        if(this.hasMagicShield) {
            this.nodeMagicShield.style.display = "block";
        }

        if(!this.hasMagicShield) {
            this.nodeMagicShield.style.display = "none";
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
