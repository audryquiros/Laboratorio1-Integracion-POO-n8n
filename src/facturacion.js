// Clases base del laboratorio ampliadas con herencia y polimorfismo.
class CalendarioLaboral {
  constructor(feriados = []) { this.feriados = new Set(feriados); }
  esDiaHabil(fecha) {
    const d = new Date(`${fecha}T12:00:00Z`);
    return d.getUTCDay() !== 0 && d.getUTCDay() !== 6 && !this.feriados.has(fecha);
  }
  sumarDiasHabiles(fechaInicial, cantidad) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaInicial)) throw new Error('La fecha debe tener formato YYYY-MM-DD.');
    if (!Number.isInteger(Number(cantidad)) || Number(cantidad) < 0) throw new Error('El plazo debe ser un entero no negativo.');
    const fecha = new Date(`${fechaInicial}T12:00:00Z`);
    let n = 0, guardia = 0;
    while (n < Number(cantidad)) {
      fecha.setUTCDate(fecha.getUTCDate() + 1);
      const iso = fecha.toISOString().slice(0,10);
      if (this.esDiaHabil(iso)) n++;
      if (++guardia > 800) throw new Error('Límite de cálculo excedido.');
    }
    return fecha.toISOString().slice(0,10);
  }
}
class Factura {
  constructor({id, cliente, fechaEmision, diasPlazo=15, estado='pendiente', monto=0, tipo='credito', email=''}) {
    if (id===undefined || id===null || id==='') throw new Error('La factura debe tener id.');
    if (!cliente || !fechaEmision) throw new Error(`Factura ${id}: faltan cliente o fechaEmision.`);
    if (!Number.isFinite(Number(monto)) || Number(monto)<0) throw new Error(`Factura ${id}: monto inválido.`);
    this.id=id; this.cliente=cliente; this.fechaEmision=fechaEmision; this.diasPlazo=diasPlazo;
    this.estado=estado; this.monto=Number(monto); this.tipo=tipo; this.email=email;
  }
  obtenerDiasPlazo() { return Number(this.diasPlazo); }
  calcularVencimiento(calendario) { return calendario.sumarDiasHabiles(this.fechaEmision,this.obtenerDiasPlazo()); }
  determinarEstado(hoy,vencimiento) {
    if (['pagada','anulada'].includes(String(this.estado).toLowerCase())) return String(this.estado).toLowerCase();
    return hoy>vencimiento?'vencida':'pendiente';
  }
}
class FacturaCredito extends Factura {
  obtenerDiasPlazo() {
    const plazo=this.diasPlazo===undefined || this.diasPlazo===null ? 15 : Number(this.diasPlazo);
    if(!Number.isInteger(plazo)||plazo<1) throw new Error('El plazo de crédito debe ser un entero positivo.');
    return plazo;
  }
}
class FacturaContado extends Factura {
  obtenerDiasPlazo() { return 0; }
  calcularVencimiento() { return this.fechaEmision; }
}
class HistorialTendencia {
  constructor(registros=[]) { this.registros=registros; }
  resumir() {
    if(this.registros.length<2) return 'Sin historial suficiente';
    const recientes=this.registros.slice(-5);
    const vencidas=recientes.filter(x=>x.estadoCalculado==='vencida'||x.estado==='vencida').length;
    const ratio=vencidas/recientes.length;
    if(ratio>=0.6) return 'Empeorando: predominan facturas vencidas';
    if(ratio<=0.2) return 'Mejorando: pocas facturas vencidas';
    return 'Estable: revisar evolución de facturas vencidas';
  }
}
module.exports={CalendarioLaboral,Factura,FacturaCredito,FacturaContado,HistorialTendencia};
