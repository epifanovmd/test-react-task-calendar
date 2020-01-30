const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const baseConfigClient = {
  name: "client",
  target: "web",
  entry: {
    client: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: IS_PRODUCTION ?
        "[contenthash].js" :
        "[name].js",
    chunkFilename: IS_PRODUCTION ?
        "[contenthash].chunk.js" :
        "[name].chunk.js",
    publicPath: "/",
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: "node_modules",
};
const baseLoaders = {
  ts: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'ts-loader'
    ],
  },
  url: {
    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
    loader: "url-loader",
    options: {
      limit: 25000,
      name: "[path][name].[hash:8].[ext]",
    },
  },
  file: {
    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[hash:8].[ext]",
    },
  },
  font: [
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
  ],
  scss: {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: {
            localIdentName: "[local]--[hash:base64:5]",
          },
        },
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ["cover 99.5%"],
            }),
          ],
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
};

const basePlugins = [
  ...(
    IS_PRODUCTION ?
      [new MiniCssExtractPlugin({
        filename: "styles/[contenthash].css",
        chunkFilename: "styles/[contenthash].chunk.css",
        ignoreOrder: false,
      })] :
      []
  ),
  new webpack.DefinePlugin({
    IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
    IS_PRODUCTION: JSON.stringify(IS_PRODUCTION),
    "process.env.PORT": JSON.stringify(process.env.PORT),
  }),
];

module.exports = {
  baseConfigClient,
  baseLoaders,
  basePlugins,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
};
