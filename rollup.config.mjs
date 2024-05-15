import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const input = ["src/index.ts", "src/autoregister.ts"];
const external = ["quill"];

/** @type {import("rollup").OutputOptions[]} */
export const iifeOutput = {
  format: "iife",
  name: "quillMention",
  plugins: [],
  globals: {
    quill: "Quill",
  },
};

/** @type {import("rollup").OutputOptions[]} */
export const iifeOutputMin = {
  format: "iife",
  name: "quillMentionMin",
  plugins: [terser()],
  globals: {
    quill: "Quill",
  },
};

/** @type {import("@rollup/plugin-typescript").RollupTypescriptOptions} */
export const iifeTSOptions = {
  compilerOptions: {
    sourceMap: false,
    sourceRoot: undefined,
  },
};

/** @type {import("rollup").OutputOptions}*/
export const esmOutput = {
  dir: "dist/esm",
  format: "es",
  entryFileNames: "[name].mjs",
  preserveModules: true,
  preserveModulesRoot: "src",
  sourcemap: true,
  sourcemapPathTransform: (relativePath) => {
    return relativePath.replace('../src', 'src');
  },
};

/** @type {import("@rollup/plugin-typescript").RollupTypescriptOptions} */
export const esmTSOptions = {
  compilerOptions: {
    outDir: "dist/esm",
    declaration: true,
    declarationMap: true,
  },
};

export default [
  // IIFE config
  {
    input: "src/quill.mention.ts",
    output: [
      { file: "docs/quill.mention.js", ...iifeOutput },
      { file: "dist/quill.mention.js", ...iifeOutput },
    ],
    external,
    plugins: [
      typescript(iifeTSOptions),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
  // IIFE config
  {
    input: "src/quill.mention.ts",
    output: [
      { file: "docs/quill.mention.min.js", ...iifeOutputMin },
      { file: "dist/quill.mention.min.js", ...iifeOutputMin },
    ],
    external,
    plugins: [
      typescript(iifeTSOptions),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
  // ESM config
  {
    input,
    output: esmOutput,
    plugins: [typescript(esmTSOptions)],
    external,
  },
];
