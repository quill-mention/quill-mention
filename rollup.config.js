import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';


export default [
  {
    input: 'src/quill.mention.js',
    output: {
      name: 'quillMention',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      postcss({
        extract: true,
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/quill.mention.js',
    external: ['quill'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      postcss({
        extract: true,
      }),
    ],
  },
];
