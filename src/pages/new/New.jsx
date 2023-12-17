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
        ...data,
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
  
          let file_name = prompt("Enter File Name")
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

  const [data, setData] = useState([]);
  
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
            <button ><input type="file"  onChange={(e)=>{setImageUpload(e.target.files[0])}}/></button>           

            <button className="upload" onClick={uploadImage}>Upload Image</button>
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
