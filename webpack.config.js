module.exports = {
  entry: './main.ts',

  output: {
    filename: './bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },

  // user source-map for production
  devtool: 'inline-source-map'
};
