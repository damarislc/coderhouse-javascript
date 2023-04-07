//Mensaje inicial donde se le indica al usuario la función principal para iniciar el simulador
console.log("Para elegir el Hotel donde desea reserver, escriba: comenzar()")

/**
 * Variables globales 
 * */
//Variable que almacenará la fecha de llegada (yyyymmmdd)
let fechaLlegada;
//Variable que almacenará la fecha de salida (yyyymmmdd)
let fechaSalida;
//Arrelgo que almacenará los objetos de habitacion
const habitaciones = [];
//Arreglo que alamcenará los objetos de la clase reservación
const reservaciones = [];
//Variable auxiliar para saber si usar la palabra 'habitación' o 'habitaciones'
let strHabitacion;
//Variable que almacenará el objeto del hotel elegido.
let hotelElegido;
//Contador de reservaciones
let numeroReservacion = 1;
/**
 * Función inicial, presenta la lista de Hoteles válidos del grupo hotelero.
 * Se valida que el dato ingresado sea un número entero
 * Se valida que el número ingresado esté dentro de las 4 opciones de hoteles
 * disponibles.
 * Se manda a llamar la función fecha() para continuar con la reserva.
 */
function comenzar() {
    let nombreHoteles = "";
    //Se recorre el arreglo de hoteles para obtener el nombre de cada uno y se concatena el nombre de los hoteles en un string.
    hoteles.forEach(hotel => {
        nombreHoteles += "  " + hotel.id + ". " + hotel.nombre + "\n"
    });
    //Mensaje donde se le indica el usuario que elija cuál hotel desea reservar.
    let hotelId = prompt("Elija entre los siguientes Hoteles disponibles: \n" +
                         nombreHoteles +
                         "(Elija el número de la opción deseada).");

    //Valida si el texto de entrada no es un número, se mandar un error y vuelve a preguntar.
    if(!parseInt(hotelId)) {
        console.error("Por favor escriba el número del Hotel elegido.")
        comenzar();
    } else {
        //Según el número elegido, se guarda qué hotel ha seleccionado y se manda a llamar la función fechas()
        switch(parseInt(hotelId)) {
            case 1:
                //Se busca dentro del arreglo de hoteles el hotel con el id 1
                hotelElegido = hoteles.find(hotel => hotel.id == hotelId);
                alert("Ha elegido el " + hotelElegido.nombre + " 🏯");
                elegirFechas();
                break;
            case 2:
                //Se busca dentro del arreglo de hoteles el hotel con el id 2
                hotelElegido = hoteles.find(hotel => hotel.id == hotelId);
                alert("Ha elegido el " + hotelElegido.nombre + " 🏝");
                elegirFechas();
                break;
            case 3:
                //Se busca dentro del arreglo de hoteles el hotel con el id 3
                hotelElegido = hoteles.find(hotel => hotel.id == hotelId);
                alert("Ha elegido el " + hotelElegido.nombre + " 🏨");
                elegirFechas();
                break;
            case 4:
                //Se busca dentro del arreglo de hoteles el hotel con el id 4
                hotelElegido = hoteles.find(hotel => hotel.id == hotelId);
                alert("Ha elegido el " + hotelElegido.nombre + " 🏖");
                elegirFechas();
                break;
            //Si se ha elegido un número diferente al de las opciones, se manda un mensaje y se vuelve a preguntar.
            default:
                alert("❌ Opción no válida, por favor elija entre los hoteles disponibles.");
                comenzar();
                break;
        }
    }
}

/**
 * Función que recibe las fechas de llegada y de salida.
 * Se valida que la fecha de llegada sea mayor o igual a la fecha actual.
 * Se valida que la fecha de salida sea mayor a la fecha de llegada.
 */
function elegirFechas() { 
    //Variable boleana para validar que la fecha ingresada sea correcta.
    let fechaValida = false;

    //Se crea un objeto Date con la fecha actual
    let fechaActual = new Date();
    //Se borra el timestamp de la fecha para no usar las horas en la validación
    fechaActual.setHours(0,0,0,0);
    //Se crea un objeto de regular expression para validar la fecha
    const regexFecha = new RegExp("^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$")
    //Se entra al código y se repite mientras la fecha no sea válida.
    do {
        //Se pregunta por la fecha de llegada
        fechaLlegada = prompt("Elija fecha de llegada ➡ (MM/DD/AAAA):");
        console.log("Fecha de llegada ingresada:", fechaLlegada);
        
        //Si la fecha está en el formato correcto
        if(regexFecha.test(fechaLlegada)){
            //Se crea un nuevo objeto de Date con la fecha de llegada
            fechaLlegada = new Date(fechaLlegada);
            //Si la fecha de llegada es menor a la fecha actual, se manda un mensae de error y se pregunta de nuevo.
            if(fechaLlegada < fechaActual){
                alert("⛔ Fecha no válida, favor de ingresar una fecha mayor o igual a la fecha de hoy.");
                //Se vuelve a iterar el ciclo
                continue;
            }
            
            fechaValida = true;
        } else {
            alert("⛔ Fecha no válida, favor de ingresar una fecha válida y con el formtato MM/DD/AAAA");
        }
    } while(!fechaValida);

    //Se reinicia la variable de fechaValida
    fechaValida = false;
    //Se entra al código y se repite mientras la fecha no sea válida.
    do {
        //Se pregunta por la fecha de salida
        fechaSalida = prompt("Elija fecha de salida ⬅ (MM/DD/AAAA):");
        console.log("Fecha de salida ingresada:", fechaSalida);
        //Si la fecha está en el formato correcto
        if(regexFecha.test(fechaSalida)){
            //Se crea un nuevo objeto de Date con la fecha de salida
            fechaSalida = new Date(fechaSalida);
            //Si la fecha de llegada es menor a la fecha actual, se manda un mensae de error y se pregunta de nuevo.
            if(fechaSalida <= fechaLlegada){
                alert("⛔ Fecha no válida, favor de ingresar una fecha mayor a la fecha de llegada.");
                //Se vuelve a iterar el ciclo
                continue;
            }
            
            fechaValida = true;
        } else {
            alert("⛔ Fecha no válida, favor de ingresar una fecha válida y con el formtato MM/DD/AAAA");
        }
    } while(!fechaValida);

    //Se manda a llamar a la función agregarHuespedes()
    agregarHuespuedes();
}

