# Extensión del Laboratorio 1: Facturación POO + n8n

## Reto 1. Herencia y polimorfismo
La clase base `Factura` contiene identificador, cliente, fecha de emisión, plazo, estado, monto y tipo. `FacturaCredito` hereda de `Factura` y exige un plazo positivo, por defecto quince días hábiles. `FacturaContado` también hereda de `Factura`, pero su vencimiento es el mismo día de emisión. Ambas clases pueden usarse mediante una interfaz común, por lo que el método de cálculo se comporta polimórficamente.

## Reto 2. Segunda API y Merge
El workflow conserva Nager.Date para consultar los feriados de Costa Rica y añade WorldTimeAPI para obtener la fecha/hora de `America/Costa_Rica`. Las respuestas se normalizan y se combinan mediante un nodo Merge antes de calcular los vencimientos. Se debe comprobar que ambas API estén accesibles durante la ejecución.

## Reto 3. Notificación por correo
La rama de facturas vencidas incluye un nodo de envío de correo. Antes de usarlo, se deben configurar credenciales SMTP válidas y un destinatario autorizado en n8n. El correo no se enviará correctamente hasta completar esta configuración.

## Reto 4. Historial y tendencias
Se añadió la colección `historial` en `db.json` y la clase `HistorialTendencia`. El workflow guarda un registro de la factura procesada, el estado calculado, el vencimiento, la fecha de proceso y la tendencia observada. El análisis es una tendencia básica para fines académicos, no un pronóstico financiero.

## Pruebas y limitaciones
`npm test` comprueba herencia, cálculo y manejo de un dato incompleto. `npm run server` inicia JSON Server. La integración de n8n necesita JSON Server activo, acceso a Internet para las API y configuración SMTP para el reto de correo. Un fallo HTTP debe revisarse en la salida del nodo y no considerarse una actualización exitosa.
