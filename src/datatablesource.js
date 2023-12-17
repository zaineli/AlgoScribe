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
        // <a href={params.row.URL}>Open</a>
        <div className="download-button"
        onClick={async () => {
          console.log("Dwonloading")
          const res = await fetch(params.row.URL);
          const data = await res.blob();

          const parts = params.row.URL.split('/');
          const lastPartEncoded = parts[parts.length - 1].split('%2F').pop().split('?')[0];
          const decodedLastPart = decodeURIComponent(lastPartEncoded);

          const a = document.createElement('a');
          a.href = URL.createObjectURL(data);
          a.download = decodedLastPart
          a.click();

        }}>Download</div>
      )
    }
  }
];

