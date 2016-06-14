'use strict'

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
        index: './src/index.js',
        es2015: './src/es2015.js'
    },
	output: {
		path: './build/',
		filename: 'js/[name].js',
	},
	module: {
		loaders: [{
			test: /\.js$/,  
			loader: 'babel'
		},
		{
		    test: /\.css$/,
		    loader: ExtractTextPlugin.extract(
		        'style-loader',
		        'css-loader',
		        {
		            publicPath: '../',  // 回到dist，像是 background-image: url(../img/header-e147da.jpg); 就是由這控制的
		            // publicPath: path.join(__dirname, 'dist'),  // 絕對路徑是要不得的作法，你可以看你我用筆電看到的結果 -> background-image: url(D:\develop\kkdev\showcase\distimg/header-e147da.jpg);
		        }
		    )
		},
		{
		    test: /\.css$/,
		    loader: 'postcss-loader'
		},
        {
            test: /\.(jpe?g|png|gif|svg)$/, 
            exclude: /(node_modules|bower_components)/,
            loader: "url-loader",
            query: {
                limit: 10000, // 若大於10kb，就會轉為base64
                name: 'images/[name].[ext]'  // 這邊的路徑會相對於使用url-loader的loader, 也就是scss的publicPath
            }
        },
        {
            test: /\.woff(2)?$/, 
            loader: "url-loader",
            query: {
                limit: 10000,
                name: 'font/[name].[ext]'
            }
        },
        {
            test: /\.(ttf|eot|svg)$/, 
            loader: "file-loader",
            query: {
                name: 'font/[name].[ext]'
            }
        }]
	},
	resolve: {
		extensions: ['', '.css', '.js'] // ,
        // alias: {
        //     'JsonExtend': path.join(__dirname, 'node_modules/json-extend/index.js'),
        //     'DeepExtend': path.join(__dirname, 'node_modules/deep-extend/index.js'),
        // }
	},
	postcss: function () {
	    return [ require('autoprefixer')({browsers: ['> 1%', 'IE 7']}), require('precss'), require('postcss-fontpath'), require("postcss-calc"), require('postcss-color') ];
	},
	plugins: [
	    // new HtmlPack({ 
	    //   title: 'SWAROVSKI',// 在這設定的變數，可在template.html中用 {%= o.htmlWebpackPlugin.options.title %} 帶入
	    //   filename: 'index.html', // 輸出的檔名是什麼
	    //   template: './src/swarovski/index.html',
	    //   inject: 'body' // 檔案會從輸出的index.html的哪裡link入
	    // }),
	    new ExtractTextPlugin('css/[name].css')
	]
};
