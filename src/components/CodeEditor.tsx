import React, { useEffect, useRef } from "react";
import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import loader from "@monaco-editor/loader";

import "./code-editor.css";
interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string | undefined) => void;
}
export const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  initialValue,
}) => {
  const editorRef = useRef<any>();

  const handleEditorChange: OnChange = (value) => {
    onChange(value);
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.editor.getModels()[0].getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.editor.getModels()[0].setValue(formatted);
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = monaco;
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        value={initialValue}
        language="javascript"
        theme="vs-dark"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
