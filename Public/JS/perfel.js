const usuario = {

    tiempoHoy: "1 h 35 min",

    tiempoTotal: "12 h 42 min",

    nivelesPasados: 8,

    totalNiveles: 20,

    nivelActual: 9

};

    

document.getElementById("tiempoHoy").textContent = usuario.tiempoHoy;

document.getElementById("tiempoTotal").textContent = usuario.tiempoTotal;

document.getElementById("niveles").textContent =
usuario.nivelesPasados + " / " + usuario.totalNiveles;

document.getElementById("nivel").textContent = usuario.nivelActual;



const porcentaje =
(usuario.nivelesPasados / usuario.totalNiveles) * 100;

document.getElementById("progreso").style.width = porcentaje + "%";

document.getElementById("porcentaje").textContent =
"Progreso completado: " + porcentaje.toFixed(0) + "%";