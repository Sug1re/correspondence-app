import { google } from "googleapis";
import { NextResponse } from "next/server";
import { School } from "@/entities/school";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetQuery = searchParams.get("target");
    const schoolQuery = searchParams.get("school");
    const styleQuery = searchParams.get("style");
    const attendanceQuery = searchParams.get("attendance");

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
    const range = "School!A2:AE";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    let data: School[] = rows.map((row) => ({
      name: row[2] ?? "",
      course: row[3] ?? "",
      content: row[4] ?? "",
      school: row[5] ?? "",
      style: row[6] ?? "",
      schooling: row[7] ?? "",
      attendance: row[8] ?? "",
      subAttendance: row[9] ?? "",
      target: row[10] ?? "",
      firstTuition: row[11] ?? "",
      secondTuition: row[12] ?? "",
      thirdTuition: row[13] ?? "",
      enrollmentFee: row[14] ?? "",
      april: row[15] ?? "",
      may: row[16] ?? "",
      june: row[17] ?? "",
      july: row[18] ?? "",
      august: row[19] ?? "",
      september: row[20] ?? "",
      october: row[21] ?? "",
      november: row[22] ?? "",
      december: row[23] ?? "",
      january: row[24] ?? "",
      february: row[25] ?? "",
      march: row[26] ?? "",
      anotherTuitionName: row[27] ?? "",
      anotherTuition: row[28] ?? "",
      picture: row[29] ?? "",
      url: row[30] ?? "",
    }));

  if (targetQuery) {
    data = data.filter((school) => school.target === targetQuery);
  }

  if (schoolQuery) {
    data = data.filter((item) => item.school === schoolQuery);
  }

  if (styleQuery) {
    data = data.filter((item) => item.style === styleQuery);
  }

  if (attendanceQuery) {
    if (attendanceQuery !== "オンライン") {
      data = data.filter((item) => item.attendance === attendanceQuery);
    }
  }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
