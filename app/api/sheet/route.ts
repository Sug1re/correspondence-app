import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Course } from "@/entities/course";
/* =========================
  Row → Course（列名ベース）
========================= */
const mapRowToCourse = (row: string[]): Course => {
  const [
    ,
    ,
    Course = "",
    Style = "",
    AdmissionType = "",
    CorrespondenceTuition1st = "",
    CorrespondenceTuition2nd = "",
    CorrespondenceTuition3rd = "",
    Frequency = "",
    week5Tuition1st = "",
    week5Tuition2nd = "",
    week5Tuition3rd = "",
    week3Tuition1st = "",
    week3Tuition2nd = "",
    week3Tuition3rd = "",
    week1Tuition1st = "",
    week1Tuition2nd = "",
    week1Tuition3rd = "",
    AprilAdmission = "",
    JulyAdmission = "",
    OctoberAdmission = "",
    JanuaryAdmission = "",
    SeparatelyTuitionName = "",
    DifferenceTuitionName = "",
    SeparatelyTuition = "",
    AdmissionAllTuition = "",
    TransferAllTuition = "",
    Id = "",
  ] = row;

  return {
    Course,
    Style,
    AdmissionType,
    CorrespondenceTuition1st,
    CorrespondenceTuition2nd,
    CorrespondenceTuition3rd,
    Frequency,
    week5Tuition1st,
    week5Tuition2nd,
    week5Tuition3rd,
    week3Tuition1st,
    week3Tuition2nd,
    week3Tuition3rd,
    week1Tuition1st,
    week1Tuition2nd,
    week1Tuition3rd,
    AprilAdmission,
    JulyAdmission,
    OctoberAdmission,
    JanuaryAdmission,
    SeparatelyTuitionName,
    DifferenceTuitionName,
    SeparatelyTuition,
    AdmissionAllTuition,
    TransferAllTuition,
    Id,
  };
};

/* =========================
  空データ除去
========================= */
const isValidCourse = (course: Course) =>
  Object.values(course).some((v) => {
    if (v == null) return false;
    const str = String(v).trim();
    return str !== "" && str !== ";";
  });

/* =========================
  API
========================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const alignmentQuery = searchParams.get("alignment");
    const admissionTypeQueryParam = searchParams.get("admissionType");
    const styleQueryParam = searchParams.get("style");
    const frequencyQueryParam = searchParams.get("frequency");
    const minFeeQuery = searchParams.get("minFee");
    const maxFeeQuery = searchParams.get("maxFee");
    const idsQuery = searchParams.get("ids")

    const admissionTypeQueries = admissionTypeQueryParam ? admissionTypeQueryParam.split(',') : [];
    const styleQueries = styleQueryParam ? styleQueryParam.split(',') : [];
    const frequencyQueries = frequencyQueryParam ? frequencyQueryParam.split(',') : [];

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

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "CourseData!A2:AB200",
    });

    /* =========================
      データ整形
    ========================= */

    let data: Course[] = (res.data.values ?? [])
      .map(mapRowToCourse)
      .filter(isValidCourse);

    /* =========================
      フィルタ
    ========================= */

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

  /* =========================
    並び替え
  ========================= */
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

  /* =========================
    IDフィルタ
  ========================= */
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
