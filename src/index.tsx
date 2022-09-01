import { createRoot } from "react-dom/client";
import * as esbuild from "esbuild-wasm";
import { useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkgPathPlugin";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const serviceRef = useRef<Boolean>(false);
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
      plugins: [unpkgPathPlugin()],
      define: {
        // "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    console.log(result.outputFiles[0].text);
  };

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={clickHandler}>Click me</button>
    </>
  );
};

root.render(<App />);
