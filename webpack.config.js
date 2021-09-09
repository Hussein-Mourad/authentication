const path = require("path");

module.exports = {
  entry: "./bin/www.js",
  mode: "production",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "app.bundle.js",
  },
  resolve:{
    modules:['node_modules']
  },
  module:{
    rules:[
     { test: /\.html$/, use: 'html-loader' },
    ]
  }
};
