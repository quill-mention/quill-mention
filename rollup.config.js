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
