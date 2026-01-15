import { google } from "googleapis";
import { NextResponse } from "next/server";
import { School } from "@/entities/school";

export async function GET(req: Request) {
  try {
    console.log("Full Request URL:", req.url);
    const { searchParams } = new URL(req.url);
    const alignmentQuery = searchParams.get("alignment");
    const targetQueryParam = searchParams.get("target");
    const styleQueryParam = searchParams.get("style");
    const attendanceQueryParam = searchParams.get("attendance");
    const minFeeQuery = searchParams.get("minFee");
    const maxFeeQuery = searchParams.get("maxFee");

    const targetQueries = targetQueryParam ? targetQueryParam.split(',') : [];
    const styleQueries = styleQueryParam ? styleQueryParam.split(',') : [];
    const attendanceQueries = attendanceQueryParam ? attendanceQueryParam.split(',') : [];

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

  const filters:((school: School) => boolean)[] = [];

  if (targetQueries.length > 0) {
    filters.push((school) => targetQueries.includes(school.target));
  }

   if (styleQueries.length > 0) {
    filters.push((school) => styleQueries.includes(school.style));
  }

  if (attendanceQueries.length > 0) {
    filters.push((school) => attendanceQueries.includes(school.attendance));
  }

  if (minFeeQuery && maxFeeQuery) {
    const minFee = Number(minFeeQuery);
    const maxFee = Number(maxFeeQuery);
    filters.push((school) => {
      const fee = (targetQueries.includes("新入学")) ? Number(school.entranceTuition) || 0 : Number(school.transferTuition) || 0;
      return fee >= minFee && fee <= maxFee;
    });
  }

const isOrSearch = alignmentQuery === "OR";

/**
 * target style attendance は DB 上で単一値
 * AND検索 + target style attendance 複数指定は成立しない
 */
if (
  !isOrSearch &&
  (
    targetQueries.length > 1 ||
    styleQueries.length > 1 ||
    attendanceQueries.length > 1
  )) {
  data = [];
} else {
  const filters: ((school: School) => boolean)[] = [];

  if (targetQueries.length > 0) {
    filters.push((school) => targetQueries.includes(school.target));
  }

  if (styleQueries.length > 0) {
    filters.push((school) => styleQueries.includes(school.style));
  }

  if (attendanceQueries.length > 0) {
    filters.push((school) => attendanceQueries.includes(school.attendance));
  }

  if (filters.length > 0) {
    data = data.filter((school) =>
      isOrSearch
        ? filters.some((fn) => fn(school))   // OR
        : filters.every((fn) => fn(school)) // AND
    );
  }
}

  data.sort((a, b) => {
    const aFee =
      Number(a.entranceTuition) ||
      Number(a.transferTuition) ||
      0;

    const bFee =
      Number(b.entranceTuition) ||
      Number(b.transferTuition) ||
      0;

    return aFee - bFee;
  });

  if (idsQuery) {
    const ids = idsQuery.split(",").map((id) => decodeURIComponent(id.trim()));
    data = data.filter((item) => ids.includes(item.schoolId));
  }

    console.log("Alignment:", alignmentQuery, "Filtered Data:",data.map((school) => ({
    course: school.course,
    target: school.target,
  })));

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
