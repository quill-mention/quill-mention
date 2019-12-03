import postcss from 'rollup-plugin-postcss';

module.exports = {
  input: 'src/quill.mention.js',
  output: {
    file: 'dist/quill.mention.js',
    format: 'es',
  },
  plugins: [
    postcss({
      extract: true,
    }),
  ],
  external: ['quill'],
};
