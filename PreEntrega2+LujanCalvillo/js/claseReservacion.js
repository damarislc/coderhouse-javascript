class Reservacion {
    constructor(numReservacion, hotel, habitaciones, fechaLlegada, fechaSalida) {
        this.numReservacion = numReservacion;
        this.hotel = hotel;
        this.habitaciones = habitaciones;
        this.fechaLlegada = fechaLlegada;
        this.fechaSalida = fechaSalida;
    }

    obtenerImportePorHabitacion() {
        let costoHabitacionNoche = this.hotel.costoHabitacionNoche;
        console.log(costoHabitacionNoche);
        let dias = this.obtenerNumeroDias();
        return costoHabitacionNoche * dias;
    }

    obtenerImporteTotal() {
        let costoHabitacionNoche = this.hotel.costoHabitacionNoche;
        return this.obtenerNumeroHabitaciones() * costoHabitacionNoche * this.obtenerNumeroDias();
    }

    obtenerNumeroHabitaciones() {
        return this.habitaciones.length;
    }

    obtenerNumeroDias() {
        let totalDias = Math.round(Math.abs((this.fechaSalida - this.fechaLlegada) / (1000*3600*24)));
        return totalDias;
        //console.log("Total de dias de la reservación:", totalDias);
    }

    obtenerNumeroPersonas() {
        let numPersonas = 0;
        for(let habitacion of this.habitaciones){
            numPersonas += habitacion.personas;
        }
        return numPersonas;
    }

    obtenerFechaLlegada() {
        let dia = this.fechaLlegada.getDate();
        let mes = this.fechaLlegada.toLocaleString('es-mx', { month: 'long' });
        let anio = this.fechaLlegada.getFullYear();
        return dia + " de " + mes + " del " + anio;
    }

    obtenerFechaSalida() {
        let dia = this.fechaSalida.getDate();
        let mes = this.fechaSalida.toLocaleString('es-mx', { month: 'long' });
        let anio = this.fechaSalida.getFullYear();
        return dia + " de " + mes + " del " + anio;
    }

    mostrarResumenReservacion() {
        let strResumen = "";
        strResumen = "Reservación confirmada para el " + this.hotel.nombre + "\n" +
                     "Fecha de llegada: " + this.obtenerFechaLlegada() + "\n" +
                     "Fecha de salida: " + this.obtenerFechaSalida() + "\n";
        for(let habitacion of this.habitaciones) {
            strResumen += "En la habitación " + habitacion.numHabitacion + ", se hospedarán " + habitacion.personas + " persona(s)\n";
        }
        strResumen += "El costo por noche será de $" + this.hotel.costoHabitacionNoche + "\n" +
                      "Total de la reservación $" + this.obtenerImporteTotal();
        console.log(strResumen);
    }
}
