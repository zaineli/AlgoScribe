import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { collection, serverTimestamp, snapshotEqual, getDocs } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import {v4 } from "uuid"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Datatable from "../../components/datatable/Datatable";


const New = ({ inputs, title }) => {
   
  const [name, setName] = useState("")
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "files"), {
        ...[],
        timeStamp: serverTimestamp(),
      });
    } 
    catch (error) {
      console.log(error);
    }
  };

  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])
  const uploadImage = async () => {
    if(imageUpload==null) alert("First Select Image")
    else{
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          console.log(user);
          if (!imageUpload) return;
  
          let file_name = imageUpload.name;
          setName(file_name)
          
          const imageRef = ref(storage, `${uid}/${file_name}`);
          try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            setImageList((prev) => [...prev, url] );
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        } else {
          console.log("User not found");
        }
      });
  }
    
  };

  const [filename, setFilename] = useState("");
  
  function createNewFile() {
    const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          
            const imageRef2 = ref(storage, `${uid}/${filename}`);
            try {
              const snapshot = await uploadBytes(
                imageRef2,
                new Blob([`This is '${filename}' file`], { type: "text/js" })
              );
            console.log("check snapshot")
            console.log(snapshot);
            } catch (error) {
              console.error("Error uploading File:", error);
            }
            setFilename("");
            console.log("BHai bn gya dekh le")

        }
      });
  }

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       const imageListRef = ref(storage, `${uid}/`);

  //       // listAll(imageListRef)
  //       //   .then((response) => {
  //       //     response.items.forEach((item) => {
  //       //       getDownloadURL(item).then((url) => {
  //       //         setImageList((prev) => [...prev, url]);
  //       //       });
  //       //     });
  //       //   })
  //       //   .catch((error) => {
  //       //     console.error("Error listing images:", error);
  //       //   });
  //     }
  //   });
  // }, []);

  console.log({imageUpload})

  return ( 
    <div className="new">
      <Sidebar />
    <div className="homeContainer">
      <Navbar />
      {/* <h2>File Upload & Image Preview</h2>
<p class="lead">No Plugins <b>Just Javascript</b></p>

<form id="file-upload-form" class="uploader">
  <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

  <label for="file-upload" id="file-drag">
    <img id="file-image" src="#" alt="Preview" class="hidden"/>
    <div id="start">
      <i class="fa fa-download" aria-hidden="true"></i>
      <div>Select a file or drag here</div>
      <div id="notimage" class="hidden">Please select an image</div>
      <input type="file" onChange={(e)=>{setImageUpload(e.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
    <div id="response" class="hidden">
      <div id="messages"></div>
      <progress class="progress" id="file-progress" value="0">
        <span>0</span>
      </progress>
    </div>  
  </label>
</form> */}
      <div className="main">
        <div className="wrapper">
          <div className="uploadfile">
            <div className="new-file">

              <label htmlFor="file">
                {imageUpload?imageUpload.name : "Select a file"}
              </label>
              <input id="file" type="file" onChange={(e)=>{setImageUpload(e.target.files[0])}}/>           
              <button className="upload" onClick={uploadImage}>Upload File</button>
            </div>
            <span>OR</span>
            <div className="new-file">
                <input value={filename} onChange={e => setFilename(e.target.value)}
                 className="" type="text" placeholder="Create A New File" />
                <button onClick={createNewFile} className="upload">Create</button>
            </div>
          </div>
        </div>
        <Datatable/>
      </div>
       
      {/* {imageList.map((url)=>{
        return <a href={url}>Click Here</a>
      })} */}
    
      </div>

    </div>
  );
};

export default New;
