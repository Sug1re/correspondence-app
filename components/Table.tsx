"use client";

import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { School } from "@/entities/school";

interface Props {
  school: School[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "course", headerName: "コース", width: 70 },
  { field: "firstName", headerName: "通学頻度", width: 130 },
  { field: "style", headerName: "通学スタイル", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
];

const rows = [
  {
    id: 1,
    course: "English",
    lastName: "Snow",
    firstName: "Jon",
    style: "オンライン",
    age: 35,
  },
  {
    id: 2,
    course: "Mathematics",
    lastName: "Lannister",
    firstName: "Cersei",
    style: "オンライン",
    age: 42,
  },
  {
    id: 3,
    course: "Science",
    lastName: "Lannister",
    firstName: "Jaime",
    style: "オンライン",

    age: 45,
  },
  {
    id: 4,
    course: "History",
    lastName: "Stark",
    firstName: "Arya",
    style: "オンライン",
    age: 16,
  },
  {
    id: 5,
    course: "Art",
    lastName: "Targaryen",
    firstName: "Daenerys",
    style: "オンライン",

    age: 18,
  },
  {
    id: 6,
    course: "Music",
    lastName: "Melisandre",
    firstName: null,
    style: "オンライン",
    age: 150,
  },
  {
    id: 7,
    course: "Geography",
    lastName: "Clifford",
    firstName: "Ferrara",
    style: "オンライン",

    age: 44,
  },
  {
    id: 8,
    course: "Biology",
    lastName: "Frances",
    firstName: "Rossini",
    style: "オンライン",

    age: 36,
  },
  {
    id: 9,
    course: "Chemistry",
    lastName: "Roxie",
    firstName: "Harvey",
    style: "オンライン",

    age: 65,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export const Table = ({ school }: Props) => {
  return (
    <>
      <Paper sx={{ height: 370, width: "100%" }}>
        <DataGrid
          rows={school}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};
