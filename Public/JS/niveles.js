const niveles = document.querySelectorAll(".nivel");
const continuar = document.querySelector(".continuar");
const cofre = document.querySelector(".cofre");

let progreso = JSON.parse(
    localStorage.getItem("progreso")
) || [];

progreso.forEach(index => {

    if (niveles[index]) {
        niveles[index].classList.add("completado");
    }

});

const cohete = document.getElementById("cohete");


function moverCohete(nivel) {

    if (!cohete || !nivel) return;

    const camino = document.querySelector(".camino");

    if (!camino) return;

    const nivelRect =
        nivel.getBoundingClientRect();

    const caminoRect =
        camino.getBoundingClientRect();

    const anchoCohete =
        cohete.offsetWidth;

    const alturaCohete =
        cohete.offsetHeight;

    const centroX =
        caminoRect.left +
        (caminoRect.width / 2);

    const centroY =
        nivelRect.top +
        (nivelRect.height / 2);

const nuevaX =
    centroX -
    (anchoCohete / 2) +
    window.scrollX +
    30;

    const nuevaY =
        centroY -
        (alturaCohete / 2) +
        window.scrollY;

    cohete.classList.remove("saltando");

    void cohete.offsetWidth;

    cohete.style.left =
        nuevaX + "px";

    cohete.style.top =
        nuevaY + "px";
}

function colocarCanguroInicial() {

    if (!cohete || niveles.length === 0) {
        return;
    }


    let nivelInicial;

    if (progreso.length > 0) {

        const ultimoIndice =
            progreso[progreso.length - 1];

        nivelInicial =
            niveles[ultimoIndice];

    }

    if (!nivelInicial) {

        nivelInicial =
            niveles[niveles.length - 1];

    }

    moverCohete(nivelInicial, false);

}

niveles.forEach((nivel, index) => {

    nivel.addEventListener("click", () => {

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

        if (!nivel.classList.contains("completado")) {

    nivel.classList.add("completado");

    progreso.push(index);

    localStorage.setItem(
        "progreso",
        JSON.stringify(progreso)
    );

    moverCohete(nivel);

    cohete.classList.remove("saltando");

    void cohete.offsetWidth;

    cohete.classList.add("saltando");
}

        moverCohete(nivel);

    });

});

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

function actualizarContador() {

    const total =
        document.querySelectorAll(".completado").length;

    console.log(
        "Niveles completados:",
        total
    );

}

setInterval(actualizarContador, 1000);

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
function colocarCanguroInicial() {
    if (!cohete || niveles.length === 0) return;
    
    let nivelInicial;
    if (progreso.length > 0) {
       
        const ultimoIndice =
            progreso[progreso.length - 1];
        nivelInicial = niveles[ultimoIndice];
    } else {
       
        nivelInicial =
            niveles[niveles.length - 1];
    }
    if (!nivelInicial) return;
   
    moverCohete(nivelInicial);
}

window.addEventListener("load", () => {
   
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "instant"
    });
   
    setTimeout(() => {
        colocarCanguroInicial();
    }, 500);
});

cargarAvatarPerfil();

cargarAvatarPerfil();