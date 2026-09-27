const sidebar = document.getElementById("sidebar");
const boton = document.getElementById("toggleBtn");


// ==========================================
// ABRIR / CERRAR SIDEBAR
// ==========================================

if (sidebar && boton) {

    boton.addEventListener("click", () => {

        sidebar.classList.toggle("cerrado");

        if (sidebar.classList.contains("cerrado")) {
            boton.innerHTML = "❯";
        } else {
            boton.innerHTML = "❮";
        }

    });

}


// ==========================================
// IR A NIVELES SEGÚN EL HIJO
// ==========================================

const btnNiveles = document.getElementById("btnNiveles");

if (btnNiveles) {

    btnNiveles.addEventListener("click", (e) => {

        e.preventDefault();

        fetch("../ConfigPHP/obtener_perfil_hijo.php")

            .then(respuesta => respuesta.json())

            .then(datos => {

                if (!datos.success) {

                    console.error(datos.mensaje);

                    return;
                }


                const estilo =
                    datos.hijo.estilo_aprendizaje;


                if (estilo === "Visual") {

                    window.location.href =
                        "niveles.html";

                }

                else if (estilo === "Auditivo") {

                    window.location.href =
                        "niveles_auditivo.html";

                }

                else if (estilo === "Kinestesico") {

                    window.location.href =
                        "niveles_kinestesico.html";

                }

                else {

                    console.error(
                        "El hijo no tiene un estilo de aprendizaje definido."
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

}