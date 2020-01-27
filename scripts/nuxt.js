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
const unzipper = require('unzipper');
let merge = require('merge-package-json');

const {getInstalledPathSync}  = require('get-installed-path');
let now = new Date();



/*
|--------------------------------------------------------------------------
| Install NuxtJs Setup
|--------------------------------------------------------------------------
*/
const install = (folder) => {

    let url;

    //url = "https://codeload.github.com/webreinvent/vaahnuxt/zip/master";
    //url = "http://github.com/webreinvent/vaahnuxt/zipball/master";
    //url = "https://codeload.github.com/jgm/pandoc/zip/master";
    //url = "https://api.github.com/repos/atom/atom/zipball";
    //url = "https://codeload.github.com/TotallyInformation/alternate-node-red-installer/zip/master";
    //url = "https://file-examples.com/wp-content/uploads/2017/02/zip_9MB.zip"; // with this url everything seems working
    //url = "https://codeload.github.com/webreinvent/vaahcms/zip/master";
    url = "https://github.com/webreinvent/vaahnuxt/archive/master.zip";
    //url = "https://codeload.github.com/modernpk/detect/zip/master";
    //url = "https://api.github.com/repos/jgm/pandoc/zipball/2.9.1.1";

    let folder_name = null;

    if(folder)
    {
        folder_name = folder;
    }

    let file_name = 'master-install.zip';

    //delete the folder if already
    if(folder_name)
    {
        if (fs.existsSync("./"+folder_name)) {
            fsExtra.removeSync("./"+folder_name);
        }
    }


    downloadFile(url, file_name, folder_name, processInstallation);

};


/*
|--------------------------------------------------------------------------
| Check Directory Exist if not then create
|--------------------------------------------------------------------------
*/
const processInstallation = function(folder_name) {

    let file = './master-install.zip';

    const Path = path.resolve('./', './');

    let writer = fs.createReadStream(file)
        .pipe(unzipper.Extract({ path: Path }))
        .on("close", function() {
            if(folder_name)
            {
                fs.renameSync('./vaahnuxt-master', './'+folder_name);
            } else
            {
                fsExtra.copySync('./vaahnuxt-master', './');
                fsExtra.removeSync('./vaahnuxt-master');
            }
            fsExtra.removeSync("./master-install.zip");

            log.green('Installation was successful. Run following commands');
            log.green('npm install');
            log.green('npm run dev');

        });
};


/*
|--------------------------------------------------------------------------
| Check Directory Exist if not then create
|--------------------------------------------------------------------------
*/
const checkDirectorySync = function(directory) {
    try {
        fs.statSync(directory);
    } catch(e) {
        fs.mkdirSync(directory);
    }
};

/*
|--------------------------------------------------------------------------
| Download file
|--------------------------------------------------------------------------
*/
const downloadFile = async function  (url, file_name, folder_name, callback) {

    let path_dest = "./";

    let inputs = {
        url: url,
        method: 'GET',
        responseType: 'stream'
    };


    try {
        const { data, headers } = await axios(inputs);

        if(headers['content-length'] === undefined)
        {
            headers['content-length'] = 100
        }

        const totalLength = parseInt(headers['content-length'], 10);

        const progressBar = new ProgressBar('Downloading [:bar] :percent :etas', {
            width: 40,
            complete: '=',
            incomplete: ' ',
            renderThrottle: 1,
            total: totalLength
        });

        const Path = path.resolve('./', path_dest, file_name);
        const writer = fs.createWriteStream(Path);

        data.on('data', (chunk) => progressBar.tick(chunk.length));
        data.pipe(writer);

        writer.on('finish', function () {
            callback(folder_name);
        })

    } catch (e) {
        console.log(e.response); // undefined
        log.blue("Try again.") // undefined
    }

};

/*
|--------------------------------------------------------------------------
| Update NuxtJs Setup
|--------------------------------------------------------------------------
*/
const update = (folder) => {

    let url;

    url = "https://github.com/webreinvent/vaahnuxt/archive/master.zip";


    let folder_name = null;

    if(folder)
    {
        folder_name = folder;
    }

    let file_name = 'master-update.zip';

    downloadFile(url, file_name, folder_name, processUpdate);

};


/*
|--------------------------------------------------------------------------
| Update NuxtJs Setup
|--------------------------------------------------------------------------
*/

const processUpdate = (folder_name) => {


    let file = './master-update.zip';

    const Path = path.resolve('./', './');

    let writer = fs.createReadStream(file)
        .pipe(unzipper.Extract({ path: Path }))
        .on("close", function() {

            let removable = [
                'nuxt.config.js',
                'README.md',
                'LICENSE',
                '.gitignore',
                '.editorconfig',
            ];

            removable.forEach(function (item) {
                fsExtra.removeSync('./vaahnuxt-master/'+item);
            });

            let src_path = './vaahnuxt-master/package.json';
            let dst_path;

            if(folder_name)
            {
                dst_path = './'+folder_name+'/package.json';
            } else
            {
                dst_path = './package.json';
            }


            let dst = fs.readFileSync(dst_path);
            let src = fs.readFileSync(src_path);

            //merge package files
            let package_data = merge(src, dst, true);
            fsExtra.outputFileSync(dst_path, package_data);
            fsExtra.removeSync('./vaahnuxt-master/package.json');

            if(folder_name)
            {
                fsExtra.copySync('./vaahnuxt-master', './'+folder_name);
            } else
            {
                fsExtra.copySync('./vaahnuxt-master', './');
            }

            fsExtra.removeSync('./vaahnuxt-master');
            fsExtra.removeSync("./master-update.zip");

            log.green('Update was successful. Run following commands');
            log.green('npm install');
            log.green('npm run dev');

        });


};


module.exports = {install, update};
