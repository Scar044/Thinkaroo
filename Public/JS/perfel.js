const botonHijo = document.getElementById("botonHijo");
const listaHijos = document.getElementById("listaHijos");
const hijoActual = document.getElementById("hijoActual");


// Abrir y cerrar el desplegable
botonHijo.addEventListener("click", () => {
    listaHijos.classList.toggle("mostrar");
});


// Obtener los hijos desde PHP
fetch("obtener_hijos.php")
    .then(respuesta => respuesta.json())
    .then(datos => {

        if (!datos.success) {
            console.error(datos.mensaje);
            return;
        }

        datos.hijos.forEach(hijo => {

            const boton = document.createElement("button");

            boton.classList.add("hijo");

            boton.textContent = hijo.nombre;

            boton.dataset.id = hijo.id_hijo;


            // Cuando se selecciona un hijo
            boton.addEventListener("click", () => {

                const idHijo = boton.dataset.id;
                const nombre = boton.textContent;

                hijoActual.textContent = nombre;

                listaHijos.classList.remove("mostrar");

                console.log("Hijo seleccionado:", idHijo);

            });


            listaHijos.appendChild(boton);

        });

    })
    .catch(error => {
        console.error("Error al obtener los hijos:", error);
    });


// Datos de prueba de las estadísticas
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
    usuario.nivelesPasados + " / " + usuario.totalNiveles;

document.getElementById("nivel").textContent =
    usuario.nivelActual;


const porcentaje =
    (usuario.nivelesPasados / usuario.totalNiveles) * 100;

document.getElementById("progreso").style.width =
    porcentaje + "%";

document.getElementById("porcentaje").textContent =
    "Progreso completado: " + porcentaje.toFixed(0) + "%";