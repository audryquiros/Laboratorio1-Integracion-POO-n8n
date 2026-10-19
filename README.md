# Laboratorio 1 — Facturación con días hábiles (POO + n8n)

## Incluye
- `n8n/workflow_facturacion.json`: workflow importable.
- `src/facturacion.js`: clases `Factura` y `CalendarioLaboral`.
- `src/main.js`: pruebas independientes y error controlado.
- `data/db.json`: datos de ejemplo.
- `docs/logica_negocio.md`: documento de lógica de negocio.
- `docs/diagrama_workflow.mmd` y `docs/diagrama_workflow.svg`: diagrama.

## Requisitos
Node.js LTS, npm y n8n. Si n8n corre en Docker, cambia `localhost` por `host.docker.internal` en las URL de JSON Server (Windows/Mac).

## Ejecutar
1. Abre esta carpeta en VS Code.
2. Terminal: `npm install`
3. Terminal: `npm run server` (deja la terminal abierta).
4. En otra terminal: `npm test`.
5. Abre n8n → Import from File → selecciona `n8n/workflow_facturacion.json`.
6. Pulsa **Execute Workflow**. Revisa los nodos de resultado y `http://localhost:3000/invoices`.

## Reglas
1. Lunes a viernes son días hábiles.
2. Se excluyen feriados de Nager.Date Costa Rica.
3. Plazo por defecto de 15 días hábiles.
4. Facturas pagadas/anuladas conservan su estado.
5. Solo se marca vencida si hoy es posterior al vencimiento.
6. Datos incompletos se derivan a revisión manual.
7. Se limita el cálculo para evitar bucles indefinidos.

La URL de feriados está configurada para 2026. Para otro año, edita el año en el nodo `Consultar feriados`. El workflow debe probarse en tu instalación antes de presentarlo.


## Página HTML para probar las clases
Abre `public/index.html` en el navegador. Permite ingresar una factura, calcular su vencimiento y demostrar un error de datos. Esta página es complementaria; la automatización de n8n sigue ejecutándose por separado.

## Solución al error `ECONNREFUSED ::1:3000`
Ese mensaje significa que n8n no pudo conectarse a JSON Server; normalmente el servidor no está iniciado o `localhost` se resolvió a IPv6.
1. En VS Code ejecuta `npm install`.
2. En una terminal ejecuta `npm run server` y déjala abierta. Debe indicar que escucha en el puerto 3000.
3. Prueba `http://127.0.0.1:3000/invoices` en el navegador.
4. En los nodos HTTP del workflow, cambia `http://localhost:3000` por `http://127.0.0.1:3000`.
5. Si n8n corre dentro de Docker, usa `http://host.docker.internal:3000` en Windows/Mac (o la dirección accesible desde el contenedor).
6. Vuelve a ejecutar el workflow desde el nodo inicial. Si aparece un error de conexión, no lo interpretes como una factura vencida: revisa el nodo HTTP anterior.
