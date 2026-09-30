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

const niveles = document.querySelectorAll(".level");

function cargarProgreso() {

    fetch("../ConfigPHP/obtener_progreso.php")

        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error("Error en la respuesta del servidor.");
            }

            return respuesta.json();

        })

        .then(datos => {

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

            const estilo = datos.estilo_aprendizaje;


            if (!actividadesPorEstilo[estilo]) {

                console.error(
                    "No existe configuración para el estilo:",
                    estilo
                );

                return;
            }

            const actividades = actividadesPorEstilo[estilo];

            function actualizarProgresoGeneral(
                progreso,
                estilo
            ) {

                const actividades = actividadesPorEstilo[estilo];

                if (!actividades) {
                    console.error(
                        "No existe configuración para el estilo:",
                        estilo
                    );
                    return;
                }

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


                const totalJuegos = 4;

                const porcentaje =
                    Math.round(
                        (juegosCompletados / totalJuegos) * 100
                    );

                const texto =
                    document.getElementById("juegosCompletados");

                const barra =
                    document.getElementById("barraProgresoGeneral");

                const porcentajeTexto =
                    document.getElementById("porcentajeGeneral");


                if (!texto || !barra || !porcentajeTexto) {
                    return;
                }

                texto.textContent =
                    juegosCompletados +
                    " de " +
                    totalJuegos +
                    " juegos completados";

                barra.style.width =
                    porcentaje + "%";

                porcentajeTexto.textContent =
                    porcentaje + "%";
            }

            actualizarProgresoGeneral(datos.progreso, estilo);

            for (let nivel = 1; nivel <= 4; nivel++) {

                const idActividad = actividades[nivel];

                const registro = datos.progreso.find(
                    actividad =>
                        Number(actividad.id_actividad) === idActividad
                );

                const tarjeta = document.querySelector(
                    `.level[data-nivel="${nivel}"]`
                );


                if (!tarjeta) {
                    continue;
                }

                const estado = tarjeta.querySelector(".estado");

                const porcentaje =
                    tarjeta.querySelector(".porcentaje");

                const barra =
                    tarjeta.querySelector(".fill");


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

                const progreso =
                    Number(registro.progreso) || 0;

                let textoEstado = "Sin iniciar";


                if (registro.estado === "completado") {

                    textoEstado = "Completado";

                }

                else if (registro.estado === "en proceso") {

                    textoEstado = "En progreso";

                }

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

    elementoEstado.textContent = textoEstado;

    elementoPorcentaje.textContent =
        progreso + "%";

    barra.style.width =
        progreso + "%";

    barra.style.transition =
        "width 0.8s ease";


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

    if (textoEstado === "Completado") {
        elementoEstado.classList.add("completado");
    }
}

document.addEventListener(
    "DOMContentLoaded",
    cargarProgreso
);