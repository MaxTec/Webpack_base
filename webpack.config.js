const { resolve } = require('path'); //Ayuda para resolver rutas dentro del proyecto
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nib = require("nib");
const rupture = require("rupture");
const ExtractWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
console.log(process.env.NODE_ENV);

const minify = (process.env.NODE_ENV === 'production') ? true : false;

const publicPath = (process.env.NODE_ENV === 'production') ? 'http://10.0.0.18/Proyecto_Webpack/dist/' : 'http://10.0.0.18:3000/';
const entry = (process.env.NODE_ENV === 'production') ? ['./src/js/index.js'] : ['webpack-dev-server/client?http://10.0.0.18:3000/', 'webpack/hot/only-dev-server', './src/js/index.js'];

const useStylus = (process.env.NODE_ENV === 'production') ? ExtractWebpackPlugin.extract({
    fallback: 'style-loader',
    use: [{
            loader: 'css-loader'

        },
        {
            loader: 'stylus-loader',
            options: {
                use: [nib(), rupture()],
                import: ['~nib/lib/nib/index.styl']
            }
        }
    ]
}) : [{
        loader: 'style-loader'
    },
    {
        loader: 'css-loader'

    },
    {
        loader: 'stylus-loader',
        options: {
            use: [nib(), rupture()],
            import: ['~nib/lib/nib/index.styl']
        }
    }
];

const config = {
    entry: {
        app: entry
    },
    output: {
        path: resolve(__dirname, './dist'),
        publicPath: publicPath,
        filename: '[name].js'
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            // {
            //     test: /\.pug$/,
            //     use: [{
            //         loader: 'pug-loader',
            //         options: { pretty: !minify } //Revisar
            //     }],
            // },
            {
                test: /\.ejs$/,
                use: [{
                    loader: 'ejs-render-loader'
                }]
            },
            {
                test: /\.styl$/,
                use: useStylus
            },
            {
                test: /\.(jpe?g|gif|png)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: publicPath
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }
                ],
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'templates/index.html',
            template: 'ejs-render!./src/templates/index.ejs',
            title: 'Custom Index',
            minify: {
                collapseWhitespace: minify
            },
            alwaysWriteToDisk: true
        }), new HtmlWebpackPlugin({
            filename: 'templates/contacto.html',
            template: 'ejs-render!./src/templates/contacto.ejs',
            title: 'Custom Contacto',
            minify: {
                collapseWhitespace: minify
            },
            alwaysWriteToDisk: true
        }),
        new ExtractWebpackPlugin('css/estilos.css'),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],

    //devserver
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        stats: 'errors-only',
        open: true,
        host: '10.0.0.18',
        hot: true,
        watchContentBase: true
    }
}
module.exports = config;