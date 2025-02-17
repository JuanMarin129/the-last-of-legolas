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
        cadaOrk.movimientoAutomatico("horizontal");
    })
}

function enemigoSpawn() {

    let orkNormalObj = new Enemigo();

    orkNormalArray.push(orkNormalObj);
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
