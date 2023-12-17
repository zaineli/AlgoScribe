import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import {db} from "../../firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { storage, storageRef } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, listAll, getMetadata } from "firebase/storage";



const Datatable = (name) => {

  const [url, setUrl] = useState();
  const [docsName, setDocsName] = useState([])
  // Get all the images from Storage
    const [files, setFiles] = useState([]);
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const auth = getAuth();
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const uid = user.uid
              const storageRef = ref(storage, `${uid}`);
              const result = await listAll(storageRef);
              console.log(storageRef)
 
              // const meta = await getMetadata(storageRef)
              // console.log({meta})
              // console.log("zaiinnnnn")
              // console.log(result.items)
              // for(var i = 0; i<(result.items).length; i++){
              //   console.log(result.items[i]._location.path_)
              //   var path = result.items[i]._location.path_;
              //   const parts = path.split('/');
              //   const filteredPath =( parts[parts.length - 1]);
              //   console.log(filteredPath);
              // }


              const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
              const urls = await Promise.all(urlPromises);
              console.log(urls)
              setFiles(urls);

            }
          });
        } catch (error) {
          // Handle error if fetching images fails
          console.error("Error fetching images:", error);
        }
      };
  
      fetchImages();
    }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            
            <Link to={`/codeEditor?file=${encodeURIComponent(params.row.URL)}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {/* <div
              className="deleteButton"
            >
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Repositories
      </div>
      <DataGrid
        className="datagrid"
        rows={files.map((f, i) => {

          const imageUrl = f;

          console.log(imageUrl)
          const parts = imageUrl.split('/');
          const lastPartEncoded = parts[parts.length - 1].split('%2F').pop().split('?')[0];
          const decodedLastPart = decodeURIComponent(lastPartEncoded);
          // console.log("check")
          // console.log(decodedLastPart);
          return {id: i, Document:decodedLastPart, URL: f}
        })}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
