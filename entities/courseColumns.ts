import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { Course } from "@/entities/course";
import { JPOperators } from "@/lib/dataGrid";

type Column<T extends GridValidRowModel, K extends keyof T> =
  GridColDef<T> & {
    field: K;
  };

const baseNumberColumn = {
  type: "number" as const,
  filterOperators: JPOperators,
};

const baseTextColumn = {
  filterOperators: JPOperators,
};

export const courseColumns = [
  {
    field: "Id",
    headerName: "ID",
    width: 50,
    ...baseNumberColumn,
  } as Column<Course, "Id">,

  {
    field: "Course",
    headerName: "コース",
    width: 160,
    ...baseTextColumn,
  } as Column<Course, "Course">,

  {
    field: "Style",
    headerName: "通学スタイル",
    width: 90,
    ...baseTextColumn,
  } as Column<Course, "Style">,

  {
    field: "AdmissionType",
    headerName: "新入学/転入学",
    width: 110,
    ...baseTextColumn,
  } as Column<Course, "AdmissionType">,

  {
    field: "AdmissionAllTuition",
    headerName: "3年間の学費",
    width: 100,
    ...baseNumberColumn,

    renderCell: (params) => {
      const targetTypes = new Set(["新入学"])

      const admissionType = params.row.AdmissionType.padStart(2, "0");
      const value = params.value as number | null;

      if (!targetTypes.has(admissionType)) {
        return value == null ? "-" : value;
      }

      return value == null ? "-" : `${value.toLocaleString("ja-JP")}＋`;
    }
  } as Column<Course, "AdmissionAllTuition">,

  {
    field: "TransferAllTuition",
    headerName: "転入学の学費",
    width: 110,
    ...baseNumberColumn,

   renderCell: (params) => {
      const targetTypes = new Set(["転入学"])

      const admissionType = params.row.AdmissionType.padStart(2, "0");
      const value = params.value as number | null;

      if (!targetTypes.has(admissionType)) {
        return value == null ? "-" : value;
      }

      return value == null ? "-" : `${value.toLocaleString("ja-JP")}＋`;
    }
  } as Column<Course, "TransferAllTuition">,

  {
    field: "CorrespondenceTuition1st",
    headerName: "1年次の単位制・通信制課程の学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "CorrespondenceTuition1st">,
  {
    field: "CorrespondenceTuition2nd",
    headerName: "2年次の単位制・通信制課程の学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "CorrespondenceTuition2nd">,
  {
    field: "CorrespondenceTuition3rd",
    headerName: "3年次の単位制・通信制課程の学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "CorrespondenceTuition3rd">,
  {
    field: "week5Tuition1st",
    headerName: "1年次の週5コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week5Tuition1st">,

  {
    field: "week5Tuition2nd",
    headerName: "2年次の週5コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week5Tuition2nd">,
  {
    field: "week5Tuition3rd",
    headerName: "3年次の週5コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week5Tuition3rd">,
    {
    field: "week3Tuition1st",
    headerName: "1年次の週3コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week3Tuition1st">,
  {
    field: "week3Tuition2nd",
    headerName: "2年次の週3コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week3Tuition2nd">,
  {
    field: "week3Tuition3rd",
    headerName: "3年次の週3コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week3Tuition3rd">,
    {
    field: "week1Tuition1st",
    headerName: "1年次の週1＋コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week1Tuition1st">,

  {
    field: "week1Tuition2nd",
    headerName: "2年次の週1＋コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week1Tuition2nd">,
  {
    field: "week1Tuition3rd",
    headerName: "3年次の週1＋コースの学費",
    width: 100,
    ...baseNumberColumn,
  } as Column<Course, "week1Tuition3rd">,
  {
    field: "SeparatelyTuitionName",
    headerName: "別途必要な学費の項目名",
    width: 180,
    ...baseTextColumn,
  } as Column<Course, "SeparatelyTuitionName">,

  {
    field: "SeparatelyTuition",
    headerName: "別途必要な学費",
    width: 120,
    ...baseNumberColumn,
  } as Column<Course, "SeparatelyTuition">,

  {
    field: "DifferenceTuitionName",
    headerName: "差額の項目名",
    width: 310,
    ...baseTextColumn,
  } as Column<Course, "DifferenceTuitionName">,
] satisfies GridColDef<Course>[];