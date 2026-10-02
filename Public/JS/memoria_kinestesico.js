document.addEventListener(
    "DOMContentLoaded",
    function () {

        const alertaFinal =
            document.getElementById("finish");

        const botonFinal =
            document.getElementById("botonFinal");


        function mostrarAlertaFinal() {

            if (alertaFinal) {
                alertaFinal.classList.add("show");
            }

        }


        if (botonFinal) {

            botonFinal.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "niveles_kinestesico.html";

                }
            );

        }


        async function guardarProgreso(
            progreso,
            estado
        ) {

            try {

                const respuesta = await fetch(
                    "../ConfigPHP/guardar_progreso.php",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            id_actividad: 3,

                            progreso: progreso,

                            estado: estado

                        })
                    }
                );


                const datos =
                    await respuesta.json();


                console.log(
                    "PROGRESO KINESTÉSICO:",
                    datos
                );


                return datos;


            } catch (error) {

                console.error(
                    "Error al guardar progreso:",
                    error
                );


                return {
                    success: false
                };

            }

        }


        guardarProgreso(
            0,
            "sin iniciar"
        );


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


        let animalesMezclados =
            [...animales];


        animalesMezclados.sort(
            () => Math.random() - 0.5
        );


        animalesMezclados.forEach(
            function (animal) {

                const elemento =
                    document.createElement("div");


                elemento.classList.add(
                    "animal"
                );


                elemento.dataset.id =
                    animal.id;


                const imagen =
                    document.createElement("img");


                imagen.src =
                    animal.imagen;


                imagen.alt =
                    animal.id;


                elemento.appendChild(
                    imagen
                );


                contenedorAnimales.appendChild(
                    elemento
                );


                elemento.addEventListener(
                    "pointerdown",
                    comenzarArrastre
                );

            }
        );


        animales.forEach(
            function (animal) {

                const destino =
                    document.createElement("div");


                destino.classList.add(
                    "destino"
                );


                destino.dataset.id =
                    animal.id;


                const imagen =
                    document.createElement("img");


                imagen.src =
                    animal.imagen;


                imagen.alt =
                    animal.id;


                destino.appendChild(
                    imagen
                );


                contenedorDestinos.appendChild(
                    destino
                );

            }
        );


        let animalArrastrado = null;


        function comenzarArrastre(evento) {

            if (
                this.classList.contains(
                    "colocado"
                )
            ) {

                return;

            }


            animalArrastrado = this;


            this.classList.add(
                "arrastrando"
            );


            this.setPointerCapture(
                evento.pointerId
            );


            this.addEventListener(
                "pointermove",
                moverAnimal
            );


            this.addEventListener(
                "pointerup",
                terminarArrastre
            );

        }


        function moverAnimal(evento) {

            const elementoDebajo =
                document.elementFromPoint(
                    evento.clientX,
                    evento.clientY
                );


            const destino =
                elementoDebajo?.closest(
                    ".destino"
                );


            document
                .querySelectorAll(".destino")
                .forEach(
                    function (elemento) {

                        elemento.classList.remove(
                            "sobre"
                        );

                    }
                );


            if (destino) {

                destino.classList.add(
                    "sobre"
                );

            }

        }


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
                elementoDebajo?.closest(
                    ".destino"
                );


            document
                .querySelectorAll(".destino")
                .forEach(
                    function (elemento) {

                        elemento.classList.remove(
                            "sobre"
                        );

                    }
                );


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


        function comprobarPareja(
            animal,
            destino
        ) {

            const idAnimal =
                animal.dataset.id;


            const idDestino =
                destino.dataset.id;


            if (idAnimal === idDestino) {

                destino.classList.add(
                    "correcto"
                );


                const contenedor =
                    document.createElement("div");


                contenedor.classList.add(
                    "animal-colocado"
                );


                const imagen =
                    document.createElement("img");


                imagen.src =
                    animal.querySelector(
                        "img"
                    ).src;


                imagen.alt =
                    idAnimal;


                contenedor.appendChild(
                    imagen
                );


                destino.innerHTML = "";


                destino.appendChild(
                    contenedor
                );


                animal.classList.add(
                    "colocado"
                );


                animal.style.visibility =
                    "hidden";


                animalesCompletados++;


                mensaje.textContent =
                    translate(
                        "kinestheticMemory.correct"
                    );


                const progreso =
                    Math.round(
                        (
                            animalesCompletados /
                            animales.length
                        ) * 100
                    );


                if (
                    animalesCompletados <
                    animales.length
                ) {

                    guardarProgreso(
                        progreso,
                        "en proceso"
                    );

                }


                if (
                    animalesCompletados ===
                    animales.length
                ) {

                    guardarProgreso(
                        100,
                        "completado"
                    ).then(
                        function (resultado) {

                            if (resultado.success) {

                                console.log(
                                    "Memoria kinestésica completada."
                                );

                            }

                        }
                    );


                    setTimeout(
                        function () {

                            mensaje.textContent =
                                translate(
                                    "kinestheticMemory.complete"
                                );

                        },
                        500
                    );


                    setTimeout(
                        function () {

                            mostrarAlertaFinal();

                        },
                        700
                    );

                }

            }

            else {

                mensaje.textContent =
                    translate(
                        "kinestheticMemory.tryAgain"
                    );


                destino.animate(
                    [
                        {
                            transform:
                                "translateX(0)"
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


        document
            .getElementById("volver")
            .addEventListener(
                "click",
                function () {

                    window.location.href =
                        "niveles_kinestesico.html";

                }
            );

    }
);