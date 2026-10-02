const botonHijo = document.getElementById("botonHijo");
const listaHijos = document.getElementById("listaHijos");
const hijoActual = document.getElementById("hijoActual");

botonHijo.addEventListener("click", () => {
    listaHijos.classList.toggle("mostrar");
});


function traducirEstilo(estilo) {

    if (estilo === "Visual") {
        return getCurrentLanguage() === "en"
            ? "Visual"
            : "Visual";
    }

    if (estilo === "Auditivo") {
        return getCurrentLanguage() === "en"
            ? "Auditory"
            : "Auditivo";
    }

    if (estilo === "Kinestesico") {
        return getCurrentLanguage() === "en"
            ? "Kinesthetic"
            : "Kinestésico";
    }

    return translate("profile.undefinedStyle");
}


function cargarPerfilHijo() {

    fetch("../ConfigPHP/obtener_perfil_hijo.php")

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

            const hijo = datos.hijo;

            document.getElementById(
                "nombreHijo"
            ).textContent = hijo.nombre;


            hijoActual.textContent =
                hijo.nombre;


            document.getElementById(
                "edadHijo"
            ).textContent =
                hijo.edad + translate("profile.years");


            document.getElementById(
                "tipoAprendizaje"
            ).textContent =
                traducirEstilo(
                    hijo.estilo_aprendizaje
                );


            document.getElementById(
                "nivel"
            ).textContent =
                hijo.nivel_actual;


            document.getElementById(
                "logros"
            ).textContent =
                hijo.total_logros;


            const avatar =
                document.getElementById(
                    "avatarHijo"
                );


            if (hijo.imagen_avatar) {

                avatar.src =
                    hijo.imagen_avatar;

            }


            console.log(
                "ID del hijo:",
                hijo.id_hijo
            );

            console.log(
                "Nombre:",
                hijo.nombre
            );

            console.log(
                "Edad:",
                hijo.edad
            );

            console.log(
                "Avatar:",
                hijo.imagen_avatar
            );

            console.log(
                "Estilo:",
                hijo.estilo_aprendizaje
            );

            console.log(
                "Nivel:",
                hijo.nivel_actual
            );

            console.log(
                "Logros:",
                hijo.total_logros
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


                        fetch(
                            "../ConfigPHP/cambiarHijo.php",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({
                                    id_hijo:
                                        idHijo
                                })
                            }
                        )

                        .then(respuesta =>
                            respuesta.json()
                        )

                        .then(datos => {

                            if (!datos.success) {

                                alert(
                                    translate(
                                        "profile.changeChildError"
                                    )
                                );

                                return;
                            }


                            console.log(
                                "Nueva sesión:",
                                datos.id_hijo
                            );


                            listaHijos.classList.remove(
                                "mostrar"
                            );


                            cargarPerfilHijo();

                        })

                        .catch(error => {

                            console.error(
                                "Error al cambiar hijo:",
                                error
                            );

                        });

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


cargarPerfilHijo();
cargarHijos();


function irANiveles() {

    fetch("../ConfigPHP/obtener_perfil_hijo.php")

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


            const estilo =
                datos.hijo.estilo_aprendizaje;


            console.log(
                "Estilo de aprendizaje:",
                estilo
            );


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

                alert(
                    translate(
                        "profile.undefinedLearningStyle"
                    )
                );

            }

        })

        .catch(error => {

            console.error(
                "Error al obtener el estilo de aprendizaje:",
                error
            );

        });

}


const volverNiveles =
    document.getElementById(
        "volverNiveles"
    );


volverNiveles.addEventListener(
    "click",
    function(evento) {

        evento.preventDefault();

        irANiveles();

    }
);