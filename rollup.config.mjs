import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';
import { glob } from 'glob';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

// Get all TypeScript files in src directory
const input = glob.sync('src/**/*.ts');

export default [
  // ESM build
  {
    input,
    external,
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name]-[hash].esm.js',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.esm.json',
        declaration: true,
        declarationDir: './dist',
        rootDir: './src',
      }),
      isProduction && terser({
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        mangle: {
          reserved: ['requestTimeout'],
        },
        format: {
          comments: false,
        },
      }),
    ].filter(Boolean),
  },
  // CJS build
  {
    input,
    external,
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.cjs.json',
        declaration: false, // Không tạo duplicate declarations
        rootDir: './src',
      }),
      isProduction && terser({
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        mangle: {
          reserved: ['requestTimeout'],
        },
        format: {
          comments: false,
        },
      }),
    ].filter(Boolean),
  },
];
