// Google Apps Script para guardar predicciones en Google Sheets
// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Ve a https://script.google.com/
// 2. Crea un nuevo proyecto
// 3. Pega este código
// 4. Guarda y despliega como Web App
// 5. Copia la URL y reemplázala en el archivo HTML

function doPost(e) {
  try {
    // Obtener la hoja de cálculo activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Si es la primera vez, crear encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Nombre',
        'Mes',
        'Semana',
        'Fecha Exacta (dd/mm/yyyy)',
        'Franja Horaria',
        'Peso (libras)',
        'Tipo de Parto',
        'Estatura (cm)',
        'Segundo Nombre'
      ]);
      
      // Formatear encabezados
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#2c3e50');
      headerRange.setFontColor('#ffffff');
    }
    
    // Parsear los datos del formulario
    var data = JSON.parse(e.postData.contents);
    
    // Agregar la fila con los datos
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }),
      data.nombre,
      data.mes,
      data.semana,
      data.fecha, // Ya viene en formato dd/mm/yyyy desde el HTML
      data.franja,
      data.peso,
      data.parto,
      data.estatura,
      data.segundoNombre
    ]);
    
    // Auto-ajustar columnas
    sheet.autoResizeColumns(1, 10);
    
    // Respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Predicción guardada exitosamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Respuesta de error
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para testing (opcional)
function doGet(e) {
  return ContentService.createTextOutput(
    'Google Apps Script está funcionando correctamente. Usa POST para enviar datos.'
  );
}
