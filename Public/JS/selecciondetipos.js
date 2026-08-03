const slides = document.querySelectorAll(".slide");
const siguiente = document.querySelector(".siguiente");
const anterior = document.querySelector(".anterior");

console.log("Slides:", slides.length);
console.log("Siguiente:", siguiente);
console.log("Anterior:", anterior);

console.log("JavaScript funcionando");

let indice = 0;

function mostrarSlide(){

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    slides[indice].classList.add("active");

}

siguiente.addEventListener("click", () => {

    indice++;

    if(indice >= slides.length){

        indice = 0;

    }

    mostrarSlide();

});

anterior.addEventListener("click", () => {

    indice--;

    if(indice < 0){

        indice = slides.length - 1;

    }

    mostrarSlide();

});


mostrarSlide();

/*
    Obtener estilo desde la base de datos
*/
fetch("../ConfigPHP/obtenerEstilo.php")

.then(respuesta => respuesta.json())

.then(datos => {

    if(!datos.success){

        console.log(datos.mensaje);
        return;

    }

    if(datos.estilo === "Visual"){

        indice = 0;

    }else if(datos.estilo === "Auditivo"){

        indice = 1;

    }else if(datos.estilo === "Kinestesico"){

        indice = 2;

    }

    mostrarSlide();

})

.catch(error => {

    console.error(
        "Error al obtener estilo:",
        error
    );

});