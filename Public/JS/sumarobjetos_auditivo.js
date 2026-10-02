function guardarProgreso(progreso, estado) {
  fetch("../ConfigPHP/guardar_progreso.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_actividad: 11,
      progreso: progreso,
      estado: estado,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Progreso guardado:", data);
    })
    .catch((error) => {
      console.error("Error al guardar progreso:", error);
    });
}

const alertaFinal = document.getElementById("finish");
const botonFinal = document.getElementById("botonFinal");

function mostrarAlertaFinal() {
  if (alertaFinal) {
    alertaFinal.classList.add("show");
  }
}

if (botonFinal) {
  botonFinal.addEventListener("click", function () {
    window.location.href = "niveles_auditivo.html";
  });
}

let ronda = 1;
let cantidad = 0;
let puntos = 0;
let respondido = false;
let reproduciendo = false;

let contextoAudio = null;

guardarProgreso(0, "sin iniciar");

function obtenerAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!contextoAudio) {
    contextoAudio = new AudioContext();
  }

  return contextoAudio;
}

function generarPregunta() {
  respondido = false;
  reproduciendo = false;

  const mensaje = document.getElementById("feedback-badge");

  const ondas = document.getElementById("ondas");

  const boton = document.getElementById("play-button");

  mensaje.className = "mensaje oculto";
  mensaje.innerText = "";

  ondas.classList.add("oculto");

  boton.disabled = false;

  if (ronda <= 3) {
    cantidad = Math.floor(Math.random() * 3) + 2;
  } else if (ronda <= 6) {
    cantidad = Math.floor(Math.random() * 3) + 4;
  } else {
    cantidad = Math.floor(Math.random() * 3) + 6;
  }

  generarOpciones(cantidad);
}

async function reproducirSonidos() {
  if (reproduciendo) {
    return;
  }

  reproduciendo = true;
  respondido = false;

  const boton = document.getElementById("play-button");

  const ondas = document.getElementById("ondas");

  boton.disabled = true;
  ondas.classList.remove("oculto");

  try {
    const contexto = obtenerAudioContext();

    if (contexto.state === "suspended") {
      await contexto.resume();
    }

    for (let i = 0; i < cantidad; i++) {
      await reproducirTono();

      if (i < cantidad - 1) {
        await esperar(700);
      }
    }
  } finally {
    reproduciendo = false;

    ondas.classList.add("oculto");
  }
}

function esperar(milisegundos) {
  return new Promise((resolve) => {
    setTimeout(resolve, milisegundos);
  });
}

function reproducirTono() {
  return new Promise((resolve) => {
    const contexto = obtenerAudioContext();

    const oscilador = contexto.createOscillator();

    const ganancia = contexto.createGain();

    oscilador.type = "sine";

    oscilador.frequency.setValueAtTime(523, contexto.currentTime);

    const ahora = contexto.currentTime;

    ganancia.gain.setValueAtTime(0.0001, ahora);

    ganancia.gain.exponentialRampToValueAtTime(0.35, ahora + 0.05);

    ganancia.gain.setValueAtTime(0.35, ahora + 0.3);

    ganancia.gain.exponentialRampToValueAtTime(0.0001, ahora + 0.5);

    oscilador.connect(ganancia);

    ganancia.connect(contexto.destination);

    oscilador.start(ahora);

    oscilador.stop(ahora + 0.55);

    oscilador.onended = () => {
      oscilador.disconnect();

      ganancia.disconnect();

      resolve();
    };
  });
}

function generarOpciones(respuesta) {
  const contenedor = document.getElementById("options-container");

  if (!contenedor) {
    console.error("No se encontró #options-container");

    return;
  }

  contenedor.innerHTML = "";

  const numeros = [];

  for (let i = 1; i <= 8; i++) {
    if (i !== respuesta) {
      numeros.push(i);
    }
  }

  numeros.sort(() => Math.random() - 0.5);

  const opciones = [respuesta, numeros[0], numeros[1], numeros[2]];

  opciones.sort(() => Math.random() - 0.5);

  opciones.forEach((numero) => {
    const boton = document.createElement("button");

    boton.type = "button";

    boton.innerText = numero;

    boton.onclick = function () {
      comprobar(numero, boton);
    };

    contenedor.appendChild(boton);
  });
}

function comprobar(numero, boton) {
  if (reproduciendo) {
    return;
  }

  if (respondido) {
    return;
  }

  const mensaje = document.getElementById("feedback-badge");

  if (numero === cantidad) {
    respondido = true;

    boton.classList.add("bien");

    puntos++;

    document.getElementById("score-text").innerText = puntos;

    mensaje.innerText = translate("countAuditory.feedback.correct");

    mensaje.className = "mensaje correcto";

    ronda++;

    const progreso = Math.round(((ronda - 1) / 9) * 100);

    if (ronda <= 9) {
      guardarProgreso(progreso, "en proceso");
    }

    setTimeout(() => {
      if (ronda > 9) {

        guardarProgreso(100, "completado");

        mostrarFinal();
      } else {
        generarPregunta();
      }
    }, 1300);
  } else {
    mensaje.innerText = translate("countAuditory.feedback.tryAgain");

    mensaje.className = "mensaje";

    document.getElementById("play-button").disabled = false;
  }
}

function mostrarFinal() {
  const finish = document.getElementById("finish");

  if (!finish) {
    console.error("ERROR: No se encontró #finish");

    return;
  }

  const mensaje = document.getElementById("feedback-badge");

  if (mensaje) {
    mensaje.className = "mensaje oculto";

    mensaje.innerHTML = "";
  }

  const opciones = document.getElementById("options-container");

  if (opciones) {
    opciones.innerHTML = "";
  }

  const titulo = document.getElementById("mensaje-final-titulo");

  const texto = document.getElementById("mensaje-final-texto");

  if (titulo) {
    titulo.textContent = translate("countAuditory.finishTitle");
  }

  if (texto) {
    texto.innerHTML = translate("countAuditory.finishDescription");
  }

  finish.classList.add("show");

  const boton = document.getElementById("botonFinal");

  if (boton) {
    boton.onclick = function () {
      window.location.href = "niveles_auditivo.html";
    };
  }

  console.log("PANTALLA FINAL CORRECTA");
}

function resetGame() {
  ronda = 1;

  cantidad = 0;

  puntos = 0;

  respondido = false;

  reproduciendo = false;

  document.getElementById("score-text").innerText = "0";

  const victoria = document.getElementById("victory-modal");

  if (victoria) {
    victoria.classList.add("oculto");
  }

  if (alertaFinal) {
    alertaFinal.classList.remove("show");
  }

  generarPregunta();
}

window.addEventListener("load", generarPregunta);
