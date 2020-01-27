import localResolve from "rollup-plugin-local-resolve";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/quill.mention.js",
    output: [
      {
        file: "docs/quill.mention.min.js",
        format: "iife",
        name: "quillMention",
        plugins: [terser()],
        globals: {
          quill: "Quill"
        }
      },
      {
        file: "dist/quill.mention.min.js",
        format: "iife",
        name: "quillMention",
        plugins: [terser()],
        globals: {
          quill: "Quill"
        }
      }
    ],
    external: ["quill"],
    plugins: [
      localResolve(),
      babel({
        exclude: ["node_modules/**"]
      }),
      postcss({
        extract: true,
        minimize: true
      })
    ]
  },
  {
    input: "src/quill.mention.js",
    output: [
      {
        file: pkg.main,
        format: "cjs"
      },
      {
        file: pkg.module,
        format: "es"
      }
    ],
    external: ["quill"],
    plugins: [
      localResolve(),
      babel({
        exclude: ["node_modules/**"]
      }),
      postcss({
        extract: "dist/quill.mention.css"
      })
    ]
  }
];
