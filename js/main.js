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
mejorPuntuacionNode.style.marginTop = "120px";
const orcosEliminadosNode = document.querySelector("#orcos-eliminados");
orcosEliminadosNode.style.marginBottom = "20px";


// MÚSICA Y EFECTOS
const battleTheme = new Audio('./music/battle_theme_01.mp3');
battleTheme.volume = 0.02;
battleTheme.loop = true;
const magicShieldSound = new Audio('./music/magic_shield_sound_01.mp3');
magicShieldSound.volume = 0.02;
magicShieldSound.loop = true;
const musicIntro = new Audio('./music/the_last_of_legolas_theme_01.mp3');
musicIntro.volume = 0.05;
const zenkiuSound = new Audio('./music/zenkiu_01.mp3');
zenkiuSound.volume = 0.08;
const waaaghSound = new Audio('./music/waaagh_sound.mp3');
waaaghSound.volume = 0.05;
const disparoFlecha01 = new Audio('./music/disparo_flecha_01.mp3');
const disparoFlecha02 = new Audio('./music/disparo_flecha_02.mp3');
const disparoFlecha03 = new Audio('./music/disparo_flecha_03.mp3');
const disparoFlecha04 = new Audio('./music/disparo_flecha_04.mp3');
const disparoFlecha05 = new Audio('./music/disparo_flecha_05.mp3');
disparoFlecha01.volume = 0.10;
disparoFlecha02.volume = 0.10;
disparoFlecha03.volume = 0.10;
disparoFlecha04.volume = 0.10;
disparoFlecha05.volume = 0.10;
const orkoEliminado01 = new Audio('./music/orko_death_01.mp3');
const orkoEliminado02 = new Audio('./music/orko_death_02.mp3');
const orkoEliminado03 = new Audio('./music/orko_death_03.mp3');
orkoEliminado01.volume = 0.04;
orkoEliminado02.volume = 0.04;
orkoEliminado03.volume = 0.04;


// VARIABLES GLOBALES

gameOverScreenNode.style.display = "none";
let legolasObj = null;
let armaduraObj = null;
let prisioneroObj = null;
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
let invulnerable = false;
let prisioneroActivo = false;




// FUNCIONES DEL JUEGO

function startGame () {
    // Ocultar pantalla inicial
    startScreenNode.style.display = "none";

    // Mostrar pantalla del juego
    gameScreenNode.style.display = "flex";

    // Música
    battleTheme.currentTime = 0;
    battleTheme.play();

    // Creamos a Legolas
    legolasObj = new Legolas();
    //console.log(legolasObj);

    //prisioneroObj = new Prisionero();

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
        waaaghSound.play();

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
        gameBoxNode.innerHTML = null;
    
        // Reiniciamos las variables a su modo inicio
        gameOverScreenNode.style.display = "none";
        gameScreenNode.style.display = "flex";
        legolasObj = null;
        armaduraObj = null;
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
       
        // Mostramos el cronometro en minutos y segundos
        let actualTiempo = formatoMinutosSegundos(cronometro);
        tiempoTranscurridoContenedor.innerText = `Tiempo Transcurrido: ${actualTiempo[0]}:${actualTiempo[1]}`;

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
    if(!invulnerable) {
        checkColisionLegolasOrkos();
    }
    
    checkColisionFlechasOrkos();
    checkColisionLegolasArmadura();
}

function enemigoSpawn(spawn) {

    let orkNormalObj = new Enemigo(spawn);
    orkNormalArray.push(orkNormalObj);
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
        
        // Nos quitan el Escudo Mágico y tenemos unos segundos de Invul para alejarnos del enemigo
        if(legolasObj.hasMagicShield) {
            legolasObj.hasMagicShield = false;
            legolasObj.actualizarMagicShield();
            magicShieldSound.pause();
            console.log("TE QUITARON EL ESCUDO MAGICO");
            legolasObj.hitLegolas();
            invulnerable = true;
            setTimeout( () => {
                invulnerable = false;
            },3000) // 3 segundos
        }

        else {
            gameOver();
        }
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

                // Liberamos prisionero
                if(!prisioneroActivo) {
                    // Generamos un número aleatorio para dar un 20% de probabilidad de que un Orko suelte a un prisionero
                    let randomNumber = Math.floor((Math.random() * 10) +1);
                    if(randomNumber >=8) {
                        prisioneroObj = new Prisionero(cadaOrko.x,cadaOrko.y -50);
                        prisioneroActivo = true;
                        zenkiuSound.play();

                        // Sacamos el loot
                        setTimeout( () => {
                            armaduraObj = new Armor(prisioneroObj.x + 95,prisioneroObj.y + 95);
                        },2250)

                        // Quitamos al prisionero
                        setTimeout(() => {
                            prisioneroObj.node.remove();
                            prisioneroObj = null;
                            prisioneroActivo = false; // Evitamos que salga más de un prisionero en pantalla
                            

                        },3000) // 3 segundos
                    }
                }


                // Eliminamos al Orko
                cadaOrko.sonidoOrkoEliminado();
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

function checkColisionLegolasArmadura() {

    
    if(armaduraObj !== null) {
        if (
            (armaduraObj.x < legolasObj.x + legolasObj.w)  &&
            (armaduraObj.x + armaduraObj.w > legolasObj.x) &&
            (armaduraObj.y < legolasObj.y + legolasObj.h) &&
            (armaduraObj.y + armaduraObj.h > legolasObj.y)
        ) {
            // Activa el Escudo Mágico
            legolasObj.hasMagicShield = true;
            legolasObj.actualizarMagicShield();
            magicShieldSound.play();

            // Borramos nodo y ponemos a null para que no siga haciendo el checking
            armaduraObj.node.remove();
            armaduraObj = null;
        }
    }

}
// Cuando volvamos a crear la armaduraObj, dejará de ser null y volverá a realizar la comprobación


// PANTALLA FINAL

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

    // Detenemos música de combate
    battleTheme.pause();
    

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

        localStorage.setItem(mejorPuntuacion, cronometro);

        // Añadimos el nuevo marcador al HTML

        mejorCrono = formatoMinutosSegundos(localStorage.getItem(mejorPuntuacion))
        mejorPuntuacionNode.innerText = `¡Felicidades! Has mejorado tu mejor tiempo. Ahora es: ${mejorCrono[0]}:${mejorCrono[1]}`;
    }
    else {

        // Mostramos el tiempo actual y el mejor tiempo conseguido hasta ahora

        cronoActual = formatoMinutosSegundos(cronometro);
        mejorCrono = formatoMinutosSegundos(localStorage.getItem(mejorPuntuacion));

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
 
    if(legolasObj.canShoot) {
        let posicionFlechaX = event.offsetX
        let posicionFlechaY = event.offsetY
        
        let anguloDisparo = Math.atan2(posicionFlechaY - legolasObj.y, posicionFlechaX - legolasObj.x);

        let flechaObj = new Flecha(legolasObj.x, legolasObj.y, anguloDisparo);
        flechaArray.push(flechaObj);

        legolasObj.actualizarBarraDisparo();
        legolasObj.sonidoDisparoFlecha();

        legolasObj.canShoot = false;
        setTimeout(() => {
            legolasObj.canShoot = true;
        },2000) // 2 segundos de delay entre cada disparo
    }
})

    




