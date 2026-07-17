const slides = document.querySelectorAll(".slide");

const siguiente = document.querySelector(".siguiente");

const anterior = document.querySelector(".anterior");

let indice = 0;

function mostrarSlide(){

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    slides[indice].classList.add("active");

}

siguiente.addEventListener("click",()=>{

    indice++;

    if(indice>=slides.length){

        indice=0;

    }

    mostrarSlide();

});

anterior.addEventListener("click",()=>{

    indice--;

    if(indice<0){

        indice=slides.length-1;

    }

    mostrarSlide();

});

setInterval(()=>{

    indice++;

    if(indice>=slides.length){

        indice=0;

    }

    mostrarSlide();

},4000);

mostrarSlide();