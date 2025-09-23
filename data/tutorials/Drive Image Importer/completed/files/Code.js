function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Image Importer").addItem("Insert Images", "insertImages").addItem("Open Sidebar", "showSidebar").addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("Sidebar").setTitle("Google Drive Image Importer");
  SpreadsheetApp.getUi().showSidebar(html);
}

function insertImages() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var configSheet = ss.getSheetByName("Config");

  if (!configSheet) {
    ui.alert("Error", "No sheet named 'Config' found!", ui.ButtonSet.OK);
    return;
  }

  var folderId = configSheet.getRange("A1").getValue();
  if (!folderId) {
    ui.alert("Error", "No folder ID found in Config! Please put folder ID in A1.", ui.ButtonSet.OK);
    return;
  }
  var activeSheet = ss.getActiveSheet();
  // Case 1: prevent writing into the config sheet
  if (activeSheet.getName() === "Config") {
    ui.alert("Warning", "You cannot insert images into the Config sheet.", ui.ButtonSet.OK);
    return;
  }
  // Case 2: warn if sheet already has data
  var lastRow = activeSheet.getLastRow();
  if (lastRow > 0) {
    var response = ui.alert("Warning", "The active sheet already has data. Do you want to overwrite it?", ui.ButtonSet.YES_NO);
    if (response !== ui.Button.YES) {
      ui.alert("Canceled", "Operation canceled.", ui.ButtonSet.OK);
      return;
    }
  }
  insertFilesIntoSheet(folderId, activeSheet);
  ui.alert("Success", "Inserted images successfully!", ui.ButtonSet.OK);
}

function insertFilesIntoSheet(folderId, sheet) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var rows = [["File Name", "URL", "Thumbnail"]];
  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    var thumbnailUrl = "https://drive.google.com/thumbnail?id=" + fileId + "&sz=200";
    rows.push([file.getName().split('.')[0], thumbnailUrl, '=IMAGE("' + thumbnailUrl + '")']);
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
      name: file.getName().split('.')[0],
      url: "https://drive.google.com/file/d/" + fileId + "/view",
      thumb: "https://drive.google.com/thumbnail?id=" + fileId + "&sz=200",
    });
  }

  return results;
}
