const rspack = require("@rspack/core");
const paths = require("./config/paths");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const loadPreset = require("./config/presets/loadPreset");
const loadConfig = (mode) => require(`./config/rspack.${mode}.js`)(mode);
const nodeExternals = require("webpack-node-externals");

module.exports = function (env) {
  const { mode = "production" } = env || {};
  return merge(
    {
      mode,
      entry: `${paths.srcPath}/index.js`,
      output: {
        path: paths.distPath,
        filename: "index.js",
        libraryTarget: "umd",
      },
      externals: [
        nodeExternals(),
        {
          react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React",
          },
          "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM",
          },
        },
      ],
      module: {
        rules: [
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false,
            },
          },
          {
            test: /\.(j|t)s$/,
            exclude: [/[\\/]node_modules[\\/]/],
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                },
                externalHelpers: true,
              },
              env: {
                targets: "Chrome >= 48",
              },
            },
            type: 'javascript/auto',
          },
          // Images: Copy image files to build folder
          { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

          // Fonts and SVGs: Inline files
          { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
        ],
      },
      resolve: {
        modules: [paths.srcPath, "node_modules"],
        extensions: [".js", ".jsx", ".json"],
        fallback: {
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
        },
      },
      target: "node",
      plugins: [
        new CleanWebpackPlugin(),
        new rspack.ProgressPlugin(),
        new rspack.ProvidePlugin({
          process: "process/browser",
          Buffer: [require.resolve("buffer/"), "Buffer"],
        }),
      ],
    },
    loadConfig(mode),
    loadPreset(env)
  );
};
