class Flecha {
    constructor (posicionX,posicionY,angulo) {
        // Propiedades del proyectil

        this.node = document.createElement("img");
        this.node.src = "./images/arrow_02.gif";
        gameBoxNode.append(this.node);

        this.node.style.position = "absolute" // Para ubicarlo dentro de la caja del juego

        this.x = posicionX;
        this.y = posicionY;
        this.angulo = angulo;
        this.w = 50;
        this.h = 50;


        // Posición y tamaño de la flecha
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        // Propiedades adicionales
        this.speed = 4;
        //this.disparada = false;
        this.dx = Math.cos(angulo) * this.speed;
        this.dy = Math.sin(angulo) * this.speed;

        if (this.dx <= 0) {
            this.node.style.transform = "scaleX(-1)"
        }
        
    }


    // Métodos

    movimientoFlecha() {
        this.x += this.dx;
        this.y += this.dy;
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
    }

    /*
    movimientoFlecha() {
       //if((ultimaTecla === "D") && (this.disparada === false)) {
            this.x += this.speed;
            this.node.style.left = `${this.x}px`;
           // console.log ("Entró en evento de disparo con D");
        }
    /*    if(ultimaTecla === "A") {
            this.x -= this.speed;
            this.node.style.left = `${this.x}px`;
           // console.log ("Entró en evento de disparo con A");
        }
     /*   console.log("Bool de disparo " + this.disparada);
        this.disparada = true;
        
    }*/

}
