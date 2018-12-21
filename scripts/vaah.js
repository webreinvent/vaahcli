/*
|--------------------------------------------------------------------------
| Tutorials
|--------------------------------------------------------------------------
| https://scotch.io/tutorials/build-an-interactive-command-line-application-with-nodejs
| https://github.com/SBoudrias/Inquirer.js/
*/


const assert = require('assert');
let log = require('color-console');
//let readlineSync = require('readline-sync');
let fs = require('fs');
let path = require('path');
let fsSync = require('fs-sync');
let ejs = require('ejs');
let fsExtra = require('fs-extra');
let dateFormat = require('dateformat');
const {getInstalledPathSync}  = require('get-installed-path');
let now = new Date();
var forEach = require('async-foreach').forEach;

/*
|--------------------------------------------------------------------------
| Release Ready
|--------------------------------------------------------------------------
*/
const releaseReady = (args) => {
    getPackageFiles(args);
};

/*
|--------------------------------------------------------------------------
| Get Files List
|--------------------------------------------------------------------------
*/
const getPackageFiles =  (args) => {

    let template_path = './skeletons/vaah';
    let files_list = [];
    files_list = scanFiles(template_path, files_list);

    log.green("Following files are generated:");
    log.green("========================================");

    forEach(files_list, function(item, index) {
        copyPackageFile(item, args);
    });

    /*files_list.forEach(function(item) {
        copyPackageFile(item, args);
    });*/

};

/*
|--------------------------------------------------------------------------
| Scan Files
|--------------------------------------------------------------------------
*/
const scanFiles =  (dir, files_list) => {

    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            scanFiles(fullPath, files_list);
        } else {
            files_list.push(fullPath);
        }
    });

    return files_list;

};

/*
|--------------------------------------------------------------------------
| Copy Package File
|--------------------------------------------------------------------------
*/
const copyPackageFile =  (file_path, args) => {

    //console.log(args);

    //log.red(file_path);
    let file_name = path.basename(file_path);
    let destination = "./";

    let file_content = fs.readFileSync(file_path).toString();

    switch(file_name) {
        case 'package.json':
            file_content = parseJsonFileContent(file_path);

            log.yellow('Old Version: '+file_content.version);

            let version = file_content.version.split(".");

            if(args.type == 'patch')
            {
                version[2] = parseInt(version[2])+1;
            } else if(args.type == 'minor')
            {
                version[1] = parseInt(version[1])+1;
                version[2] = 0;
            } else if(args.type == 'major')
            {
                version[0] = parseInt(version[0])+1;
                version[1] = 0;
                version[2] = 0;
            }
            version = version.join(".");

            log.yellow('New Version: '+version);

            file_content.version = version;

            file_content = JSON.stringify(file_content,null,'\t');

            //log.green(file_content);

            fsSync.write(file_path, file_content);

            break;
    }

    destination = destination+file_name;
    fsSync.write(destination, file_content);
    log.green(destination);

};


/*
|--------------------------------------------------------------------------
| Get File Content
|--------------------------------------------------------------------------
*/
const getFileContent = (file_path) => {
    if (!fs.existsSync(file_path)) {
        log.red("'"+file_path+"' file does not exist.");
        return false;
    }
    return fs.readFileSync(file_path).toString();
};

/*
|--------------------------------------------------------------------------
| Parse Json File Content
|--------------------------------------------------------------------------
*/
const parseJsonFileContent = (file_path) => {
    let content = getFileContent(file_path);
    content = JSON.parse(content);
    return content;
};

module.exports = { releaseReady, };
