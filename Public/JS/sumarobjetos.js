function guardarProgreso(progreso, estado) {

    fetch("../ConfigPHP/guardar_progreso.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_actividad: 10,
            progreso: progreso,
            estado: estado
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Progreso guardado:", data);
    })
    .catch(error => {
        console.error("Error al guardar progreso:", error);
    });
}


const alertaFinal = document.getElementById("finish");
const botonFinal = document.getElementById("botonFinal");


function mostrarAlertaFinal() {

    alertaFinal.classList.add("show");

}


botonFinal.addEventListener("click", function () {

    window.location.href = "niveles.html";

});


const objetos = [
    "🚗",
    "🧸",
    "🍌",
    "🍎",
    "🐶",
    "🦖",
    "🎈"
];


const grupos = [
    ["🚗", "🏎️", "🚙", "🚌"],
    ["🦖", "🦕"],
    ["🍎", "🍌", "🍓", "🍊"],
    ["🐶", "🐱", "🦁", "🦊"],
    ["🎈", "🚀", "⚽", "🧸"]
];


let ronda = 1;
let cantidad = 0;
let puntos = 0;
let respondido = false;
let pistaMostrada = false;


guardarProgreso(0, "sin iniciar");


function generarPregunta() {

    respondido = false;
    pistaMostrada = false;

    const mensaje = document.getElementById("feedback-badge");

    mensaje.className = "mensaje oculto";
    mensaje.innerText = "";

    let elementos = [];


    if (ronda <= 3) {

        cantidad = Math.floor(Math.random() * 3) + 2;

        const objeto =
            objetos[Math.floor(Math.random() * objetos.length)];

        for (let i = 0; i < cantidad; i++) {

            elementos.push(objeto);

        }

    }

    else if (ronda <= 6) {

        cantidad = Math.floor(Math.random() * 4) + 4;

        const grupo =
            grupos[Math.floor(Math.random() * grupos.length)];

        for (let i = 0; i < cantidad; i++) {

            elementos.push(
                grupo[Math.floor(Math.random() * grupo.length)]
            );

        }

    }

    else {

        cantidad = Math.floor(Math.random() * 4) + 6;

        const grupo =
            grupos[Math.floor(Math.random() * grupos.length)];

        for (let i = 0; i < cantidad; i++) {

            elementos.push(
                grupo[Math.floor(Math.random() * grupo.length)]
            );

        }

    }


    mostrarObjetos(elementos);
    generarOpciones(cantidad);
}


function mostrarObjetos(elementos) {

    const contenedor =
        document.getElementById("items-container");

    contenedor.innerHTML = "";

    elementos.forEach((elemento, indice) => {

        const caja = document.createElement("div");

        caja.className = "item";


        const objeto = document.createElement("div");

        objeto.className = "objeto animar";

        objeto.innerText = elemento;

        objeto.style.animationDelay =
            `${indice * 0.05}s`;


        objeto.onclick = () => {

            marcarObjeto(caja, indice + 1);

        };


        caja.appendChild(objeto);

        contenedor.appendChild(caja);

    });

}


function generarOpciones(respuesta) {

    const contenedor =
        document.getElementById("options-container");

    contenedor.innerHTML = "";

    const opciones = new Set();

    opciones.add(respuesta);


    while (opciones.size < 4) {

        const cambio =
            Math.floor(Math.random() * 5) - 2;

        const numero = respuesta + cambio;


        if (
            numero >= 1 &&
            numero <= 10 &&
            numero !== respuesta
        ) {

            opciones.add(numero);

        }

    }


    const mezcladas =
        Array.from(opciones).sort(() => Math.random() - 0.5);


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


function marcarObjeto(caja, numero) {

    let etiqueta =
        caja.querySelector(".numero");


    if (!etiqueta) {

        etiqueta =
            document.createElement("span");

        etiqueta.className = "numero";

        etiqueta.innerText = numero;

        caja.appendChild(etiqueta);


        const objeto =
            caja.querySelector(".objeto");

        objeto.style.transform = "scale(1.2)";


        setTimeout(() => {

            objeto.style.transform = "scale(1)";

        }, 200);

    }

}


function comprobar(numero, boton) {

    if (respondido) {

        return;

    }


    const mensaje =
        document.getElementById("feedback-badge");


    if (numero === cantidad) {

        respondido = true;

        boton.classList.add("bien");

        puntos++;


        document.getElementById("score-text").innerText =
            puntos;


        const elementos =
            document.querySelectorAll(".item");


        elementos.forEach((elemento, indice) => {

            marcarObjeto(elemento, indice + 1);

        });


        mensaje.innerText =
            translate("countVisual.feedback.correct");

        mensaje.className =
            "mensaje correcto";

        ronda++;


        const progreso =
            Math.round(((ronda - 1) / 9) * 100);


        if (ronda <= 9) {

            guardarProgreso(
                progreso,
                "en proceso"
            );

        }


        setTimeout(() => {

            if (ronda > 9) {

                guardarProgreso(
                    100,
                    "completado"
                );

                mostrarFinal();

            } else {

                generarPregunta();

            }

        }, 1300);


    }

    else {

        mostrarPista();

    }

}


function mostrarPista() {

    if (pistaMostrada) {

        return;

    }

    pistaMostrada = true;


    const mensaje =
        document.getElementById("feedback-badge");


    mensaje.innerText =
        translate("countVisual.feedback.hint");

    mensaje.className =
        "mensaje";


    const elementos =
        document.querySelectorAll(".item");


    elementos.forEach((elemento, indice) => {

        setTimeout(() => {

            marcarObjeto(
                elemento,
                indice + 1
            );


            const objeto =
                elemento.querySelector(".objeto");


            objeto.classList.add("brillo");

        }, indice * 250);

    });

}


function mostrarFinal() {

    const alertaFinal =
        document.getElementById("finish");

    if (alertaFinal) {

        alertaFinal.classList.add("show");

        // Aplicar las traducciones al mensaje final
        applyTranslations(alertaFinal);

    }

}


function resetGame() {

    ronda = 1;

    puntos = 0;

    respondido = false;

    pistaMostrada = false;


    document.getElementById("score-text").innerText =
        "0";


    if (alertaFinal) {

        alertaFinal.classList.remove("show");

    }


    generarPregunta();

}


window.onload = generarPregunta;