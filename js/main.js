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
const orcosEliminadosNode = document.querySelector("#orcos-eliminados");



// VARIABLES GLOBALES

gameOverScreenNode.style.display = "none";
//gameScreenNode.style.display = "none";
let legolasObj = null;
let armaduraObj = null;
let orkNormalArray = [];
let flechaArray = [];
let gameInvertalID = null;
let enemigosSpawnArribaID = null;
let enemigosSpawnAbajoID = null;
let enemigosSpawnDerechaID = null;
let enemigosSpawnIzquierdaID = null;
let timeOutOleada2 = null;
let timeOutOleada3 = null;
let timeOutOleada4 = null;
let timeOutOleada5 = null;
let timerID = null;
let cronometro = 0;
let mejorPuntuacion = 0;
let totalOrcosMuertos = 0;

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

    armaduraObj = new Armor();

    // Iniciamos intervalo del juego
    gameIntervalID = setInterval( () => {
        //console.log("Estamos dentro de gameInterval");
        gameLoop();

    }, Math.round(1000/60)) // 60fps

    // Iniciamos el spawn de enemigos


    // Oleada 1
    enemigosSpawnDerechaID = setInterval( () => {
        //Enemigo Spawnea
        enemigoSpawn("derecha");

    }, 4000) // 4 segundos

    // Oleada 2
    timeOutOleada2 = setTimeout (() => {
        enemigosSpawnIzquierdaID = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn("izquierda");
    
        }, 4000) // 4 segundos

    },30000) // 30 segundos

    // Oleada 3
    timeOutOleada3 = setTimeout (() => {
        enemigosSpawnAbajoID = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn("abajo");
    
        }, 2000) // 2 segundos

    },60000) // 60 segundos

    // Oleada 4
    timeOutOleada4 = setTimeout (() => {
        enemigosSpawnArribaID = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn("arriba");
    
        }, 2000) // 2 segundos

    },90000) // 90 segundos

    // Oleada 5
    timeOutOleada5 = setTimeout (() => {
        // Detenemos el primer intervalo para reiniciar oleada con spawn de menor tiempo
        clearInterval(enemigosSpawnDerechaID);
        clearInterval(enemigosSpawnIzquierdaID);

        enemigosSpawnDerechaID = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn("derecha");
    
        }, 2000) // 2 segundos

        enemigosSpawnIzquierdaID = setInterval( () => {
            //Enemigo Spawnea
            enemigoSpawn("izquierda");
    
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
        gameScreenNode.style.display = "flex";
        legolasObj = null;
        orkNormalArray = [];
        gameInvertalID = null;
        enemigosSpawnID = [];
        timerID = null;
        cronometro = 0;
        enemigosSpawnArribaID = null;
        enemigosSpawnAbajoID = null;
        enemigosSpawnDerechaID = null;
        enemigosSpawnIzquierdaID = null;
        timeOutOleada2 = null;
        timeOutOleada3 = null;
        timeOutOleada4 = null;
        timeOutOleada5 = null;
        totalOrcosMuertos = 0;
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

    flechaArray.forEach((cadaFlecha) => {
        cadaFlecha.movimientoFlecha();
    })

    legolasObj.movimientoLegolas();
    enemigoDespawn();
    checkColisionLegolasOrkos();
    checkColisionFlechasOrkos();
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


// COLISIONES 

function checkColisionLegolasOrkos() {
    orkNormalArray.forEach((cadaOrko) => { 
    if (
        (cadaOrko.x + 10 < legolasObj.x + legolasObj.w)  &&
        (cadaOrko.x + cadaOrko.w > 10 + legolasObj.x) &&
        (cadaOrko.y + 10 < legolasObj.y + legolasObj.h) &&
        (cadaOrko.y + cadaOrko.h > 10 + legolasObj.y)
      ) {
        // Collision detected!
        //console.log("COLISION!!!");
        gameOver();

      }

    })
}

function checkColisionFlechasOrkos() {
    orkNormalArray.forEach((cadaOrko, indiceOrko) => { 
        flechaArray.forEach((cadaFlecha, indiceFlecha) => {

        
            if (
                (cadaOrko.x + 10 < cadaFlecha.x + cadaFlecha.w)  &&
                (cadaOrko.x + cadaOrko.w > 10 + cadaFlecha.x) &&
                (cadaOrko.y + 10 < cadaFlecha.y + cadaFlecha.h) &&
                (cadaOrko.y + cadaOrko.h > 10 + cadaFlecha.y)
            ) {
                // Collision detected!
                console.log("COLISION FLECHA CON ORKO!!");
                
                // Eliminamos al Orko
                cadaOrko.node.remove();
                orkNormalArray.splice(indiceOrko, 1);
                totalOrcosMuertos += 1;

                // Eliminamos la Flecha
                cadaFlecha.node.remove();
                flechaArray.splice(indiceFlecha,1);
            }
          })
        })
}

function gameOver() {
    // Detenemos TODOS los intervalos
    clearTimeout();
    clearInterval(gameIntervalID);
    clearInterval(timerID);
    clearInterval(enemigosSpawnDerechaID);
    clearInterval(enemigosSpawnIzquierdaID);
    clearInterval(enemigosSpawnArribaID);
    clearInterval(enemigosSpawnAbajoID);
    clearTimeout(timeOutOleada2);
    clearTimeout(timeOutOleada3);
    clearTimeout(timeOutOleada4);
    clearTimeout(timeOutOleada5);
    

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


        // Añadimos debajo los Orcos que ha eliminado el jugador durante la partida.
        orcosEliminadosNode.innerText = `Has conseguido eliminar a ${totalOrcosMuertos} orcos. ¡Eres una máquina de matar orcos!`;

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


/*
function movimientoLegolas () {
    if(legolasObj.isMovingRight) {
        console.log("Entramos en MovingRigth")
        if((this.x + this.w +5) <= gameBoxNode.offsetWidth) {
            this.x += this.speed;
            this.node.style.left = `${this.x}px`;
            }
    }

    if(legolasObj.isMovingLeft) {
        if(this.x -5 >= 0) {
            this.x -= this.speed;
            this.node.style.left = `${this.x}px`;
        }
    }

    if(legolasObj.isMovingUp) {
        if(this.y - 5 >= 0) {
            this.y -= this.speed;
            this.node.style.top = `${this.y}px`;
        }
    }

    if(legolasObj.isMovingDown) {
        if((this.y + this.h + 5) <= gameBoxNode.offsetHeight) {
            this.y += this.speed;
            this.node.style.top = `${this.y}px`;
        }
    }

}*/



window.addEventListener("keydown", (event) => {
    if (event.code === "KeyD") {
        legolasObj.isMovingRight = true;
    }
    if (event.code === "KeyA") {
        legolasObj.isMovingLeft = true;
    }    
    if (event.code === "KeyS") {
        legolasObj.isMovingDown = true
    }    
    if (event.code === "KeyW") {
        legolasObj.isMovingUp = true;
    }
})

window.addEventListener("keyup", (event) => {
    if (event.code === "KeyD")
        legolasObj.isMovingRight = false;
    if (event.code === "KeyA")
        legolasObj.isMovingLeft = false;
    if (event.code === "KeyS")
        legolasObj.isMovingDown = false
    if (event.code === "KeyW")
        legolasObj.isMovingUp = false;
})


// Disparo de flechas

gameBoxNode.addEventListener("click", (event) => {
    // Creamos la flecha y la ponemos en el Array
    //console.log(event)
    
    
    if(legolasObj.canShoot) {
        let posicionFlechaX = event.offsetX
        let posicionFlechaY = event.offsetY
        
        let anguloDisparo = Math.atan2(posicionFlechaY - legolasObj.y, posicionFlechaX - legolasObj.x);

        let flechaObj = new Flecha(legolasObj.x, legolasObj.y, anguloDisparo);
        //let flechaObj = new Flecha(event.clientX, event.clientY,anguloDisparo);
        flechaArray.push(flechaObj);

        legolasObj.actualizarBarraDisparo();

        legolasObj.canShoot = false;
        setTimeout(() => {
            legolasObj.canShoot = true;
        },2000) // 2 segundos de delay entre cada disparo
    }
})

    

/*
window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && legolasObj.canShoot) {
        let flechaObj = new Flecha(legolasObj.x, legolasObj.y);
        flechaArray.push(flechaObj);
        legolasObj.canShoot = false;
        setTimeout(() => {
            legolasObj.canShoot = true;
        },2000) // 2 segundos de delay entre cada disparo
    }

    
})
*/



