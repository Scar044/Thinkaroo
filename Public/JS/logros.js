
const logros = document.querySelectorAll(".logro");

const logrosDesbloqueados =
    document.getElementById("logros-desbloqueados");

const barraProgreso =
    document.getElementById("barra-progreso");


/*
Cuenta los logros
*/

function actualizarProgreso() {

    const totalLogros = logros.length;

    const completados =
        document.querySelectorAll(".logro.completado").length;


    /* Mostrar cantidad */

    logrosDesbloqueados.textContent = completados;


    /* Calcular porcentaje */

    const porcentaje =
        (completados / totalLogros) * 100;


    /* Actualizar barra */

    barraProgreso.style.width =
        porcentaje + "%";
}

actualizarProgreso();

// =====================================
// CARGAR AVATAR DEL HIJO ACTUAL
// =====================================

function cargarAvatarPerfil() {

    fetch("../ConfigPHP/obtener_perfil_hijo.php")
        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error("Error al obtener los datos del hijo.");
            }

            return respuesta.json();
        })

        .then(datos => {

            if (!datos.success) {
                console.error(datos.mensaje);
                return;
            }

            // Obtener el elemento de la foto
            const avatarPerfil =
                document.getElementById("avatarPerfil");

            if (!avatarPerfil) {
                return;
            }

            // Obtener la imagen del hijo
            const imagenAvatar =
                datos.hijo.imagen_avatar;

            if (!imagenAvatar) {
                console.warn("El hijo no tiene un avatar asignado.");
                return;
            }

            // Mostrar avatar
            avatarPerfil.src = imagenAvatar;

        })

        .catch(error => {

            console.error(
                "Error al cargar el avatar:",
                error
            );

        });
}


// =====================================
// INICIAR
// =====================================

cargarAvatarPerfil();