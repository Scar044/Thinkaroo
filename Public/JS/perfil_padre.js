const usuario = 
document.getElementById("nombreUsuario");  


// ==========================================
// CARGAR DATOS DEL USUARIO
// ==========================================

function cargarPerfilPadre() {

    fetch("../ConfigPHP/obtener_perfil_padre.php")

        .then(respuesta => respuesta.json())

        .then(datos => {

            console.log(
                "RESPUESTA DEL PERFIL:",
                datos
            );


            if (!datos.success) {

                console.error(
                    datos.mensaje
                );

                return;
            }


            const usuario = datos.usuario;


            // ==================================
            // NOMBRE
            // ==================================

            document.getElementById("nombreUsuario"
            ).textContent = usuario.nombre;


            usuario.textContent =
                usuario.nombre;


            // ==================================
            // Hijos
            // ==================================

            document.getElementById(
                "hijos"
            ).textContent =
                usuario.total_hijos;


            // ==================================
            // MOSTRAR INFORMACIÓN EN CONSOLA
            // ==================================

            console.log(
                "ID del usuario:",
                usuario.id_usuario
            );

            console.log(
                "Nombre:",
                usuario.nombre
            );

            console.log(
                "Hijos:",
                usuario.total_logros
            );

        })

        .catch(error => {

            console.error(
                "Error al cargar perfil:",
                error
            );

        });

}

function cargarHijos() {

    fetch("../ConfigPHP/obtener_hijos.php")

        .then(respuesta =>
            respuesta.json()
        )

        .then(datos => {

            if (!datos.success) {

                console.error(
                    datos.mensaje
                );

                return;
            }


            listaHijos.innerHTML = "";


            datos.hijos.forEach(hijo => {

                const boton =
                    document.createElement(
                        "button"
                    );


                boton.classList.add(
                    "hijo"
                );


                boton.textContent =
                    hijo.nombre;


                boton.dataset.id =
                    hijo.id_hijo;


                boton.addEventListener(
                    "click",
                    () => {

                        const idHijo =
                            boton.dataset.id;
                                                }
                );


                listaHijos.appendChild(
                    boton
                );

            });

        })

        .catch(error => {

            console.error(
                "Error al obtener hijos:",
                error
            );

        });

}


// ==========================================
// INICIAR PÁGINA
// ==========================================

cargarPerfilPadre();

cargarHijos();

// ==========================================
// IR A LA PÁGINA DE NIVELES SEGÚN EL ESTILO
// ==========================================

function irANiveles() {

    fetch("../ConfigPHP/obtener_perfil_hijo.php")
        .then(respuesta => respuesta.json())
        .then(datos => {

            if (!datos.success) {
                console.error(datos.mensaje);
                return;
            }

            const estilo = datos.hijo.estilo_aprendizaje;

            console.log("Estilo de aprendizaje:", estilo);

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

                alert("El estilo de aprendizaje todavía no está definido.");

            }

        })
        .catch(error => {

            console.error(
                "Error al obtener el estilo de aprendizaje:",
                error
            );

        });
}

const volverNiveles = document.getElementById("volverNiveles");

volverNiveles.addEventListener("click", function(evento) {

    evento.preventDefault();

    irANiveles();

});