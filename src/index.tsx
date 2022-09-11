import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { CodeEditor } from "./components/CodeEditor";
import { Preview } from "./components/Preview";
import bundle from "./bundler";
import { CodeCell } from "./components/CodeCell";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

root.render(<App />);
