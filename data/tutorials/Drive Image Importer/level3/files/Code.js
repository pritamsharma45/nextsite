function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Image Importer").addItem("Insert Images", "insertImages").addItem("Open Sidebar", "showSidebar").addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("Sidebar").setTitle("Get Images");
  SpreadsheetApp.getUi().showSidebar(html);
}

function insertImages() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var configSheet = ss.getSheetByName("Config");
  var folderId = configSheet.getRange("A1").getValue();
  var activeSheet = ss.getActiveSheet();

  insertFilesIntoSheet(folderId, activeSheet);
}

function insertFilesIntoSheet(folderId, sheet) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var rows = [["File Name", "URL", "Thumbnail"]];
  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    var thumbnailUrl = "https://drive.google.com/thumbnail?id=" + fileId + "&sz=200";
    rows.push([file.getName(), thumbnailUrl, '=IMAGE("' + thumbnailUrl + '")']);
  }
  sheet.clear();
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}


function getImageList() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var configSheet = ss.getSheetByName("Configuration");
  if (!configSheet) throw new Error("Configuration sheet not found.");
  
  var folderId = configSheet.getRange("A1").getValue();
  if (!folderId) throw new Error("No folder ID in Configuration!A1.");
  
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var results = [];
  
  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    results.push({
      name: file.getName(),
      url: "https://drive.google.com/file/d/" + fileId + "/view",
      thumb: "https://drive.google.com/thumbnail?id=" + fileId + "&sz=200"
    });
  }
  
  return results;
}
