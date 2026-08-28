// ==========================================
// NIVELES
// ==========================================

const niveles = document.querySelectorAll(".nivel");
const continuar = document.querySelector(".continuar");
const cofre = document.querySelector(".cofre");


// ==========================================
// PROGRESO DE LOS NIVELES
// ==========================================

let progreso = JSON.parse(localStorage.getItem("progreso")) || [];

progreso.forEach(index => {

    if (niveles[index]) {
        niveles[index].classList.add("completado");
    }

});


niveles.forEach((nivel, index) => {

    nnivel.addEventListener("click", () => {

        moverCohete(nivel);

        // Animación del nivel

        // Animación del nivel
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


        // Marcar como completado
        if (!nivel.classList.contains("completado")) {

            nivel.classList.add("completado");

            progreso.push(index);

            localStorage.setItem(
                "progreso",
                JSON.stringify(progreso)
            );

        }

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
// CONTADOR DE NIVELES COMPLETADOS
// ==========================================

function actualizarContador() {

    const total =
        document.querySelectorAll(".completado").length;

    console.log("Niveles completados:", total);

}

setInterval(actualizarContador, 1000);


// ==========================================
// ANIMACIÓN DEL BOTÓN CONTINUAR
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
// COHETE
// ==========================================

const cohete = document.getElementById("cohete");

function moverCohete(nivel) {

    if (!cohete) return;

    const y = nivel.offsetTop;
    const alturaNivel = nivel.offsetHeight;
    const alturaCohete = cohete.offsetHeight;

    cohete.classList.add("despegando");

    cohete.style.top =
        (y + alturaNivel / 2 - alturaCohete / 2) + "px";

}


// ==========================================
// COHETE
// ==========================================

const cohete = document.getElementById("cohete");

function moverCohete(nivel) {

    if (!cohete) return;

    const y = nivel.offsetTop;
    const alturaNivel = nivel.offsetHeight;
    const alturaCohete = cohete.offsetHeight;

    cohete.classList.add("despegando");

    cohete.style.top =
        (y + alturaNivel / 2 - alturaCohete / 2) + "px";
}


// ==========================================
// CARGAR AVATAR DEL HIJO ACTUAL
// ==========================================

function cargarAvatarPerfil() {

    fetch("../ConfigPHP/obtener_perfil_hijo.php")

        .then(respuesta => respuesta.json())

        .then(datos => {

            console.log("Datos del hijo:", datos);

            if (!datos.success) {

                console.error(datos.mensaje);
                return;

            }

            const avatar =
                document.getElementById("avatarPerfil");

            if (avatar && datos.hijo.imagen_avatar) {

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
// IR AL FINAL DE LA PÁGINA
// ==========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "instant"
        });

    }, 300);

});


// ==========================================
// INICIAR
// ==========================================

cargarAvatarPerfil();