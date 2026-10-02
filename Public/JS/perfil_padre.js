const nombreUsuario = document.getElementById("nombreUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const cantidadHijos = document.getElementById("hijos");

const botonCerrar = document.getElementById("botonCerrar");
const volverNiveles = document.getElementById("volverNiveles");

function cargarPerfilPadre() {

    fetch("../ConfigPHP/obtener_perfil_padre.php")

        .then(respuesta => {
            console.log("Estado HTTP:", respuesta.status);
            return respuesta.text();
        })

        .then(texto => {

            console.log("RESPUESTA PHP:", texto);

            let datos;

            try {
                datos = JSON.parse(texto);
            } catch (error) {
                console.error("El PHP no devolvió JSON válido.", error);
                nombreUsuario.textContent = translate("profileParent.error");
                correoUsuario.textContent = translate("profileParent.error");
                cantidadHijos.textContent = "0";
                return;
            }

            console.log("JSON:", datos);

            if (!datos.success) {

                console.error("PHP respondió con error:", datos.mensaje);

                nombreUsuario.textContent = translate("profileParent.unavailable");
                correoUsuario.textContent = translate("profileParent.unavailable");
                cantidadHijos.textContent = "0";

                return;
            }

            const usuario = datos.usuario;

            nombreUsuario.textContent = usuario.nombre;
            correoUsuario.textContent = usuario.correo;
            cantidadHijos.textContent = usuario.total_hijos;

        })

        .catch(error => {

            console.error("Error al cargar perfil:", error);

            nombreUsuario.textContent = translate("profileParent.unavailable");
            correoUsuario.textContent = translate("profileParent.unavailable");
            cantidadHijos.textContent = "0";

        });
}


// Cerrar sesión
botonCerrar.addEventListener("click", function () {

    window.location.href = "../ConfigPHP/cerrar_sesion.php";

});


volverNiveles.addEventListener("click", function (evento) {

    evento.preventDefault();

    fetch("../ConfigPHP/obtener_perfil_hijo.php")

        .then(respuesta => respuesta.json())

        .then(datos => {

            if (!datos.success || !datos.hijo) {
                console.error(
                    "No se pudo obtener el perfil del niño:",
                    datos.mensaje
                );
                return;
            }

            const estilo = datos.hijo.estilo_aprendizaje;

            if (estilo === "Visual") {

                window.location.href = "niveles.html";

            } else if (estilo === "Auditivo") {

                window.location.href = "niveles_auditivo.html";

            } else if (estilo === "Kinestesico") {

                window.location.href = "niveles_kinestesico.html";

            } else {

                alert(
                    translate("profile.undefinedLearningStyle")
                );

            }

        })

        .catch(error => {

            console.error(
                "Error al obtener el estilo de aprendizaje:",
                error
            );

        });

});


// Cargar el perfil una sola vez
cargarPerfilPadre();