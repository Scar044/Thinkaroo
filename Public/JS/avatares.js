const avatares = document.querySelectorAll(".avatar");
const botonSiguiente = document.querySelector("button");

let avatarSeleccionado = null;

avatares.forEach(function(avatar) {

    avatar.addEventListener("click", function() {

        avatares.forEach(function(avatar) {
            avatar.classList.remove("seleccionado");
        });

        avatar.classList.add("seleccionado");

        avatarSeleccionado = avatar.id;

        console.log("Avatar seleccionado:", avatarSeleccionado);
    });

});

botonSiguiente.addEventListener("click", function() {

    if (avatarSeleccionado === null) {

        alert("Selecciona un avatar antes de continuar");

        return;
    }

    fetch("../ConfigPHP/guardarAvatar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: avatarSeleccionado
        })
    })

    .then(respuesta => respuesta.json())

    .then(datos => {

        if (datos.success) {

    console.log(datos.mensaje);

    // Obtener el estilo de aprendizaje del hijo actual
    fetch("../ConfigPHP/obtener_perfil_hijo.php")
        .then(respuesta => respuesta.json())
        .then(perfil => {

            if (!perfil.success) {

                console.error(perfil.mensaje);
                return;

            }

            const estilo =
                perfil.hijo.estilo_aprendizaje;

            console.log(
                "Estilo de aprendizaje:",
                estilo
            );

            if (estilo === "Visual") {

                window.location.href = "niveles.html";

            }
            else if (estilo === "Auditivo") {

                window.location.href = "niveles_auditivo.html";

            }
            else if (estilo === "Kinestesico") {

                window.location.href = "niveles_kinestesico.html";

            }
            else {

                alert(
                    "El estilo de aprendizaje todavía no está definido."
                );

            }

        })
        .catch(error => {

            console.error(
                "Error al obtener el perfil:",
                error
            );

        });

} else {

            alert(datos.mensaje);

        }

    })

    .catch(error => {

        console.error("Error:", error);
        alert("Ocurrió un error al guardar el avatar");

    });

});