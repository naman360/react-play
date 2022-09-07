import React from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string | undefined) => void;
}
export const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  initialValue,
}) => {
  const handleEditorChange: OnChange = (value) => {
    onChange(value);
  };

  return (
    <MonacoEditor
      onChange={handleEditorChange}
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
  );
};
