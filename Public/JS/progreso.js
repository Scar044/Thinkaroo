// =====================================
// PROGRESO DE THINKAROO
// =====================================


// =====================================
// ACTIVIDADES SEGÚN ESTILO
// =====================================

const actividadesPorEstilo = {

    Visual: {
        1: 1,
        2: 4,
        3: 7,
        4: 10
    },

    Auditivo: {
        1: 2,
        2: 5,
        3: 8,
        4: 11
    },

    Kinestesico: {
        1: 3,
        2: 6,
        3: 9,
        4: 12
    }

};


// =====================================
// OBTENER ELEMENTOS DE LOS NIVELES
// =====================================

const niveles = document.querySelectorAll(".level");


// =====================================
// CARGAR PROGRESO
// =====================================

function cargarProgreso() {

    fetch("../ConfigPHP/obtener_progreso.php")

        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error("Error en la respuesta del servidor.");
            }

            return respuesta.json();

        })

        .then(datos => {

            // ---------------------------------
            // COMPROBAR RESPUESTA
            // ---------------------------------

            if (!datos.success) {

                console.error(datos.mensaje);

                return;
            }


            console.log("Hijo:", datos.nombre_hijo);

            console.log(
                "Estilo:",
                datos.estilo_aprendizaje
            );

            console.log(
                "Progreso:",
                datos.progreso
            );


            // ---------------------------------
            // OBTENER ESTILO
            // ---------------------------------

            const estilo = datos.estilo_aprendizaje;


            if (!actividadesPorEstilo[estilo]) {

                console.error(
                    "No existe configuración para el estilo:",
                    estilo
                );

                return;
            }


            // ---------------------------------
            // ACTIVIDADES QUE LE CORRESPONDEN
            // ---------------------------------

            const actividades = actividadesPorEstilo[estilo];

            // =====================================
            // ACTUALIZAR PROGRESO GENERAL
            // =====================================

            function actualizarProgresoGeneral(
                progreso,
                estilo
            ) {

                // Actividades que corresponden al estilo
                const actividades = actividadesPorEstilo[estilo];

                if (!actividades) {
                    console.error(
                        "No existe configuración para el estilo:",
                        estilo
                    );
                    return;
                }


                // ---------------------------------
                // CONTAR JUEGOS COMPLETADOS
                // ---------------------------------

                let juegosCompletados = 0;

                for (let nivel = 1; nivel <= 4; nivel++) {

                    const idActividad = actividades[nivel];

                    const registro = progreso.find(
                        actividad =>
                            Number(actividad.id_actividad) === idActividad
                    );


                    if (
                        registro &&
                        registro.estado === "completado"
                    ) {
                        juegosCompletados++;
                    }
                }


                // ---------------------------------
                // CALCULAR PORCENTAJE
                // ---------------------------------

                const totalJuegos = 4;

                const porcentaje =
                    Math.round(
                        (juegosCompletados / totalJuegos) * 100
                    );


                // ---------------------------------
                // OBTENER ELEMENTOS
                // ---------------------------------

                const texto =
                    document.getElementById("juegosCompletados");

                const barra =
                    document.getElementById("barraProgresoGeneral");

                const porcentajeTexto =
                    document.getElementById("porcentajeGeneral");


                if (!texto || !barra || !porcentajeTexto) {
                    return;
                }


                // ---------------------------------
                // ACTUALIZAR TEXTO
                // ---------------------------------

                texto.textContent =
                    juegosCompletados +
                    " de " +
                    totalJuegos +
                    " juegos completados";


                // ---------------------------------
                // ACTUALIZAR BARRA
                // ---------------------------------

                barra.style.width =
                    porcentaje + "%";


                // ---------------------------------
                // MOSTRAR PORCENTAJE
                // ---------------------------------

                porcentajeTexto.textContent =
                    porcentaje + "%";
            }

            actualizarProgresoGeneral(datos.progreso, estilo);

            // ---------------------------------
            // ACTUALIZAR CADA NIVEL
            // ---------------------------------

            for (let nivel = 1; nivel <= 4; nivel++) {

                const idActividad = actividades[nivel];


                // Buscar la actividad correspondiente
                const registro = datos.progreso.find(
                    actividad =>
                        Number(actividad.id_actividad) === idActividad
                );


                // Buscar tarjeta del nivel
                const tarjeta = document.querySelector(
                    `.level[data-nivel="${nivel}"]`
                );


                if (!tarjeta) {
                    continue;
                }


                // ---------------------------------
                // ELEMENTOS DE LA TARJETA
                // ---------------------------------

                const estado = tarjeta.querySelector(".estado");

                const porcentaje =
                    tarjeta.querySelector(".porcentaje");

                const barra =
                    tarjeta.querySelector(".fill");


                // ---------------------------------
                // SI TODAVÍA NO EXISTE REGISTRO
                // ---------------------------------

                if (!registro) {

                    actualizarNivel(
                        estado,
                        porcentaje,
                        barra,
                        0,
                        "Sin iniciar"
                    );

                    continue;
                }


                // ---------------------------------
                // OBTENER PORCENTAJE
                // ---------------------------------

                const progreso =
                    Number(registro.progreso) || 0;


                // ---------------------------------
                // OBTENER ESTADO
                // ---------------------------------

                let textoEstado = "Sin iniciar";


                if (registro.estado === "completado") {

                    textoEstado = "Completado";

                }

                else if (registro.estado === "en proceso") {

                    textoEstado = "En progreso";

                }


                // ---------------------------------
                // ACTUALIZAR TARJETA
                // ---------------------------------

                actualizarNivel(
                    estado,
                    porcentaje,
                    barra,
                    progreso,
                    textoEstado
                );

            }

        })

        .catch(error => {

            console.error(
                "Error al obtener el progreso:",
                error
            );

        });

}


// =====================================
// ACTUALIZAR UN NIVEL
// =====================================

function actualizarNivel(
    elementoEstado,
    elementoPorcentaje,
    barra,
    progreso,
    textoEstado
) {

    if (!elementoEstado ||
        !elementoPorcentaje ||
        !barra) {
        return;
    }

    // ---------------------------------
    // TEXTO DEL ESTADO
    // ---------------------------------

    elementoEstado.textContent = textoEstado;

    elementoPorcentaje.textContent =
        progreso + "%";


    // ---------------------------------
    // BARRA DE PROGRESO
    // ---------------------------------

    barra.style.width =
        progreso + "%";

    barra.style.transition =
        "width 0.8s ease";


    // ---------------------------------
    // PORCENTAJE DENTRO DE LA BARRA
    // ---------------------------------

    barra.textContent =
        progreso + "%";

    barra.style.display =
        "flex";

    barra.style.alignItems =
        "center";

    barra.style.justifyContent =
        "center";

    barra.style.fontWeight =
        "bold";


    // ---------------------------------
    // COLOR DE LA TARJETA
    // ---------------------------------

    if (textoEstado === "Completado") {
        elementoEstado.classList.add("completado");
    }
}

// =====================================
// INICIAR
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    cargarProgreso
);