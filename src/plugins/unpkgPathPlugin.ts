import * as esbuild from "esbuild-wasm";
import axios from "axios";
export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResole", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              const message=require('tiny-test-pkg')
              console.log(message);
            `,
          };
        }

        const { data } = await axios.get(args.path);
        console.log(data);
        return {
          loader: "jsx",
          contents: data,
        };
      });
    },
  };
};
