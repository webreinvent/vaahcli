const assert = require('assert');
let log = require('color-console');
//let readlineSync = require('readline-sync');
let fs = require('fs');
let path = require('path');
let fsSync = require('fs-sync');
let ejs = require('ejs');

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
        copyPackageFile(item);
    });

};


/*
|--------------------------------------------------------------------------
| Copy Package File
|--------------------------------------------------------------------------
*/
const copyPackageFile =  (file_path) => {


    let file_name = path.basename(file_path);
    let destination = file_path.replace("skeletons\\laravel\\package\\", "");
    destination = destination.replace(file_name, "");

    switch(file_name) {
        case 'packagename.php':
            file_name = package_obj.package_name_lower+'.php';
            break;
        case 'ServiceProvider.ejs':
            file_content = fs.readFileSync(item).toString();
            file_content = ejs.render(file_content, package_obj);
            file_name = package_obj.package_name+file_name+'.php';
            break;
        case 'composer.ejs':
            file_content = fs.readFileSync(item).toString();
            file_content = ejs.render(file_content, package_obj);
            file_name = 'composer.json';
            break;
        case 'Facade.ejs':
            file_content = fs.readFileSync(item).toString();
            file_content = ejs.render(file_content, package_obj);
            file_name = package_obj.package_name+'Facade.php';
            break;
        case 'package.ejs':
            file_content = fs.readFileSync(item).toString();
            file_content = ejs.render(file_content, package_obj);
            file_name = package_obj.package_name+'.php';
            break;
    }

    destination = destination+file_name;
    fsSync.write(destination, file_content);

    log.green(destination);

};



/*
|--------------------------------------------------------------------------
| Copy Package File
|--------------------------------------------------------------------------
*/
const generateModel = (args) => {
    console.info('success | vendor: '+args.vendor_name+" package: "+args.package_name);
};



module.exports = { generatePackage, generateModel };
