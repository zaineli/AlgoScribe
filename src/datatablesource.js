import { dividerClasses } from "@mui/material";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Document",
    headerName: "Document",
    width: 600,
    renderCell: (params) => {
      return(
        <div>{params.row.Document}</div>
      )
    },
  },
  {
    field: 'URL',
    headerName: 'URL',
    width: 400,
    renderCell: (params) => {
      return (
        <a href={params.row.URL}>Open</a>
      )
    }
  }
];

