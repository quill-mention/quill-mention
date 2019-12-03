import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

module.exports = {
  input: 'src/quill.mention.js',
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
  external: ['quill'],
};
