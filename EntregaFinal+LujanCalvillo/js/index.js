/**
 * Variables globales 
 * */
//Arreglo que alamcenará los objetos guardados en el local storage
const reservaciones = [];
//Arreglo que almacenará los hoteles
let hoteles = [];
//"DB" de los hoteles
const URL = "js/hoteles.json";

/**
 *  Elementos del DOM
 */
const selectDestino = document.querySelector("select#destino");
const divDestino = document.querySelector("div#div-destino");
const fechaLlegadaInput = document.querySelector("input#fecha-llegada");
const fechaSalidaInput = document.querySelector("input#fecha-salida");
const divHabitacion = document.querySelector("div#div-habitacion");
const divDisponibilidad = document.querySelector("div#disponibilidad-hotel");
const btnAddHabitacion = document.querySelector("button.boton-add");
const btnReservar = document.querySelector("button.boton-reservar");
const ulImagenesGlid = document.querySelector("ul.glide__slides");
const pCosto = document.querySelector("p.costo");
const divBotones = document.querySelector("div.div-botones");
const divResumenReservaciones = document.querySelector("div#resumen-reservaciones");

/**
 * Funcion para cargar los hoteles desde el archivo JSON usando fetch.
 */
async function obtenerHotelesAsync() {
    try {
        const respuesta = await fetch(URL);
        const datos = await respuesta.json();
        hoteles.push(...datos);
        cargarHoteles(hoteles);
    } catch (e) {
        console.error("Error al cargar los hoteles", e);
        selectDestino.innerHTML = `<option selected disabled value="error">No hay hoteles disponibles</option>`
    }
}

obtenerHotelesAsync();

/**
 * Funcion para cargar el select con la lista de los hoteles
 */
function cargarHoteles(hoteles) {
    if(hoteles.length > 0) {
        hoteles.forEach(hotel => {
            selectDestino.innerHTML += `<option value="${hotel.id}">${hotel.nombre}</option>`
        });
    }
    btnAddHabitacion.disabled = true;
    if(localStorage.getItem("hoteles") !== null) recuperHotelesLS();
    debugger
    recuperarReservaciones();
}

/**
 * Función para guardar los hoteles en el local storage, esto es para poder "actualizar"
 * cuántas habitaciones quedan disponibles
 */
function guardarHotelesLS(){
    localStorage.setItem("hoteles", JSON.stringify(hoteles));
}

/**
 * Función para recuperar los hoteles del local storage.
 */
function recuperHotelesLS(){
    hoteles = JSON.parse(localStorage.getItem("hoteles"));
}


/**
 * Función para ver cuántas habitaciones quedan disponibles en el hotel seleccionado y si es
 * igual o menor a 3, se muestra un mensaje de alerta de poca disponibilidad.
 */
function verDisponibilidad() {
    let hotelId = parseInt(selectDestino.value);
    if(hotelId !== 0) {
        //Se cargan las imágenes del hotel elegido
        cargarImagenes(hotelId);
        //se busca el objeto del hotel elegido
        let hotel = hoteles.find(hotel => hotel.id == hotelId);
        pCosto.textContent = "El costo por noche de cada habitación para este hotel es de: $" + hotel.costoHabitacionNoche;
        pCosto.removeAttribute("hidden");
        let strHabitacion = hotel.disponibilidad == 1 ? "habitación disponible" : "habitaciones disponibles";
        //Si no hay disponibilidad se muestra mensaje y se desactivan los botones
        if(hotel.disponibilidad == 0) {
            divDisponibilidad.innerHTML = `<p>¡Lo sentimos, ya no hay disponibilidad para este hotel 😔!</p>`;
            btnReservar.disabled = true;
            btnAddHabitacion.disabled = true;
        //Si hay poca disponibilidad se muestra mensaje
        } else if(hotel.disponibilidad <= 3) {
            divDisponibilidad.innerHTML = `<p>¡Solo quedan ${hotel.disponibilidad} ${strHabitacion}!</p>`;
            btnReservar.disabled = false;
            btnAddHabitacion.disabled = false;
        }
        else {
            divDisponibilidad.innerHTML = "";
            btnReservar.disabled = false;
            btnAddHabitacion.disabled = false;
        }
        //Borrar las habitaciones hasta que queden solo las disponibles
        if((divHabitacion.children.length > hotel.disponibilidad) && (hotel.disponibilidad != 0)){
            let hijosBorrar = divHabitacion.children.length - hotel.disponibilidad;
            for(let i = hijosBorrar; i > 0; i--){
                divHabitacion.removeChild(divHabitacion.lastChild);
            }
        }
    }
}
//Listener para verificar si el hotel seleccionado aún tiene dispobibilidad
selectDestino.addEventListener("click", verDisponibilidad);

