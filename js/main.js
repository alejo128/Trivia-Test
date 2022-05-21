(function() {
     document.getElementById('txtNombre').focus();
})();

let index = 0;
let respuestasCorrectas = [];
let preguntas = [];
let alternativas = [];
let respuestas = [];
const tiempo = 10;
let countdownfunction;

function validarNombre() {
    let nombre = document.getElementById('txtNombre').value;
    if(nombre.length === 0) {
        alert('Por favor ingresa tu nombre');
        document.getElementById('txtNombre').focus();
    } else {
        bienvenida(nombre);
    }
}

function bienvenida(nombre) {

    mostrarDiv('categoria');
    document.getElementById('msgHola').innerHTML = `¡Bienvenido ${nombre}!`;

}

function cargarPreguntasTipo(tipo) {
    
    let titulo = '';
    reiniciar();

    if(tipo === 'A') {
        preguntas = [
            "1.- ¿Cuál es el nombre de Ironman?",
            "2.- El Demogorgon es el antagonista de una serie de Netflix... ¿Cuál?",
            "3.- ¿Cómo se llama la ciudad en la que vivía el Mago de Oz?",
            "4.- ¿Qué película hizo famoso al director James Cameron?",
            "5.- ¿Quiénes son los protagonistas de la película \"Pretty Woman\"?",


        ];

        alternativas = [
            ["Toño Centella","Anthony Stark","Tony Stark","Anthony García","Howard Stark"],
            ["Stranger Things","Black Summer","Dulce Hogar","Resident Evil","La Niebla"],
            ["Ciudad Verde","Ciudad Amarilla","Ciudad Ruby","Ciudad Esmeralda","Ciudad de Oz"],
            ["Terminator","Titanic","Avatar","Rambo","Aliens: el regreso"],
            ["Laura San Giacomo y Richard Gere","Judith Baldwin y James Patrick Stuart","Julia Roberts y Richard Gere","Julia Roberts y Hector Elizondo","Andrea Parker y Patrick Richwood"]
        ];
        

        respuestas = [
            2,
            0,
            3,
            1,
            2
        ];

        titulo = 'Entrenimiento';

    } else if(tipo === 'B') {
        preguntas = [
            "1.- ¿Cuál es el rio mas largo del mundo?",
            "2.- ¿Cuál es la capital de Uruguay?",
            "3.- ¿Cómo se llama en nevado más alto del Perú?",
            "4.- ¿Qué idioma es el más hablado en el planeta?",
            "5.- ¿Qué río es el más caudaloso del planeta?"

        ];

        alternativas = [
            ["Nilo","Amazonas","Rimac","Yangtze River","Rio Misisipi"],
            ["Asunción","Rosario","Montevideo","Maldonado", "Punta del Este"],
            ["Aconcagua","Coropuna","Pastoruri","Huascarán","Alpamayo"],
            ["Hindi","Mandarin","Español","Frances","Ingles"],
            ["Yenisei","Amazonas","Orinoco","Congo","Paraná"]
        ];

        respuestas = [
            0,
            2,
            3,
            4,
            1
        ];

        titulo = 'Geografía';

    } else if(tipo === 'C') {
        preguntas = [
            "1.- ¿Con qué nombre se conoce el miedo a las alturas?",
            "2.- ¿Cual fue el nombre que le pusieron a la primera Oveja clonada?",
            "3.- ¿Qué célula se encuentra tanto en humanos como en animales?",
            "4.- ¿Cual es el organo mas grande del cuerpo humano?",
            "5.- ¿Cual de estas no es el nombre con el cual se denominan las bases del ADN?"

        ];

        alternativas = [
            ["Acrofobia","Aerofobia","Amaxofobia","Agarofobia","Sitofobia"],
            ["Molly","Polly","Dolly","Dori","Sally"],
            ["Epiteliales","Fibroblastos","Miocitos","Neuroglias","Neuronas"],
            ["la Piel","el Hígado","el Intestino","El Cerebro","El Corazón"],
            ["guanina","adenina","timina","oxitocina","citocina"]
        ];

        respuestas = [
            0,
            2,
            4,
            0,
            3
        ];

        titulo = 'Ciencias';
    } else if(tipo === 'D') {
        preguntas = [
            "1.- La caída de Constantinopla significó el fin del Imperio Bizantino. ¿En qué año sucedió?",
            "2.- ¿Cuál era la moneda utilizada en España antes del euro?",
            "3.- ¿Quién fue el primer presidente de Estados Unidos?",
            "4.- ¿Cuándo se creó la ONU?",
            "5.- ¿Cuál es el nombre de la batalla marítima de 1805?"

        ];

        alternativas = [
            ["1452","1456","1450","1453","1454"],
            ["Corona","Peseta","Rublo","Rublo", "Franco"],
            ["Andrew Jackson","John Adams","George Washington","James Madison","Thomas Jefferson"],
            ["1945","1944","1943","1940","1949"],
            ["Batalla de Cabo Bon","Batalla del Cabo Matapán","Batalla de Calabria","Batalla de Dakar","Batalla de Trafalgar"]
        ];

        respuestas = [
            3,
            1,
            2,
            0,
            4
        ];

        titulo = 'Historia';
    } else if(tipo === 'E') {
        preguntas = [
            "1.- ¿Cuál es el pseudónimo del escritor Eric Arthur Blair?",
            "2.- ¿Cuál es el título del libro que da origen a la película \"Blade Runner\"?",
            "3.- ¿Cuál era el nombre artístico con el que firmaba Vincent Van Gogh sus obras?",
            "4.- ¿Cómo se llamaba el caballo que pertenecía a Don Quijote de La Mancha?",
            "5.- ¿Qué animal mitológico da nombre al título de una de las obras más populares de Thomas Hobbes?"

        ];

        alternativas = [
            ["Arthur Blair","George Blair","Eric Blair","George Orwell","Eric A. Blair"],
            ["¿Que sueñan los androides?","¿Sueñan los androides con ovejas eléctricas?","los Desposeídos","el Dador","Un mundo feliz"],
            ["Vincent V","Vincent Van G","Vicent Van Gogh","Vincent W","Vincent"],
            ["Rocinante","Pegaso","Bucéfalo","Babieca","Tornado"],
            ["Esfinge","León de Nemea","Leviatán","Medusa","Cerbero"]
        ];

        respuestas = [
            3,
            1,
            4,
            0,
            2
        ];

        titulo = 'Arte y Literatura';
    }

    document.getElementById('msgCategoria').innerHTML = titulo;
    mostrarDiv('jugar');
    cargarPreguntas(index);

}

