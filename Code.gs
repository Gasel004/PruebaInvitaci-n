/**
 * Guarda respuestas de la invitación en una hoja de Google Sheets.
 * Pega el ID de tu hoja en SHEET_ID antes de publicar como aplicación web.
 */
const SHEET_ID = "1C_7Qj5yH63HpNAnIfl3RqvH5GsUQIxLEG5wHvt9hXdA";
const TAB_NAME = "Respuestas";
const HEADERS = ["Fecha de respuesta", "Nombre", "Asistencia", "Personas"];

function doPost(e) {
  try {
    if (!SHEET_ID || SHEET_ID.includes("PEGA_AQUI")) {
      throw new Error("Falta configurar el ID de Google Sheets.");
    }

    const data = (e && e.parameter) || {};
    if (data.website) return responsePage("Listo", "Gracias.", true, data.nonce); // Campo trampa para bots.

    const name = cleanText(data.nombre, 100);
    const attendance = cleanText(data.asistencia, 30);
    const allowed = ["Sí, asistiré", "No podré asistir"];
    if (!name || !allowed.includes(attendance)) {
      return responsePage("No se guardó", "Revisa el nombre y la respuesta e inténtalo de nuevo.", false, data.nonce);
    }

    const count = attendance === "Sí, asistiré" ? Math.max(1, Math.min(10, Number(data.personas) || 1)) : 0;
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const book = SpreadsheetApp.openById(SHEET_ID);
      let sheet = book.getSheetByName(TAB_NAME);
      if (!sheet) sheet = book.insertSheet(TAB_NAME);
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      sheet.appendRow([new Date(), safeForSheet(name), attendance, count]);
    } finally {
      lock.releaseLock();
    }
    return responsePage("Respuesta recibida", "¡Gracias! Tu respuesta quedó registrada.", true, data.nonce);
  } catch (error) {
    console.error(error);
    return responsePage("No pudimos guardar tu respuesta", "Inténtalo de nuevo o comunícate con la anfitriona.", false, (e && e.parameter && e.parameter.nonce) || "");
  }
}

function cleanText(value, maxLength) {
  return String(value || "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

// Evita que una respuesta escrita por un invitado se interprete como fórmula.
function safeForSheet(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function responsePage(title, message, ok, nonce) {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const safeNonce = escapeHtml(String(nonce || ""));
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>body{margin:0;padding:32px;background:#171a13;color:#f5f0df;font:16px Arial,sans-serif;text-align:center}main{max-width:480px;margin:10vh auto;padding:30px;border:1px solid #d4b66f}h1{color:#d4b66f;font-weight:400}p{line-height:1.6}</style></head><body><main><h1>${safeTitle}</h1><p>${safeMessage}</p></main><script>window.top.postMessage({source:"birthday-rsvp",ok:${Boolean(ok)},nonce:"${safeNonce}"},"*");</script></body></html>`;
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
}
