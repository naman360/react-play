import * as esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const bundle = async (rawCode: string | undefined) => {
  try {
    esbuild.build({});
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      await esbuild.initialize({
        worker: true,
        wasmURL: "/esbuild.wasm",
      });
    } else throw err;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      minify: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      plugins: [unpkgPathPlugin(rawCode)],
      define: {
        global: "window",
      },
    });
    return { code: result.outputFiles[0].text, error: "" };
  } catch (error: any) {
    return {
      code: "",
      error: error.message,
    };
  }
};
export default bundle;
