import terser from '@rollup/plugin-terser'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())

const projectStart = 2024
const nowYear = new Date().getFullYear()
const banner = `/*! 
 * ${pkg.name} ${pkg.version}
 * Copyright (c) ${projectStart == nowYear ? '' : projectStart + '-'}${nowYear} ${pkg.author}
 * License: ${pkg.license}
*/`

export default {
  input: 'lib/index.js',
  output: [
    {
      name: 'KRCReader',
      file: 'dist/index.js',
      format: 'umd',
      banner: banner
    },
    {
      name: 'KRCReader',
      file: 'dist/index.min.js',
      format: 'umd',
      banner: banner,
      plugins: [terser()]
    }
  ]
}
