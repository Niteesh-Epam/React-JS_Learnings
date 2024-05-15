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
        BASE_URL: JSON.stringify("https://api.escuelajs.co/api/v1/auth"),
      },
    }),
  ],
};
