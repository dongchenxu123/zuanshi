var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var type;
//var precss = require('precss');

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log("当前运行环境：", isPro)

var plugins = []
if (isPro) {
  plugins.push(
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new webpack.DefinePlugin({
          'process.env':{
              'NODE_ENV': JSON.stringify(nodeEnv)
          }
      }),
      new HtmlWebpackPlugin({
          filename: './index.html',
          template: './public/index.html',
          inject: 'body',
          hash: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
             names: ['vendor']
         })
  )
} else {
  plugins.push(
      new webpack.DefinePlugin({
          'process.env':{
              'NODE_ENV': JSON.stringify(nodeEnv)
          },
          BASE_URL: JSON.stringify('_dev/dsp/site/'),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './public/index.html',
          inject: 'body',
          hash: false,
          cache: true
     }),
     new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
  )
}
var output = {}
if(isPro) {
   output = {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'build'),
    publicPath: 'https://zuanshi.xibao100.com',
    chunkFilename: '[name].[hash].js'
  }
} else {
   output = {
    filename: '_dev/dsp/site/[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    chunkFilename: '[name].js'
  }
}

if (isPro) {
  type = false
} else {
  type = 'source-map'
}
module.exports = {
  devtool: type,
  entry: {
    app: isPro
        ? ['./src/index']
        : ['webpack-hot-middleware/client?path=/__webpack_hmr',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/index'],
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom', 'redux-actions', 'axios', 'babel-polyfill',]
  },
  output: output,
  // BASE_URL是全局的api接口访问地址
  plugins,



  // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css', '.web.js', '.json', '.html'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src')
    ]
  },

  module: {
      rules: [{
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          query: {
            babelrc: true,
            cacheDirectory: true
          }
      }, {
          test: /\.(less|css)$/,
          use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      }, {
          test: /\.(png|jpg|gif|md)$/,
          use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
      }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: ['url-loader?limit=10000&mimetype=image/svg+xml']
      }],
  }
};
