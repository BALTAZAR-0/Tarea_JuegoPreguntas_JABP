document.addEventListener("DOMContentLoaded", function () {
    const preguntas = [
        { 
            pregunta: "¿Qué famosa pintura fue creada por Leonardo da Vinci?", 
            opciones: ["La noche estrellada", "La última cena", "El grito", "Las señoritas de Avignon", "La persistencia de la memoria"], 
            respuesta: "La última cena" 
        },
        { 
            pregunta: "¿Qué selección nacional ha ganado más Copas del Mundo de la FIFA?", 
            opciones: ["Alemania", "Argentina", "Brasil", "Francia", "Italia"], 
            respuesta: "Brasil" 
        },
        { 
            pregunta: "¿Cuál es el volcán más alto de Guatemala y Centroamérica?", 
            opciones: ["Volcán Arenal", "Volcán Popocatépetl", "Volcán Pacaya", "Volcán de Fuego", "Volcán Tajumulco"], 
            respuesta: "Volcán Tajumulco" 
        },
        { 
            pregunta: "¿Cuál es la montaña más alta del mundo?", 
            opciones: ["Montaña McKinley", "Montaña Kilimanjaro", "Montaña Everest", "Montaña Aconcagua", "Montaña Fuji"], 
            respuesta: "Montaña Everest" 
        },
        { 
            pregunta: "¿Cuál es la capital de Japón?", 
            opciones: ["Pekín", "Seúl", "Tokio", "Bangkok", "Kuala Lumpur"], 
            respuesta: "Tokio" 
        }
    ];

    let cuentaRegresiva;
    let iniciarTiempo;
    let tiempoTerminado = false; // Nueva variable para controlar el tiempo terminado
    let respuestas = [];

    function iniciarCuenta() {
        let seconds = 30;
        cuentaRegresiva = setInterval(function () {
            const currentTime = new Date().getTime();
            const elapsedTime = Math.floor((currentTime - iniciarTiempo) / 1000);
            const remainingSeconds = seconds - elapsedTime;
            document.getElementById("countdown").innerText = `Tiempo restante: ${remainingSeconds} segundos`;
            if (remainingSeconds <= 0) {
                clearInterval(cuentaRegresiva);
                tiempoTerminado = true;
                document.getElementById("countdown").innerText = "Tiempo terminado.";
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("submitBtn").style.backgroundColor = "#ccc";
                document.getElementById("retryBtn").disabled = false;
                showAlert();
            }
        }, 1000);
    }

    function showAlert() {
        const RespuestasCorrectas = preguntas.filter((q, index) => respuestas[index].toLowerCase() === q.respuesta.toLowerCase());
        const RespuestasIncorrectas = preguntas.filter((q, index) => respuestas[index].toLowerCase() !== q.respuesta.toLowerCase());
        let message = "Respuestas enviadas:\n";
        if (RespuestasCorrectas.length === 0) {
            message += "No se envió ninguna respuesta correcta.";
        } else {
            message += "Respuestas correctas:\n";
            RespuestasCorrectas.forEach((q) => {
                message += `${q.pregunta}: ${q.respuesta}\n`;
            });
            if (RespuestasIncorrectas.length > 0) {
                message += "\nRespuestas incorrectas:\n";
                RespuestasIncorrectas.forEach((q) => {
                    message += `${q.pregunta}: ${respuestas[preguntas.indexOf(q)]}\n`;
                });
            }
        }
        alert(message);
    }

    function resetForm() {
        clearInterval(cuentaRegresiva);
        tiempoTerminado = false; // Reiniciar la variable de tiempo terminado
        document.getElementById("FormPregunta").reset();
        document.getElementById("countdown").innerText = "";
        document.getElementById("submitBtn").disabled = true;
        document.getElementById("submitBtn").style.backgroundColor = "#ccc";
        document.getElementById("retryBtn").disabled = true;
        document.getElementById("startBtn").disabled = false;
        respuestas = [];
    }

    function generarpreguntas() {
        const form = document.getElementById("FormPregunta");
        const preguntaDivs = form.getElementsByClassName("pregunta");
        if (preguntaDivs.length === 0) {
            preguntas.forEach((q, index) => {
                const preguntaDiv = document.createElement("div");
                preguntaDiv.className = "pregunta";
                const opciones = q.opciones.map(option => `<option value="${option}">${option}</option>`).join('');
                preguntaDiv.innerHTML = `<label>${q.pregunta}</label><select name="respuesta${index + 1}" required><option value="" disabled selected>Selecciona una opción</option>${opciones}</select>`;
                form.appendChild(preguntaDiv);
            });
        }
    }

    document.getElementById("startBtn").addEventListener("click", function () {
        iniciarTiempo = new Date().getTime();
        iniciarCuenta();
        this.disabled = true;
        document.getElementById("submitBtn").disabled = true;
        document.getElementById("retryBtn").disabled = true;
        generarpreguntas();
    });

    document.getElementById("FormPregunta").addEventListener("change", function () {
        if (!tiempoTerminado) { // Solo habilitar el botón si el tiempo no ha terminado
            if (this.checkValidity()) {
                document.getElementById("submitBtn").disabled = false;
                document.getElementById("submitBtn").style.backgroundColor = "#007bff";
            } else {
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("submitBtn").style.backgroundColor = "#ccc";
            }
        }

        // Store respuestas
        respuestas = [];
        const selects = document.getElementsByTagName("select");
        for (let i = 0; i < selects.length; i++) {
            respuestas.push(selects[i].value.toLowerCase());
        }
    });

    document.getElementById("submitBtn").addEventListener("click", function () {
        if (!tiempoTerminado) { // Solo mostrar la alerta si el tiempo no ha terminado
            clearInterval(cuentaRegresiva);
            showAlert();
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("submitBtn").style.backgroundColor = "#ccc";
            document.getElementById("retryBtn").disabled = false;
        }
    });

    document.getElementById("retryBtn").addEventListener("click", function () {
        resetForm();
    });
});
