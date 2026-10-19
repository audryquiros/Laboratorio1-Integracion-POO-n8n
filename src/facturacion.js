// Entidades de negocio: la misma regla se replica en el nodo Code de n8n.
class CalendarioLaboral {
  constructor(feriados = []) {
    this.feriados = new Set(feriados);
  }

  esDiaHabil(fecha) {
    const d = new Date(`${fecha}T12:00:00Z`);
    const dia = d.getUTCDay();
    return dia !== 0 && dia !== 6 && !this.feriados.has(fecha);
  }

  sumarDiasHabiles(fechaInicial, cantidad) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaInicial)) {
      throw new Error('La fecha de emisión debe tener formato YYYY-MM-DD.');
    }
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      throw new Error('El plazo debe ser un entero positivo.');
    }
    const fecha = new Date(`${fechaInicial}T12:00:00Z`);
    let sumados = 0;
    while (sumados < cantidad) {
      fecha.setUTCDate(fecha.getUTCDate() + 1);
      const iso = fecha.toISOString().slice(0, 10);
      if (this.esDiaHabil(iso)) sumados++;
      if (sumados < cantidad && (fecha.getUTCFullYear() - Number(fechaInicial.slice(0,4))) > 2) {
        throw new Error('No fue posible calcular el vencimiento dentro del rango esperado.');
      }
    }
    return fecha.toISOString().slice(0, 10);
  }
}

class Factura {
  constructor({ id, cliente, fechaEmision, diasPlazo = 15, estado = 'pendiente', monto = 0 }) {
    if (id === undefined || id === null) throw new Error('La factura debe tener id.');
    if (!cliente || !fechaEmision) throw new Error(`Factura ${id}: faltan cliente o fechaEmision.`);
    if (!Number.isFinite(Number(monto)) || Number(monto) < 0) throw new Error(`Factura ${id}: monto inválido.`);
    this.id = id;
    this.cliente = cliente;
    this.fechaEmision = fechaEmision;
    this.diasPlazo = Number(diasPlazo);
    this.estado = estado;
    this.monto = Number(monto);
  }

  calcularVencimiento(calendario) {
    return calendario.sumarDiasHabiles(this.fechaEmision, this.diasPlazo);
  }

  determinarEstado(fechaHoy, fechaVencimiento) {
    if (this.estado === 'pagada' || this.estado === 'anulada') return this.estado;
    return fechaHoy > fechaVencimiento ? 'vencida' : 'pendiente';
  }
}

module.exports = { CalendarioLaboral, Factura };
