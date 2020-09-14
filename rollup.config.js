/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';

import pkg from './package.json';

// import { pkg.componentName } from "./src/config";

// const pkg.componentName = 'BannerComponent'

const OUTPUT_DIR_UMD = './lib/release';
const OUTPUT_DIR_CJS = './lib/dist';

const ENV = process.env.NODE_ENV;

const otherConfig = {
  external: ['react', 'react-dom', 'antd-mobile'],
  plugins: [
    json(),
    resolve({
      browser: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano({
          preset: 'default',
        }),
      ],
      inject: true,
    }),
    image(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      runtimeHelpers: true,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.png'],
    }),
    commonjs(),
  ],
};

const otherConfigWithUglify = {
  ...otherConfig,
  plugins: [
    ...otherConfig.plugins,
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
      warnings: false,
    }),
    copy({
      targets: [
        {
          src: 'src/static',
          dest: `${OUTPUT_DIR_UMD}/${pkg.componentName.toLowerCase()}`,
        },
      ],
    }),
  ],
};

export default [
  {
    input: 'src/index.js',
    output: {
      file: `${OUTPUT_DIR_UMD}/${pkg.componentName.toLowerCase()}/index.js`,
      format: 'umd',
      name: `_${pkg.componentName}`,
      globals: {
        react: '_react',
        'react-dom': '_react_dom',
        'antd-mobile': '_antd_mobile',
        window: true,
      },
    },
    ...otherConfigWithUglify,
  },
  {
    input: 'src/config.js',
    output: {
      file: `${OUTPUT_DIR_UMD}/${pkg.componentName.toLowerCase()}/config.js`,
      format: 'umd',
      name: `_${pkg.componentName}_config`,
    },
    ...otherConfigWithUglify,
  },
  {
    input: 'src/index.js',
    output: {
      file: `${OUTPUT_DIR_CJS}/index.js`,
      format: 'cjs',
    },
    ...otherConfig,
  },
  {
    input: 'src/config.js',
    output: {
      file: `${OUTPUT_DIR_CJS}/config.js`,
      format: 'cjs',
    },
    ...otherConfig,
  },
];
