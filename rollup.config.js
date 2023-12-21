/**
 * Rollup 설정 모듈
 *
 */

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const extensions = ["js", "jsx", "ts", "tsx", "mjs"];

// const pkg = require("./package.json");
import * as pkg from './package.json' assert { type: "json" };

const config = [
  {
    external: [/node_modules/],
    input: "./src/index.ts",
    output: [
      {
        file: "./dist/bundle.js", // 출력 경로
        format: "es", // 출력 형식
        sourcemap: true, // 소스 맵을 켜놔서 디버깅을 쉽게 만들자
      },
      // {
      //   dir: "./dist",
      //   format: "cjs",
      //   preserveModules: true,
      //   preserveModulesRoot: "src",
      // },
      // {
      //   file: pkg.module,
      //   format: "es",
      // },
      // {
      //   name: pkg.name,
      //   file: pkg.browser,
      //   format: "umd",
      // },
    ],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        exclude: "node_modules/**",
        extensions,
        include: ["src/**/*"],
      }),
      commonjs({ include: "node_modules/**" }),
      peerDepsExternal(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: false,
        inject: (cssVariableName) =>
          `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`,
        modules: true,
        sourceMap: false,
        use: ["sass"],
      }),
    ],
  },
];

export default config;
