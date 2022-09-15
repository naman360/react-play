import React, { useEffect, useState } from "react";
import bundle from "../bundler";
import { CodeEditor } from "./CodeEditor";
import { Preview } from "./Preview";
import { Resizable } from "./Resizable";

export const CodeCell = () => {
  const [inputCode, setInputCode] = useState<string | undefined>("");
  const [bundledOutput, setBundledOutput] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(inputCode);
      setBundledOutput(output);
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputCode]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex" }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="" onChange={setInputCode} />
        </Resizable>
        <Preview code={bundledOutput} />
      </div>
    </Resizable>
  );
};
