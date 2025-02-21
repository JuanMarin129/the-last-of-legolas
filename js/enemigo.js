class Enemigo {
    constructor(posicionSpawn) {
        // Propiedades Enemigo

        // Creamos el nodo y lo agregamos al Game Box
        this.node = document.createElement("img");
        this.node.src = "./images/Ork_normal_01.png";
        gameBoxNode.append(this.node);

        // Guardamos su posicion
        this.posicionSpawn = posicionSpawn;


        // Configurar posición y dimensiones iniciales dependiendo de su posicionSpawn

        if(this.posicionSpawn === "derecha") {
            //this.x = Math.floor(Math.random() * 50) + 1050;
            this.x = 1100;
            this.y = Math.floor(Math.random() * 600);
            
        }
        else if(this.posicionSpawn === "izquierda") {
            // this.x = Math.floor(Math.random() * 50) - 150;
            this.x = -100;
            this.y = Math.floor(Math.random() * 600);
            // Rotamos el sprite
            this.node.style.transform = "scaleX(-1)";

        }
        else if(this.posicionSpawn === "abajo") {
            this.x = Math.floor(Math.random() * 650) + 90;
            this.y = 700;
        }
        else if(this.posicionSpawn === "arriba") {
            this.x = Math.floor(Math.random() * 650) + 90;
            this.y = -100;
            // Rotamos el sprite
            this.node.style.transform = "scaleX(-1)";

        }
       
        this.w = 105;
        this.h = 105;

        // Lo añadimos al Game Box
        this.node.style.position = "absolute" // para ubicarlo dentro de la Game Box
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        // Propiedades adicionales
        this.speed = 2.5;

    }


    // Métodos

    movimientoAutomatico() {
        if(this.posicionSpawn === "derecha") {
            this.x -= this.speed;
            this.node.style.left = `${this.x}px`
        }
        if(this.posicionSpawn === "izquierda") {
            this.x += this.speed;
            this.node.style.left = `${this.x}px`
        }
        if(this.posicionSpawn === "abajo") {
            this.y -= this.speed;
            this.node.style.top = `${this.y}px`
        }
        if(this.posicionSpawn === "arriba") {
            this.y += this.speed;
            this.node.style.top = `${this.y}px`
        }
    }
    

    sonidoOrkoEliminado() {
        if(this.posicionSpawn === "derecha") {
            orkoEliminado01.play();
        }
        else if(this.posicionSpawn === "izquierda") {
            orkoEliminado02.play();
        }
        else if(this.posicionSpawn === "abajo") {
            orkoEliminado03.play();
        }
        else if(this.posicionSpawn === "arriba") {
            orkoEliminado03.play();

        }

    }
    





}
