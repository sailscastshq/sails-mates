module.exports = {
  entry: {
    main: './app.js',
  },
  externals: { sails: 'commonjs sails' },
  externalsPresets: {
    node: true,
  },
  module: {
    rules: [
      {
        test: /.md$/,
        loader: 'ignore-loader',
      },
      {
        test: /.ico$/,
        loader: 'ignore-loader',
      },
    ],
  },
  target: 'node',
}
