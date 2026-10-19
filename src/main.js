const { CalendarioLaboral, Factura } = require('./facturacion');

const feriadosDemo = ['2026-01-01', '2026-04-02', '2026-04-03', '2026-05-01'];
const calendario = new CalendarioLaboral(feriadosDemo);
const hoy = new Date().toISOString().slice(0, 10);

const ejemplos = [
  { id: 1, cliente: 'Comercial La Ceiba', fechaEmision: '2026-10-01', diasPlazo: 15, monto: 125000 },
  { id: 2, cliente: 'Servicios del Valle', fechaEmision: '2026-10-12', diasPlazo: 15, monto: 89500 }
];

for (const datos of ejemplos) {
  try {
    const factura = new Factura(datos);
    const vencimiento = factura.calcularVencimiento(calendario);
    const estado = factura.determinarEstado(hoy, vencimiento);
    console.log({ id: factura.id, cliente: factura.cliente, vencimiento, estado, hoy });
  } catch (error) {
    console.error(`Error en factura ${datos.id}: ${error.message}`);
  }
}

// Caso de error demostrable: fecha ausente.
try {
  new Factura({ id: 99, cliente: 'Cliente de prueba', diasPlazo: 15 });
} catch (error) {
  console.log('Error esperado controlado:', error.message);
}
