import { GridColDef } from "@mui/x-data-grid";
import { School } from "@/entities/school";

export const schoolColumns: GridColDef<School>[] = [
  { field: "schoolId", headerName: "ID", width: 70 },
  { field: "course", headerName: "コース", width: 130 },
  { field: "style", headerName: "通学スタイル", width: 130 },
  { field: "target", headerName: "対象者", width: 130 },
  {
    field: "attendance",
    headerName: "通学頻度",
    width: 130,
  },
  {
    field: "subAttendance",
    headerName: "通学頻度（補足）",
    width: 130,
  },
  {
    field: "entranceTuition",
    headerName: "3年間の負担額（円）",
    width: 130,
    type: "number",
  },
  {
    field: "transferTuition",
    headerName: "年間の負担額（円）",
    width: 130,
    type: "number",
  },
  {
    field: "firstTuition",
    headerName: "1年目の学費",
    width: 130,
    type: "number",
  },
  {
    field: "secondTuition",
    headerName: "2年目の学費",
    width: 130,
    type: "number",
  },
  {
    field: "thirdTuition",
    headerName: "3年目の学費",
    width: 130,
    type: "number",
  },
];
