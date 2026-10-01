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
                "➡️ Siguiente nivel"


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
                "➡️ Next level"
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
