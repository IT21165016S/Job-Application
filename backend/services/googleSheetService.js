const { google } = require("googleapis");
const credentials = require("../serviceAccount.json");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Full Read & Write Access
});

const sheets = google.sheets({ version: "v4", auth });

const appendToGoogleSheet = async (cvEntry) => {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [[cvEntry.name, cvEntry.email, cvEntry.phone, cvEntry.cvPublicLink, new Date()]],
      },
    });
    console.log("Data added to Google Sheet");
  } catch (error) {
    console.error("Error adding data to Google Sheets:", error);
  }
};

module.exports = { appendToGoogleSheet };
