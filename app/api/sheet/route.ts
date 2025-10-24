import { google } from "googleapis";
import { NextResponse } from "next/server";
import { School } from "@/entities/school";

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const range = "schoolData!A2:Q";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    const data: School[] = rows.map((row) => ({
      timeStamp: row[0] ?? "",
      schoolName: row[1] ?? "",
      course: row[2] ?? "",
      school: row[3] ?? "",
      style: row[4] ?? "",
      season: row[5] ?? "",
      attendance1: row[6] ?? "",
      attendance2: row[7] ?? "",
      firstTuition: row[8] ?? "",
      anotherTuitionName: row[9] ?? "",
      secondTuition: row[10] ?? "",
      thirdTuition: row[11] ?? "",
      examFee: row[12] ?? "",
      features: row[13] ?? "",
      schooling: row[14] ?? "",
      picture: row[15] ?? "",
      url: row[16] ?? "",
      // anotherTuition: row[18] ?? "",
      // transferTuition: row[19] ?? "",
      // target: row[20] ?? "",
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}