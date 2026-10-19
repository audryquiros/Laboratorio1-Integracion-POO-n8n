// Versión para navegador de las clases de negocio.
class CalendarioLaboral {
  constructor(feriados = []) {
    this.feriados = new Set(feriados);
  }
  esDiaHabil(fecha) {
    const d = new Date(`${fecha}T12:00:00Z`);
    return d.getUTCDay() !== 0 && d.getUTCDay() !== 6 && !this.feriados.has(fecha);
  }
  sumarDiasHabiles(fechaInicial, cantidad) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaInicial)) {
      throw new Error('La fecha debe tener formato YYYY-MM-DD.');
    }
    if (!Number.isInteger(Number(cantidad)) || Number(cantidad) < 1) {
      throw new Error('El plazo debe ser un entero positivo.');
    }
    const d = new Date(`${fechaInicial}T12:00:00Z`);
    let n = 0, guardia = 0;
    while (n < Number(cantidad)) {
      d.setUTCDate(d.getUTCDate() + 1);
      const iso = d.toISOString().slice(0, 10);
      if (this.esDiaHabil(iso)) n++;
      if (++guardia > 800) throw new Error('Límite de cálculo excedido.');
    }
    return d.toISOString().slice(0, 10);
  }
}
class Factura {
  constructor({id, cliente, fechaEmision, diasPlazo = 15, estado = 'pendiente', monto = 0}) {
    if (id === undefined || id === null || id === '') throw new Error('La factura debe tener id.');
    if (!cliente || !fechaEmision) throw new Error('Faltan cliente o fecha de emisión.');
    if (!Number.isFinite(Number(monto)) || Number(monto) < 0) throw new Error('Monto inválido.');
    this.id = id; this.cliente = cliente; this.fechaEmision = fechaEmision;
    this.diasPlazo = Number(diasPlazo); this.estado = estado; this.monto = Number(monto);
  }
  calcularVencimiento(calendario) { return calendario.sumarDiasHabiles(this.fechaEmision, this.diasPlazo); }
  determinarEstado(hoy, vencimiento) {
    if (['pagada', 'anulada'].includes(String(this.estado).toLowerCase())) return String(this.estado).toLowerCase();
    return hoy > vencimiento ? 'vencida' : 'pendiente';
  }
}
