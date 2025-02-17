// PANTALLAS

const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");


// BOTONES
const startBtnNode = document.querySelector("#start-button");
const restartBtnNode = document.querySelector("#restart-button");


// GAME BOX

const gameBoxNode = document.querySelector("#game-box");


// VARIABLES GLOBALES

gameOverScreenNode.style.display = "none";
//gameScreenNode.style.display = "none";
let legolasObj = null;
let orkNormalArray = [];
let gameInvertalID = null;
let enemigosSpawnID = null;
//let anchoGameBox = gameBoxNode.style.width + 10;
//let altoGameBox = gameBoxNode.style.height;


// FUNCIONES DEL JUEGO

function startGame () {
    // Ocultar pantalla inicial
    startScreenNode.style.display = "none";

    // Mostrar pantalla del juego
    gameScreenNode.style.display = "flex";

    // Creamos a Legolas
    legolasObj = new Legolas();
    //console.log(legolasObj);

    // Iniciamos intervalo del juego
    gameIntervalID = setInterval( () => {
        //console.log("Estamos dentro de gameInterval");
        gameLoop();

    }, Math.round(1000/60)) // 60fps

    // Iniciamos el spawn de enemigos
    enemigosSpawnID = setInterval( () => {
        //Enemigo Spawnea
        enemigoSpawn();

    }, 2000) // 2 segundos
}


function gameLoop() {
    orkNormalArray.forEach((cadaOrk) => {
        cadaOrk.movimientoAutomatico();
    })

    enemigoDespawn();
    checkColisionLegolasOrkos();
}

function enemigoSpawn() {

    let orkNormalDerechaObj = new Enemigo("derecha");
    orkNormalArray.push(orkNormalDerechaObj);

    let orkNormalIzquierdaObj = new Enemigo("izquierda");
    orkNormalArray.push(orkNormalIzquierdaObj);

    let orkNormalAbajoObj = new Enemigo("abajo");
    orkNormalArray.push(orkNormalAbajoObj);
   
    let orkNormalArribaObj = new Enemigo("arriba");
    orkNormalArray.push(orkNormalArribaObj);

    console.log("Longitud array ", orkNormalArray.length);

}

function enemigoDespawn() {
    
    orkNormalArray.forEach((cadaOrko, indice) => {
        if(cadaOrko.posicionSpawn === "derecha" && cadaOrko.x < 0 - 90) {
            cadaOrko.node.remove();

            orkNormalArray.splice(indice, 1);
        }

        if(cadaOrko.posicionSpawn === "izquierda" && cadaOrko.x > 1000) {
            cadaOrko.node.remove();

            orkNormalArray.splice(indice, 1);
        }
        if(cadaOrko.posicionSpawn === "abajo" && cadaOrko.y < 0 - 90) {
            cadaOrko.node.remove();

            orkNormalArray.splice(indice, 1);
        }

        if(cadaOrko.posicionSpawn === "arriba" && cadaOrko.y > 700) {
            cadaOrko.node.remove();

            orkNormalArray.splice(indice, 1);
        }


    })
    /*
    if (orkNormalArray.length >0) {
        console.log(orkNormalArray[0].y)
        if((orkNormalArray[0].posicionSpawn === "arriba") && (orkNormalArray[0].y > 700)) {
            orkNormalArray[0].node.remove();

            orkNormalArray.shift();

            console.log("ORKO ABAJO BORRADO!!!");
        }
        else if((orkNormalArray[0].posicionSpawn === "izquierda") && (orkNormalArray[0].x > 1000 + orkNormalArray[0].w)) {
            orkNormalArray[0].node.remove();

            orkNormalArray.shift();

            console.log("ORKO IZQUIERDO BORRADO!!!");
        }
        else if((orkNormalArray[0].posicionSpawn === "derecha") && (orkNormalArray[0].x < 0 - orkNormalArray[0].w)) {
            orkNormalArray[0].node.remove();

            orkNormalArray.shift();

            console.log("ORKO DERECHO BORRADO!!!");
        }
        else if((orkNormalArray[0].posicionSpawn === "abajo") && (orkNormalArray[0].y < 0 - orkNormalArray[0].w)) {
            orkNormalArray[0].node.remove();

            orkNormalArray.shift();

            console.log("ORKO ARRIBA BORRADO!!!");
        }

        
       
    }*/
        
}

function checkColisionLegolasOrkos() {
    orkNormalArray.forEach((cadaOrko) => { 
    if (
        cadaOrko.x < legolasObj.x + legolasObj.w &&
        cadaOrko.x + cadaOrko.w > legolasObj.x &&
        cadaOrko.y < legolasObj.y + legolasObj.h &&
        cadaOrko.y + cadaOrko.h > legolasObj.y
      ) {
        // Collision detected!
        console.log("COLISION!!!");
      }

    })
}





// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
    startGame();
})


// Movimiento Legolas
window.addEventListener("keydown", (event) => {
    if (event.code === "KeyD")
        legolasObj.movimientoHorizontalDerecha();
    if (event.code === "KeyA")
        legolasObj.movimientoHorizontalIzquierda();
    if (event.code === "KeyS")
        legolasObj.movimientoVerticalAbajo();
    if (event.code === "KeyW")
        legolasObj.movimientoVerticalArriba();

})




/* PLANIFICACIÓN

- Crear la clase Legolas (x, y, h, w, speed)   ✅
- Agregar a Legolas                            ✅
    - Movimiento con teclas (ASWD)             ✅
- Crear la clase enemigos (x, y, h, w, speed)
    - Movimiento automático de los enemigos
    - Los enemigos se mueven en horizontal o vertical
- Agregar los enemigos (spawn)
- Remover a los enemigos (despawn)
- Colisión de Legolas con los enemigos
- Colisión de Legolas con los bordes (no debe pasar)
- Timer con el tiempo transcurrido
- Game Over
- Agregar fondo
- Agregar imagenes botones


*/
