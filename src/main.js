const {CalendarioLaboral,FacturaCredito,FacturaContado,HistorialTendencia}=require('./facturacion');
const calendario=new CalendarioLaboral(['2026-01-01','2026-04-02','2026-04-03','2026-05-01']);
const hoy=new Date().toISOString().slice(0,10);
const facturas=[
 new FacturaCredito({id:1,cliente:'Comercial La Ceiba',fechaEmision:'2026-10-01',diasPlazo:15,monto:125000}),
 new FacturaCredito({id:2,cliente:'Servicios del Valle',fechaEmision:'2026-10-12',diasPlazo:15,monto:89500}),
 new FacturaContado({id:5,cliente:'Tienda Centro',fechaEmision:hoy,monto:15000})
];
for(const f of facturas){
 const vencimiento=f.calcularVencimiento(calendario);
 console.log({id:f.id,tipo:f.constructor.name,cliente:f.cliente,vencimiento,estado:f.determinarEstado(hoy,vencimiento)});
}
try { new FacturaCredito({id:99,cliente:'Cliente incompleto'}).calcularVencimiento(calendario); }
catch(e){ console.log('Error controlado:',e.message); }
console.log('Tendencia:',new HistorialTendencia([{estado:'pendiente'},{estado:'vencida'},{estado:'vencida'}]).resumir());
