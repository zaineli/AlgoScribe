import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./sidebar.css";
import Icon from "@mdi/react";
import {
  mdiContentSave,
  mdiContentSavePlus,
  mdiFileImport,
  mdiPlay,
} from "@mdi/js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { deleteObject } from "firebase/storage";

function Sidebar({ run, setScript, setFilename, script }) {
  const [params, setParams] = useSearchParams();
  const filename = params.get("file");
  const [newfile, setNewfile] = useState("");
  const [existPath, setExistPath] = useState("");
  // console.log("Checking file naeme")
  // console.log(filename)
  const [file, setFile] = useState();

  async function importFile() {
    const handles = await window.showOpenFilePicker();
    const newFile = handles[0];
    setFile(newFile);

    const fileData = await newFile.getFile();
    const code = await fileData.text();
    
    setFilename(newFile.name);
    setScript(code);
  }

  async function saveAs() {
    // const file = await window.showSaveFilePicker();
    const file = await window.showSaveFilePicker();
    // save(file);
    // setFile(file);
  }


  async function save(filename) {
    // if (!file) return saveAs();
    // console.log({ file });
    // const writable = await file.createWritable();
    // await writable.write(script); // Assuming 'editor' is your editor instance
    // await writable.close();
    // setFilename(file.name);
    if (filename != null) {
      console.log("Helllo from Code Editor Sidebar");
      console.log(filename);
      const parts = filename.split("/");
      const lastPartEncoded = parts[parts.length - 1]
        .split("%2F")
        .pop()
        .split("?")[0];
      const decodedLastPart = decodeURIComponent(lastPartEncoded);
      console.log("bhaiiiiiiiii bta de")
      console.log(decodedLastPart)
      setNewfile(decodedLastPart);
      console.log(newfile)
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const imageRef = ref(storage, `${uid}/${decodedLastPart}`);
          console.log("Hello fom Sidebar");
          let path = imageRef._location.path_;
          console.log(imageRef._location.path_);
          setExistPath(imageRef._location.path_)
          const desertRef = ref(storage, path);

          deleteObject(desertRef)
            .then(() => {
              console.log("deleted success")
            })
            .catch((error) => {
              console.log("L Lag gae")
            });
          
            const imageRef2 = ref(storage, `${uid}/${decodedLastPart}`);
            try {
              const snapshot = await uploadBytes(
                imageRef2,
                new Blob([script], { type: "text/js" })
              );
            console.log("check snapshot")
            console.log(snapshot);
            } catch (error) {
              console.error("Error uploading File:", error);
            }
          
            console.log("BHai bn gya dekh le")

        }
      });
    } else {
      console.log("Bhai new file bnao");
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          console.log(user);
          let file_name = prompt("Enter File Name");
          const imageRef = ref(storage, `${uid}/${file_name}`);
          try {
            const snapshot = await uploadBytes(
              imageRef,
              new Blob([script], { type: "text/js" })
            );
            const url = await getDownloadURL(snapshot.ref);
          } catch (error) {
            console.error("Error uploading File:", error);
          }
        } else {
          console.log("User not found");
        }
      });
    }
  }

  return (
    <div className="controlls">
      <div className="title">Visualizer</div>
        <button onClick={run} id="run">
          <h3>Run</h3>
          <Icon path={mdiPlay} size={1.4} />
        </button>
        {/* <button onClick={importFile}>
          <Icon path={mdiFileImport} size={1.4} />
        </button> */}
        <button>
          <h3>Save</h3>
          <Icon path={mdiContentSave} size={1.4} onClick={() => save(filename)} />
        </button>
        {/* <button>
          <Icon path={mdiContentSavePlus} size={1.4} onClick={saveAs} />
        </button> */}

    </div>
  );
}

export default Sidebar;
