const webpack = require("webpack");
const paths = require("./config/paths");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const loadPreset = require("./config/presets/loadPreset");
const loadConfig = (mode) => require(`./config/webpack.${mode}.js`)(mode);
const nodeExternals = require("webpack-node-externals");
const dotenv = require("dotenv");

module.exports = function (env) {
  const { mode = "production" } = env || {};

  // Load environment variables from .env file
  const envVars = dotenv.config().parsed;

  // Convert environment variables to an object of key-value pairs
  const envKeys = Object.keys(envVars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
    return prev;
  }, {});

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
            test: /\.js$/,
            use: ["babel-loader"],
            exclude: path.resolve(__dirname, "node_modules"),
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
        new webpack.DefinePlugin(envKeys), // Define environment variables
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: [require.resolve("buffer/"), "Buffer"],
        }),
      ],
    },
    loadConfig(mode),
    loadPreset(env)
  );
};
