let ronda = 1;
let cantidad = 0;
let puntos = 0;
let respondido = false;
let reproduciendo = false;


// ========================================
// GENERA UNA NUEVA RONDA
// ========================================

function generarPregunta() {

    respondido = false;
    reproduciendo = false;

    document.getElementById("feedback-badge").className =
        "mensaje oculto";

    document.getElementById("feedback-badge").innerText = "";

    document.getElementById("ondas").classList.add("oculto");

    document.getElementById("play-button").disabled = false;


    // Rondas 1 a 3: 2 a 4 sonidos
    if (ronda <= 3) {

        cantidad =
            Math.floor(Math.random() * 3) + 2;

    }

    // Rondas 4 a 6: 4 a 6 sonidos
    else if (ronda <= 6) {

        cantidad =
            Math.floor(Math.random() * 3) + 4;

    }

    // Rondas 7 a 9: 6 a 8 sonidos
    else {

        cantidad =
            Math.floor(Math.random() * 3) + 6;
    }


    generarOpciones(cantidad);
}


// ========================================
// REPRODUCE LOS SONIDOS
// ========================================

function reproducirSonidos() {

    // Evita reproducir dos veces al mismo tiempo
    if (reproduciendo) {
        return;
    }

    reproduciendo = true;

    const boton =
        document.getElementById("play-button");

    const ondas =
        document.getElementById("ondas");


    boton.disabled = true;

    ondas.classList.remove("oculto");


    let contador = 0;


    // Función interna que reproduce cada sonido
    function reproducirSiguiente() {

        // Terminamos cuando llegamos a la cantidad
        if (contador >= cantidad) {

            reproduciendo = false;

            ondas.classList.add("oculto");

            return;
        }


        // Reproduce un sonido
        reproducirTono();

        contador++;


        // Espera 1.2 segundos antes del siguiente
        setTimeout(reproducirSiguiente, 1200);
    }


    // Comenzar
    reproducirSiguiente();
}


// ========================================
// GENERA EL TONO
// ========================================

function reproducirTono() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    const contexto =
        new AudioContext();


    // Algunos navegadores suspenden el audio
    if (contexto.state === "suspended") {

        contexto.resume();
    }


    const oscilador =
        contexto.createOscillator();

    const ganancia =
        contexto.createGain();


    // Sonido suave y claro
    oscilador.type = "sine";

    // 523 Hz = nota Do
    oscilador.frequency.value = 523;


    const ahora =
        contexto.currentTime;


    // Comienza muy suave
    ganancia.gain.setValueAtTime(
        0.0001,
        ahora
    );


    // Aumenta suavemente el volumen
    ganancia.gain.exponentialRampToValueAtTime(
        0.35,
        ahora + 0.05
    );


    // Mantiene el sonido
    ganancia.gain.setValueAtTime(
        0.35,
        ahora + 0.35
    );


    // Disminuye suavemente
    ganancia.gain.exponentialRampToValueAtTime(
        0.0001,
        ahora + 0.55
    );


    // Conectar
    oscilador.connect(ganancia);

    ganancia.connect(contexto.destination);


    // Iniciar
    oscilador.start(ahora);


    // Duración total del sonido
    oscilador.stop(ahora + 0.6);


    // Cerrar el contexto después
    setTimeout(() => {

        contexto.close();

    }, 700);
}


// ========================================
// GENERA LAS OPCIONES
// ========================================

function generarOpciones(respuesta) {

    const contenedor =
        document.getElementById("options-container");


    contenedor.innerHTML = "";


    const opciones =
        new Set();


    // La respuesta correcta
    opciones.add(respuesta);


    // Crear 3 opciones incorrectas
    while (opciones.size < 4) {

        const cambio =
            Math.floor(Math.random() * 5) - 2;


        const numero =
            respuesta + cambio;


        if (
            numero >= 1 &&
            numero <= 8 &&
            numero !== respuesta
        ) {

            opciones.add(numero);
        }
    }


    // Mezclar opciones
    const mezcladas =
        Array.from(opciones)
            .sort(() => Math.random() - 0.5);


    // Crear botones
    mezcladas.forEach(numero => {

        const boton =
            document.createElement("button");


        boton.innerText = numero;


        boton.onclick = () => {

            comprobar(numero, boton);

        };


        contenedor.appendChild(boton);

    });
}


// ========================================
// COMPRUEBA LA RESPUESTA
// ========================================

function comprobar(numero, boton) {

    // No permitir responder mientras suenan los sonidos
    if (respondido || reproduciendo) {
        return;
    }


    const mensaje =
        document.getElementById("feedback-badge");


    // RESPUESTA CORRECTA
    if (numero === cantidad) {

        respondido = true;

        boton.classList.add("bien");


        puntos++;


        document.getElementById(
            "score-text"
        ).innerText = puntos;


        mensaje.innerText =
            "🎉 ¡MUY BIEN!";


        mensaje.className =
            "mensaje correcto";


        ronda++;


        // Esperar antes de pasar a la siguiente ronda
        setTimeout(() => {

            if (ronda > 9) {

                mostrarFinal();

            } else {

                generarPregunta();

            }

        }, 1300);

    }


    // RESPUESTA INCORRECTA
    else {

        mensaje.innerText =
            "👂 Escuchemos otra vez";


        mensaje.className =
            "mensaje";


        // Permitir volver a escuchar
        document.getElementById(
            "play-button"
        ).disabled = false;
    }
}


// ========================================
// MOSTRAR FINAL
// ========================================

function mostrarFinal() {

    document
        .getElementById("victory-modal")
        .classList.remove("oculto");
}


// ========================================
// REINICIAR JUEGO
// ========================================

function resetGame() {

    ronda = 1;

    puntos = 0;


    document.getElementById(
        "score-text"
    ).innerText = "0";


    document
        .getElementById("victory-modal")
        .classList.add("oculto");


    generarPregunta();
}


// ========================================
// INICIAR JUEGO
// ========================================

window.onload = generarPregunta;