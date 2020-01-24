const assert = require('assert');
let log = require('color-console');
//let readlineSync = require('readline-sync');
let fs = require('fs');
let path = require('path');
let fsSync = require('fs-sync');
let ejs = require('ejs');
let fsExtra = require('fs-extra');
let dateFormat = require('dateformat');
var ProgressBar = require('progress');
var https = require('https');

const {getInstalledPathSync}  = require('get-installed-path');
let now = new Date();



/*
|--------------------------------------------------------------------------
| Install NuxtJs Setup
|--------------------------------------------------------------------------
*/
const install = (name) => {

    /*let template_path = globalFileSourcePath+'/skeletons/vaahnuxt/assets';

    let des = './';

    if(name)
    {
        des += name+'/';
    }

    fsExtra.copySync(template_path, des);*/

    /*var req = https.request({
        host: 'github.com',
        port: 443,
        path: '/webreinvent/vaahnuxt/archive/master.zip'
    });*/


    let url;


    url = "https://codeload.github.com/webreinvent/vaahnuxt/zip/master";
    url = "https://github.com/webreinvent/vaahnuxt/archive/master.zip";
    url = "http://github.com/webreinvent/vaahnuxt/zipball/master";
    url = "https://api.github.com/repos/jgm/pandoc/zipball/2.9.1.1";
    url = "https://codeload.github.com/jgm/pandoc/zip/master";
    url = "https://codeload.github.com/modernpk/detect/zip/master";
    url = "https://api.github.com/repos/atom/atom/zipball";
    url = "https://codeload.github.com/TotallyInformation/alternate-node-red-installer/zip/master";
    url = "https://codeload.github.com/webreinvent/vaahcms/zip/master";


    //https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx

    //https://file-examples.com/wp-content/uploads/2017/02/zip_9MB.zip

    //https://github.com/webreinvent/vaahnuxt/archive/master.zip

    //https://codeload.github.com/TotallyInformation/alternate-node-red-installer/zip/master

    let dest = './file.zip';

    download(url, dest, afterPackageDownload);

    console.info('success | vendor: '+name);

};


/*
|--------------------------------------------------------------------------
| Update NuxtJs Setup
|--------------------------------------------------------------------------
*/
const afterPackageDownload = () => {

    console.info('Package downloaded ==> ');

};



/*
|--------------------------------------------------------------------------
| Update NuxtJs Setup
|--------------------------------------------------------------------------
*/
const update = (name) => {

    console.info('success | vendor: '+name);

};


/*
|--------------------------------------------------------------------------
| Update NuxtJs Setup
|--------------------------------------------------------------------------
*/
const download = (url, dest, cb) => {

    console.log('--->url', url);

    const file = fs.createWriteStream(dest);
    const req = https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });


    req.on('response', function(res){

        var len = parseInt(res.headers['content-length'], 10);

        console.log();
        var bar = new ProgressBar('downloading [:bar] :rate/bps :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
        });

        res.on('data', function (chunk) {
            bar.tick(chunk.length);
        });

        res.on('end', function () {
            console.log('Download Completed');
        });

    });

    req.end();

};

module.exports = {install, update};
