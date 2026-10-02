const logros =
    document.querySelectorAll(".logro");

const logrosDesbloqueados =
    document.getElementById("logros-desbloqueados");

const barraProgreso =
    document.getElementById("barra-progreso");


function actualizarProgreso() {

    const totalLogros = logros.length;

    const completados =
        document.querySelectorAll(
            ".logro.completado"
        ).length;

    logrosDesbloqueados.textContent =
        completados;

    const porcentaje =
        (completados / totalLogros) * 100;

    barraProgreso.style.width =
        porcentaje + "%";
}


actualizarProgreso();


function cargarAvatarPerfil() {

    fetch("../ConfigPHP/obtener_perfil_hijo.php")

        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error(
                    "Error al obtener los datos del hijo."
                );
            }

            return respuesta.json();
        })

        .then(datos => {

            if (!datos.success) {

                console.error(
                    datos.mensaje
                );

                return;
            }

            const avatarPerfil =
                document.getElementById(
                    "avatarPerfil"
                );

            if (!avatarPerfil) {
                return;
            }

            const imagenAvatar =
                datos.hijo.imagen_avatar;

            if (!imagenAvatar) {

                console.warn(
                    "El hijo no tiene un avatar asignado."
                );

                return;
            }

            avatarPerfil.src =
                imagenAvatar;
        })

        .catch(error => {

            console.error(
                "Error al cargar el avatar:",
                error
            );
        });
}


cargarAvatarPerfil();