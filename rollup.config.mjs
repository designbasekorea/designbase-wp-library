import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

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
            // 버전 토큰 치환을 가장 먼저 수행해야 TS가 치환된 코드를 인식함
            replace({
                preventAssignment: true,
                values: {
                    __DEWP_VERSION__: JSON.stringify(pkg.version)
                }
            }),
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
