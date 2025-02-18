// PANTALLAS

const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");


// BOTONES
const startBtnNode = document.querySelector("#start-button");
const restartBtnNode = document.querySelector("#restart-button");


// GAME BOX

const gameBoxNode = document.querySelector("#game-box");

// TIEMPO TRANSCURRIDO
const tiempoTranscurridoContenedor = document.querySelector("#tiempo-transcurrido");

// MEJOR PUNTUACIÓN
const mejorPuntuacionNode = document.querySelector("#mejor-puntuacion");



// VARIABLES GLOBALES

gameOverScreenNode.style.display = "none";
//gameScreenNode.style.display = "none";
let legolasObj = null;
let orkNormalArray = [];
let gameInvertalID = null;
let enemigosSpawnID = [];
let timerID = null;
let cronometro = 0;
let mejorPuntuacion = 0;
let puntoDeSpawn = ["derecha", "izquierda", "arriba", "abajo"];

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
    enemigosSpawnID[0] = setInterval( () => {
        //Enemigo Spawnea
        enemigoSpawn(puntoDeSpawn[0]);

    }, 4000) // 4 segundos

    // Oleada 2
    setTimeout (() => {
        enemigosSpawnID[1] = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn(puntoDeSpawn[1]);
    
        }, 4000) // 4 segundos

    },30000) // 30 segundos

    // Oleada 3
    setTimeout (() => {
        enemigosSpawnID[2] = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn(puntoDeSpawn[2]);
    
        }, 2000) // 2 segundos

    },60000) // 60 segundos

    // Oleada 4
    setTimeout (() => {
        enemigosSpawnID[3] = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn(puntoDeSpawn[3]);
    
        }, 2000) // 2 segundos

    },90000) // 90 segundos

    // Oleada 5
    setTimeout (() => {
        // Detenemos el primer intervalo para reiniciar oleada con spawn de menor tiempo
        clearInterval(enemigosSpawnID[0]);
        clearInterval(enemigosSpawnID[1]);

        enemigosSpawnID[0] = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn(puntoDeSpawn[0]);
    
        }, 2000) // 2 segundos

        enemigosSpawnID[1] = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn(puntoDeSpawn[1]);
    
        }, 2000) // 2 segundos

    },120000) // 120 segundos

    startCronometro();
}

function restartGame () {
     // Borramos los nodos hijos de Game Box para "limpiar" la pantalla
        /*legolasObj.node.remove();
        orkNormalArray.forEach((cadaOrko) => {
            cadaOrko.node.remove();
        })*/
        gameBoxNode.innerHTML = null;
    
        // Reiniciamos las variables a su modo inicio
        gameOverScreenNode.style.display = "none";
        legolasObj = null;
        orkNormalArray = [];
        gameInvertalID = null;
        enemigosSpawnID = [];
        timerID = null;
        cronometro = 0;
}

function startCronometro() {
    // Tiempo transcurrido
    timerID = setInterval( () => {
        cronometro += 1;
       //console.log("Estamos dentro de TimerID", cronometro);

        // Mostramos el cronometro en minutos y segundos
        let actualTiempo = formatoMinutosSegundos(cronometro);
        tiempoTranscurridoContenedor.innerText = `Tiempo Transcurrido: ${actualTiempo[0]}:${actualTiempo[1]}`;

        /*
        let minutos = Math.floor(cronometro / 60)
        .toString()
        .padStart(2, "0");
        let segundos = (cronometro % 60).toString().padStart(2, "0");
        tiempoTranscurridoContenedor.innerText = `Tiempo Transcurrido: ${minutos}:${segundos}`;
        */

        //console.log(`Minutos y segundos ${minutos}:${segundos}`);

    },1000) // 1 segundo
}

function gameLoop() {
    orkNormalArray.forEach((cadaOrk) => {
        cadaOrk.movimientoAutomatico();
    })

    enemigoDespawn();
    checkColisionLegolasOrkos();
}

