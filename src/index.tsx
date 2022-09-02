import { createRoot } from "react-dom/client";
import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const serviceRef = useRef<Boolean>(false);
  const [inputCode, setInputCode] = useState("");
  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });

    serviceRef.current = true;
  };

  useEffect(() => {
    startService();
  }, []);

  const clickHandler = async () => {
    if (!serviceRef.current) return;
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(inputCode)],
      define: {
        // "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    console.log(result.outputFiles[0].text);
  };

  return (
    <>
      <textarea onChange={(e) => setInputCode(e.target.value)}></textarea>
      <button onClick={clickHandler}>Click me</button>
    </>
  );
};

root.render(<App />);
