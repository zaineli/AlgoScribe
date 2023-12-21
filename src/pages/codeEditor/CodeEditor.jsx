import React, { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  listAll,
  getMetadata,
} from "firebase/storage";
import { storage, storageRef } from "../../firebase";
import "./CodeEditor.scss";
import { useSearchParams } from "react-router-dom";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import "./App.css";

const CodeEditor = () => {
  const [params, setParams] = useSearchParams();
  const iFrameRef = useRef();
  const [script, setScript] = useState("");
  //   () => {
  //   const codeJSON = localStorage.getItem("code");
  //   if (codeJSON != undefined) {
  //     return JSON.parse(codeJSON);
  //   }
  //   return "";
  // });
  const [filename, setFilename] = useState("Untitled.js");
  // if(params.get('file')!=null){
  //   setFilename(params.get('file'))
  // }
  const [helperScripts, setHelperScripts] = useState(["", "", "", ""]);


  useEffect(() => {
    (async () => {
      const res = await Promise.all([
        fetch("https://abbas--algoscribex.netlify.app/style.css"),
        fetch("https://abbas--algoscribex.netlify.app/style.lib.css"),
        fetch("https://abbas--algoscribex.netlify.app/update.js"),
        fetch("https://abbas--algoscribex.netlify.app/watch.js"),
      ]);
      const datas = await Promise.all(res.map((r) => r.text()));
      setHelperScripts(datas);
      // console.log({datas})
    })();
  }, []);

  const file = params.get("file");

  // useEffect(()=>{
  //   if(file!=null){
  //     const parts = file.split('/');
  //     const lastPartEncoded = parts[parts.length - 1].split('%2F').pop().split('?')[0];
  //     const decodedLastPart = decodeURIComponent(lastPartEncoded);
  //     console.log("Yeyyyyy")
  //     console.log(decodedLastPart)

  // }
  // },[])
  // const parts = file.split('/');
  // const lastPartEncoded = parts[parts.length - 1].split('%2F').pop().split('?')[0];
  // const decodedLastPart = decodeURIComponent(lastPartEncoded);
  // console.log("Yeyyyyy")
  // console.log(decodedLastPart)
  useEffect(() => {
    (async () => {
      if (!file) return;
      const res = await fetch(file);
      const data = await res.text();
      console.log({ data });
      setScript(data);
    })();
  }, [file]);

  const doc = helperScripts[0]
    ? ` 
      <html>
        <body>
        <div class='lines'></div>
          <div id="app"></div>
        </body>
        <style>${helperScripts[0]}</style>
        <style>${helperScripts[1]}</style>
        <script>${helperScripts[2]}</script>
        <script>${helperScripts[3]}</script>
        <script>${script}</script>
      </html>
      `
    : `
    <html>
      <body>
        <div>Please Wait</div>
      </body>
    </html>
  `;
  function run() {
    // iFrameRef.current.contentWindow.location.reload(true);
    // iFrameRef.current.srcdoc = doc;
  }

  function handleChange(value) {
    setScript(value);

    localStorage.setItem("code", JSON.stringify(value));
  }

  return (
    <>
      <div className="content">
        {/* <div className="pane editor"> */}
        <Sidebar
          run={run}
          setScript={setScript}
          script={script}
          setFilename={setFilename}
          className="sidebar"
        />
        <div className="main">
          <Editor
            handleChange={handleChange}
            value={script}
            filename={filename}
            className="editor"
          />
          {/* </div> */}
          <div className={"output"}>
            <iframe ref={iFrameRef} srcDoc={doc}></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
