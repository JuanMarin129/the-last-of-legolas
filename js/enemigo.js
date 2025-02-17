class Enemigo {
    constructor() {
        // Propiedades Enemigo

        // Creamos el nodo y lo agregamos al Game Box
        this.node = document.createElement("img");
        this.node.src = "./images/Ork_normal_01.png";
        gameBoxNode.append(this.node);


        // Configurar posición y dimensiones iniciales
        this.x = Math.floor(Math.random() * 50) + 1050;
        this.y = Math.floor(Math.random() * 600) + 90;
        this.w = 90;
        this.h = 90;

        // Lo añadimos al Game Box
        this.node.style.position = "absolute" // para ubicarlo dentro de la Game Box
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        // Propiedades adicionales
        this.speed = 3;

    }


    // Métodos

    movimientoAutomatico(movimiento) {
        if(movimiento === "horizontal")
            this.x -= this.speed;
            this.node.style.left = `${this.x}px`
    }
    
    





}
