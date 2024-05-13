const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true, // fallbacks to index.html file for SPA routing
    port: 8000,
  },
  plugins: [
    // by using Defineplugin we make sure the URL points or API endpoints points to the specific domain
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify("http://127.0.0.1:3001"),
      },
    }),
  ],
};
