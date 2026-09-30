const nombreUsuario = document.getElementById("nombreUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const cantidadHijos = document.getElementById("hijos");

const botonCerrar = document.getElementById("botonCerrar");

botonCerrar.addEventListener("click", function () {

    window.location.href = "../ConfigPHP/cerrar_sesion.php";

});

function cargarPerfilPadre() {

    fetch("../ConfigPHP/obtener_perfil_padre.php")

        .then(respuesta => respuesta.json())

        .then(datos => {

            console.log("RESPUESTA DEL PERFIL:", datos);

            if (!datos.success) {

                console.error(datos.mensaje);

                nombreUsuario.textContent = "No disponible";
                correoUsuario.textContent = "No disponible";
                cantidadHijos.textContent = "0";

                return;
            }

            const usuario = datos.usuario;

            nombreUsuario.textContent = usuario.nombre;

            correoUsuario.textContent = usuario.correo;

            cantidadHijos.textContent = usuario.total_hijos;

        })

        .catch(error => {

            console.error(
                "Error al cargar perfil:",
                error
            );

        });
}

cargarPerfilPadre();

function cargarPerfilPadre() {

    fetch("../ConfigPHP/obtener_perfil_padre.php")

        .then(respuesta => {
            console.log("Estado HTTP:", respuesta.status);

            return respuesta.text();
        })

        .then(texto => {

            console.log("RESPUESTA PHP:", texto);

            try {

                const datos = JSON.parse(texto);

                console.log("JSON:", datos);

                if (!datos.success) {

                    console.error("PHP respondió con error:", datos.mensaje);

                    nombreUsuario.textContent = "Error";

                    cantidadHijos.textContent = "0";

                    return;
                }

                const usuario = datos.usuario;

                nombreUsuario.textContent = usuario.nombre;

                correoUsuario.textContent = usuario.correo;

                cantidadHijos.textContent = usuario.total_hijos;

            }

            catch (error) {

                console.error("El PHP NO devolvió JSON válido.");
                console.error(error);

            }

        })

        .catch(error => {

            console.error("Error en fetch:", error);

        });
}


botonCerrar.addEventListener("click", function () {

    window.location.href =
        "../ConfigPHP/cerrar_sesion.php";

});


cargarPerfilPadre();

volverNiveles.addEventListener("click", function(evento) {

    evento.preventDefault();

    window.location.href = "niveles.html";

});

cargarPerfilPadre();
