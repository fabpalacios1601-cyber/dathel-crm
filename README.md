# DATHEL CRM — V1

Prototipo funcional de CRM web para gestión de ventas de luz y gas.

## Incluye
- Login por credenciales.
- Roles: Comercial, BO, Supervisor, Jefe de Operaciones y Director General.
- Alta de ventas.
- Empresas: Endesa, Repsol, Naturgy y Nordy.
- Productos: Luz, Gas y Luz + Gas.
- Estados: Nuevo, Pte Validación, En Activación, KO, Activo, Baja y Cancelado.
- Historial de comentarios.
- Dashboard y búsqueda.
- Base de datos SQLite local.

## IMPORTANTE
Esta V1 es un prototipo para pruebas. NO uses datos reales de clientes todavía. Antes de ponerlo en producción hay que configurar un servidor seguro, HTTPS, gestión real de contraseñas, copias de seguridad, control de acceso, auditoría y medidas de protección de datos.

## Cómo arrancarlo en Windows
1. Instala Python 3.11 o superior.
2. Abre `start_windows.bat`.
3. En el navegador entra a `http://127.0.0.1:5000`.

## Usuarios de prueba
- Director: `director` / `Director123!`
- Jefe de Operaciones: `jefeop` / `Jefe123!`
- Supervisor: `supervisor` / `Super123!`
- BO: `bo` / `BO123!`
- Comercial: `comercial1` / `Comercial123!`

Cambia las credenciales y la `secret_key` antes de cualquier uso real.
