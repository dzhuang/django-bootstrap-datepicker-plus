import resolve from '@rollup/plugin-node-resolve';
import { brotliCompress } from 'zlib';
import { promisify } from 'util';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';
import gzipPlugin from 'rollup-plugin-gzip';


import { FaFreeProvider } from 'subset-iconfont';

const fa = new FaFreeProvider(
  ['calendar-days', 'clock'],
  {
    prefix: "fa6",
    cssChoices: []
  });

fa.makeFonts('build_static')

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const brotliPromise = promisify(brotliCompress);

const defaultPlugins = [
  resolve(),
  styles(),
  commonjs(),
  production && terser(), // minify, but only in production
  production && gzipPlugin(),
  production && gzipPlugin({
    customCompression: (content) => brotliPromise(Buffer.from(content)),
    fileName: '.br',
  })
];

export default [
  {
    input: 'build_static/build.js',
    output: {
      file: 'bootstrap_datepicker_plus/static/bootstrap_datepicker_plus/datepicker-widget.js',
      format: 'iife',
      sourcemap: true,
      name: 'datepickerWidget',
      globals: {
        jquery: "$"
      }
    },
    plugins: defaultPlugins,
    external: [
      "jquery",
      "bootstrap",
    ]
  }
];
