const casillas = document.querySelectorAll(".casilla");
const jugadorActualDisplay = document.getElementById("jugadorActual");
const reiniciarBoton = document.getElementById("reiniciar");

let jugadorActual = "x";
let juegoTerminado = false;

function cambiarJugador() {
  jugadorActual = jugadorActual === "x" ? "o" : "x";
  jugadorActualDisplay.textContent = jugadorActual.toUpperCase();
}

function manejarClic(casilla, indice) {
  if (!juegoTerminado && casilla.textContent === "") {
    casilla.classList.add(`jugador-${jugadorActual}`);
    casilla.textContent = jugadorActual;
    verificarGanador();
    cambiarJugador();
  }
}

function verificarGanador() {
  const lineasGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let linea of lineasGanadoras) {
    const [a, b, c] = linea;
    const casillaA = casillas[a];
    const casillaB = casillas[b];
    const casillaC = casillas[c];
    if (
      casillaA.textContent !== "" &&
      casillaA.textContent === casillaB.textContent &&
      casillaA.textContent === casillaC.textContent
    ) {
      casillaA.classList.add("ganadora");
      casillaB.classList.add("ganadora");
      casillaC.classList.add("ganadora");
      juegoTerminado = true;
      mostrarMensaje(`el jugador ${jugadorActual.toUpperCase()} gana`);
      return;
    }
  }

  if (!casillasDisponibles()) {
    juegoTerminado = true;
    mostrarMensaje("empate");
  }
}

function casillasDisponibles() {
  return [...casillas].some(casilla => casilla.textContent === "");
}

function reiniciarJuego() {
  jugadorActual = "x";
  jugadorActualDisplay.textContent = jugadorActual.toUpperCase();
  juegoTerminado = false;
  casillas.forEach(casilla => {
    casilla.textContent = "";
    casilla.classList.remove("jugador-x");
    casilla.classList.remove("jugador-o");
    casilla.classList.remove("ganadora");
  });
  ocultarMensaje();
}

function mostrarMensaje(mensaje) {
  jugadorActualDisplay.textContent = "";
  const mensajeElement = document.createElement("div");
  mensajeElement.classList.add("mensaje");
  mensajeElement.textContent = mensaje;
  document.body.appendChild(mensajeElement);
}

function ocultarMensaje() {
  const mensajeElement = document.querySelector(".mensaje");
  if (mensajeElement) {
    mensajeElement.remove();
  }
}

casillas.forEach((casilla, indice) => {
  casilla.addEventListener("click", () => manejarClic(casilla, indice));
});

reiniciarBoton.addEventListener("click", reiniciarJuego);

ocultarMensaje();