/**
 * Al dar click en el boton de añadir habitación, se crea un nuevo conjunto de habitación-select de personas
 * para la nueva habitación.
 */
//Contador para saber qué número de habitación se está añadiendo
let contadorHabitaciones = 1;
btnAddHabitacion.addEventListener("click", () => {
    //Se incrementa el contador
    contadorHabitaciones++;
    let hotelId = parseInt(selectDestino.value);
    //Se busca el hotel con base en el id del hotel seleccionado
    let hotel = hoteles.find(hotel => hotel.id == hotelId);
    //Si hay disponibilidad para una habitación más, se añade una nueva habitación
    if(divHabitacion.children.length < hotel.disponibilidad)
    {
        //Se añade el código html de la nueva habitación al div
        divHabitacion.innerHTML += `<div id="habitacion${contadorHabitaciones}">
                                        <span>🛏</span>
                                        <span class="habitacion-numero" id="hab${contadorHabitaciones}">Habitación (maximo 4 personas)</span>
                                        <span class="label">Personas:</label>
                                        <select class="opciones personas personas-hab" id="personas-hab${contadorHabitaciones}">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <span class="eliminar-hab">❌</span>
                                    </div>`;
        divHabitacion.children.length == hotel.disponibilidad ? btnAddHabitacion.disabled = true : btnAddHabitacion.disabled = false;
    } else {
        //sino, de desactiva el botón
        btnAddHabitacion.disabled = true;
    }
    
});

//Listener del documento, esto es para poder añadir listener a los elementos creados dinámicamente.
document.addEventListener("click", (e) => {
    //Se obtiene el elemento con la clase correspondiente
    const targetEliminar = e.target.closest(".eliminar-hab");
    const targetPersonas = e.target.closest(".personas-hab");
    const targetReservaciones = e.target.closest(".boton-reservaciones");

    //Se crea la acción dependiendo de cual "target" se clickeo
    if(targetEliminar) {
        //se elimina la habitación correspondiente al ícono que se ha clickeado
        e.target.parentElement.parentElement.remove();
        let hotelId = parseInt(selectDestino.value);
        let hotel = hoteles.find(hotel => hotel.id == hotelId);
        if(divHabitacion.children.length < hotel.disponibilidad)
        {
            btnAddHabitacion.disabled = false;
        }
    } else if(targetPersonas) {
        //se añade el atributo selected al número de personas elegida
        targetPersonas.options[targetPersonas.options.selectedIndex].setAttribute('selected', true);

    } else if (targetReservaciones) {
        //si ha hecho click en el boton de reservaciones, se muestra el resumen de reservaciones
        verReservaciones();
    }
});

//Listener para el botón Reservar
btnReservar.addEventListener("click", () => {
    let hotelId = parseInt(selectDestino.value);
    let hotel = hoteles.find(hotel => hotel.id == hotelId);
    //Si los campos son correctos y las fechas válidad, se llama a la función reservar
    if(hotelId !== 0 && fechaLlegadaInput.value !== '' && fechaSalidaInput.value !== '' && hotel.disponibilidad > 0) {
        let fechaLlegadaValida = validarFechaLlegada();
        let fechaSalidaValida = validarFechaSalida();
        if(fechaLlegadaValida && fechaSalidaValida) reservar(hotel);
    } else {
        //Sino, se manda un mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error en los datos',
            text: 'Completa todos los valores solicitados en pantalla.'
          });
    }
});

/**
 * Función para validar la fecha de llegada.
 * Se valida que la fecha de llegada sea mayor o igual a la fecha actual.
 */
let fechaLlegada;
function validarFechaLlegada() {
    let fechaValida = false;
    //Se crea un objeto Date con la fecha actual
    let fechaActual = new Date();
    //Se borra el timestamp de la fecha para no usar las horas en la validación
    fechaActual.setHours(0,0,0,0);
    console.log("Fecha de llegada ingresada:", fechaLlegadaInput.value);
    fechaLlegada = fechaLlegadaInput.value + "T00:00:00";
    console.log("Fecha de llegada: ", fechaLlegada);
    
    //Se crea un nuevo objeto de Date con la fecha de llegada
    fechaLlegada = new Date(fechaLlegada);
    console.log("Fecha de llegada objeto: ", fechaLlegada);
    //Si la fecha de llegada es menor o igual a la fecha actual, se manda un mensaje de error
    if(fechaLlegada < fechaActual){
        Swal.fire({
            icon: 'error',
            title: 'Fecha no válida',
            text: 'Favor de ingresar una fecha mayor o igual a la fecha de hoy.'
          });
    } else {
        fechaValida = true;
    }

    return fechaValida;
}

