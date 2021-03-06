const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const debug = process.env.NODE_ENV !== "production";
let cesiumSource = "./node_modules/cesium/Source";
let cesiumWorkers = "../Build/Cesium/Workers";
module.exports = {
  publicPath: "./",
  devServer: {
    host:'localhost',
    port: 8888,
    hotOnly:true  
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  },
  configureWebpack: {
    output: {
      sourcePrefix: " ",
    },
    amd: {
      toUrlUndefined: true,
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": path.resolve("src"),
        components: path.resolve("src/components"),
        assets: path.resolve("src/assets"),
        views: path.resolve("src/views"),
        cesium: path.resolve(__dirname, cesiumSource),
      },
    },
    plugins: [
      //纯cesium配置
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Assets"), to: "Assets" },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, "ThirdParty/Workers"),
          to: "ThirdParty/Workers",
        },
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
      //earthsdk配置
      new CopyWebpackPlugin([
        {
          // from: './node_modules/earthsdk/dist/XbsjCesium',//npm 配置
          from: './src/earthMap/XbsjCesium',//本地资源配置
          to: 'js/earthsdk/XbsjCesium',
          toType: 'dir'
        },
        {
          from: './src/earthMap/XbsjEarth',
          to: 'js/earthsdk/XbsjEarth',
          toType: 'dir'
        },
      ])
    ],
  }
};
