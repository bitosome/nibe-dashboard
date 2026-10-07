import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
export default {
  input: 'src/nibe-dashboard.ts',
  output: { file: 'dist/nibe-dashboard.js', format: 'es', inlineDynamicImports: true, sourcemap: false },
  plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
};