/**
 * Función para validar la fecha de salida.
 * Se valida que la fecha de salida sea mayor a la fecha de llegada.
 */
let fechaSalida;
function validarFechaSalida() {
    let fechaValida = false;
    
    fechaSalida = fechaSalidaInput.value + "T00:00:00";
    fechaSalida = new Date(fechaSalida);
    //Si la fecha de llegada es menor a la fecha de llegada, se manda un mensaje de error
    if(fechaSalida <= fechaLlegada){
        Swal.fire({
            icon: 'error',
            title: 'Fecha no válida',
            text: 'Favor de ingresar una fecha mayor a la fecha de llegada.'
          });
        
    } else {
        fechaValida = true;
    }

    return fechaValida;
}

/**
 * Función para cargar las imágenes el hotel seleccionado
 * @param {el id del hotel seleccionado} id  
 */
function cargarImagenes(id) {
    let directorio;
    const arrayImagenes = [];
    ulImagenesGlid.innerHTML = "";
    //Se hace un switch dependiendo del hotel, seleccionar la carpeta correspondiente.
    switch(id) {
        case 1:
            directorio = "/images/riviera maya/";
            for(let i = 1; i <= 4; i++) {
                let imagen = directorio + "img_00" + i + ".jpg";
                arrayImagenes.push(imagen);
            }
            mostarImagenes(arrayImagenes);
        break;
        case 2:
            directorio = "/images/ixtapa/";
            for(let i = 1; i <= 4; i++) {
                let imagen = directorio + "img_00" + i + ".jpg";
                arrayImagenes.push(imagen);
            }
            mostarImagenes(arrayImagenes);
        break;
        case 3:
            directorio = "/images/puerto vallarta/";
            for(let i = 1; i <= 4; i++) {
                let imagen = directorio + "img_00" + i + ".jpg";
                arrayImagenes.push(imagen);
            }
            mostarImagenes(arrayImagenes);
        break;
        case 4:
            directorio = "/images/cabos/";
            for(let i = 1; i <= 4; i++) {
                let imagen = directorio + "img_00" + i + ".jpg";
                arrayImagenes.push(imagen);
            }
            mostarImagenes(arrayImagenes);
        break;
    }
}

/**
 * se crea el elemento de imagen con la carpeta correspondiente
 * @param {el arreglo de imágenes} array 
 */
function mostarImagenes(array) {
    array.forEach(imagen => {
        ulImagenesGlid.innerHTML += `<li class="glide__slide"><img class="imagenes-hoteles" src="${imagen}" alt=""></li>`;
    });
    //Se activa la funcionalidad de la librería Glide para las imágenes
    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        autoplay: 10000
    }).mount();
}

/**
 * Función que confirmar si se quiere guardar la reservación y de ser así, se guarda.
 * @param {El hotel al que se hará la reservación} hotel 
 */
function reservar(hotel) {
    let numeroReservacion = Math.floor(Math.random() * 1000);
    let strHabitacion = hotel.disponibilidad == 1 ? "habitación" : "habitaciones";
    const habitaciones = [];
    for(let i = 0; i < divHabitacion.children.length; i++){
        const habitacion = { numHabitacion: i+1, personas: parseInt(divHabitacion.children[i].querySelector("select.personas").value) };
        habitaciones.push(habitacion);
    }
    const reservacion = new Reservacion(numeroReservacion, hotel, fechaLlegada, fechaSalida, habitaciones);
    //Mensaje para pedir confirmación del usuario para la reservación
    Swal.fire({
        title: "Desea reservar en el " + reservacion.hotel.nombre + ", " + 
                reservacion.obtenerNumeroHabitaciones() + " " + strHabitacion + ", para " + 
                reservacion.obtenerNumeroPersonas() + " personas, del " + reservacion.obtenerFechaLlegada() + " al " + 
                reservacion.obtenerFechaSalida() + " por un total de $"+ reservacion.obtenerImporteTotal() + "?\n" +
                "Total de noches: " + reservacion.obtenerNumeroDias() + "\n" +
                "Costo de habitacion por noche: $" + reservacion.hotel.costoHabitacionNoche,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: 'Cancelar',
    }).then((result) => {
        //Dependiendo si se confirmó o no, se ejecuta el mensaje correspondiente
        if (result.isConfirmed) {
            hotel.disponibilidad -= habitaciones.length;
            //Si aceptó la reservación, se guarda la reservacion en en local storage
            localStorage.setItem("reservacion" + numeroReservacion, JSON.stringify(reservacion));
            //Se guarda los hoteles con la disponibilidad actualizada
            guardarHotelesLS();
            alerta('Reservación confirmada, su número de reservación es: ' + numeroReservacion, '',  'success');
        } else if (result.isDenied) {
            alerta('Su reservación no ha sido guardada', '', 'info');
        }
    }).then(() => { 
        //Después, se refresca la página para borrar los campos, se creó un "timeout" para darle tiempo al mensaje.
        setTimeout(function(){
            location.reload();
        }, 5000);
    });
}

