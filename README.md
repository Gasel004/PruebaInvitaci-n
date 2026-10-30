# Invitación web · 60 años

Página de invitación adaptable a celular y computadora, con confirmación de asistencia guardada en una hoja de Google Sheets.

## Personaliza los datos

Abre `index.html` y edita el objeto `INVITATION` al final del archivo:

- `honoree`: nombre de la festejada (ya configurado como Carlota de Paz).
- `date`, `year`, `time`: día, fecha y hora.
- `rsvpNote`: indicación breve para confirmar.
- `maxPartySize`: máximo de personas por respuesta.
- `endpoint`: se completa en el paso 2.

La invitación incluye la hora de las 7:00 PM. El módulo de detalles muestra solo la fecha y la hora.

## Conecta las respuestas con Google Sheets

1. Crea una hoja nueva en Google Sheets. Copia el ID de la dirección: es el texto entre `/d/` y `/edit`.
2. En la hoja, abre **Extensiones → Apps Script**. Reemplaza el contenido del editor con `Code.gs`, pega el ID de la hoja en `SHEET_ID` y guarda.
3. En Apps Script, elige **Implementar → Nueva implementación → Aplicación web**. Configura **Ejecutar como: Yo** y acceso para **Cualquier persona**. Implementa y autoriza el acceso cuando Google lo solicite.
4. Copia la URL de la aplicación web, que termina en `/exec`, y pégala como valor de `endpoint` dentro de `INVITATION` en `index.html`.
5. La primera respuesta crea la pestaña **Respuestas** y sus columnas. Consulta ahí quién asistirá, quién no podrá asistir y el tamaño de cada grupo.

El formulario registra nombre, asistencia y cantidad de personas. La página no pide correo ni recopila datos de navegación.

## Publica temporalmente en GitHub Pages

1. Crea un repositorio de GitHub para la invitación y sube `index.html` a la raíz del repositorio. Puedes guardar `Code.gs` y este README junto con el HTML o conservarlos como respaldo.
2. En el repositorio abre **Settings → Pages**. En **Build and deployment**, selecciona **Deploy from a branch**, elige `main` y la carpeta `/ (root)`, y guarda.
3. GitHub mostrará la dirección pública de la página en esa sección.

## Privacidad y acceso

El enlace de la invitación puede compartirse públicamente. Cualquiera que lo tenga puede enviar una respuesta; solo tú tendrás acceso a la hoja mientras no la compartas. Al terminar el evento, desactiva o elimina la implementación web de Apps Script y, si ya no necesitas la página, desactiva GitHub Pages o archiva el repositorio.
