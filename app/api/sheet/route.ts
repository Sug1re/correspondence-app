import { google } from "googleapis";
import { NextResponse } from "next/server";
import { School } from "@/entities/school";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetQuery = searchParams.get("target");
    const minFeeQuery = searchParams.get("minFee");
    const maxFeeQuery = searchParams.get("maxFee");
    const schoolQuery = searchParams.get("school");
    const styleQuery = searchParams.get("style");
    const attendanceQuery = searchParams.get("attendance");
    const schoolingQuery = searchParams.getAll("schooling");
    const idsQuery = searchParams.get("ids")

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

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
    const range = "School!A2:AH";

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
      schoolId: row[31] ?? "",
      entranceTuition: row[32] ?? "",
      transferTuition: row[33] ?? "",

    }));

  if (targetQuery) {
    data = data.filter((school) => school.target === targetQuery);
  }

  if (minFeeQuery && maxFeeQuery) {
    const minFee = Number(minFeeQuery);
    const maxFee = Number(maxFeeQuery);

    data = data.filter((school) => {
      if (targetQuery === "新入学") {
        const fee = Number(school.entranceTuition) || 0;
        return fee >= minFee && fee <= maxFee;
      } else {
        const fee = Number(school.transferTuition) || 0;
        return fee >= minFee && fee <= maxFee;
      }
    });
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

  if (schoolingQuery.length > 0) {
    data = data.filter((item) => {
      const itemSchoolings = item.schooling.split(',').map(s => s.trim());
      return schoolingQuery.some(query => itemSchoolings.includes(query));
    });
  }

  if (idsQuery) {
    const ids = idsQuery.split(",").map((id) => decodeURIComponent(id.trim()));
    data = data.filter((item) => ids.includes(item.schoolId));
  }

  if (targetQuery === "新入学") {
    data.sort(
      (a, b) =>
        (Number(a.entranceTuition) || 0) -
        (Number(b.entranceTuition) || 0)
    );
  } else {
    data.sort(
      (a, b) =>
        (Number(a.transferTuition) || 0) -
        (Number(b.transferTuition) || 0)
    );
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
