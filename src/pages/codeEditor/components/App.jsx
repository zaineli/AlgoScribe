import { useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Editor from "./Editor";
import "./App.css";
import Sidebar from "./Sidebar";

let updateScript = "";
let updateArrayScript = "";
let styleScript = "";
let styleArrayScript = "";

fetch("http://localhost:5173/public/update.js")
  .then((res) => res.text())
  .then((data) => (updateScript = data));

fetch("http://localhost:5173/public/watch.js")
  .then((res) => res.text())
  .then((data) => (updateArrayScript = data));

fetch("http://localhost:5173/public/style.lib.css")
  .then((res) => res.text())
  .then((data) => (styleScript = data));

fetch("http://localhost:5173/public/style.css")
  .then((res) => res.text())
  .then((data) => (styleArrayScript = data));

function App() {
  const [count, setCount] = useState(0);
  const iFrameRef = useRef();
  const [script, setScript] = useState(() => {
    const codeJSON = localStorage.getItem("code");
    if (codeJSON != undefined) {
      return JSON.parse(codeJSON);
    }
    return "";
  });
  const [filename, setFilename] = useState("Untitled.js");

  const doc =
    updateScript && styleScript
      ? ` 
    <html>
      <body>
        <div id="app"></div>
        <div class='lines'></div>
      </body>
      <script type="module">${styleScript}</script>
      <script type="module">${styleArrayScript}</script>
      <script>${updateScript}</script>
      <script>${updateArrayScript}</script>
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
        <Editor
          handleChange={handleChange}
          value={script}
          filename={filename}
        />
        {/* </div> */}
        <div className={"output"}>
          <div className="title">Output</div>
          <iframe ref={iFrameRef} srcDoc={doc}></iframe>
        </div>
        <Sidebar
          run={run}
          setScript={setScript}
          script={script}
          setFilename={setFilename}
        />
      </div>
    </>
  );
}

export default App;
