

# THE LAST OF LEGOLAS

## [Play the Game!](https://juanmarin129.github.io/the-last-of-legolas/)




# Description

¡Los orcos tienen rodeado a Legolas! Pero como es un elfo tan molón seguro que sale con vida. Sobrevive todo el tiempo que puedas a oleadas de orcos con tu arco y un escudo mágico.


# Main Functionalities

- El jugador puede mover al personaje con las teclas WASD de una forma fluida.
- El jugador puede apuntar y disparar con el ratón.
- Existe un delay entre disparo y disparo. Es el tiempo que tarda en recargar la flecha el personaje.
- El objetivo es aguantar el máximo tiempo posible sin que te maten.
- Los enemigos se desplazan de forma horizontal o vertical. Aparecen desde los 4 puntos cardinales (norte, sur, este, oeste).
- El jugador debe evitar cualquier contacto con el enemigo. Un sólo toque y se acabó la partida.
- Los enemigos tienen una probabilidad de que tengan un prisionero. Si matas al orco, el prisionero te dará las gracias.
- Los prisioneros sueltan una armadura mágica que le otorga al jugador un escudo.
- El escudo mágico permite que el jugador pueda aguantar un golpe más. Si un enemigo le golpea, perderá el escudo en vez de la partida.
- Los enemigos aparecen en oleadas, cada vez con más frecuencia conforme va transcurriendo el tiempo.
- El mejor tiempo que un jugador consigue se guarda para futuras partidas.
- El jugador puede conocer cuántos orcos ha eliminado con su arco.


# Backlog Functionalities

- Añadir distintos tipos de enemigos para dar más variedad y mecánicas distintas.
- Añadir otros loots que puedan soltar los prisioneros. Mejoras del tipo disparar más rápido o disparo múltiple.
- Distintos mensajes dependiendo de la cantidad de orcos que hayas eliminado.
- Una tabla de clasificación con los mejores tiempos.
- El jugador puede introducir su nombre y luego asociar dicho nombre a su marca.

# Technologies used

- HTML
- CSS
- Javascript
- Manipulación del DOM
- JS Clases
- setInterval y setTimeout de JS
- JS Audio, JS Video y JS Imágenes

# States

- Start Game
- Game Screen
- Game Over Screen

# Proyect Structure


## main.js

- StarGame();
- GameLoop();
- RestartGame();
- GameOver();
- StartCronometro();
- EnemigoSpawn();
- EnemigoDespawn();
- checkColisionLegolasOrkos();
- checkColisionFlechasOrkos();
- checkColisionLegolasArmadura();
- actualizarPuntuacion();
- formatoMinutosSegundos();
- legolasObj;
- armaduraObj;
- prisioneroObj;
- orkNormalArray;
- flechaArray;
- gameInvertalID;
- enemigosSpawnArribaID;
- enemigosSpawnAbajoID;
- enemigosSpawnDerechaID;
- enemigosSpawnIzquierdaID;
- timeOutOleada2;
- timeOutOleada3;
- timeOutOleada4;
- timeOutOleada5;
- timerID;
- cronometro;
- mejorPuntuacion;
- totalOrcosMuertos;
- invulnerable;
- prisioneroActivo;

## enemigo.js

- Enemigo () {
    this.w;
    this.h;
    this.speed;
}
- movimientoAutomatico();
- sonidoOrkoEliminado();

## Player.js 

- Player () {
    this.x;
    this.y;
    this.w;
    this.h;
    this.speed;
    this.isMovingRight;
    this.isMovingLeft;
    this.isMovingUp;
    this.isMovingDown;
    this.canShoot;
    this.hasMagicShield;
}
- movimientoLegolas()
- actualizarBarraDisparo()
- sonidoDisparoFlecha()
- actualizarMagicShield()
- hitLegolas()

## Disparo.js

- Disparo () {
    this.x;
    this.y;
    this.angulo;
    this.w;
    this.h;
    this.speed;
    this.dx;
    this.dy;
}


## Armor.js

- Armor () {
    this.x;
    this.y; 
    this.w;
    this.h;
}

## Prisionero.js

- Prisionero() {
    this.x;
    this.y;
    this.w;
    this.h;
}

# Extra Links 

### Sketch
[Link](https://excalidraw.com/#json=NR6b7avPNGlNlzYVuiDk2,uA8DhNcLHZPTL_bpSKbafA)

## Deploy
[Link](https://juanmarin129.github.io/the-last-of-legolas/)
