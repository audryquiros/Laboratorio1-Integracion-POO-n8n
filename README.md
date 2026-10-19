# Laboratorio 1 — Integración POO + n8n (extensión de cuatro retos)

Este proyecto parte del ZIP original del laboratorio de facturación con días hábiles y feriados.

## Contenido
- `src/facturacion.js`: CalendarioLaboral, Factura, FacturaCredito, FacturaContado e HistorialTendencia.
- `src/main.js`: demostración de las clases y manejo de error.
- `public/index.html` y `public/clases.js`: página web de prueba.
- `db.json`: datos de facturas e historial para JSON Server.
- `n8n/workflow_facturacion_extension.json`: workflow ampliado.
- `Docs/`: documento y diagrama de la extensión, además del documento/imagen del laboratorio base.

## Ejecutar en VS Code
1. Descomprime y abre la carpeta en VS Code.
2. Ejecuta `npm install`.
3. Ejecuta `npm test`.
4. En otra terminal ejecuta `npm run server` y déjala abierta.
5. Comprueba `http://127.0.0.1:3000/invoices` y `http://127.0.0.1:3000/historial`.
6. Abre `public/index.html` en el navegador.

## Cuatro retos
1. Herencia y polimorfismo: FacturaCredito y FacturaContado.
2. Dos APIs externas (Nager.Date + WorldTimeAPI) combinadas con Merge.
3. Nodo de correo: requiere configurar credenciales SMTP y destinatario en n8n.
4. Historial en JSON Server y resumen básico de tendencia.

## Importar el workflow
En n8n usa Import from File y selecciona `n8n/workflow_facturacion_extension.json`. Para n8n en el mismo host se usa `127.0.0.1:3000`; en Docker, cambia las URL a una dirección alcanzable desde el contenedor, como `host.docker.internal` en Windows/Mac. Verifica las ejecuciones de los nodos HTTP. El nodo de correo requiere configuración SMTP y las API externas requieren Internet.

La consulta de feriados está fijada inicialmente en 2026. Actualiza el año de Nager.Date para otros periodos y contempla años consecutivos si un plazo cruza diciembre.
