# Invitación web · 60 años

Página de invitación adaptable a celular y computadora, con confirmación de asistencia guardada en una hoja de Google Sheets.

Hoja de respuestas creada para esta invitación: [Confirmaciones - Carlota de Paz](https://docs.google.com/spreadsheets/d/1C_7Qj5yH63HpNAnIfl3RqvH5GsUQIxLEG5wHvt9hXdA/edit).

## Personaliza los datos

Abre `index.html` y edita el objeto `INVITATION` al final del archivo:

- `honoree`: nombre de la festejada (ya configurado como Carlota de Paz).
- `date`, `year`, `time`: día, fecha y hora.
- `rsvpNote`: indicación breve para confirmar.
- `maxPartySize`: máximo de personas por respuesta (actualmente 5).
- `endpoint`: se completa en el paso 2.

La invitación incluye la hora de las 7:00 PM. El módulo de detalles muestra solo la fecha y la hora.

## Conecta las respuestas con Google Sheets

La conexión ya está publicada y enlazada en `index.html`.

- Hoja: [Confirmaciones - Carlota de Paz](https://docs.google.com/spreadsheets/d/1C_7Qj5yH63HpNAnIfl3RqvH5GsUQIxLEG5wHvt9hXdA/edit)
- Pestaña de respuestas: **Respuestas**
- URL de recepción del formulario (ya configurada en `index.html`; no hace falta abrirla): `https://script.google.com/macros/s/AKfycbxSA0EZhoiemSdsSgvL2uJ_5Cn0hW_FiAD5JiHDGSqKjOhXMToBsxZzH9J-kx5ZDpcS0g/exec`

La aplicación se ejecuta como propietaria y acepta respuestas de cualquier persona que tenga la invitación. Los invitados pueden enviar respuestas, pero no leer la hoja. Cada respuesta guarda fecha, nombre, asistencia y número de personas.

Si editas `Code.gs` en el futuro, publica una nueva versión desde **Implementar → Administrar implementaciones**. Si cambia la URL de la aplicación web, actualiza también `INVITATION.endpoint` en `index.html`.

El formulario registra nombre, asistencia y cantidad de personas. La página no pide correo ni recopila datos de navegación.

## Publica temporalmente en GitHub Pages

1. Crea un repositorio de GitHub para la invitación y sube `index.html` a la raíz del repositorio. Puedes guardar `Code.gs` y este README junto con el HTML o conservarlos como respaldo.
2. En el repositorio abre **Settings → Pages**. En **Build and deployment**, selecciona **Deploy from a branch**, elige `main` y la carpeta `/ (root)`, y guarda.
3. GitHub mostrará la dirección pública de la página en esa sección.

## Privacidad y acceso

El enlace de la invitación puede compartirse públicamente. Cualquiera que lo tenga puede enviar una respuesta; solo tú tendrás acceso a la hoja mientras no la compartas. Al terminar el evento, desactiva o elimina la implementación web de Apps Script y, si ya no necesitas la página, desactiva GitHub Pages o archiva el repositorio.
