import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
    // 하나의 메인 번들만 생성
    {
        input: 'src/scripts/index.ts',
        output: [
            {
                file: 'dist/js/dewp.min.js',
                format: 'iife',
                name: 'DEWP',
                sourcemap: false,
                extend: false,
                globals: {},
                intro: ''
            }
        ],
        plugins: [
            resolve({ browser: true }),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false
            }),
            terser()
        ]
    }
];
