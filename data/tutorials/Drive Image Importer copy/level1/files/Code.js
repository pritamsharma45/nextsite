/* global SpreadsheetApp, DriveApp */
function insertImages() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var configSheet = ss.getSheetByName('Config')
  var folderId = configSheet.getRange('A1').getValue()
  var activeSheet = ss.getActiveSheet()
  insertFilesIntoSheet(folderId, activeSheet)
}
function insertFilesIntoSheet(folderId, sheet) {
  var folder = DriveApp.getFolderById(folderId)
  var files = folder.getFiles()
  var rows = [['File Name', 'URL', 'Thumbnail']]
  while (files.hasNext()) {
    var file = files.next()
    var fileId = file.getId()
    var thumbnailUrl = 'https://drive.google.com/thumbnail?id=' + fileId + '&sz=200'
    rows.push([file.getName(), thumbnailUrl, '=IMAGE("' + thumbnailUrl + '")'])
  }
  sheet.clear()
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows)
}
