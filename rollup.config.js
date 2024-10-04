import terser from '@rollup/plugin-terser';

export default {
  input: 'dist/lib/index.js',

  output: {
    name: 'KRCReader',
    file: 'dist/index.js',
    format: 'umd',
    banner: '/*! Copyright (c) 2024 xiaohong2022 */',
    plugins: [terser()],
  },

};