/**
 * Función que recibe el número de habitaciones y húespedes por habitación de las que se pretende reservar.
 */
function agregarHuespuedes() {
    //Variable boleana para validar que el número de habitaciones/personas ingresado sea válido
    let numberoValido = false;
    //Variable que almacenará el número de habitaciones a reservar
    let numHabitaciones;
    //Se entra al código y se repite mientras el número no sea válido.
    do {
        numHabitaciones = prompt("Cuántas habitaciones desea reservar?");
        //Se valida que el número de habitaciones sea mayor que 0
        numberoValido = parseInt(numHabitaciones) > 0;
        if(!numberoValido) alert("⛔ Ingrese un número válido, la habitación tiene que ser mayor que 0.");
    } while(!numberoValido);

    //Si se ha elegido más de 1 habitación se guarda el texto "habitaciones", sino, se guarda "habitación"
    strHabitacion = numHabitaciones > 1 ? "habitaciones" : "habitación";
    alert("Ha elegido " + numHabitaciones + " " + strHabitacion + ", ahora asignemos el número de personas por habitación.");

    //Contador para mostrar que número de habitación que se está asignando
    let habActual = 1;

    //Ciclo que se repetirá por el número de habitaciones ingresado
    for(let i = numHabitaciones; i > 0; i--) {
        //Variabel para almacenar el número de personas para la habitación actual
        let numPersonasActual;
        //Se entra al código y se repite mientras el número no sea válido.
        do {
            //Se pregunta por el número de personas para la habitación actual
            numPersonasActual = prompt("Cuántas personas se hospedarán en la habitación " + habActual + "?");
            numPersonasActual = parseInt(numPersonasActual);
            //Se valida que el número sea mayor que 0
            numberoValido = numPersonasActual > 0;
            if(!numberoValido) alert("⛔ Ingrese un número válido, la(s) persona(s) tiene que ser mayor que 0.");
        } while(!numberoValido);
        //Se crea un objeto literal para una habitacion con la habitación actual y el número de personas en esa habitación.
        let nuevaHabitacion = {numHabitacion: habActual, personas: numPersonasActual};
        //Se añade el objeto al arreglo de habitaciones.
        habitaciones.push(nuevaHabitacion);
        //Se incrementa la habitación actual
        habActual++;
    }

    console.table(habitaciones);
    //Se manda a llamar la función confirmarReservacion()
    confirmarReservacion();
}

/**
 * Función para confirmar la reservación y mostrar el resumen de la misma en la consola.
 */
function confirmarReservacion() {
    //Se clona el arreglo de habitaciones para no perder su contenido
    const habitacionesActual = [...habitaciones];
    //Se crea un objeto de la clase Reservacion
    const reservacion = new Reservacion(numeroReservacion++, hotelElegido, habitacionesActual, fechaLlegada, fechaSalida);
    //Se reinicia el array de habitaciones para evitar que se acumule para la siguiente reservacion
    habitaciones.length = 0;
    
    //Mensaje para pedir confirmación del usuario para la reservación
    let confirmacion = confirm("Desea reservar en el " + reservacion.hotel.nombre + ", " + 
                               reservacion.obtenerNumeroHabitaciones() + " " + strHabitacion + ", para " + 
                               reservacion.obtenerNumeroPersonas() + " personas, del " + reservacion.obtenerFechaLlegada() + " al " + 
                               reservacion.obtenerFechaSalida() + " por un total de $"+ reservacion.obtenerImporteTotal() + "?\n" +
                               "Total de noches: " + reservacion.obtenerNumeroDias() + "\n" +
                               "Costo de habitacion por noche: $" + reservacion.hotel.costoHabitacionNoche);

    //De confirmar la reservación, se muestra en consola el resumen de la reservación
    if(confirmacion) {
        //Si aceptó la reservación, se guarda en el arreglo de reservaciones.
        reservaciones.push(reservacion);
        alert("✔ Revise la consola donde se le mostrará el resumen de la reservación.");
        //Se muestra el resumen de la reservación
        reservacion.mostrarResumenReservacion();
    //Si el usuario canceló la reservación, se muestra mensaje de cancelado.
    } else {
        alert("❌ Reservación cancelada.")
    }
}

function otraReservacion() {
    comenzar();
}

/**
 * Función para mostrar los detalles de todas las reservaciones que ha hecho el usuario.
 */
function mostrarReservaciones() {
    let strTodasReservaciones = "Aqui tiene el detalle de sus reservaciones: \n" +
                                "Total de reservaciones: " + reservaciones.length + "\n ";
    for(let reservacion of reservaciones){ 
        strTodasReservaciones += "En su reservación " +  reservacion.numReservacion + " reservó para el " +
                                 reservacion.hotel.nombre + "\n" +
                                 "total de habitaciones: " + reservacion.obtenerNumeroHabitaciones() + "\n" +
                                 "total de noches: " + reservacion.obtenerNumeroDias() + "\n" +
                                 "importe total: " + reservacion.obtenerImporteTotal() + "\n";
    }
    console.log(strTodasReservaciones);
}
