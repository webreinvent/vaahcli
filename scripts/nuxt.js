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
const axios = require('axios');

const {getInstalledPathSync}  = require('get-installed-path');
let now = new Date();



/*
|--------------------------------------------------------------------------
| Install NuxtJs Setup
|--------------------------------------------------------------------------
*/
const install = (name) => {

    let url;

    //url = "https://codeload.github.com/webreinvent/vaahnuxt/zip/master";
    //url = "https://github.com/webreinvent/vaahnuxt/archive/master.zip";
    //url = "http://github.com/webreinvent/vaahnuxt/zipball/master";
    //url = "https://codeload.github.com/jgm/pandoc/zip/master";
    //url = "https://api.github.com/repos/atom/atom/zipball";
    //url = "https://codeload.github.com/TotallyInformation/alternate-node-red-installer/zip/master";
    //url = "https://file-examples.com/wp-content/uploads/2017/02/zip_9MB.zip"; // with this url everything seems working
    url = "https://codeload.github.com/webreinvent/vaahcms/zip/master";
    //url = "https://codeload.github.com/modernpk/detect/zip/master";
    //url = "https://api.github.com/repos/jgm/pandoc/zipball/2.9.1.1";





    /*if (fs.existsSync(dest)) {
        fs.unlink(dest, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
    }

    download(url, dest, afterPackageDownload);*/

    let dest = 'master.zip';
    downloadFile(url, dest);

    console.info('success | vendor: '+name);

};



const downloadFile = async function  (url, dest) {

    //delete the file if alre
    if (fs.existsSync("./"+dest)) {
        fs.unlink(dest, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            //console.log('File deleted!');
        });
    }

    let inputs = {
        url: url,
        method: 'GET',
        responseType: 'stream'
    };

    const { data, headers } = await axios(inputs);

    const totalLength = headers['content-length'];

    const progressBar = new ProgressBar('Downloading [:bar] :percent :etas', {
        width: 40,
        complete: '=',
        incomplete: ' ',
        renderThrottle: 1,
        total: parseInt(totalLength)
    });

    const Path = path.resolve(__dirname, './../', 'master.zip');
    const writer = fs.createWriteStream(Path);

    data.on('data', (chunk) => progressBar.tick(chunk.length));
    data.pipe(writer);
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

module.exports = {install, update, afterPackageDownload, download};
