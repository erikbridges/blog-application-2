const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

require("@babel/polyfill");
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "JS/main_bundle.js",
    publicPath: "./"
  },
  devtool: "source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    publicPath: "/",
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          },
          {
            loader: "eslint-loader",
            options: {
              formatter: require("eslint-friendly-formatter")
            }
          }
        ]
      },
      /* === CSS SETTINGS === */
      {
        test: /\.styl$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          "postcss-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [ExtractCssChunks.loader, "css-loader", "postcss-loader"]
      },
      /* === FONT SETTINGS === */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "../public/fonts",
              outputPath: "./public/fonts"
            }
          }
        ]
      },
      /* === IMAGE SETTINGS === */
      {
        test: /\.(jpe?g|png|gif|svg|)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({
      filename: "CSS/[name].css",
      hot: true,
      orderWarning: true,
      reloadAll: true,
      cssModules: true
    }),
    new HtmlWebpackPlugin({
      minify: true,
      filename: "index.html",
      template: "./public/index.html"
    }),
    new ImageminPlugin({
      pngquant: {
        quality: "95-100"
      },
      optipng: {
        optimizationLevel: 9
      }
    }),
    new PrettierPlugin()
  ]
};
