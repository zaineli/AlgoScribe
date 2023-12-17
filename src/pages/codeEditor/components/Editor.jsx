import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { material } from "@uiw/codemirror-theme-material";
import "./editor.css";

function Editor({ value, handleChange, filename }) {
  return (
    <div className="editor-container">
      <div className="filename">{filename}</div>
      <div className="editor-wrapper">
        <CodeMirror
          className="editor"
          value={value}
          options={{
            theme: "material",
            mode: "javascript",
            lineWrapping: true,
          }}
          height="100%"
          extensions={javascript()}
          theme={material}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Editor;
