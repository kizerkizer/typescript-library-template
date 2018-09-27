# typescript-project-template

Install with `npm install --global tpt`. 

Run `tpt init <project-name>` in a blank directory where you would like to initialize a typescript project named `<project-name>`.

Builds to commonjs for node; es6 modules for tools like rollup.js, webpack, and for the future; to umd and an iife, both for the browser; and to commonjs for the inline .test.ts files.

Here are the corresponding package.json "starting point" properties:
```
  "main": "./dist/cjs/index.js",        // commonjs, for node or any other cjs environmen

  "module": "./dist/esm/index.js",      // es6 modules, for node with the `--experimental-modules` 
                                        // flag (TODO: change file extensions to .mjs)

  "source": "./src/index.ts",           // preserve the original typescript source for source maps, debugging

  "browser": "./dist/browser/index.js", // UMD for the browser via rollup.js

  "bundle": "./dist/browser/bundle.js", // made this one up; contains everything (including imported modules)
                                        // bundled up into one file. One can directly include with 
                                        // <script src=".../bundle.js"></script>
```

So, you can `require` or `import`, or in bundle case directly reference by global definition. Further, all type information
is preserved in published module, so more typescript modules can consume it as native typescript.

Please improve via PRs!

# project goals
- minimal
- comprehensive
- optional
- extensible