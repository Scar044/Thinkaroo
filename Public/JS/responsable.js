const formulario =
document.getElementById("form-responsable");

formulario.addEventListener(
    "submit",
    guardarPerfil
);

function guardarPerfil(evento){

    evento.preventDefault();

    let nombreResponsable =
    document.getElementById(
        "input-nombre-r"
    ).value;

    let nombreNino =
    document.getElementById(
        "input-nombre-nino"
    ).value;

    let correoResponsable =
    document.getElementById(
        "input-email"
    ).value;

    let edad =
    document.getElementById(
        "edad"
    ).value;

    fetch("../ConfigPHP/responsable.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nombreResponsable:
            nombreResponsable,

            nombreNino:
            nombreNino,

            correoResponsable:
            correoResponsable,

            edad:
            edad

        })

    })

    .then(respuesta => respuesta.json())

    .then(datos => {

        if(datos.success){

            alert(
                "Datos guardados correctamente"
            );

            // Cambia esta página por la siguiente
            window.location.href =
            "avatares.html";

        }else{

            alert(datos.mensaje);

        }

    });

}