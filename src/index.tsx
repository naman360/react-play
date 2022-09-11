import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { CodeEditor } from "./components/CodeEditor";
import { Preview } from "./components/Preview";
import bundle from "./bundler";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const [inputCode, setInputCode] = useState<string | undefined>("");
  const [bundledOutput, setBundledOutput] = useState<string>("");

  const clickHandler = async () => {
    const output = await bundle(inputCode);
    setBundledOutput(output);
  };

  return (
    <>
      <CodeEditor initialValue="" onChange={setInputCode} />
      <button onClick={clickHandler}>Click me</button>
      <Preview code={bundledOutput} />
    </>
  );
};

root.render(<App />);
