//Mensaje inicial donde se le indica al usuario la función principal para iniciar el simulador
console.log("Para elegir el Hotel donde desea reserver, escriba: comenzar()")

/**
 * Variables globales 
 * */
//Variable que almacenará el nombre del hotel
let hotelNombre;
//Variable que almacenará la fecha de llegada (yyyymmmdd)
let fechaLlegada;
//Variable que almacenará la fecha de salida (yyyymmmdd)
let fechaSalida;
//Variable que almacenará el número de habitaciones a reservar
let numHabitaciones;
//Variable que almacenará el número total de personas a hospedarse
let numPersonas = 0;
//Variable que almacenará el número de personas por habitaciones separadas por un ;
let personas = "";
//Variable auxiliar para saber si usar la palabra 'habitación' o 'habitaciones'
let habitacion;

/**
 * Función inicial, presenta la lista de Hoteles válidos del grupo hotelero.
 * Se valida que el dato ingresado sea un número entero
 * Se valida que el número ingresado esté dentro de las 4 opciones de hoteles
 * disponibles.
 * Se manda a llamar la función fecha() para continuar con la reserva.
 */
function comenzar() {
    //Mensaje donde se le indica el usuario que elija cuál hotel desea reservar.
    let hotel = prompt("Elija entre los siguientes Hoteles disponibles: \n" +
                   "  1. Hotel Riviera Maya\n" +
                   "  2. Hotel Ixtapa\n" +
                   "  3. Hotel Puerto Vallarta\n" +
                   "  4. Hotel Los Cabos \n" +
                   "(Elija el número de la opción deseada).");

    //Valida si el texto de entrada no es un número, se mandar un error y vuelve a preguntar.
    if(!parseInt(hotel)) {
        console.error("Por favor escriba el número del Hotel elegido.")
        comenzar();
    } else {
        //Según el número elegido, se guarda qué hotel ha seleccionado y se manda a llamar la función fechas()
        switch(parseInt(hotel)) {
            case 1:
                alert("Ha elegido el Hotel Riviera Maya 🏯");
                hotelNombre = "Hotel Riviera Maya";
                fechas();
                break;
            case 2:
                alert("Ha elegido el Hotel Ixtapa 🏝");
                hotelNombre = "Hotel Ixtapa";
                fechas();
                break;
            case 3:
                alert("Ha elegido el Hotel Puerto Vallarta 🏨");
                hotelNombre = "Hotel Puerto Vallarta";
                fechas();
                break;
            case 4:
                alert("Ha elegido el Hotel Los Cabos 🏖");
                hotelNombre = "Hotel Los Cabos";
                fechas();
                break;
            //Si se ha elegido un número diferente al de las opciones, se manda un mensaje y se vuelve a preguntar.
            default:
                console.warn("Opción no válida, por favor elija entre las 4 hoteles disponibles.")
                comenzar();
                break;
        }
    }
}

/**
 * Función que recibe las fechas de llegada y de salida.
 * Se valida que la fecha sea mayor a la fecha actual (se basa solo en la fecha actual que fue hecha el código 2023/03/18).
 * Se valida que la fecha de salida sea mayor a la fecha de llegada.
 * Actualemente, no se valida que sea un mes o día válido. Por ejemplo, si se ingresa 20231845, no marcará error, se pretende
 * mejorar cuando exista mayor conocimiento del tema.
 */
function fechas() { 
    //Variable boleana para validar que la fecha ingresada sea correcta.
    let fechaValida = false;

    //Se entra al código y se repite mientras la fecha no sea válida.
    do {
        //Se pregunta por la fecha de llegada
        fechaLlegada = prompt("Elija fecha de llegada ➡ (yyyymmdd):");
        /*La fecha debe de ser un número y mayor a la fecha del día que se ha hecho el código (la fecha hardcodeada se pretende cambiar después
        de que veamos temas más avanzados para obtener la fecha del sistema) */
        fechaValida = parseInt(fechaLlegada) >= 20230319;
        if(!fechaValida) alert("⛔ Fecha no válida, favor de ingresar una fecha mayor o igual al 19 de marzo del 2023 (20230319).");
    } while(!fechaValida);
    
    //Se entra al código y se repite mientras la fecha no sea válida.
    do {
        //Se pregunta por la fecha de salida
        fechaSalida = prompt("Elija fecha de salida ⬅ (yyyymmdd):");
        /*Se valida que la fecha de salida sea mayor a la fecha de llegada */
        fechaValida = parseInt(fechaSalida) > fechaLlegada;
        if(!fechaValida) alert("⛔ Fecha no válida, favor de ingresar una fecha mayor a la fecha de llegada (" + fechaLlegada +").");
    } while(!fechaValida);

    //Se manda a llamar a la función huespedes()
    huespuedes();
}

