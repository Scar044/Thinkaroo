(function () {
    "use strict";

    const ES = {

        // General
        "page.title": "Página de inicio",
        "common.logo": "Logo",

        // Navigation
        "nav.home": "Inicio",
        "nav.about": "¿Quiénes Somos?",
        "nav.visual": "Visual",
        "nav.auditory": "Auditivo",
        "nav.kinesthetic": "Kinestésico",

        // Authentication
        "auth.createAccount": "Cuenta nueva",
        "auth.login": "Iniciar sesión",

        // Carousel
        "carousel.visual": "Visual",
        "carousel.auditory": "Auditivo",
        "carousel.kinesthetic": "Kinestésico",
        "carousel.previous": "Anterior",
        "carousel.next": "Siguiente",

        // About
        "about.title": "¿Quiénes Somos?",

        "about.paragraph1":
            "Somos un equipo comprometido con el desarrollo educativo infantil, dedicado a crear una plataforma interactiva que ayude a los niños de 3 a 7 años a fortalecer su pensamiento lógico mediante actividades, juegos y retos adaptados a su estilo de aprendizaje.",

        "about.paragraph2":
            "Nuestro objetivo es ofrecer una experiencia de aprendizaje divertida, segura y personalizada, permitiendo que cada niño aprenda a su propio ritmo mientras desarrolla habilidades como el razonamiento, la resolución de problemas, la concentración y la creatividad.",

        "about.paragraph3":
            "Creemos que aprender jugando es una de las mejores formas de potenciar el desarrollo infantil, por eso combinamos tecnología, educación y dinámicas interactivas para acompañar tanto a los niños como a sus padres en este proceso.",

        // Learning styles
        "learning.visual.title": "Visual",

        "learning.visual.description":
            "Aprende mediante imágenes, colores, videos y rompecabezas.",

        "learning.auditory.title": "Auditivo",

        "learning.auditory.description":
            "Aprende mediante podcasts, música, audiolibros y sonidos.",

        "learning.kinesthetic.title": "Kinestésico",

        "learning.kinesthetic.description":
            "Aprende jugando, moviéndote y realizando actividades prácticas.",

        // Avatar
        "avatar.title": "Elegir Avatar",
        "avatar.choose": "Elige tu avatar",
        "avatar.save": "Guardar",
        "avatar.alt1": "Avatar 1",
        "avatar.alt2": "Avatar 2",
        "avatar.alt3": "Avatar 3",
        "avatar.alt4": "Avatar 4",
        "avatar.alt5": "Avatar 5",
        "avatar.alt6": "Avatar 6",
        "avatar.alt7": "Avatar 7",
        "avatar.alt8": "Avatar 8",
        "avatar.alt9": "Avatar 9",

        // Colors auditory game
        "colorsGame.title": "🔊 Encuentra el Color",
        "colorsGame.description":
            "Escucha el nombre del color y selecciona el círculo correcto.",

        "colorsGame.points": "⭐ Puntos:",
        "colorsGame.round": "🎯 Ronda:",
        "colorsGame.listen": "🔊 Escuchar color",
        "colorsGame.listenInstruction": "Escucha el color",

        "colorsGame.correct": "🎉 ¡Correcto!",
        "colorsGame.incorrect": "❌ Incorrecto. ¡Inténtalo de nuevo!",
        "colorsGame.finished": "🏆 ¡Juego terminado! Obtuviste {points} puntos.",

        "colorsGame.next": "Siguiente ➜",

        "colorsGame.levelCompleteTitle": "¡Excelente ahora tu misión!",
        "colorsGame.levelCompleteDescription":
            "Encuentra 2 objetos de cada color que aprendiste hoy",
        "colorsGame.levelCompleteLearned":
            "¡Aprendiste los colores!",
        "colorsGame.nextLevel": "Siguiente nivel",

        // Colors sorting game
        "colorsSort.title": "Clasifica los Colores",
        "colorsSort.description":
            "Arrastra cada objeto al color correcto.",
        "colorsSort.points": "⭐ Puntos:",
        "colorsSort.progress": "🎯 Progreso:",
        "colorsSort.instruction": "🖐️ ¡Toca y arrastra los objetos!",

        "colorsSort.red": "Rojo",
        "colorsSort.blue": "Azul",
        "colorsSort.yellow": "Amarillo",
        "colorsSort.green": "Verde",

        "colorsSort.apple": "Manzana",
        "colorsSort.strawberry": "Fresa",
        "colorsSort.cherries": "Cerezas",
        "colorsSort.heart": "Corazón",
        "colorsSort.balloon": "Globo",

        "colorsSort.blueFish": "Pez azul",
        "colorsSort.blueBall": "Pelota azul",
        "colorsSort.blueCar": "Carro azul",
        "colorsSort.blueBucket": "Cubeta azul",
        "colorsSort.blueCap": "Gorra azul",

        "colorsSort.banana": "Plátano",
        "colorsSort.corn": "Maíz",
        "colorsSort.star": "Estrella",
        "colorsSort.chick": "Pollito",
        "colorsSort.sun": "Sol",

        "colorsSort.greenApple": "Manzana verde",
        "colorsSort.kiwi": "Kiwi",
        "colorsSort.frog": "Rana",
        "colorsSort.tree": "Árbol",
        "colorsSort.clover": "Trébol",

        "colorsSort.correct1": "🌟 ¡Muy bien!",
        "colorsSort.correct2": "👏 ¡Excelente!",
        "colorsSort.correct3": "🎉 ¡Correcto!",
        "colorsSort.correct4": "⭐ ¡Genial!",
        "colorsSort.correct5": "😊 ¡Lo hiciste muy bien!",

        "colorsSort.tryAgain": "😊 ¡Inténtalo otra vez!",
        "colorsSort.finishTitle": "🎉 ¡Juego terminado!",
        "colorsSort.finishDescription":
            "¡Excelente trabajo! Clasificaste todos los objetos.",
        "colorsSort.restart": "Siguiente nivel",
        "colorsSort.apple": "Manzana",
        "colorsSort.strawberry": "Fresa",
        "colorsSort.cherries": "Cerezas",
        "colorsSort.heart": "Corazón",
        "colorsSort.balloon": "Globo",

        "colorsSort.blueFish": "Pez azul",
        "colorsSort.blueBall": "Pelota azul",
        "colorsSort.blueCar": "Carro azul",
        "colorsSort.blueBucket": "Cubeta azul",
        "colorsSort.blueCap": "Gorra azul",

        "colorsSort.banana": "Plátano",
        "colorsSort.corn": "Maíz",
        "colorsSort.star": "Estrella",
        "colorsSort.chick": "Pollito",
        "colorsSort.sun": "Sol",

        "colorsSort.greenApple": "Manzana verde",
        "colorsSort.kiwi": "Kiwi",
        "colorsSort.frog": "Rana",
        "colorsSort.tree": "Árbol",
        "colorsSort.clover": "Trébol",

        "colorsSort.correct1": "🌟 ¡Muy bien!",
        "colorsSort.correct2": "👏 ¡Excelente!",
        "colorsSort.correct3": "🎉 ¡Correcto!",
        "colorsSort.correct4": "⭐ ¡Genial!",
        "colorsSort.correct5": "😊 ¡Lo hiciste muy bien!",

        "colorsSort.tryAgain": "😊 ¡Inténtalo otra vez!",
        "colorsSort.levelCompleteTitle":
            "¡Excelente! ¡Ahora tu misión!",
        "colorsSort.levelCompleteDescription":
            "Encuentra 2 objetos de cada color que aprendiste hoy.",
        "colorsSort.levelCompleteLearned":
            "¡Aprendiste los colores!",
        "colorsSort.nextLevel":
            "➡️ Siguiente nivel",

            /* =====================================================
            COLORES - JUEGO VISUAL
            ===================================================== */

            "colorsVisual.pageTitle":
                "Colores - Juego Visual",

            "colorsVisual.title":
                "🌈 ¡Ordena los Colores!",

            "colorsVisual.description":
                "Toca un objeto y después toca la caja de su mismo color.",

            "colorsVisual.points":
                "⭐ Puntos:",

            "colorsVisual.round":
                "🎯 Ronda:",

            "colorsVisual.of":
                "/ 5",

            "colorsVisual.selectObject":
                "¡Selecciona un objeto!",

            "colorsVisual.chooseBox":
                "Ahora toca la caja",

            "colorsVisual.red":
                "Rojo",

            "colorsVisual.blue":
                "Azul",

            "colorsVisual.yellow":
                "Amarillo",

            "colorsVisual.green":
                "Verde",

            "colorsVisual.apple":
                "Manzana",

            "colorsVisual.blueBerry":
                "Baya azul",

            "colorsVisual.lemon":
                "Limón",

            "colorsVisual.greenApple":
                "Manzana verde",

            "colorsVisual.selectFirst":
                "👆 Primero selecciona un objeto.",

            "colorsVisual.correct":
                "🎉 ¡Muy bien!",

            "colorsVisual.wrong":
                "😊 Ese no es su color. ¡Inténtalo otra vez!",

            "colorsVisual.findAnother":
                "¡Busca otro objeto! 😊",

            "colorsVisual.roundComplete":
                "🎉 ¡Completaste la ronda!",

            "colorsVisual.excellent":
                "¡Excelente trabajo! ⭐",

            "colorsVisual.next":
                "Siguiente ➜",

            "colorsVisual.gameComplete":
                "🏆 ¡Juego terminado!",

            "colorsVisual.finalScore":
                "Conseguiste {points} puntos ⭐",

            "colorsVisual.levelCompleteTitle":
                "¡Excelente! ¡Ahora tu misión!",

            "colorsVisual.levelCompleteDescription":
                "Encuentra 2 objetos de cada color que aprendiste hoy.",

            "colorsVisual.levelCompleteLearned":
                "¡Aprendiste los colores!",

            "colorsVisual.nextLevel":
                "➡️ Siguiente nivel",

            "colorsVisual.selectBox": "Ahora toca la caja {color} 👆",
            "colorsVisual.findAnother": "¡Busca otro objeto! 😊",
            "colorsVisual.selectFirst": "👆 Primero selecciona un objeto.",
            "colorsVisual.correct": "🎉 ¡Muy bien!",
            "colorsVisual.wrong": "😊 Ese no es su color. ¡Inténtalo otra vez!",
            "colorsVisual.roundComplete": "🎉 ¡Completaste la ronda!",
            "colorsVisual.excellent": "¡Excelente trabajo! ⭐",
            "colorsVisual.gameComplete": "🏆 ¡Juego terminado!",
            "colorsVisual.finalScore": "Conseguiste {points} puntos ⭐",

            // Registration
            "register.subtitle": "¡Aprendamos juntos!",
            "register.name": "Nombre",
            "register.namePlaceholder": "Nombre del padre/tutor",
            "register.email": "Correo",
            "register.emailPlaceholder": "correo@ejemplo.com",
            "register.password": "Contraseña",
            "register.confirmPassword": "Confirmar contraseña",
            "register.button": "Registrarse",
            "register.alreadyAccount": "¿Ya tienes una cuenta?",
            "register.login": "Inicia sesión",

            "register.passwordMismatch":
                "Las contraseñas no coinciden",

            "register.registrationError":
                "Ocurrió un error al registrar el usuario.",

                    // Child information
            "childData.pageTitle": "Datos del niño",
            "childData.childName": "Nombre del niño",
            "childData.childNamePlaceholder": "👦🏻 Ingresa el nombre",
            "childData.childAge": "Edad del niño",
            "childData.agePlaceholder": "📆",
            "childData.continue": "Continuar →",
            "childData.saved": "Datos guardados correctamente",
            "childData.error": "Ocurrió un error al guardar los datos.",

            // Figures auditory game
            "figuresAuditory.pageTitle":
                "Clasifica las figuras - Auditivo",

            "figuresAuditory.title":
                "🔊 ESCUCHA Y CLASIFICA",

            "figuresAuditory.description":
                "Escucha atentamente y selecciona la figura que escuchaste.",

            "figuresAuditory.listen":
                "🔊 ESCUCHAR",

            "figuresAuditory.initialInstruction":
                "Presiona el botón para escuchar.",

            "figuresAuditory.listenInstruction":
                "Presiona ESCUCHAR para oír la figura.",

            "figuresAuditory.searchInstruction":
                "Escucha y busca la figura correcta.",

            "figuresAuditory.circle":
                "círculo",

            "figuresAuditory.square":
                "cuadrado",

            "figuresAuditory.triangle":
                "triángulo",

            "figuresAuditory.rectangle":
                "rectángulo",

            "figuresAuditory.correct":
                "🎉 ¡Muy bien!",

            "figuresAuditory.incorrect":
                "😊 ¡Casi! Escucha otra vez.",

            "figuresAuditory.correctVoice":
                "¡Muy bien!",

            "figuresAuditory.incorrectVoice":
                "Casi. Escucha otra vez.",

            "figuresAuditory.hintAgain":
                "Escucha nuevamente.",

            "figuresAuditory.closeHint":
                "¡INTÉNTALO DE NUEVO!",

            "figuresAuditory.hint.circle1":
                "No tiene esquinas.",

            "figuresAuditory.hint.circle2":
                "Es completamente redondo.",

            "figuresAuditory.hint.circle3":
                "Piensa en una pelota.",

            "figuresAuditory.hint.square1":
                "Tiene cuatro lados.",

            "figuresAuditory.hint.square2":
                "Sus cuatro lados son iguales.",

            "figuresAuditory.hint.square3":
                "Piensa en una ventana.",

            "figuresAuditory.hint.triangle1":
                "Tiene tres lados.",

            "figuresAuditory.hint.triangle2":
                "Tiene tres esquinas.",

            "figuresAuditory.hint.triangle3":
                "Piensa en una montaña.",

            "figuresAuditory.hint.rectangle1":
                "Tiene cuatro lados.",

            "figuresAuditory.hint.rectangle2":
                "Tiene dos lados largos y dos cortos.",

            "figuresAuditory.hint.rectangle3":
                "Piensa en una puerta.",

            "figuresAuditory.finishTitle":
                "¡Excelente! ¡Ahora tu misión!",

            "figuresAuditory.finishDescription":
                "Encuentra 2 objetos de cada forma que aprendiste hoy",

            "figuresAuditory.finishLearned":
                "¡Aprendiste las formas!",

            "figuresAuditory.continue":
                "Continuar",


            // Figuras visual
            "figuresVisual.pageTitle":
                "Clasifica las figuras",

            "figuresVisual.title":
                "CLASIFICA LAS FIGURAS",

            "figuresVisual.description":
                "Arrastra cada figura a su lugar",

            "figuresVisual.circle":
                "CÍRCULO",

            "figuresVisual.square":
                "CUADRADO",

            "figuresVisual.triangle":
                "TRIÁNGULO",

            "figuresVisual.rectangle":
                "RECTÁNGULO",

            "figuresVisual.correct":
                "🎉 ¡Muy bien!",

            "figuresVisual.complete":
                "🎉 ¡Excelente! Completaste el juego",

            "figuresVisual.incorrect":
                "😊 ¡Casi!",

            "figuresVisual.hint.circle1":
                "Mira con atención. El círculo no tiene esquinas.",

            "figuresVisual.hint.circle2":
                "Observa su borde. Es completamente redondo.",

            "figuresVisual.hint.circle3":
                "Busca la figura que parece una pelota.",

            "figuresVisual.hint.square1":
                "Mira sus lados. Tiene 4 lados.",

            "figuresVisual.hint.square2":
                "Sus 4 lados tienen el mismo tamaño.",

            "figuresVisual.hint.square3":
                "Busca la figura que tiene 4 lados iguales.",

            "figuresVisual.hint.triangle1":
                "Mira sus esquinas. Tiene 3.",

            "figuresVisual.hint.triangle2":
                "Cuenta sus lados. Tiene 3.",

            "figuresVisual.hint.triangle3":
                "Busca la figura que tiene forma de montaña.",

            "figuresVisual.hint.rectangle1":
                "Mira sus lados. Tiene 4.",

            "figuresVisual.hint.rectangle2":
                "Tiene 2 lados largos y 2 lados cortos.",

            "figuresVisual.hint.rectangle3":
                "Busca la figura que parece una puerta.",

            "figuresVisual.tryAgain":
                "¡Inténtalo de nuevo!",

            "figuresVisual.finishTitle":
                "¡Excelente! ¡Ahora tu misión!",

            "figuresVisual.finishDescription":
                "Encuentra 2 objetos de cada forma que aprendiste hoy",

            "figuresVisual.finishLearned":
                "¡Aprendiste las formas!",

            "figuresVisual.continue":
                "Continuar",

            // Learning style questionnaire
            "learningForm.pageTitle":
                "Formulario",

            "learningForm.title":
                "Cuestionario de Estilo de Aprendizaje",

            "learningForm.question1":
                "1. ¿Cómo aprende mejor el niño?",

            "learningForm.q1.visual":
                "Viendo imágenes.",

            "learningForm.q1.auditory":
                "Escuchando explicaciones.",

            "learningForm.q1.kinesthetic":
                "Haciendo actividades.",

            "learningForm.question2":
                "2. ¿Qué actividad disfruta más?",

            "learningForm.q2.visual":
                "Dibujar o colorear.",

            "learningForm.q2.auditory":
                "Escuchar cuentos.",

            "learningForm.q2.kinesthetic":
                "Construir o jugar.",

            "learningForm.question3":
                "3. ¿Qué recuerda con mayor facilidad?",

            "learningForm.q3.visual":
                "Imágenes.",

            "learningForm.q3.auditory":
                "Sonidos o palabras.",

            "learningForm.q3.kinesthetic":
                "Lo que hizo.",

            "learningForm.question4":
                "4. ¿Cómo prefiere recibir instrucciones?",

            "learningForm.q4.visual":
                "Viendo un ejemplo.",

            "learningForm.q4.auditory":
                "Escuchando la explicación.",

            "learningForm.q4.kinesthetic":
                "Intentándolo mientras aprende.",

            "learningForm.question5":
                "5. ¿Qué juguete le gusta más?",

            "learningForm.q5.visual":
                "Rompecabezas.",

            "learningForm.q5.auditory":
                "Instrumentos musicales.",

            "learningForm.q5.kinesthetic":
                "Bloques de construcción.",

            "learningForm.question6":
                "6. Cuando tiene un problema, normalmente...",

            "learningForm.q6.visual":
                "Observa antes de actuar.",

            "learningForm.q6.auditory":
                "Pregunta qué hacer.",

            "learningForm.q6.kinesthetic":
                "Prueba distintas soluciones.",

            "learningForm.question7":
                "7. ¿Qué hace en su tiempo libre?",

            "learningForm.q7.visual":
                "Mira libros con dibujos.",

            "learningForm.q7.auditory":
                "Escucha música.",

            "learningForm.q7.kinesthetic":
                "Juega y se mueve.",

            "learningForm.question8":
                "8. Cuando conoce un juguete nuevo...",

            "learningForm.q8.visual":
                "Lo observa primero.",

            "learningForm.q8.auditory":
                "Escucha cómo funciona.",

            "learningForm.q8.kinesthetic":
                "Lo prueba de inmediato.",

            "learningForm.question9":
                "9. ¿Qué material le ayuda más a aprender?",

            "learningForm.q9.visual":
                "Dibujos e imágenes.",

            "learningForm.q9.auditory":
                "Explicaciones y canciones.",

            "learningForm.q9.kinesthetic":
                "Juegos y actividades prácticas.",

            "learningForm.question10":
                "10. En clase presta más atención cuando...",

            "learningForm.q10.visual":
                "Ve demostraciones.",

            "learningForm.q10.auditory":
                "Escucha al profesor.",

            "learningForm.q10.kinesthetic":
                "Participa activamente.",

            "learningForm.submit":
                "Enviar cuestionario",

            "learningForm.detected":
                "Estilo detectado: ",

            "learningForm.error":
                "Ocurrió un error al guardar el estilo.",

            // Login
            "login.pageTitle": "Inicio de sesión",
            "login.username": "Usuario",
            "login.password": "Contraseña",
            "login.passwordPlaceholder": "*********",
            "login.button": "Iniciar sesión",
            "login.noAccount": "¿Aún no tienes una cuenta?",
            "login.register": "Regístrate",
            "login.error": "Ocurrió un error al iniciar sesión.",

            // Achievements
            "logros.pageTitle": "ThinkaRoo | Logros",
            "logros.title": "🏆 Mis logros",
            "logros.subtitle": "¡Completa actividades y consigue nuevas insignias!",
            "logros.unlocked": "Logros desbloqueados:",
            "logros.levels": "Niveles",
            "logros.progress": "Progreso",
            "logros.achievements": "Logros",
            "logros.parents": "Padres",

            "logros.completed": "✓ ¡Completado!",
            "logros.locked": "🔒 No completado",

            "logros.firstStep": "Primer paso",
            "logros.firstStepDescription": "Completaste tu primera lección.",

            "logros.curiousMind": "Mente curiosa",
            "logros.curiousMindDescription": "Completaste 10 lecciones.",

            "logros.greatExplorer": "Gran explorador",
            "logros.greatExplorerDescription": "Completa 15 lecciones.",

            "logros.visual": "Visual",
            "logros.visualDescription": "Completa una lección del aprendizaje visual.",

            "logros.perfect": "¡Perfecto!",
            "logros.perfectDescription": "Completa una actividad sin errores.",

            "logros.auditory": "Auditivo",
            "logros.auditoryDescription": "Completa una lección del aprendizaje auditivo.",

            "logros.adventurer": "Aventurero",
            "logros.adventurerDescription": "Completa 20 lecciones.",

            "logros.littleGenius": "Pequeño genio",
            "logros.littleGeniusDescription": "Consigue 5 respuestas perfectas.",

            "logros.collector": "Coleccionista",
            "logros.collectorDescription": "Consigue 10 insignias.",

            "logros.kinesthetic": "Kinestésico",
            "logros.kinestheticDescription": "Completa una lección del aprendizaje kinestésico.",

            "logros.superLearner": "Super aprendiz",
            "logros.superLearnerDescription": "Completa 30 lecciones.",

            "logros.master": "Maestro ThinkaRoo",
            "logros.masterDescription": "Desbloquea todos los logros.",

            "logros.alt.firstStep": "Primer paso",
            "logros.alt.curiousMind": "Mente curiosa",
            "logros.alt.greatExplorer": "Gran explorador",
            "logros.alt.glasses": "Lentes",
            "logros.alt.perfect": "Perfecto",
            "logros.alt.headphones": "Audífonos",
            "logros.alt.adventurer": "Aventurero",
            "logros.alt.genius": "Genio",
            "logros.alt.collector": "Coleccionista",
            "logros.alt.blocks": "Bloques",
            "logros.alt.superLearner": "Super aprendiz",
            "logros.alt.master": "Maestro ThinkaRoo",

            // Auditory Memory
            "auditoryMemory.pageTitle": "Auditivo",
            "auditoryMemory.title": "Mundo Animal: Reto de Memoria",
            "auditoryMemory.description": "Selecciona una imagen y luego el sonido correcto.",
            "auditoryMemory.animalAlt": "Animal",
            "auditoryMemory.listenAlt": "Escuchar animal",
            "auditoryMemory.finishTitle": "¡Excelente, ahora tu misión!",
            "auditoryMemory.finishDescription": "Busca 2 animales en tu hogar e imita sus sonidos",
            "auditoryMemory.finishLearned": "¡Aprendiste los animales!",
            "auditoryMemory.continue": "Continuar",


            // Kinesthetic Memory
            "kinestheticMemory.pageTitle": "Reto Kinestésico",
            "kinestheticMemory.title": "🐾 ¡Encuentra a su compañero!",
            "kinestheticMemory.instructions": "Toca y arrastra cada animal hasta su pareja.",
            "kinestheticMemory.dragAnimals": "🐾 Arrastra los animales",
            "kinestheticMemory.findPlace": "🎯 Encuentra su lugar",
            "kinestheticMemory.backToLevels": "Volver a niveles",
            "kinestheticMemory.correct": "🎉 ¡Muy bien!",
            "kinestheticMemory.tryAgain": "💪 ¡Inténtalo otra vez!",
            "kinestheticMemory.complete": "🏆 ¡Excelente! ¡Encontraste todas las parejas!",
            "kinestheticMemory.finishTitle": "¡Excelente, ahora tu misión!",
            "kinestheticMemory.finishDescription": "Busca 2 animales en tu hogar e imita sus sonidos",
            "kinestheticMemory.finishLearned": "¡Aprendiste los animales!",
            "kinestheticMemory.continue": "Continuar",
            "kinestheticMemory.cangarooAlt": "Canguro",


            "visualMemory.pageTitle": "Visual",
            "visualMemory.title": "Mundo Animal: Reto de Memoria",
            "visualMemory.description": "Selecciona las parejas de animales.",
            "visualMemory.cangarooAlt": "Canguro",
            "visualMemory.animalAlt": "Animal",
            "visualMemory.finishTitle": "¡Excelente, ahora tu misión!",
            "visualMemory.finishDescription": "Busca 2 animales en tu hogar e imita sus sonidos",
            "visualMemory.finishLearned": "¡Aprendiste los animales!",
            "visualMemory.continue": "Continuar",


            "levels.pageTitle.visual": "Niveles Visual",
            "levels.pageTitle.auditory": "Niveles Auditivo",
            "levels.pageTitle.kinesthetic": "Niveles Kinestésico",

            "levels.visual.header": "Observa y Aprende",
            "levels.visual.title": "Mira y Descubre",
            "levels.visual.description": "Observa, descubre y aprende a través de imágenes, colores y formas.",

            "levels.auditory.header": "¡Aprendamos escuchando!",
            "levels.auditory.title": "Escucha y Aprende",
            "levels.auditory.description": "Escucha cada sonido y descubre quién lo hace.",

            "levels.kinesthetic.header": "¡Aprendamos moviéndonos!",
            "levels.kinesthetic.title": "Descubre Haciendo",
            "levels.kinesthetic.description": "Realiza actividades, explora y aprende mientras te diviertes.",

            "levels.sidebar.levels": "Niveles",
            "levels.sidebar.progress": "Progreso",
            "levels.sidebar.achievements": "Logros",
            "levels.sidebar.parents": "Padres",

            "levels.profileAlt": "Foto de perfil",
            "levels.kangarooAlt": "Canguro",
            "levels.menuAlt": "Abrir menú",
            "levels.chestOpened": "🎁 ¡Has abierto un cofre!",

            "learningTypes.pageTitle": "Tipos de aprendizaje",

            "learningTypes.visual.title": "VISUAL",
            "learningTypes.visual.alt": "Visual",
            "learningTypes.visual.description1": "El aprendizaje visual es un estilo en el que los niños comprenden y retienen mejor la información mediante imágenes, colores, gráficos, dibujos y representaciones visuales. Los niños con este estilo suelen recordar con mayor facilidad aquello que observan, por lo que disfrutan de actividades que involucren elementos llamativos y organizados.",
            "learningTypes.visual.description2": "En nuestra plataforma, los niños con un estilo de aprendizaje visual encontrarán juegos y actividades diseñados para estimular su pensamiento lógico utilizando rompecabezas, secuencias de imágenes, asociaciones de figuras, patrones, colores y desafíos que requieren observar cuidadosamente para encontrar la respuesta correcta.",

            "learningTypes.auditory.title": "AUDITIVO",
            "learningTypes.auditory.alt": "Auditivo",
            "learningTypes.auditory.description1": "El aprendizaje auditivo se caracteriza porque los niños comprenden y recuerdan mejor la información cuando la escuchan. Las explicaciones habladas, los sonidos, las canciones, los diálogos y las narraciones les ayudan a procesar los conocimientos de una forma más natural y efectiva.",
            "learningTypes.auditory.description2": "En nuestra plataforma, los niños con este estilo de aprendizaje encontrarán actividades que incluyen instrucciones narradas, reconocimiento de sonidos, secuencias auditivas, juegos de memoria sonora y ejercicios en los que deberán escuchar atentamente para resolver diferentes retos lógicos. Estas dinámicas favorecen la atención y la comprensión mientras convierten el aprendizaje en una experiencia entretenida.",

            "learningTypes.kinesthetic.title": "KINESTÉSICO",
            "learningTypes.kinesthetic.alt": "Kinestésico",
            "learningTypes.kinesthetic.description1": "El aprendizaje kinestésico se basa en la experiencia, el movimiento y la interacción con el entorno. Los niños que poseen este estilo de aprendizaje comprenden mejor los conceptos cuando pueden manipular objetos, realizar acciones y participar activamente en cada actividad, ya que aprenden haciendo y experimentando.",
            "learningTypes.kinesthetic.description2": "En nuestra plataforma, los niños encontrarán actividades dinámicas que requieren mover, arrastrar, ordenar y relacionar elementos para resolver distintos desafíos. También se propondrán misiones fuera de la pantalla que les permitirán aplicar lo aprendido en situaciones de la vida cotidiana, fortaleciendo el aprendizaje mediante la práctica.",

            "learningTypes.start": "Comenzar",
            "learningTypes.previous": "Anterior",
            "learningTypes.next": "Siguiente",

    };


    const EN = {

        // General
        "page.title": "Home Page",
        "common.logo": "Logo",

        // Navigation
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.visual": "Visual",
        "nav.auditory": "Auditory",
        "nav.kinesthetic": "Kinesthetic",

        // Authentication
        "auth.createAccount": "Create account",
        "auth.login": "Sign in",

        // Carousel
        "carousel.visual": "Visual",
        "carousel.auditory": "Auditory",
        "carousel.kinesthetic": "Kinesthetic",
        "carousel.previous": "Previous",
        "carousel.next": "Next",

        // About
        "about.title": "About Us",

        "about.paragraph1":
            "We are a team committed to children's educational development, dedicated to creating an interactive platform that helps children ages 3 to 7 strengthen their logical thinking through activities, games, and challenges adapted to their learning style.",

        "about.paragraph2":
            "Our goal is to provide a fun, safe, and personalized learning experience, allowing each child to learn at their own pace while developing skills such as reasoning, problem-solving, concentration, and creativity.",

        "about.paragraph3":
            "We believe that learning through play is one of the best ways to promote children's development. That is why we combine technology, education, and interactive activities to support both children and their parents throughout this process.",

        // Learning styles
        "learning.visual.title": "Visual",

        "learning.visual.description":
            "Learn through images, colors, videos, and puzzles.",

        "learning.auditory.title": "Auditory",

        "learning.auditory.description":
            "Learn through podcasts, music, audiobooks, and sounds.",

        "learning.kinesthetic.title": "Kinesthetic",

        "learning.kinesthetic.description":
            "Learn by playing, moving, and participating in practical activities.",
        
        // Avatar
        "avatar.title": "Choose Avatar",
        "avatar.choose": "Choose your avatar",
        "avatar.save": "Save",

        "avatar.alt1": "Avatar 1",
        "avatar.alt2": "Avatar 2",
        "avatar.alt3": "Avatar 3",
        "avatar.alt4": "Avatar 4",
        "avatar.alt5": "Avatar 5",
        "avatar.alt6": "Avatar 6",
        "avatar.alt7": "Avatar 7",
        "avatar.alt8": "Avatar 8",
        "avatar.alt9": "Avatar 9",
        
        // Colors auditory game
        "colorsGame.title": "🔊 Find the Color",
        "colorsGame.description":
            "Listen to the name of the color and select the correct circle.",

        "colorsGame.points": "⭐ Points:",
        "colorsGame.round": "🎯 Round:",
        "colorsGame.listen": "🔊 Listen to color",
        "colorsGame.listenInstruction": "Listen to the color",

        "colorsGame.correct": "🎉 Correct!",
        "colorsGame.incorrect": "❌ Incorrect. Try again!",
        "colorsGame.finished": "🏆 Game finished! You scored {points} points.",

        "colorsGame.next": "Next ➜",

        "colorsGame.levelCompleteTitle": "Excellent! Now your mission!",
        "colorsGame.levelCompleteDescription":
            "Find 2 objects of each color you learned today",
        "colorsGame.levelCompleteLearned":
            "You learned the colors!",
        "colorsGame.nextLevel": "Next level",

        // Colors sorting game
        "colorsSort.title": "Sort the Colors",
        "colorsSort.description":
            "Drag each object to the correct color.",

        "colorsSort.points": "⭐ Points:",
        "colorsSort.progress": "🎯 Progress:",
        "colorsSort.instruction": "🖐️ Touch and drag the objects!",

        "colorsSort.red": "Red",
        "colorsSort.blue": "Blue",
        "colorsSort.yellow": "Yellow",
        "colorsSort.green": "Green",

        "colorsSort.apple": "Apple",
        "colorsSort.strawberry": "Strawberry",
        "colorsSort.cherries": "Cherries",
        "colorsSort.heart": "Heart",
        "colorsSort.balloon": "Balloon",

        "colorsSort.blueFish": "Blue fish",
        "colorsSort.blueBall": "Blue ball",
        "colorsSort.blueCar": "Blue car",
        "colorsSort.blueBucket": "Blue bucket",
        "colorsSort.blueCap": "Blue cap",

        "colorsSort.banana": "Banana",
        "colorsSort.corn": "Corn",
        "colorsSort.star": "Star",
        "colorsSort.chick": "Chick",
        "colorsSort.sun": "Sun",

        "colorsSort.greenApple": "Green apple",
        "colorsSort.kiwi": "Kiwi",
        "colorsSort.frog": "Frog",
        "colorsSort.tree": "Tree",
        "colorsSort.clover": "Clover",

        "colorsSort.correct1": "🌟 Great job!",
        "colorsSort.correct2": "👏 Excellent!",
        "colorsSort.correct3": "🎉 Correct!",
        "colorsSort.correct4": "⭐ Awesome!",
        "colorsSort.correct5": "😊 You did a great job!",

        "colorsSort.tryAgain": "😊 Try again!",
        "colorsSort.finishTitle": "🎉 Game finished!",
        "colorsSort.finishDescription":
            "Excellent work! You sorted all the objects.",
        "colorsSort.restart": "Next level",
        "colorsSort.apple": "Apple",
        "colorsSort.strawberry": "Strawberry",
        "colorsSort.cherries": "Cherries",
        "colorsSort.heart": "Heart",
        "colorsSort.balloon": "Balloon",

        "colorsSort.blueFish": "Blue fish",
        "colorsSort.blueBall": "Blue ball",
        "colorsSort.blueCar": "Blue car",
        "colorsSort.blueBucket": "Blue bucket",
        "colorsSort.blueCap": "Blue cap",

        "colorsSort.banana": "Banana",
        "colorsSort.corn": "Corn",
        "colorsSort.star": "Star",
        "colorsSort.chick": "Chick",
        "colorsSort.sun": "Sun",

        "colorsSort.greenApple": "Green apple",
        "colorsSort.kiwi": "Kiwi",
        "colorsSort.frog": "Frog",
        "colorsSort.tree": "Tree",
        "colorsSort.clover": "Clover",

        "colorsSort.correct1": "🌟 Great job!",
        "colorsSort.correct2": "👏 Excellent!",
        "colorsSort.correct3": "🎉 Correct!",
        "colorsSort.correct4": "⭐ Awesome!",
        "colorsSort.correct5": "😊 You did a great job!",

        "colorsSort.tryAgain": "😊 Try again!",
        "colorsSort.levelCompleteTitle":
            "Excellent! Now your mission!",
        "colorsSort.levelCompleteDescription":
            "Find 2 objects of each color you learned today.",
        "colorsSort.levelCompleteLearned":
            "You learned the colors!",
        "colorsSort.nextLevel":
            "➡️ Next level",

            /* =====================================================
            COLORS - VISUAL GAME
            ===================================================== */

            "colorsVisual.pageTitle":
                "Colors - Visual Game",

            "colorsVisual.title":
                "🌈 Sort the Colors!",

            "colorsVisual.description":
                "Touch an object and then touch the box with the same color.",

            "colorsVisual.points":
                "⭐ Points:",

            "colorsVisual.round":
                "🎯 Round:",

            "colorsVisual.of":
                "/ 5",

            "colorsVisual.selectObject":
                "Select an object!",

            "colorsVisual.chooseBox":
                "Now touch the",

            "colorsVisual.red":
                "Red",

            "colorsVisual.blue":
                "Blue",

            "colorsVisual.yellow":
                "Yellow",

            "colorsVisual.green":
                "Green",

            "colorsVisual.apple":
                "Apple",

            "colorsVisual.blueBerry":
                "Blueberry",

            "colorsVisual.lemon":
                "Lemon",

            "colorsVisual.greenApple":
                "Green apple",

            "colorsVisual.selectFirst":
                "👆 First select an object.",

            "colorsVisual.correct":
                "🎉 Great job!",

            "colorsVisual.wrong":
                "😊 That's not its color. Try again!",

            "colorsVisual.findAnother":
                "Find another object! 😊",

            "colorsVisual.roundComplete":
                "🎉 You completed the round!",

            "colorsVisual.excellent":
                "Excellent work! ⭐",

            "colorsVisual.next":
                "Next ➜",

            "colorsVisual.gameComplete":
                "🏆 Game complete!",

            "colorsVisual.finalScore":
                "You scored {points} points ⭐",

            "colorsVisual.levelCompleteTitle":
                "Excellent! Now your mission!",

            "colorsVisual.levelCompleteDescription":
                "Find 2 objects of each color you learned today.",

            "colorsVisual.levelCompleteLearned":
                "You learned the colors!",

            "colorsVisual.nextLevel":
                "➡️ Next level",

            "colorsVisual.selectBox": "Now touch the {color} box 👆",
            "colorsVisual.findAnother": "Find another object! 😊",
            "colorsVisual.selectFirst": "👆 First select an object.",
            "colorsVisual.correct": "🎉 Very good!",
            "colorsVisual.wrong": "😊 That's not its color. Try again!",
            "colorsVisual.roundComplete": "🎉 You completed the round!",
            "colorsVisual.excellent": "Excellent work! ⭐",
            "colorsVisual.gameComplete": "🏆 Game over!",
            "colorsVisual.finalScore": "You got {points} points ⭐",

            // Registration
            "register.subtitle": "Let's learn together!",
            "register.name": "Name",
            "register.namePlaceholder": "Parent/guardian name",
            "register.email": "Email",
            "register.emailPlaceholder": "email@example.com",
            "register.password": "Password",
            "register.confirmPassword": "Confirm password",
            "register.button": "Register",
            "register.alreadyAccount": "Already have an account?",
            "register.login": "Log in",

            "register.passwordMismatch":
                "The passwords do not match",

            "register.registrationError":
                "An error occurred while registering the user.",


                    // Child information
            "childData.pageTitle": "Child's Information",
            "childData.childName": "Child's name",
            "childData.childNamePlaceholder": "👦🏻 Enter the name",
            "childData.childAge": "Child's age",
            "childData.agePlaceholder": "📆",
            "childData.continue": "Continue →",
            "childData.saved": "Data saved successfully",
            "childData.error": "An error occurred while saving the data.",

            // Figures auditory game
            "figuresAuditory.pageTitle":
                "Sort the Shapes - Auditory",

            "figuresAuditory.title":
                "🔊 LISTEN AND SORT",

            "figuresAuditory.description":
                "Listen carefully and select the shape you heard.",

            "figuresAuditory.listen":
                "🔊 LISTEN",

            "figuresAuditory.initialInstruction":
                "Press the button to listen.",

            "figuresAuditory.listenInstruction":
                "Press LISTEN to hear the shape.",

            "figuresAuditory.searchInstruction":
                "Listen and find the correct shape.",

            "figuresAuditory.circle":
                "circle",

            "figuresAuditory.square":
                "square",

            "figuresAuditory.triangle":
                "triangle",

            "figuresAuditory.rectangle":
                "rectangle",

            "figuresAuditory.correct":
                "🎉 Great job!",

            "figuresAuditory.incorrect":
                "😊 Almost! Listen again.",

            "figuresAuditory.correctVoice":
                "Great job!",

            "figuresAuditory.incorrectVoice":
                "Almost. Listen again.",

            "figuresAuditory.hintAgain":
                "Listen again.",

            "figuresAuditory.closeHint":
                "TRY AGAIN!",

            "figuresAuditory.hint.circle1":
                "It has no corners.",

            "figuresAuditory.hint.circle2":
                "It is completely round.",

            "figuresAuditory.hint.circle3":
                "Think of a ball.",

            "figuresAuditory.hint.square1":
                "It has four sides.",

            "figuresAuditory.hint.square2":
                "Its four sides are equal.",

            "figuresAuditory.hint.square3":
                "Think of a window.",

            "figuresAuditory.hint.triangle1":
                "It has three sides.",

            "figuresAuditory.hint.triangle2":
                "It has three corners.",

            "figuresAuditory.hint.triangle3":
                "Think of a mountain.",

            "figuresAuditory.hint.rectangle1":
                "It has four sides.",

            "figuresAuditory.hint.rectangle2":
                "It has two long sides and two short sides.",

            "figuresAuditory.hint.rectangle3":
                "Think of a door.",

            "figuresAuditory.finishTitle":
                "Excellent! Now your mission!",

            "figuresAuditory.finishDescription":
                "Find 2 objects of each shape you learned today",

            "figuresAuditory.finishLearned":
                "You learned the shapes!",

            "figuresAuditory.continue":
                "Continue",


            // Visual shapes
            "figuresVisual.pageTitle":
                "Sort the Shapes",

            "figuresVisual.title":
                "SORT THE SHAPES",

            "figuresVisual.description":
                "Drag each shape to its place",

            "figuresVisual.circle":
                "CIRCLE",

            "figuresVisual.square":
                "SQUARE",

            "figuresVisual.triangle":
                "TRIANGLE",

            "figuresVisual.rectangle":
                "RECTANGLE",

            "figuresVisual.correct":
                "🎉 Great job!",

            "figuresVisual.complete":
                "🎉 Excellent! You completed the game",

            "figuresVisual.incorrect":
                "😊 Almost!",

            "figuresVisual.hint.circle1":
                "Look carefully. The circle has no corners.",

            "figuresVisual.hint.circle2":
                "Look at its edge. It is completely round.",

            "figuresVisual.hint.circle3":
                "Look for the shape that looks like a ball.",

            "figuresVisual.hint.square1":
                "Look at its sides. It has 4 sides.",

            "figuresVisual.hint.square2":
                "Its 4 sides are the same size.",

            "figuresVisual.hint.square3":
                "Look for the shape with 4 equal sides.",

            "figuresVisual.hint.triangle1":
                "Look at its corners. It has 3.",

            "figuresVisual.hint.triangle2":
                "Count its sides. It has 3.",

            "figuresVisual.hint.triangle3":
                "Look for the shape that looks like a mountain.",

            "figuresVisual.hint.rectangle1":
                "Look at its sides. It has 4.",

            "figuresVisual.hint.rectangle2":
                "It has 2 long sides and 2 short sides.",

            "figuresVisual.hint.rectangle3":
                "Look for the shape that looks like a door.",

            "figuresVisual.tryAgain":
                "Try again!",

            "figuresVisual.finishTitle":
                "Excellent! Now your mission!",

            "figuresVisual.finishDescription":
                "Find 2 objects of each shape you learned today",

            "figuresVisual.finishLearned":
                "You learned the shapes!",

            "figuresVisual.continue":
                "Continue",

            // Learning style questionnaire
            "learningForm.pageTitle":
                "Assessment",

            "learningForm.title":
                "Learning Style Assessment",

            "learningForm.question1":
                "1. How does the child learn best?",

            "learningForm.q1.visual":
                "By looking at images.",

            "learningForm.q1.auditory":
                "By listening to explanations.",

            "learningForm.q1.kinesthetic":
                "By doing activities.",

            "learningForm.question2":
                "2. Which activity does the child enjoy the most?",

            "learningForm.q2.visual":
                "Drawing or coloring.",

            "learningForm.q2.auditory":
                "Listening to stories.",

            "learningForm.q2.kinesthetic":
                "Building or playing.",

            "learningForm.question3":
                "3. What does the child remember most easily?",

            "learningForm.q3.visual":
                "Images.",

            "learningForm.q3.auditory":
                "Sounds or words.",

            "learningForm.q3.kinesthetic":
                "What they did.",

            "learningForm.question4":
                "4. How does the child prefer to receive instructions?",

            "learningForm.q4.visual":
                "By seeing an example.",

            "learningForm.q4.auditory":
                "By listening to the explanation.",

            "learningForm.q4.kinesthetic":
                "By trying while learning.",

            "learningForm.question5":
                "5. Which toy does the child like the most?",

            "learningForm.q5.visual":
                "Puzzles.",

            "learningForm.q5.auditory":
                "Musical instruments.",

            "learningForm.q5.kinesthetic":
                "Building blocks.",

            "learningForm.question6":
                "6. When the child has a problem, they usually...",

            "learningForm.q6.visual":
                "Observe before acting.",

            "learningForm.q6.auditory":
                "Ask what to do.",

            "learningForm.q6.kinesthetic":
                "Try different solutions.",

            "learningForm.question7":
                "7. What does the child do in their free time?",

            "learningForm.q7.visual":
                "Looks at books with pictures.",

            "learningForm.q7.auditory":
                "Listens to music.",

            "learningForm.q7.kinesthetic":
                "Plays and moves around.",

            "learningForm.question8":
                "8. When the child gets a new toy...",

            "learningForm.q8.visual":
                "Looks at it first.",

            "learningForm.q8.auditory":
                "Listens to how it works.",

            "learningForm.q8.kinesthetic":
                "Tries it immediately.",

            "learningForm.question9":
                "9. What material helps the child learn the most?",

            "learningForm.q9.visual":
                "Drawings and images.",

            "learningForm.q9.auditory":
                "Explanations and songs.",

            "learningForm.q9.kinesthetic":
                "Games and practical activities.",

            "learningForm.question10":
                "10. In class, the child pays more attention when...",

            "learningForm.q10.visual":
                "They see demonstrations.",

            "learningForm.q10.auditory":
                "They listen to the teacher.",

            "learningForm.q10.kinesthetic":
                "They participate actively.",

            "learningForm.submit":
                "Submit questionnaire",

            "learningForm.detected":
                "Detected learning style: ",

            "learningForm.error":
                "An error occurred while saving the learning style.",

            // Login
            "login.pageTitle": "Login",
            "login.username": "Username",
            "login.password": "Password",
            "login.passwordPlaceholder": "*********",
            "login.button": "Log in",
            "login.noAccount": "Don't have an account yet?",
            "login.register": "Sign up",
            "login.error": "An error occurred while logging in.",


            // Achievements
            "logros.pageTitle": "ThinkaRoo | Achievements",
            "logros.title": "🏆 My Achievements",
            "logros.subtitle": "Complete activities and earn new badges!",
            "logros.unlocked": "Achievements unlocked:",
            "logros.levels": "Levels",
            "logros.progress": "Progress",
            "logros.achievements": "Achievements",
            "logros.parents": "Parents",

            "logros.completed": "✓ Completed!",
            "logros.locked": "🔒 Not completed",

            "logros.firstStep": "First Step",
            "logros.firstStepDescription": "You completed your first lesson.",

            "logros.curiousMind": "Curious Mind",
            "logros.curiousMindDescription": "You completed 10 lessons.",

            "logros.greatExplorer": "Great Explorer",
            "logros.greatExplorerDescription": "Complete 15 lessons.",

            "logros.visual": "Visual",
            "logros.visualDescription": "Complete a visual learning lesson.",

            "logros.perfect": "Perfect!",
            "logros.perfectDescription": "Complete an activity without mistakes.",

            "logros.auditory": "Auditory",
            "logros.auditoryDescription": "Complete an auditory learning lesson.",

            "logros.adventurer": "Adventurer",
            "logros.adventurerDescription": "Complete 20 lessons.",

            "logros.littleGenius": "Little Genius",
            "logros.littleGeniusDescription": "Get 5 perfect answers.",

            "logros.collector": "Collector",
            "logros.collectorDescription": "Earn 10 badges.",

            "logros.kinesthetic": "Kinesthetic",
            "logros.kinestheticDescription": "Complete a kinesthetic learning lesson.",

            "logros.superLearner": "Super Learner",
            "logros.superLearnerDescription": "Complete 30 lessons.",

            "logros.master": "ThinkaRoo Master",
            "logros.masterDescription": "Unlock all achievements.",

            "logros.alt.firstStep": "First Step",
            "logros.alt.curiousMind": "Curious Mind",
            "logros.alt.greatExplorer": "Great Explorer",
            "logros.alt.glasses": "Glasses",
            "logros.alt.perfect": "Perfect",
            "logros.alt.headphones": "Headphones",
            "logros.alt.adventurer": "Adventurer",
            "logros.alt.genius": "Genius",
            "logros.alt.collector": "Collector",
            "logros.alt.blocks": "Blocks",
            "logros.alt.superLearner": "Super Learner",
            "logros.alt.master": "ThinkaRoo Master",


            // Auditory Memory
            "auditoryMemory.pageTitle": "Auditory",
            "auditoryMemory.title": "Animal World: Memory Challenge",
            "auditoryMemory.description": "Select an image and then the correct sound.",
            "auditoryMemory.animalAlt": "Animal",
            "auditoryMemory.listenAlt": "Listen to animal",
            "auditoryMemory.finishTitle": "Excellent, now your mission!",
            "auditoryMemory.finishDescription": "Find 2 animals at home and imitate their sounds",
            "auditoryMemory.finishLearned": "You learned the animals!",
            "auditoryMemory.continue": "Continue",


            // Kinesthetic Memory
            "kinestheticMemory.pageTitle": "Kinesthetic Challenge",
            "kinestheticMemory.title": "🐾 Find their partner!",
            "kinestheticMemory.instructions": "Touch and drag each animal to its partner.",
            "kinestheticMemory.dragAnimals": "🐾 Drag the animals",
            "kinestheticMemory.findPlace": "🎯 Find their place",
            "kinestheticMemory.backToLevels": "Back to levels",
            "kinestheticMemory.correct": "🎉 Great job!",
            "kinestheticMemory.tryAgain": "💪 Try again!",
            "kinestheticMemory.complete": "🏆 Excellent! You found all the pairs!",
            "kinestheticMemory.finishTitle": "Excellent, now your mission!",
            "kinestheticMemory.finishDescription": "Find 2 animals at home and imitate their sounds",
            "kinestheticMemory.finishLearned": "You learned the animals!",
            "kinestheticMemory.continue": "Continue",
            "kinestheticMemory.cangarooAlt": "Kangaroo",


            "visualMemory.pageTitle": "Visual",
            "visualMemory.title": "Animal World: Memory Challenge",
            "visualMemory.description": "Match the animal pairs.",
            "visualMemory.cangarooAlt": "Kangaroo",
            "visualMemory.animalAlt": "Animal",
            "visualMemory.finishTitle": "Excellent, now your mission!",
            "visualMemory.finishDescription": "Find 2 animals at home and imitate their sounds",
            "visualMemory.finishLearned": "You learned the animals!",
            "visualMemory.continue": "Continue",


            "levels.pageTitle.visual": "Visual Levels",
            "levels.pageTitle.auditory": "Auditory Levels",
            "levels.pageTitle.kinesthetic": "Kinesthetic Levels",

            "levels.visual.header": "Observe and Learn",
            "levels.visual.title": "Look and Discover",
            "levels.visual.description": "Observe, discover, and learn through images, colors, and shapes.",

            "levels.auditory.header": "Let's Learn by Listening!",
            "levels.auditory.title": "Listen and Learn",
            "levels.auditory.description": "Listen to each sound and discover who makes it.",

            "levels.kinesthetic.header": "Let's Learn by Moving!",
            "levels.kinesthetic.title": "Discover by Doing",
            "levels.kinesthetic.description": "Do activities, explore, and learn while having fun.",

            "levels.sidebar.levels": "Levels",
            "levels.sidebar.progress": "Progress",
            "levels.sidebar.achievements": "Achievements",
            "levels.sidebar.parents": "Parents",

            "levels.profileAlt": "Profile picture",
            "levels.kangarooAlt": "Kangaroo",
            "levels.menuAlt": "Open menu",
            "levels.chestOpened": "🎁 You opened a treasure chest!",

            "learningTypes.pageTitle": "Learning Styles",
            "learningTypes.visual.title": "VISUAL",
            "learningTypes.visual.alt": "Visual",
            "learningTypes.visual.description1": "Visual learning is a style in which children understand and retain information better through images, colors, graphics, drawings, and visual representations. Children with this learning style tend to remember what they see more easily, so they enjoy activities that involve engaging and organized elements.",
            "learningTypes.visual.description2": "On our platform, children with a visual learning style will find games and activities designed to stimulate logical thinking through puzzles, image sequences, shape associations, patterns, colors, and challenges that require careful observation to find the correct answer.",

            "learningTypes.auditory.title": "AUDITORY",
            "learningTypes.auditory.alt": "Auditory",
            "learningTypes.auditory.description1": "Auditory learning is characterized by children understanding and remembering information better when they hear it. Spoken explanations, sounds, songs, dialogues, and narrations help them process knowledge in a more natural and effective way.",
            "learningTypes.auditory.description2": "On our platform, children with this learning style will find activities that include narrated instructions, sound recognition, auditory sequences, sound memory games, and exercises in which they must listen carefully to solve different logical challenges. These activities encourage attention and understanding while turning learning into an entertaining experience.",

            "learningTypes.kinesthetic.title": "KINESTHETIC",
            "learningTypes.kinesthetic.alt": "Kinesthetic",
            "learningTypes.kinesthetic.description1": "Kinesthetic learning is based on experience, movement, and interaction with the environment. Children with this learning style understand concepts better when they can manipulate objects, perform actions, and actively participate in each activity, as they learn by doing and experimenting.",
            "learningTypes.kinesthetic.description2": "On our platform, children will find dynamic activities that require them to move, drag, sort, and match elements to solve different challenges. They will also be given missions outside the screen that allow them to apply what they have learned in everyday situations, strengthening learning through practice.",

            "learningTypes.start": "Start",
            "learningTypes.previous": "Previous",
            "learningTypes.next": "Next",
    };


    const translations = {
        es: ES,
        en: EN
    };


    const STORAGE_KEY = "thinkarooIdioma";

    let currentLanguage = "en";


    function getSavedLanguage() {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved === "es" || saved === "en") {
            return saved;
        }

        return "en";
    }


    function saveLanguage(language) {

        const validLanguage =
            language === "es" ? "es" : "en";

        localStorage.setItem(
            STORAGE_KEY,
            validLanguage
        );
    }


    function translate(key, fallback = "") {

        if (!key) {
            return fallback;
        }

        const dictionary =
            translations[currentLanguage] || EN;

        if (
            Object.prototype.hasOwnProperty.call(
                dictionary,
                key
            )
        ) {
            return dictionary[key];
        }

        return fallback || key;
    }


    function applyTranslations(root = document) {

        if (!root || !root.querySelectorAll) {
            return;
        }


        // Normal text
        root.querySelectorAll("[data-i18n]").forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            const value = translate(key);

            if (value) {
                element.textContent = value;
            }

        });


        // Placeholder
        root.querySelectorAll(
            "[data-i18n-placeholder]"
        ).forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            const value = translate(key);

            if (value) {
                element.setAttribute(
                    "placeholder",
                    value
                );
            }

        });


        // Alt text
        root.querySelectorAll(
            "[data-i18n-alt]"
        ).forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-alt"
                );

            const value = translate(key);

            if (value) {
                element.setAttribute(
                    "alt",
                    value
                );
            }

        });


        // Aria label
        root.querySelectorAll(
            "[data-i18n-aria-label]"
        ).forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-aria-label"
                );

            const value = translate(key);

            if (value) {
                element.setAttribute(
                    "aria-label",
                    value
                );
            }

        });


        // Title
        root.querySelectorAll(
            "[data-i18n-title]"
        ).forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-title"
                );

            const value = translate(key);

            if (value) {
                element.setAttribute(
                    "title",
                    value
                );
            }

        });


        // Page language
        document.documentElement.lang =
            currentLanguage;
    }


    function changeLanguage(language) {

        currentLanguage =
            language === "es" ? "es" : "en";

        saveLanguage(currentLanguage);

        applyTranslations(document);


        const selector =
            document.getElementById("idioma");

        if (selector) {
            selector.value = currentLanguage;
        }


        window.dispatchEvent(
            new CustomEvent(
                "thinkarooLanguageChanged",
                {
                    detail: {
                        language: currentLanguage
                    }
                }
            )
        );
    }


    function setupLanguageSelector() {

        const selector =
            document.getElementById("idioma");

        if (!selector) {
            return;
        }

        selector.value = currentLanguage;


        selector.addEventListener(
            "change",
            function () {

                changeLanguage(
                    this.value
                );

            }
        );
    }


    function init() {

        currentLanguage =
            getSavedLanguage();

        applyTranslations(document);

        setupLanguageSelector();


        // Translate elements added dynamically
        const observer =
            new MutationObserver(
                mutations => {

                    mutations.forEach(
                        mutation => {

                            mutation.addedNodes.forEach(
                                node => {

                                    if (
                                        node.nodeType ===
                                        Node.ELEMENT_NODE
                                    ) {

                                        applyTranslations(
                                            node
                                        );

                                    }

                                }
                            );

                        }
                    );

                }
            );


        if (document.body) {

            observer.observe(
                document.body,
                {
                    childList: true,
                    subtree: true
                }
            );

        }

    }


    // Public functions
    window.translate = translate;

    window.changeLanguage =
        changeLanguage;

    window.getCurrentLanguage =
        () => currentLanguage;

    window.applyTranslations =
        applyTranslations;


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
