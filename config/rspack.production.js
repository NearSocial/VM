const rspack = require("@rspack/core")

module.exports = () => {
  return {
    devtool: false,
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            {
              // inject CSS to page
              loader: "style-loader",
            },
            {
              // translates CSS into CommonJS modules
              loader: "css-loader",
            },
            {
              // Run postcss actions
              loader: "postcss-loader",
              options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                  // postcss plugins, can be exported to postcss.config.js
                  plugins: function () {
                    return [require("autoprefixer")];
                  },
                },
              },
            },
            {
              // compiles Sass to CSS
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new rspack.CssExtractRspackPlugin({
        filename: "styles/[name].[contenthash].css",
        chunkFilename: "[id].css",
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [new rspack.LightningCssMinimizerRspackPlugin(), "..."],
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
