const assert = require('assert');
let log = require('color-console');
//let readlineSync = require('readline-sync');
let fs = require('fs');
let path = require('path');
let fsSync = require('fs-sync');
let ejs = require('ejs');
let fsExtra = require('fs-extra');

/*
|--------------------------------------------------------------------------
| Generate Laravel Package
|--------------------------------------------------------------------------
*/
const generatePackage = (args) => {

    args.vendor_name_lower = args.vendor_name.toLowerCase();
    args.package_name_lower = args.package_name.toLowerCase();
    args.namespace = args.vendor_name+'\\'+args.package_name;

    generateConfig(args);
    getPackageFiles(args);

    console.info('success | vendor: '+args.vendor_name+" package: "+args.package_name);

};

/*
|--------------------------------------------------------------------------
| Generate a vaah-config.json file for future usages
|--------------------------------------------------------------------------
*/
const generateConfig = (args) => {
    fsSync.write('./vaah-config.json', JSON.stringify(args));
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
| Get Package Files List
|--------------------------------------------------------------------------
*/
const getPackageFiles =  (args) => {
    let template_path = './skeletons/laravel/package';
    let files_list = [];
    files_list = scanFiles(template_path, files_list);

    log.green('Package Name='+args.package_name+" | Namespace="+args.namespace);
    log.green("Following files are generated:");
    log.green("========================================");

    files_list.forEach(function(item) {
        copyPackageFile(item, args);
    });

};


/*
|--------------------------------------------------------------------------
| Copy Package File
|--------------------------------------------------------------------------
*/
const copyPackageFile =  (file_path, args) => {


    let file_name = path.basename(file_path);
    let destination = file_path.replace("skeletons\\laravel\\package\\", "");
    destination = destination.replace(file_name, "");

    let file_content = null;

    switch(file_name) {
        case 'packagename.php':
            file_name = args.package_name_lower+'.php';
            break;
        case 'ServiceProvider.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = args.package_name+file_name+'.php';
            break;
        case 'composer.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = 'composer.json';
            break;
        case 'Facade.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = args.package_name+'Facade.php';
            break;
        case 'package.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = args.package_name+'.php';
            break;
    }

    destination = destination+file_name;
    fsSync.write(destination, file_content);

    log.green(destination);

};


/*
|--------------------------------------------------------------------------
| Reset Package Files
|--------------------------------------------------------------------------
*/
const resetPackage = (args) => {
    let remove_list = {
        'folders': [
            'config',
            'lang',
            'database',
            'src',
            'views',
        ],
        'files': [
            'routes.php',
            'README.md',
            'config.json',
            'composer.json'
        ]
    };

    log.red("Following folders and files are deleted:");
    log.red("===============================================");

    remove_list.folders.forEach(function(item) {
        fsExtra.removeSync(item);
        log.red(item);
    });

    remove_list.files.forEach(function(item) {
        fsExtra.removeSync(item);
        log.red(item);
    });
};

/*
|--------------------------------------------------------------------------
| Copy Package File
|--------------------------------------------------------------------------
*/
const generateModel = (args) => {
    console.info('success | vendor: '+args.vendor_name+" package: "+args.package_name);
};



module.exports = { generatePackage, resetPackage, generateModel };
