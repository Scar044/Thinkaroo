const botonHijo = document.getElementById("botonHijo");
const listaHijos = document.getElementById("listaHijos");
const hijoActual = document.getElementById("hijoActual");


// ==========================================
// ABRIR / CERRAR EL DESPLEGABLE
// ==========================================

botonHijo.addEventListener("click", () => {

    listaHijos.classList.toggle("mostrar");

});


// ==========================================
// OBTENER LOS HIJOS DEL USUARIO
// ==========================================

fetch("../ConfigPHP/obtener_hijos.php")

    .then(respuesta => respuesta.json())

    .then(datos => {

        if (!datos.success) {

            console.error(datos.mensaje);

            return;
        }


        // Limpiar la lista por si acaso

        listaHijos.innerHTML = "";


        // Crear un botón por cada hijo

        datos.hijos.forEach(hijo => {

            const boton = document.createElement("button");

            boton.classList.add("hijo");

            boton.textContent = hijo.nombre;

            boton.dataset.id = hijo.id_hijo;


            // ==================================
            // SELECCIONAR HIJO
            // ==================================

            boton.addEventListener("click", () => {

                const idHijo = boton.dataset.id;

                console.log(
                    "Hijo seleccionado:",
                    idHijo
                );


                // Cambiar el hijo en la sesión

                fetch("../ConfigPHP/cambiarHijo.php", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        id_hijo: idHijo

                    })

                })

                .then(respuesta => respuesta.json())

                .then(datos => {

                    if (datos.success) {

                        // Cambiar nombre mostrado

                        hijoActual.textContent =
                            datos.nombre;


                        // Cerrar desplegable

                        listaHijos.classList.remove(
                            "mostrar"
                        );


                        console.log(
                            "Nueva sesión:",
                            datos.id_hijo
                        );

                    } else {

                        alert(datos.mensaje);

                    }

                })

                .catch(error => {

                    console.error(
                        "Error al cambiar de hijo:",
                        error
                    );

                });

            });


            // Agregar botón a la lista

            listaHijos.appendChild(boton);

        });

    })

    .catch(error => {

        console.error(
            "Error al obtener los hijos:",
            error
        );

    });


// ==========================================
// ESTADÍSTICAS DE PRUEBA
// ==========================================

const usuario = {

    tiempoHoy: "1 h 35 min",

    tiempoTotal: "12 h 42 min",

    nivelesPasados: 8,

    totalNiveles: 20,

    nivelActual: 9

};


document.getElementById("tiempoHoy").textContent =
    usuario.tiempoHoy;

document.getElementById("tiempoTotal").textContent =
    usuario.tiempoTotal;

document.getElementById("niveles").textContent =
    usuario.nivelesPasados +
    " / " +
    usuario.totalNiveles;

document.getElementById("nivel").textContent =
    usuario.nivelActual;


const porcentaje =
    (usuario.nivelesPasados /
    usuario.totalNiveles) * 100;


document.getElementById("progreso").style.width =
    porcentaje + "%";

document.getElementById("porcentaje").textContent =
    "Progreso completado: " +
    porcentaje.toFixed(0) +
    "%";