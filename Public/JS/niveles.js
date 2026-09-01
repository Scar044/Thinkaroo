// ==========================================
// NIVELES
// ==========================================

const niveles = document.querySelectorAll(".nivel");
const continuar = document.querySelector(".continuar");
const cofre = document.querySelector(".cofre");


// ==========================================
// PROGRESO
// ==========================================

let progreso = JSON.parse(
    localStorage.getItem("progreso")
) || [];


// Marcar niveles completados

progreso.forEach(index => {

    if (niveles[index]) {
        niveles[index].classList.add("completado");
    }

});


// ==========================================
// CANGURO
// ==========================================

const cohete = document.getElementById("cohete");


function moverCohete(nivel) {

    if (!cohete || !nivel) return;

    const camino = document.querySelector(".camino");

    if (!camino) return;

    // ==========================================
    // POSICIÓN DEL NIVEL
    // ==========================================

    const nivelRect =
        nivel.getBoundingClientRect();

    // ==========================================
    // POSICIÓN DEL CAMINO
    // ==========================================

    const caminoRect =
        camino.getBoundingClientRect();

    // ==========================================
    // TAMAÑO DEL CANGURO
    // ==========================================

    const anchoCohete =
        cohete.offsetWidth;

    const alturaCohete =
        cohete.offsetHeight;

    // ==========================================
    // CENTRO HORIZONTAL DEL CAMINO
    // ==========================================

    const centroX =
        caminoRect.left +
        (caminoRect.width / 2);

    // ==========================================
    // CENTRO VERTICAL DEL NIVEL
    // ==========================================

    const centroY =
        nivelRect.top +
        (nivelRect.height / 2);

    // ==========================================
    // POSICIÓN FINAL
    // ==========================================

    const nuevaX =
        centroX -
        (anchoCohete / 2) +
        window.scrollX;

    const nuevaY =
        centroY -
        (alturaCohete / 2) +
        window.scrollY;

    // ==========================================
    // REINICIAR ANIMACIÓN
    // ==========================================

    cohete.classList.remove("saltando");

    void cohete.offsetWidth;

    // ==========================================
    // MOVER CANGURO
    // ==========================================

    cohete.style.left =
        nuevaX + "px";

    cohete.style.top =
        nuevaY + "px";
}


// ==========================================
// COLOCAR CANGURO AL INICIAR
// ==========================================

function colocarCanguroInicial() {

    if (!cohete || niveles.length === 0) {
        return;
    }


    let nivelInicial;


    // ==========================================
    // SI YA EXISTE PROGRESO
    // ==========================================

    if (progreso.length > 0) {

        const ultimoIndice =
            progreso[progreso.length - 1];

        nivelInicial =
            niveles[ultimoIndice];

    }


    // ==========================================
    // SI NO EXISTE PROGRESO
    // EMPEZAR DESDE ABAJO
    // ==========================================

    if (!nivelInicial) {

        nivelInicial =
            niveles[niveles.length - 1];

    }


    // Colocar sin animación

    moverCohete(nivelInicial, false);

}


// ==========================================
// CLIC EN LOS NIVELES
// ==========================================

niveles.forEach((nivel, index) => {

    nivel.addEventListener("click", () => {


        // ======================================
        // ANIMACIÓN DEL NIVEL
        // ======================================

        nivel.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.25)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 300
            }
        );


        // ======================================
        // COMPLETAR NIVEL
        // ======================================

        if (!nivel.classList.contains("completado")) {

    nivel.classList.add("completado");

    progreso.push(index);

    localStorage.setItem(
        "progreso",
        JSON.stringify(progreso)
    );

    // Mover el canguro
    moverCohete(nivel);

    // Hacerlo saltar
    cohete.classList.remove("saltando");

    void cohete.offsetWidth;

    cohete.classList.add("saltando");
}


        // ======================================
        // MOVER CANGURO
        // ======================================

        moverCohete(nivel);

    });

});


// ==========================================
// COFRE
// ==========================================

if (cofre) {

    cofre.addEventListener("click", () => {

        cofre.animate(
            [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-15deg)" },
                { transform: "rotate(15deg)" },
                { transform: "rotate(0deg)" }
            ],
            {
                duration: 500
            }
        );

        alert("🎁 ¡Has abierto un cofre!");

    });

}


// ==========================================
// EFECTO AL PASAR EL RATÓN
// ==========================================

niveles.forEach(nivel => {

    nivel.addEventListener("mouseenter", () => {

        nivel.style.boxShadow =
            "0 0 25px rgba(255,255,255,.8)";

    });


    nivel.addEventListener("mouseleave", () => {

        nivel.style.boxShadow =
            "0 10px 20px rgba(0,0,0,.25)";

    });

});


// ==========================================
// CONTADOR
// ==========================================

function actualizarContador() {

    const total =
        document.querySelectorAll(".completado").length;

    console.log(
        "Niveles completados:",
        total
    );

}

setInterval(actualizarContador, 1000);


// ==========================================
// ANIMACIÓN CONTINUAR
// ==========================================

if (continuar) {

    setInterval(() => {

        continuar.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.08)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 1200
            }
        );

    }, 2500);

}


// ==========================================
// CARGAR AVATAR
// ==========================================

function cargarAvatarPerfil() {

    fetch("../ConfigPHP/obtener_perfil_hijo.php")

        .then(respuesta => respuesta.json())

        .then(datos => {

            console.log(
                "Datos del hijo:",
                datos
            );


            if (!datos.success) {

                console.error(
                    datos.mensaje
                );

                return;

            }


            const avatar =
                document.getElementById(
                    "avatarPerfil"
                );


            if (
                avatar &&
                datos.hijo &&
                datos.hijo.imagen_avatar
            ) {

                avatar.src =
                    datos.hijo.imagen_avatar;

            }

        })

        .catch(error => {

            console.error(
                "Error al cargar el avatar:",
                error
            );

        });

}


// ==========================================
// POSICIÓN INICIAL DEL CANGURO
// ==========================================
function colocarCanguroInicial() {
    if (!cohete || niveles.length === 0) return;
    /*
     * El primer lugar donde debe aparecer
     * el canguro es el último nivel,
     * porque la página comienza visualmente
     * desde la parte inferior.
     */
    let nivelInicial;
    if (progreso.length > 0) {
        /*
         * Si ya existe progreso,
         * buscamos el último nivel completado.
         */
        const ultimoIndice =
            progreso[progreso.length - 1];
        nivelInicial = niveles[ultimoIndice];
    } else {
        /*
         * Si no hay progreso,
         * comienza en el nivel inferior.
         */
        nivelInicial =
            niveles[niveles.length - 1];
    }
    if (!nivelInicial) return;
    /*
     * Calculamos la posición después
     * de que la página ya esté abajo.
     */
    moverCohete(nivelInicial);
}


// ==========================================
// INICIAR PÁGINA
// ==========================================
window.addEventListener("load", () => {
    /*
     * Primero bajamos al final de la página.
     */
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "instant"
    });
    /*
     * Esperamos un poco para que el navegador
     * termine de colocar todos los elementos.
     */
    setTimeout(() => {
        colocarCanguroInicial();
    }, 500);
});


// ==========================================
// INICIAR AVATAR
// ==========================================

cargarAvatarPerfil();

// ==========================================
// INICIAR AVATAR
// ==========================================

cargarAvatarPerfil();