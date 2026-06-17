/**
 * Ayurvan — Enquiry webhook (Google Apps Script)
 * ------------------------------------------------
 * This script receives enquiry submissions from the website, appends them to a
 * Google Sheet, and emails the admin a notification.
 *
 * SETUP (one time):
 *  1. Create a Google Sheet (e.g. "Ayurvan Enquiries").
 *  2. Extensions > Apps Script. Delete the default code and paste this file.
 *  3. Set ADMIN_EMAIL below if it differs.
 *  4. Deploy > New deployment > type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  5. Copy the "/exec" Web app URL and put it in the website's .env.local as
 *       GOOGLE_SCRIPT_URL=...   (see ayurvaan2/.env.local.example)
 *  6. The first deploy will prompt you to authorize Sheets + Gmail access.
 *
 * To change the sheet, run setup() once (it just writes the header row).
 */

var ADMIN_EMAIL = "info@ayurvanresort.com";
var SHEET_NAME = "Enquiries";
var HEADERS = ["Timestamp", "Name", "Email", "Phone", "Occasion", "Preferred Date", "Message"];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var row = appendRow_(data);
    sendAdminEmail_(data);
    return json_({ ok: true, row: row });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Lets you confirm the deployment is live by visiting the /exec URL in a browser.
function doGet() {
  return json_({ ok: true, service: "ayurvan-enquiry-webhook" });
}

function appendRow_(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.occasion || "",
    data.date || "",
    data.message || "",
  ]);
  return sheet.getLastRow();
}

function sendAdminEmail_(data) {
  var subject = "New Enquiry — " + (data.name || "Website") +
    (data.occasion ? " (" + data.occasion + ")" : "");
  var lines = [
    "A new enquiry was submitted on the Ayurvan website.",
    "",
    "Name:           " + (data.name || "-"),
    "Email:          " + (data.email || "-"),
    "Phone:          " + (data.phone || "-"),
    "Occasion:       " + (data.occasion || "-"),
    "Preferred Date: " + (data.date || "-"),
    "",
    "Message:",
    (data.message || "-"),
  ];
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    body: lines.join("\n"),
    replyTo: data.email || ADMIN_EMAIL,
  });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: run once from the editor to write the header row up front.
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
}
