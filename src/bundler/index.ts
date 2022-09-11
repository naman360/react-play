import * as esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

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

  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      global: "window",
    },
  });
  return result.outputFiles[0].text;
};
export default bundle;
