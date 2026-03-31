"use client";

import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Loading } from "./Loading";
import { Message } from "./Message";
import { courseColumns } from "@/entities/courseColumns";
import { JPLocaleText } from "@/lib/dataGrid";
import { Course } from "@/entities/course";

interface Props {
  rows: Course[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

export const Table = ({ rows, isLoading, isError, isEmpty }: Props) => {
  if (isLoading) return <Loading />;
  if (isError) return <Message message="データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="データがありません。" />;

  return (
    <>
      <Paper sx={{ height: 370, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={courseColumns}
          getRowId={(row) => row.Id}
          rowHeight={35}
          columnHeaderHeight={50}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10]}
          localeText={JPLocaleText}
          sx={{
            "& button:hover": {
              backgroundColor: "transparent",
            },

            "& .MuiTouchRipple-root": {
              display: "none",
            },

            "& .MuiDataGrid-cell:focus": {
              outline: "none",
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },

            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },

            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },

            "& .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },

            "& .MuiTablePagination-actions button.Mui-disabled": {
              color: "#ccc",
            },

            "& .MuiTablePagination-actions button": {
              color: "#060666ff",
            },
          }}
        />
      </Paper>
    </>
  );
};
