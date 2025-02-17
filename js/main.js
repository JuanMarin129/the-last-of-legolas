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


// FUNCIONES DEL JUEGO

function startGame () {
    // Ocultar pantalla inicial
    startScreenNode.style.display = "none";

    // Mostrar pantalla del juego
    gameScreenNode.style.display = "flex";

    // Creamos a Legolas
    legolasObj = new Legolas();
    console.log(legolasObj);

}


// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
    startGame();
})

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

- Crear la clase Legolas (x, y, h, w, speed)
- Agregar a Legolas
    - Movimiento con teclas (ASWD)
- Crear la clase enemigos (x, y, h, w, speed)
    - Movimiento automático de los enemigos
    - Los enemigos se mueven en horizontal o vertical
- Agregar los enemigos (spawn)
- Remover a los enemigos (despawn)
- Colisión de Legolas con los enemigos
- Colisión de Legolas con los bordes (no debe pasar)
- Timer con el tiempo transcurrido
- Game Over


*/