//Función alerta para crear un "pop-up" con un temporizador
function alerta(titulo, texto, icono) {
    Swal.fire( {
        timer: 5000,
        timerProgressBar: true,
        title: titulo,
        text: texto,
        icon: icono,
        showConfirmButton: false
    })
}

/**
 * Funcion para recuperar todas las reservaciones. Busca en el local storage
 * todas las "key" que contengan la palabra "reservacion".
 */
function recuperarReservaciones(){
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key.includes("reservacion")) {
            const reservacion = JSON.parse(localStorage.getItem(key));
            reservaciones.push(reservacion);
        } else {
            continue;
        }

    }
    if((reservaciones.length > 0) ) {
        divResumenReservaciones.innerHTML = `<button class="boton-reservaciones">Ver mis reservaciones</button>`;
    }
}

/**
 * Función para mostrar el resumen de las reservaciones
 */
function verReservaciones() {
    divResumenReservaciones.innerHTML = "";
    reservaciones.forEach(reservacion => {
       
       
        let reservacionFechaLlegada = new Date(reservacion.fechaLlegada);
        let reservacionFechaSalida = new Date(reservacion.fechaSalida);
        let resumenReservacion = `<div class="reservacion">
                                    <p>Número de reservación: <b>${reservacion.numReservacion}</b></p>
                                    <p>Destino:  <b>${reservacion.hotel.nombre}</b></p>
                                    <p>Fecha de llegada:  <b>${obtenerFechaLlegada(new Date(reservacionFechaLlegada))}</b></p>
                                    <p>Fecha de salida:  <b>${obtenerFechaSalida(new Date(reservacionFechaSalida))}</b></p>`;
        for(let habitacion of reservacion.habitaciones) {
            resumenReservacion += `<p>En la habitación  <b>${habitacion.numHabitacion}</b>, se hospedarán  <b>${habitacion.personas}</b> persona(s).</p>`;
        }
        resumenReservacion += `  <p>El costo por noche será de  <b>$${reservacion.hotel.costoHabitacionNoche}</b></p>
                                 <p>Total de la reservación  <b>$${obtenerImporteTotal(reservacionFechaSalida, reservacionFechaLlegada, 
                                                                                   reservacion.hotel.costoHabitacionNoche, 
                                                                                   reservacion.habitaciones.length)}</b></p>
                               </div>
                               <hr>`
        
        divResumenReservaciones.innerHTML += resumenReservacion;
        
    });
}

/** Funciones correspondientes a la fecha, lamentablemente no supe como hacer el  "reviver" del JSON para 
 * convertirlo de regreso a mi clase de Reservación 
 **/
function obtenerFechaLlegada(fechaLlegada) {
    let dia = fechaLlegada.getDate();
    let mes = fechaLlegada.toLocaleString('es-mx', { month: 'long' });
    let anio = fechaLlegada.getFullYear();
    return dia + " de " + mes + " del " + anio;
}

function obtenerFechaSalida(fechaSalida) {
    let dia = fechaSalida.getDate();
    let mes = fechaSalida.toLocaleString('es-mx', { month: 'long' });
    let anio = fechaSalida.getFullYear();
    return dia + " de " + mes + " del " + anio;
}

function obtenerImporteTotal(fechaSalida, fechaLlegada, costoHabitacionNoche, habitaciones) {
    let totalDias = Math.round(Math.abs((fechaSalida - fechaLlegada) / (1000*3600*24)));
    return habitaciones * costoHabitacionNoche * totalDias;
}