function enemigoSpawn(spawn) {

    let orkNormalObj = new Enemigo(spawn);
    orkNormalArray.push(orkNormalObj);
/*
    let orkNormalIzquierdaObj = new Enemigo(spawn);
    orkNormalArray.push(orkNormalIzquierdaObj);

    let orkNormalAbajoObj = new Enemigo(spawn);
    orkNormalArray.push(orkNormalAbajoObj);
   
    let orkNormalArribaObj = new Enemigo(spawn);
    orkNormalArray.push(orkNormalArribaObj);*/

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
        (cadaOrko.x + 10 < legolasObj.x + legolasObj.w)  &&
        (cadaOrko.x + cadaOrko.w > 10 + legolasObj.x) &&
        (cadaOrko.y +10 < legolasObj.y + legolasObj.h) &&
        (cadaOrko.y + cadaOrko.h > 10 + legolasObj.y)
      ) {
        // Collision detected!
        console.log("COLISION!!!");
        gameOver();

      }

    })
}

function gameOver() {
    // Detenemos TODOS los intervalos
    clearInterval(gameIntervalID);
    clearInterval(timerID);
    for (let i=0; i<enemigosSpawnID.length;i++)
        clearInterval(enemigosSpawnID[i]);
    

    // Comprobamos si hemos mejorado nuestra mejor puntuacion y actualizamos
    actualizarPuntuacion();

    // Ocultar la pantalla de juego
    gameScreenNode.style.display = "none";

    // Mostrar la pantalla final
    gameOverScreenNode.style.display = "flex";
}


function actualizarPuntuacion() {

    let cronoActual;
    let mejorCrono;
    
    // Guardamos la puntuación si ha superado la anterior marca
    if((localStorage.getItem(mejorPuntuacion) < cronometro)) {
        
        //console.log("Esto es Local Storage ANTES del setItem", localStorage.getItem(mejorPuntuacion));

        localStorage.setItem(mejorPuntuacion, cronometro);
        //mejorCrono = localStorage.getItem(mejorPuntuacion);

        //console.log("Esto es cronometro " + cronometro);

        

        // Añadimos el nuevo marcador al HTML

        mejorCrono = formatoMinutosSegundos(localStorage.getItem(mejorPuntuacion))
        mejorPuntuacionNode.innerText = `¡Felicidades! Has mejorado tu mejor tiempo. Ahora es: ${mejorCrono[0]}:${mejorCrono[1]}`;
    }
    else {

        // Mostramos el tiempo actual y el mejor tiempo conseguido hasta ahora

        cronoActual = formatoMinutosSegundos(cronometro);
        mejorCrono = formatoMinutosSegundos(localStorage.getItem(mejorPuntuacion));

        /*
        let minutosActuales = Math.floor(cronometro / 60)
        .toString()
        .padStart(2, "0");
        let segundosActuales = (cronometro % 60).toString().padStart(2, "0");

        let minutosMejores = Math.floor(localStorage.getItem(mejorPuntuacion) / 60)
        .toString()
        .padStart(2, "0");
        let segundosMejores = (localStorage.getItem(mejorPuntuacion) % 60).toString().padStart(2, "0");

        */


        // Lo añadimos al HTML
        mejorPuntuacionNode.innerText = `No has podido mejorar tu marca... ¡Sigue intentándolo! 
        La marca que has conseguido ahora es: ${cronoActual[0]}:${cronoActual[1]}
        La mejor marca que has conseguido es: ${mejorCrono[0]}:${mejorCrono[1]}`;

    }
}


function formatoMinutosSegundos(tiempo) {
    let tiempoArray = [];

    tiempoArray.push(Math.floor(tiempo / 60).toString().padStart(2, "0")); 
    tiempoArray.push((tiempo % 60).toString().padStart(2, "0"));

    return tiempoArray;

}




// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
    startGame();
})

restartBtnNode.addEventListener("click", () => {
    // Reiniciamos las variables y "limpiamos" nodos de Game-Box
    restartGame();
    
    // Lanzamos el juego
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
- Crear la clase enemigos (x, y, h, w, speed)  ✅
    - Movimiento automático de los enemigos    ✅
    - Los enemigos se mueven en horizontal o vertical ✅
- Agregar los enemigos (spawn) ✅
- Remover a los enemigos (despawn) ✅
- Colisión de Legolas con los enemigos ✅
- Colisión de Legolas con los bordes (no debe pasar) ✅
- Timer con el tiempo transcurrido ✅
- Game Over ✅
- Agregar fondo
- Agregar imagenes botones


*/
