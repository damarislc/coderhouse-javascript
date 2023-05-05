/**
 * Clase Reservacion
 */
class Reservacion {
    
    /**
     * Constructor de la clase
     * @param {Es el id de la reservación} numReservacion 
     * @param {El objeto hotel al que se está reservando} hotel 
     * @param {La fecha de llegada seleccionada} fechaLlegada 
     * @param {La fecha de salida seleccionada} fechaSalida 
     * @param {Arreglo de habitaciones con el número de personas por habitación} habitaciones 
     */
    constructor(numReservacion, hotel, fechaLlegada, fechaSalida, habitaciones) {
        this.numReservacion = numReservacion;
        this.hotel = hotel;
        this.fechaLlegada = fechaLlegada;
        this.fechaSalida = fechaSalida;
        this.habitaciones = habitaciones;
    }

    /**
     * Método para obtener el importe por habitación por los días seleccionados
     * @returns el coste total por habitación
     */
    obtenerImportePorHabitacion() {
        let costoHabitacionNoche = this.hotel.costoHabitacionNoche;
        console.log(costoHabitacionNoche);
        let dias = this.obtenerNumeroDias();
        return costoHabitacionNoche * dias;
    }

    /**
     * Método para calcular el coste total de la reservación
     * @returns el coste total
     */
    obtenerImporteTotal() {
        let costoHabitacionNoche = this.hotel.costoHabitacionNoche;
        return this.obtenerNumeroHabitaciones() * costoHabitacionNoche * this.obtenerNumeroDias();
    }

    /**
     * Método para obtener el número de habitaciones de la reservación
     * @returns número de habitaciones
     */
    obtenerNumeroHabitaciones() {
        return this.habitaciones.length;
    }

    /**
     * Método para obtener el número de días de la reservación
     * @returns total de días
     */
    obtenerNumeroDias() {
        let totalDias = Math.round(Math.abs((this.fechaSalida - this.fechaLlegada) / (1000*3600*24)));
        return totalDias;
    }

    /**
     * Método para obtener el número de personas en la reservación
     * @returns total de personas
     */
    obtenerNumeroPersonas() {
        let numPersonas = 0;
        for(let habitacion of this.habitaciones){
            numPersonas += habitacion.personas;
        }
        return numPersonas;
    }

    /**
     * Método para obtener la fecha de llegada de la reservación
     * @returns fecha de llegada en formato legible
     */
    obtenerFechaLlegada() {
        let dia = this.fechaLlegada.getDate();
        let mes = this.fechaLlegada.toLocaleString('es-mx', { month: 'long' });
        let anio = this.fechaLlegada.getFullYear();
        return dia + " de " + mes + " del " + anio;
    }

    /**
     * Método para obtener la fecha de salida de la reservación
     * @returns fecha de salida en formato legible
     */
    obtenerFechaSalida() {
        let dia = this.fechaSalida.getDate();
        let mes = this.fechaSalida.toLocaleString('es-mx', { month: 'long' });
        let anio = this.fechaSalida.getFullYear();
        return dia + " de " + mes + " del " + anio;
    }
}
