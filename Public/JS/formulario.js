const formulario =
document.getElementById("form-aprendizaje");

formulario.addEventListener(
    "submit",
    procesarFormulario
);

function procesarFormulario(evento){

    evento.preventDefault();

    let visual = 0;
    let auditivo = 0;
    let kinestesico = 0;

    for(let i = 1; i <= 10; i++){

        let respuesta =
        document.querySelector(
            `input[name="p${i}"]:checked`
        ).value;

        if(respuesta === "visual"){
            visual++;
        }

        if(respuesta === "auditivo"){
            auditivo++;
        }

        if(respuesta === "kinestesico"){
            kinestesico++;
        }

    }

    let resultado;

    if(
        visual >= auditivo &&
        visual >= kinestesico
    ){

        resultado = "Visual";

    }else if(
        auditivo >= visual &&
        auditivo >= kinestesico
    ){

        resultado = "Auditivo";

    }else{

        resultado = "Kinestesico";

    }

    fetch(
        "../ConfigPHP/guardarEstilo.php",
        {

            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                estilo: resultado
            })

        }

    )
    .then(respuesta => respuesta.json())
    .then(datos => {

        if(datos.success){

            alert(
                "Estilo detectado: " +
                resultado
            );

            window.location.href =
            "siguientePagina.html";

        }else{

            alert(datos.mensaje);

        }

    });

}