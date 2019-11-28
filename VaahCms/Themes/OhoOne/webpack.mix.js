const mix = require('laravel-mix');
var fs = require('fs');
const fs_extra = require('fs-extra');



/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.setPublicPath('./../../../public/ohoone');
let css_path = './../../../public/ohoone/css/';

//mix.sass('Resources/assets/sass/site.scss', css_path+'all.css');
//mix.style('Resources/assets/css/style.css', css_path+'style.css');

var path_vue = __dirname+"/Vue/app.js";
mix.js(path_vue,  "./builds");

mix.webpackConfig({
    watchOptions: {
        aggregateTimeout: 2000,
        poll: 20,
        ignored: [
            '/Config/',
            '/Database/',
            '/Entities/',
            '/Helpers/',
            '/Http/',
            '/Providers/',
            '/Resources/',
            '/Routes/',
            '/node_modules/',
            '/vendor/',
        ]
    }
});