/**
 * Función que recibe el número de habitaciones y húespedes por habitación de las que se pretende reservar.
 */
function huespuedes() {
    //Variable boleana para validar que el número de habitaciones/personas ingresado sea válido
    let numberoValido = false;
    //Se entra al código y se repite mientras el número no sea válido.
    do {
        numHabitaciones = prompt("Cuántas habitaciones desea reservar?");
        //Se valida que el número de habitaciones sea mayor que 0
        numberoValido = parseInt(numHabitaciones) > 0;
        if(!numberoValido) alert("⛔ Ingrese un número válido, la habitación tiene que ser mayor que 0.");
    } while(!numberoValido);

    //Si se ha elegido más de 1 habitación se guarda el texto "habitaciones", sino, se guarda "habitación"
    habitacion = numHabitaciones > 1 ? "habitaciones" : "habitación";
    alert("Ha elegido " + numHabitaciones + " " + habitacion + ", ahora asignemos el número de personas por habitación.");

    //Contador para mostrar que número de habitación se está asignando
    let habActual = 1;
    //Ciclo que se repetirá por el número de habitaciones ingresado
    for(let i = numHabitaciones; i > 0; i--) {
        //Variabel para almacenar el número de personas para la habitación actual
        let numPersonasActual;
        //Se entra al código y se repite mientras el número no sea válido.
        do {
            //Se pregunta por el número de personas para la habitación actual
            numPersonasActual = prompt("Cuántas personas se hospedarán en la habitación " + habActual + "?");
            //Se valida que el número sea mayor que 0
            numberoValido = parseInt(numPersonasActual) > 0;
            if(!numberoValido) alert("⛔ Ingrese un número válido, la(s) persona(s) tiene que ser mayor que 0.");
        } while(!numberoValido);
        //Se incrementa la habitación actual
        habActual++;
        //Se concatena el número de personas para la habitación y se separa con un ;
        personas += numPersonasActual + ";";
        //Se suma el número de personas para la reservación
        numPersonas += parseInt(numPersonasActual);
    }

    //Se manda a llamar la función confirmarReservacion()
    confirmarReservacion();
}

/**
 * Función para confirmar la reservación y mostrar el resumen de la misma en la consola.
 */
function confirmarReservacion() {
    //Mensaje para pedir confirmación del usuario para la reservación
    let confirmacion = confirm("Desea reservar en el " + hotelNombre + ", " + 
                               numHabitaciones + " " + habitacion + ", para " + 
                               numPersonas + " personas, del " + fechaLlegada + " al " + 
                               fechaSalida + "?");

    //De confirmar la reservación, se muestra en consola el resumen de la reservación
    if(confirmacion) {
        alert("✔ Revise la consola donde se le mostrará el resumen de la reservación.");
        console.log("Reservación confirmada para:", hotelNombre);
        console.log("Fecha de llegada:", fechaLlegada);
        console.log("Fecha de salida:", fechaSalida);
        let habActual = 1;
        //Se separa la variable personas por cada ; para obtener el número de personas por habitación
        let personasActual = personas.split(";");
        let j = 0;
        //Ciclo para mostrar el número de personas por habitación
        for(let i = numHabitaciones; i > 0; i--) {
            //Se muestra el número de la habitación actual más el número de personas para esa habitación.
            console.log("Habitación " + habActual + ", número de personas: " + personasActual[j]);
            j++;
            habActual++;
        }
    //Si el usuario canceló la reservación, se muestra mensaje de cancelado.
    } else {
        alert("❌ Reservación cancelada.")
    }
}