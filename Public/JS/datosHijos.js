const formulario = document.getElementById("form-responsable");

formulario.addEventListener("submit", guardarPerfil);

function guardarPerfil(evento) {

    evento.preventDefault();

    let nombreNino = document.getElementById("input-nombre-nino").value;

    let edad = document.getElementById("edad").value;

    fetch("../ConfigPHP/datosHijos.php", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombreNino: nombreNino,
            edad: edad
        })
    })

    .then(respuesta => respuesta.json())

    .then(datos => {

        if (datos.success) {

            console.log("ID del hijo creado:", datos.id_hijo);

            alert("Datos guardados correctamente");

            window.location.href = "formulario.html";

        } else {

            alert(datos.mensaje);

        }

    })

    .catch(error => {

        console.error("Error:", error);

        alert("Ocurrió un error al guardar los datos.");

    });
}