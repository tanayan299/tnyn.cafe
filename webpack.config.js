module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
        options: {
          // ネイティブモジュールのパスを指定
          // この例では、pinyinパッケージを使用しています
          name: "[name]-[hash].[ext]",
          outputPath: "build/Release",
          publicPath: "./build/Release/",
        },
      },
    ],
  },
};
