"use client";

import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { School } from "@/entities/school";
import { Loading } from "./Loading";
import { Message } from "./Message";

interface Props {
  rows: School[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

const columns: GridColDef<School>[] = [
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
    headerName: "3年間の負担額",
    width: 130,
  },
  {
    field: "transferTuition",
    headerName: "年間の負担額",
    width: 130,
  },
  {
    field: "firstTuition",
    headerName: "1年目の学費",
    width: 130,
  },
  {
    field: "secondTuition",
    headerName: "2年目の学費",
    width: 130,
  },
  {
    field: "thirdTuition",
    headerName: "3年目の学費",
    width: 130,
  },
  {
    field: "anotherTuitionName",
    headerName: "その他の費用名",
    width: 130,
  },
  {
    field: "anotherTuition",
    headerName: "その他の費用",
    width: 130,
  },
];

export const Table = ({ rows, isLoading, isError, isEmpty }: Props) => {
  if (isLoading) return <Loading />;
  if (isError) return <Message message="学校データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="学校データがありません。" />;
  return (
    <>
      <Paper sx={{ height: 370, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.schoolId}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};
