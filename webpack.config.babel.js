import { join, resolve } from 'path'
import webpack from 'webpack'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  entry: {
    client: [
      './client/index.js',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: resolve(__dirname, './pub/build/'),
    publicPath: '/build/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    root: [ join(__dirname, 'client') ],
    extensions: ['', '.js']
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: {
      colors: true
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    quiet: true,
    publicPath: '/build' // only trigger webpack-dev on stuff in /build
  },
  stats: {
    colors: true
  },
  devtool: 'eval',
  noInfo: true,
  quiet: false,
  cache: true
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.DedupePlugin())
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ output: {comments: false} }))
  config.devtool = false
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

export default config
