"use client";

import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { School } from "@/entities/school";
import { Loading } from "./Loading";
import { Message } from "./Message";
import { schoolColumns } from "@/entities/schoolColumns";

interface Props {
  rows: School[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

export const Table = ({ rows, isLoading, isError, isEmpty }: Props) => {
  if (isLoading) return <Loading />;
  if (isError) return <Message message="学校データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="学校データがありません。" />;
  return (
    <>
      <Paper sx={{ height: 370, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={schoolColumns}
          getRowId={(row) => row.schoolId}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};
