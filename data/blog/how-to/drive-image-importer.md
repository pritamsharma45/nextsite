---
title: 'Learn Basics of Google Apps Scripts'
date: 2022-10-20T15:32:14Z
lastmod: '2021-02-01'
tags: ['google-apps-script', 'google-sheet']
draft: false
summary: 'Learn basics of Google Apps script with the help of sample codes, small projects and more ...'
layout: PostSimple
bibliography: references-data.bib
canonicalUrl: https://tailwind-nextjs-starter-blog.vercel.app/blog/basics-of-gas/
---
<TOCInline toc={props.toc} asDisclosure />

# Build a Google Drive Image Importer with Apps Script: Step-by-Step Guide

Welcome to *Apps Script Bytes*! In this tutorial, you'll create a powerful **Google Drive Image Importer** using Google Apps Script. This tool pulls images from a Google Drive folder into a Google Sheet, complete with file names, URLs, and thumbnails. You'll also add a custom menu, a sidebar, and production-ready features like error handling and user-friendly alerts. Follow these step-by-step instructions to build it yourself.

## Step 1: Set Up Your Google Sheet
1. Open a browser and navigate to `sheets.new` to create a new Google Sheet.
2. Name the spreadsheet as desired.
3. Add a new sheet by clicking the "+" button at the bottom and name it **Config**.

## Step 2: Create the Core Image Importer Script
1. In the Google Sheet, go to **Extensions** > **Apps Script** to open the script editor.
2. Replace the default code with the following:

```javascript
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
 var rows = [["File Name","URL", "Thumbnail"]];
 while (files.hasNext()) {
   var file = files.next();
   var fileId = file.getId();
   var thumbnailUrl = "https://drive.google.com/thumbnail?id=" + fileId + "&sz=200";
   rows.push([file.getName(),thumbnailUrl, '=IMAGE("' + thumbnailUrl + '")']);
 }
 sheet.clear();
 sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}
```

3. In the **Config** sheet, enter the folder ID of your Google Drive folder in cell **A1**. To find the folder ID, open the folder in Google Drive and copy the ID from the URL (e.g., `https://drive.google.com/drive/folders/[FOLDER_ID]`).
4. Save the script and click **Run** in the script editor to import images. The active sheet will now display image names, thumbnail URLs, and clickable thumbnails.

## Step 3: Add a Button for Easy Access
1. In the Google Sheet, insert a shape by going to **Insert** > **Drawing**. Create a simple shape (e.g., a rectangle), label it **Import**, and save it to the sheet.
2. Right-click the shape, click the three-dot menu, and select **Assign script**.
3. Enter `insertImages` as the script name and save.
4. Click the shape to run the `insertImages` function and import images directly from the sheet.

## Step 4: Create a Custom Menu
1. Return to the script editor and add the following code to create a custom menu:

```javascript
function onOpen() {
 SpreadsheetApp.getUi()
   .createMenu("Image Importer")
   .addItem("Import", "insertImages")
   .addToUi();
}
```

2. Save the script and refresh the Google Sheet. A new menu called **Image Importer** will appear with an **Import** option.
3. Click **Image Importer** > **Import** to run the `insertImages` function.

