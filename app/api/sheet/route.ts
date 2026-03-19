import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Course } from "@/entities/course";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const alignmentQuery = searchParams.get("alignment");
    const admissionTypeQueryParam = searchParams.get("admissionType");
    const styleQueryParam = searchParams.get("style");
    const frequencyQueryParam = searchParams.get("frequency");
    const minFeeQuery = searchParams.get("minFee");
    const maxFeeQuery = searchParams.get("maxFee");

    const admissionTypeQueries = admissionTypeQueryParam ? admissionTypeQueryParam.split(',') : [];
    const styleQueries = styleQueryParam ? styleQueryParam.split(',') : [];
    const frequencyQueries = frequencyQueryParam ? frequencyQueryParam.split(',') : [];

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
    const range = "CourseData!A2:AB200";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    let data: Course[] = rows.map((row) => ({
      Id: row[3] ?? "",
      Course: row[4] ?? "",
      Style: row[5] ?? "",
      AdmissionType: row[6] ?? "",
      CorrespondenceTuition1st: row[7] ?? "",
      CorrespondenceTuition2nd: row[8] ?? "",
      CorrespondenceTuition3rd: row[9] ?? "",
      Frequency: row[10] ?? "",
      week5Tuition1st: row[11] ?? "",
      week5Tuition2nd: row[12] ?? "",
      week5Tuition3rd: row[13] ?? "",
      week3Tuition1st: row[14] ?? "",
      week3Tuition2nd: row[15] ?? "",
      week3Tuition3rd: row[16] ?? "",
      week1Tuition1st: row[17] ?? "",
      week1Tuition2nd: row[18] ?? "",
      week1Tuition3rd: row[19] ?? "",
      AprilAdmission: row[20] ?? "",
      JulyAdmission: row[21] ?? "",
      OctoberAdmission: row[22] ?? "",
      JanuaryAdmission: row[23] ?? "",
      SeparatelyTuitionName: row[24] ?? "",
      DifferenceTuitionName: row[25] ?? "",
      SeparatelyTuition: row[26] ?? "",
      AdmissionAllTuition: row[27] ?? "",
      TransferAllTuition: row[28] ?? "",
    }));

    data = data.filter((course) =>
      Object.values(course).some(
        (v) => v !== "" && v !== null && v !== undefined
      )
    );

const isOrSearch = alignmentQuery === "OR";

if (
  !isOrSearch &&
  (
    admissionTypeQueries.length > 1 ||
    styleQueries.length > 1 ||
    frequencyQueries.length > 1
  )) {
  data = [];
} else {
  const filters: ((course: Course) => boolean)[] = [];

  if (admissionTypeQueries.length > 0) {
    filters.push((course) => admissionTypeQueries.includes(course.AdmissionType));
  }

  if (styleQueries.length > 0) {
    filters.push((course) => styleQueries.includes(course.Style));
  }

  if (frequencyQueries.length > 0) {
    filters.push((course) => frequencyQueries.includes(course.Frequency));
  }

  if (minFeeQuery && maxFeeQuery) {
    const minFee = Number(minFeeQuery);
    const maxFee = Number(maxFeeQuery);
    filters.push((course) => {
      const entranceFee = Number(course.AdmissionAllTuition) || 0;
      const transferFee = Number(course.TransferAllTuition) || 0;

      if (admissionTypeQueries.length === 0) {
        const inEntranceRange = entranceFee >= minFee && entranceFee <= maxFee;
        const inTransferRange = transferFee >= minFee && transferFee <= maxFee;
        return (entranceFee > 0 && inEntranceRange) || (transferFee > 0 && inTransferRange);
      }

      const fee = (admissionTypeQueries.includes("新入学")) ? entranceFee : transferFee;
      return fee >= minFee && fee <= maxFee;
    });
  }

  if (filters.length > 0) {
    data = data.filter((course) =>
      isOrSearch
        ? filters.some((fn) => fn(course))
        : filters.every((fn) => fn(course))
    );
  }
}

  data.sort((a, b) => {
    const aFee =
      Number(a.AdmissionAllTuition) ||
      Number(a.TransferAllTuition) ||
      0;

    const bFee =
      Number(b.AdmissionAllTuition) ||
      Number(b.TransferAllTuition) ||
      0;

    return aFee - bFee;
  });

  if (idsQuery) {
    const ids = idsQuery.split(",").map((id) => decodeURIComponent(id.trim()));
    data = data.filter((item) => ids.includes(item.Id));
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
