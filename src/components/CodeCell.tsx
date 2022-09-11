import React, { useState } from "react";
import bundle from "../bundler";
import { CodeEditor } from "./CodeEditor";
import { Preview } from "./Preview";

export const CodeCell = () => {
  const [inputCode, setInputCode] = useState<string | undefined>("");
  const [bundledOutput, setBundledOutput] = useState<string>("");

  const clickHandler = async () => {
    const output = await bundle(inputCode);
    setBundledOutput(output);
  };

  return (
    <div>
      <CodeEditor initialValue="" onChange={setInputCode} />
      <button onClick={clickHandler}>Click me</button>
      <Preview code={bundledOutput} />
    </div>
  );
};
