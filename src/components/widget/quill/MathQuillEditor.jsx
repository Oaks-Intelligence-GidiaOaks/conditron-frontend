import React, { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
// import "mathquill/build/mathquill.css";
import "./mathquill.css";
// import "mathquill/build/mathquill";
import "./mathquill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import katex from "katex";
window.katex = katex;

const MathQuillEditor = ({ onChange, value }) => {
  const quillRef = useRef(null);
  const mathQuillEditorRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.editor;
      const formulaEditor = quill.container.querySelector(".ql-formula");

      if (formulaEditor) {
        mathQuillEditorRef.current = formulaEditor.querySelector(".mathquill");
      }
    }

    if (mathQuillEditorRef.current) {
      const latexContent = mathQuillEditorRef.current.latex();
      onChange(latexContent);
    }
  }, [value, onChange]);

  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      value={value}
      onChange={() => {}}
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ header: [1, 2, 3, false] }],
          ["link", "image", "formula"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
        ],
        formula: true,
        clipboard: {
          matchVisual: false,
        },
      }}
    />
  );
};

export default MathQuillEditor;
