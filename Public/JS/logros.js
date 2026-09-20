
const logros = document.querySelectorAll(".logro");

const logrosDesbloqueados =
    document.getElementById("logros-desbloqueados");

const barraProgreso =
    document.getElementById("barra-progreso");


/*
Cuenta los logros
*/

function actualizarProgreso() {

    const totalLogros = logros.length;

    const completados =
        document.querySelectorAll(".logro.completado").length;


    /* Mostrar cantidad */

    logrosDesbloqueados.textContent = completados;


    /* Calcular porcentaje */

    const porcentaje =
        (completados / totalLogros) * 100;


    /* Actualizar barra */

    barraProgreso.style.width =
        porcentaje + "%";
}

actualizarProgreso();

