import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (input: string) => {
  return {
    name: "fetchPlugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js)/ }, (args: any) => {
        return {
          loader: "jsx",
          contents: input,
        };
      });

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

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedFile) return cachedFile;
      });

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
