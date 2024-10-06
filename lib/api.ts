"use server";
const SPREADSHEET_ID = "1yTjCn83-0p2I3mG4KJTq60Yo1T68IWt9DtThVqZL7Tc";

import { google } from "googleapis";
import { validateEmails } from "./server";

export async function ValidateEmail(email: string) {
  const res = await validateEmails(email);
  console.log(res);
  return res;
}

//console.log(process.env.GOOGLE_PRIVATE_KEY)

const keys = {
  type: "service_account",
  project_id: "bloogger-ap-chripee",
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID as string,
  private_key: String(process.env.GOOGLE_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
  ),
  client_email: String(process.env.GOOGLE_CLIENT_EMAIL as string),
  client_id: String(process.env.GOOGLE_CLIENT_ID as string),
};
const sheets = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials: keys,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  }),
});

export async function addEmailToSheet(email: string) {
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:A",
    valueInputOption: "RAW",
    requestBody: {
      values: [[email]],
    },
  });
  console.log(`${response.data.updates?.updatedCells} cells updated.`);
}
