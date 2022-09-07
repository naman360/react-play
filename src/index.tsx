import { createRoot } from "react-dom/client";
import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { CodeEditor } from "./components/CodeEditor";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const serviceRef = useRef<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [inputCode, setInputCode] = useState<string | undefined>("");
  const [bundledOutput, setBundledOutput] = useState<string>("");
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
      minify: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      plugins: [unpkgPathPlugin(), fetchPlugin(inputCode)],
      define: {
        global: "window",
      },
    });

    setBundledOutput(result.outputFiles[0].text);
    iframeRef.current?.contentWindow?.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  let html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          eval(event.data);
        },false);
      </script>
    </body>
  </html>
`;

  return (
    <>
      <CodeEditor initialValue="" onChange={setInputCode} />
      <textarea onChange={(e) => setInputCode(e.target.value)}></textarea>
      <button onClick={clickHandler}>Click me</button>
      <pre>{bundledOutput}</pre>
      <iframe ref={iframeRef} srcDoc={html} sandbox="allow-scripts"></iframe>
    </>
  );
};

root.render(<App />);