## Step 5: Build a Sidebar for Enhanced Functionality
1. In the script editor, create a new HTML file by clicking **File** > **New** > **HTML file**. Name it **Sidebar**.
2. Paste the following code into the Sidebar.html file:

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top" />
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 10px;
        font-size: 13px;
      }
      h3 {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
      }
      button {
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        background: #4285f4;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
      }
      button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      #status {
        margin-top: 8px;
        font-size: 12px;
        text-align: center;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 6px;
        margin-top: 10px;
      }
      .grid img {
        width: 100%;
        border-radius: 4px;
        cursor: pointer;
        display: block;
      }
      .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #4285f4;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 1s linear infinite;
        display: inline-block;
        vertical-align: middle;
        margin-right: 4px;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <h3>Drive Image Importer</h3>
    <button id="insertBtn" onclick="insertImages()">Insert Images in Sheet</button>
    <button id="importBtn" onclick="importImages()">Import Images in Sidebar</button>
    <div id="status"></div>
    <div id="grid" class="grid"></div>

    <script>
      function insertImages() {
        const btn = document.getElementById("insertBtn");
        const status = document.getElementById("status");
        btn.disabled = true;
        status.innerHTML = '<div class="spinner"></div>Inserting…';

        google.script.run
          .withSuccessHandler(() => {
            btn.disabled = false;
            status.innerHTML = "✅ Inserted into sheet.";
          })
          .withFailureHandler((err) => {
            btn.disabled = false;
            status.innerHTML = "❌ " + err.message;
          })
          .insertImages();
      }

      function importImages() {
        const btn = document.getElementById("importBtn");
        const grid = document.getElementById("grid");
        const status = document.getElementById("status");
        btn.disabled = true;
        grid.innerHTML = "";
        status.innerHTML = '<div class="spinner"></div>Loading images…';

        google.script.run
          .withSuccessHandler((images) => {
            btn.disabled = false;
            status.innerHTML = "";
            if (!images || images.length === 0) {
              status.innerHTML = "No images found.";
              return;
            }
            grid.innerHTML = images.map((img) => `<img src="${img.thumb}" alt="${img.name}" onclick="window.open('${img.url}', '_blank')">`).join("");
          })
          .withFailureHandler((err) => {
            btn.disabled = false;
            status.innerHTML = "❌ " + err.message;
          })
          .getImageList();
      }
    </script>
  </body>
</html>
```

3. Update the `Code.gs` file by replacing the `onOpen` function and adding a `showSidebar` function:

```javascript
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Image Importer").addItem("Insert Images", "insertImages").addItem("Open Sidebar", "showSidebar").addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("Sidebar").setTitle("Get Images");
  SpreadsheetApp.getUi().showSidebar(html);
}
```

4. Save the script and refresh the Google Sheet. Navigate to **Image Importer** > **Open Sidebar** to display the sidebar.
5. In the sidebar, click **Import Images in Sidebar** to load a grid of images with their names. Click any image to open it full-size in a new tab.

## Step 6: Add Production-Ready Features
To make the importer robust, replace your `Code.gs` file with this enhanced version, which includes error handling, user-friendly alerts, and data safety checks:

```javascript
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
    rows.push([file.getName(), thumbnailUrl, '=IMAGE("' + thumbnailUrl + '")']);
  }
  sheet.clear();
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}

function getImageList() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var configSheet = ss.getSheetByName("Config");
  if (!configSheet) throw new Error("Config sheet not found.");

  var folderId = configSheet.getRange("A1").getValue();
  if (!folderId) throw new Error("No folder ID in Config!A1.");

  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var results = [];

  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    results.push({
      name: file.getName(),
      url: "https://drive.google.com/file/d/" + fileId + "/view",
      thumb: "https://drive.google.com/thumbnail?id=" + fileId + "&sz=200",
    });
  }

  return results;
}
```

This version adds:
- **Error handling** for missing Config sheets or folder IDs.
- **User-friendly alerts** to guide users through issues.
- **Data safety checks** to prevent overwriting the Config sheet or existing data without confirmation.
- **Professional UI feedback** with loading spinners and success messages.

## What You’ve Learned
By following this tutorial, you’ve mastered:
1. Building a **Google Drive Image Importer** to pull images into a Google Sheet with Apps Script.
2. Creating a **custom menu** to trigger functions effortlessly.
3. Enhancing your tool with a **sidebar** and adding **production-ready features** like error handling and user feedback.

## Next Steps
All the code is available for you to copy and adapt. Experiment with additional features, like filtering specific file types or customizing the sidebar’s appearance. Stay tuned to *Apps Script Bytes* for more tutorials to level up your automation skills!

