import { GridColDef } from "@mui/x-data-grid";
import { Course } from "@/entities/course";
import { JPOperators } from "@/lib/dataGrid";

export const courseColumns: GridColDef<Course>[] = [
  { field: "schoolId", headerName: "ID", width: 70,
    filterOperators: JPOperators
   },
  { field: "course", headerName: "コース", width: 150,
    filterOperators: JPOperators
   },
  { field: "style", headerName: "通学スタイル", width: 130,
    filterOperators: JPOperators
   },
  { field: "target", headerName: "対象者", width: 130,
    filterOperators: JPOperators
   },
  {
    field: "attendance",
    headerName: "通学頻度",
    width: 130,
    filterOperators: JPOperators

  },
  {
    field: "subAttendance",
    headerName: "通学頻度（補足）",
    width: 130,
    filterOperators: JPOperators

  },
  {
    field: "entranceTuition",
    headerName: "3年間の負担額（円）",
    width: 130,
    type: "number",
    filterOperators: JPOperators

  },
  {
    field: "transferTuition",
    headerName: "年間の負担額（円）",
    width: 130,
    type: "number",
    filterOperators: JPOperators

  },
  {
    field: "firstTuition",
    headerName: "1年目の学費",
    width: 130,
    type: "number",
    filterOperators: JPOperators
  },
  {
    field: "secondTuition",
    headerName: "2年目の学費",
    width: 130,
    type: "number",
    filterOperators: JPOperators
  },
  {
    field: "thirdTuition",
    headerName: "3年目の学費",
    width: 130,
    type: "number",
    filterOperators: JPOperators
  },
];
