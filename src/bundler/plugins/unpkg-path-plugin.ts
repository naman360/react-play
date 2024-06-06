import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (input: string | undefined) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handling index file
      build.onResolve({ filter: /(^index\.js)/ }, (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      // Handling relative paths
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      //   Handling rest all paths
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });

      build.onLoad({ filter: /(^index\.js)/ }, (args: any) => {
        return {
          loader: "jsx",
          contents: input,
        };
      });

      // Handle resolved css path
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const cachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedFile) return cachedFile;

        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText= '${escaped}';
          document.head.appendChild(style);
          `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });

      // handle resolved remaining paths
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedFile) return cachedFile;

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
