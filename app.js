let estadisticasAnteriores = JSON.parse(window.localStorage.getItem("estadisticas"));
let opciones = ['Piedra','Papel','Tijera'];
let tuJugada = '';
let suJugada = '';
let resultado = '';
let partidasJugadas = estadisticasAnteriores["Jugadas"];
let partidasGanadas = estadisticasAnteriores["Ganadas"];
let partidasPerdidas = estadisticasAnteriores["Perdidas"];
let partidasEmpatadas = estadisticasAnteriores["Empatadas"];
let porcentajeVictorias = estadisticasAnteriores["PorcentajeVictorias"];
let arrayHistorial = JSON.parse(window.localStorage.getItem("historials"));

inicio();
function inicio() {
   if( estadisticasAnteriores["Jugadas"]!= 0){
    console.log("Tienes una partida guardada anteriormente,¿quieres continuar?\n1.Escribe reiniciar(); Para empezar una nueva\n2.Escribe tu jugada para seguir con la anterior \n  -jugar('Tijera');\n  -jugar('Piedra');\n  -jugar('Papel');\nSi quieres ver el historial usa: \n  -historial();\nSi quieres ver las estadisticas usa: \n  -estadisticas();");
}else {
    console.log("Bienvenido a Piedra,Papel o Tijeras\n\nSi quieres jugar usa: \n  -jugar('Tijera');\n  -jugar('Piedra');\n  -jugar('Papel');\nSi quieres reinicar usa: \n  -reiniciar();\nSi quieres ver el historial usa: \n  -historial();\nSi quieres ver las estadisticas usa: \n  -estadisticas();");
} 
}

//Dentro del historial tiene 10 resultado (que ha hecho la maquina)(que he hecho yo), en estadisticas tiene 'jugadas(empieza en 0)',ganadas(empieza por 0),empatadas,perdidas,%victorias;

function comprobarGanador(tuJugada,suJugada){
    let resultado = '';
    if (tuJugada != 'Tijera' && tuJugada != 'Papel' && tuJugada != 'Piedra') {
    throw new Error("Lo que has escrito no es ninguna de las jugadas mencionadas");

    } else {
        if(tuJugada == suJugada){
            resultado = 'empate';
            partidasEmpatadas++;
        } else{
            if (tuJugada == 'Tijera') {
                if(suJugada == 'Piedra'){
                    resultado = 'pierdes';
                    partidasPerdidas++;
                } else {
                    resultado = 'ganas';
                    partidasGanadas++;
                }
            }
            if (tuJugada == 'Piedra') {
                if(suJugada == 'Papel'){
                    resultado = 'pierdes';
                    partidasPerdidas++;
                } else {
                    resultado = 'ganas';
                    partidasGanadas++;
                }
            }
            if (tuJugada == 'Papel') {
                if(suJugada == 'Tijera'){
                    resultado = 'pierdes';
                    partidasPerdidas++;
                } else {
                    resultado = 'ganas';
                    partidasGanadas++;
                }
            }
            
        }
    }
   
    
    partidasJugadas++;
    porcentajeVictorias = (partidasGanadas/partidasJugadas)*100;
    return resultado;
}

function numAleatorio(max) {
    return Math.floor(Math.random() * max);
}
function jugar(tuJugada) {
    
    suJugada = opciones[numAleatorio(3)];
    let resultado = comprobarGanador(tuJugada,suJugada);
    console.log('Tu jugada: ' + tuJugada + '\nSu jugada: ' + suJugada + '\nResultado: ' + resultado);
    
    estadisticas();

    let historials = {
        turno : partidasJugadas,
        jugadaUser : tuJugada,
        jugadaCPU : suJugada,
        resultado : resultado
    };
    if (arrayHistorial.length < 10) {

        arrayHistorial.push(new Array(historials));
        window.localStorage.setItem('historials',JSON.stringify(arrayHistorial));
    } else {

        arrayHistorial.shift();
        arrayHistorial.push(new Array(historials));
        window.localStorage.setItem('historials',JSON.stringify(arrayHistorial));
    }
    
    
}

function estadisticas() {
    let stats = {
        Jugadas : partidasJugadas,
        Ganadas : partidasGanadas,
        Perdidas : partidasPerdidas,
        Empatadas : partidasEmpatadas,
        PorcentajeVictorias : porcentajeVictorias
    };
    window.localStorage.setItem('estadisticas',JSON.stringify(stats));
    // let statsVuelta = JSON.parse(window.localStorage.getItem('estadisticas'));
    
    console.log(stats);
    
}
function historial() {

    console.log(JSON.parse(window.localStorage.getItem("historials")));
    
}
function reiniciar() {

    partidasJugadas = 0;
    partidasGanadas = 0;
    partidasPerdidas = 0;
    partidasEmpatadas = 0;
    porcentajeVictorias = 0;
    arrayHistorial = [];
    let stats = {
        Jugadas : partidasJugadas,
        Ganadas : partidasGanadas,
        Perdidas : partidasPerdidas,
        Empatadas : partidasEmpatadas,
        PorcentajeVictorias : porcentajeVictorias
    };
    let historials = {
        turno : partidasJugadas,
        jugadaUser : '',
        jugadaCPU : '',
        resultado : ''
    };
    window.localStorage.setItem('estadisticas',JSON.stringify(stats));
    window.localStorage.setItem('historials',JSON.stringify(historials));
    console.clear();
    inicio();
}