function siguiente() {
    document.getElementById('divRespuesta').style.display = 'none';
    index++;
    clearInterval(countdownfunction);
    if(index <= preguntas.length-1) {  
        cargarPreguntas(index);
    }
    
    if(index === preguntas.length) {  
        verResultados();
    }

}

function cargarPreguntas(indice) {
    
        document.getElementById('pregunta').innerHTML = preguntas[indice];
        let opciones = "";
        for(let j=0; j<alternativas[indice].length; j++) {
            opciones += "<p>";
            opciones += "<label class='opcion'><input type='radio' class='radios' onclick='revisarRespuesta("+j+")' name='opc' >"+ alternativas[indice][j] +"</label> ";
            opciones += "</p>";
        }
        
        document.getElementById('alternativas').innerHTML = opciones;
        
        iniciarTimer();

}

function iniciarTimer() {
    let trestante = tiempo;
    document.getElementById('timer').innerHTML = trestante;
    countdownfunction = setInterval(function() {
        trestante--;

        if(trestante === 0) {
            document.getElementById("timer").innerHTML = "X";
        } else if(trestante < 0) {
            trestante = tiempo;
            siguiente();
        } else {
            document.getElementById('timer').innerHTML = trestante;
        }
        console.log(trestante);
 

    },1000);

    
}

function revisarRespuesta(respuesta) {
    
    document.getElementById('divRespuesta').style.display = 'block';
    let mensaje = "RESPUESTA INCORRECTA :(";
    let color='red';
    

    if(respuestas[index] === respuesta) {
        mensaje = "RESPUESTA CORRECTA :)";
        respuestasCorrectas.push(index);
        color='green';
    }
    document.getElementById('divRespuesta').style.background =color;
    document.getElementById('divRespuesta').innerHTML = mensaje;
    deshabilitarRadios('radios');

}

function verResultados() {
    mostrarDiv('resultados');
    let template = '';
    let tempEstado = '';
    for(let i=0; i < preguntas.length; i++) {
        template += '<p>';
        
        let estado = 'INCORRECTO';
        let classEstado = 'incorrecto';
        for(let x of respuestasCorrectas) {
            if(x === i) {
                estado = 'CORRECTO';
                classEstado = 'correcto';
                break;
            }
        }

        tempEstado += '<label class="'+classEstado+'">'+estado+'</label>';
        template += '<h3>'+preguntas[i]+' '+tempEstado+'</h3>';

        template += '</p>';
        tempEstado = '';
    }

    document.getElementById('divresultado').innerHTML = template;

}


function mostrarDiv(div) {
    let ocultos = document.getElementsByClassName('box');
    let i = 0, len = ocultos.length;
    for(; i<len; i++) {
        ocultos[i].style.display = 'none'
    }
    document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
    let rds = document.getElementsByClassName(radios);
    let i = 0, len = rds.length;
    for(; i<len; i++) {
        rds[i].disabled = true;
    }
}

function reiniciar() {
    index = 0;
    respuestasCorrectas = [];
    preguntas = [];
    alternativas = [];
    respuestas = [];
}

function cerrarSesion(){
    window.location.reload();
}