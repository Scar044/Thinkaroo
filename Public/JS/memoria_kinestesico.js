document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ANIMALES
    // ==========================================

    const animales = [
        {
            id: "cerdo",
            imagen: "IMG/avatar1cerdo.png"
        },

        {
            id: "elefante",
            imagen: "IMG/Elefante.png"
        },

        {
            id: "gato",
            imagen: "IMG/avatar3gato.png"
        },

        {
            id: "oveja",
            imagen: "IMG/avatar4oveja.png"
        },

        {
            id: "pollo",
            imagen: "IMG/avatar5pollo.png"
        },

        {
            id: "raton",
            imagen: "IMG/avatar6ratón.png"
        },

        {
            id: "tigre",
            imagen: "IMG/avatar7tigre.png"
        },

        {
            id: "vaca",
            imagen: "IMG/avatar8vaca.png"
        }
    ];


    const contenedorAnimales =
        document.getElementById("animales");

    const contenedorDestinos =
        document.getElementById("destinos");

    const mensaje =
        document.getElementById("mensaje");


    let animalesCompletados = 0;


    // ==========================================
    // MEZCLAR
    // ==========================================

    let animalesMezclados = [...animales];

    animalesMezclados.sort(
        () => Math.random() - 0.5
    );


    // ==========================================
    // CREAR ANIMALES
    // ==========================================

    animalesMezclados.forEach(function (animal) {

        const elemento =
            document.createElement("div");

        elemento.classList.add("animal");

        elemento.dataset.id = animal.id;


        const imagen =
            document.createElement("img");

        imagen.src = animal.imagen;

        imagen.alt = animal.id;


        elemento.appendChild(imagen);

        contenedorAnimales.appendChild(elemento);


        // ======================================
        // ARRASTRAR
        // ======================================

        elemento.addEventListener(
            "pointerdown",
            comenzarArrastre
        );

    });


    // ==========================================
    // CREAR DESTINOS
    // ==========================================

    animales.forEach(function (animal) {

        const destino =
            document.createElement("div");

        destino.classList.add("destino");

        destino.dataset.id = animal.id;


        const imagen =
            document.createElement("img");

        imagen.src = animal.imagen;

        imagen.alt = animal.id;


        destino.appendChild(imagen);

        contenedorDestinos.appendChild(destino);

    });


    // ==========================================
    // COMENZAR ARRASTRE
    // ==========================================

    let animalArrastrado = null;


    function comenzarArrastre(evento) {

        if (
            this.classList.contains("colocado")
        ) {
            return;
        }


        animalArrastrado = this;


        this.classList.add("arrastrando");


        this.setPointerCapture(evento.pointerId);


        // Escuchamos el movimiento

        this.addEventListener(
            "pointermove",
            moverAnimal
        );


        this.addEventListener(
            "pointerup",
            terminarArrastre
        );

    }


    // ==========================================
    // MOVER ANIMAL
    // ==========================================

    function moverAnimal(evento) {

        const elementoDebajo =
            document.elementFromPoint(
                evento.clientX,
                evento.clientY
            );


        const destino =
            elementoDebajo?.closest(".destino");


        // Quitar resaltado

        document
            .querySelectorAll(".destino")
            .forEach(function (elemento) {

                elemento.classList.remove("sobre");

            });


        // Resaltar destino

        if (destino) {

            destino.classList.add("sobre");

        }

    }


    // ==========================================
    // TERMINAR ARRASTRE
    // ==========================================

    function terminarArrastre(evento) {

        this.releasePointerCapture(
            evento.pointerId
        );


        this.removeEventListener(
            "pointermove",
            moverAnimal
        );


        this.removeEventListener(
            "pointerup",
            terminarArrastre
        );


        this.classList.remove(
            "arrastrando"
        );


        const elementoDebajo =
            document.elementFromPoint(
                evento.clientX,
                evento.clientY
            );


        const destino =
            elementoDebajo?.closest(".destino");


        // Quitar resaltados

        document
            .querySelectorAll(".destino")
            .forEach(function (elemento) {

                elemento.classList.remove(
                    "sobre"
                );

            });


        // Si no soltó sobre un destino

        if (!destino) {

            animalArrastrado = null;

            return;

        }


        comprobarPareja(
            animalArrastrado,
            destino
        );


        animalArrastrado = null;

    }


    // ==========================================
    // COMPROBAR PAREJA
    // ==========================================

    function comprobarPareja(
        animal,
        destino
    ) {

        const idAnimal =
            animal.dataset.id;

        const idDestino =
            destino.dataset.id;


        // ======================================
        // RESPUESTA CORRECTA
        // ======================================

        if (idAnimal === idDestino) {

            destino.classList.add(
                "correcto"
            );


            // Crear copia visual

            const contenedor =
                document.createElement("div");

            contenedor.classList.add(
                "animal-colocado"
            );


            const imagen =
                document.createElement("img");

            imagen.src =
                animal.querySelector("img").src;

            imagen.alt = idAnimal;


            contenedor.appendChild(
                imagen
            );


            destino.innerHTML = "";

            destino.appendChild(
                contenedor
            );


            // Desactivar animal

            animal.classList.add(
                "colocado"
            );


            animal.style.visibility =
                "hidden";


            animalesCompletados++;


            mensaje.textContent =
                "🎉 ¡Muy bien!";


            // ==================================
            // TERMINÓ EL JUEGO
            // ==================================

            if (
                animalesCompletados ===
                animales.length
            ) {

                setTimeout(function () {

                    mensaje.textContent =
                        "🏆 ¡Excelente! ¡Encontraste todas las parejas!";

                }, 500);


                setTimeout(function () {

                    window.location.href =
                        "niveles_kinestesico.html";

                }, 2500);

            }

        }


        // ======================================
        // RESPUESTA INCORRECTA
        // ======================================

        else {

            mensaje.textContent =
                "💪 ¡Inténtalo otra vez!";


            destino.animate(
                [
                    {
                        transform: "translateX(0)"
                    },

                    {
                        transform:
                            "translateX(-8px)"
                    },

                    {
                        transform:
                            "translateX(8px)"
                    },

                    {
                        transform:
                            "translateX(0)"
                    }
                ],
                {
                    duration: 350
                }
            );

        }

    }


    // ==========================================
    // BOTÓN VOLVER
    // ==========================================

    document
        .getElementById("volver")
        .addEventListener(
            "click",
            function () {

                window.location.href =
                    "niveles_kinestesico.html";

            }
        );

});