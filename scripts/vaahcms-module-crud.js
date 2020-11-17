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

/*
|--------------------------------------------------------------------------
| Laravel Package Questions
|--------------------------------------------------------------------------
*/

const  getQuestions = function () {
    let questions = [
        {
            type : 'input',
            name : 'module_name',
            default: 'HelloWorld',
            message : 'Enter your module name: '
        },
        {
            type : 'input',
            name : 'model_name',
            default: 'Article',
            message : 'Enter your model name: '
        },
        {
            type : 'input',
            name : 'table_name',
            default: 'articles',
            message : 'Enter your table name: '
        },
        {
            type : 'input',
            name : 'controller_name',
            default: 'Articles',
            message : 'Enter your controller name: '
        },
    ];

    return questions;
};


const getNamespace = function (args) {
    return 'VaahCms\\Modules\\'+args.module_name;
};

/*
|--------------------------------------------------------------------------
| Generate VaahCms Module
|--------------------------------------------------------------------------
*/
const generatePackage = (args, getNamespace) => {

    args.vendor_name = 'VaahCms';

    args.vendor_name_lower = args.vendor_name.toLowerCase();
    args.module_name_upper = args.module_name.toUpperCase();
    args.module_name_lower = args.module_name.toLowerCase();
    args.controller_name_lower = args.controller_name.toLowerCase();
    args.namespace = args.vendor_name+'\\Modules\\'+args.module_name;
    args.year = dateFormat(now, 'yyyy');


    getPackageFiles(args);

    console.info('success | vendor: '+args.vendor_name+" package: "+args.module_name);

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
| Get Module Files List
|--------------------------------------------------------------------------
*/
const getPackageFiles =  (args) => {

    let template_path = globalFileSourcePath+'/skeletons/vaahcms/module-crud';

    console.log(template_path);

    let files_list = [];
    files_list = scanFiles(template_path, files_list);

    log.green('Module Name='+args.module_name+" | Namespace="+args.namespace);
    log.green("Following files are generated:");
    log.green("========================================");

    files_list.forEach(function(item) {
        copyPackageFile(item, args);
    });

};


/*
|--------------------------------------------------------------------------
| Get Destination Path
|--------------------------------------------------------------------------
*/

const getDestinationPrefixPath =  (args) => {
    return "./VaahCms/Modules/"+args.module_name;
};

/*
|--------------------------------------------------------------------------
| Get Destination Path
|--------------------------------------------------------------------------
*/
const getDestinationPath =  (file_path, args) => {

    //log.yellow('file path-->'+file_path);
    let replace_path;

    if(globalAppEnv == 'dev')
    {
        replace_path = "skeletons\\vaahcms\\module-crud\\";
    } else
    {
        replace_path = globalFileSourcePath+"\\skeletons\\vaahcms\\module-crud\\";
    }

    //log.red('replace path-->'+replace_path);

    let file_name = path.basename(file_path);
    let destination = file_path.replace(replace_path, "");
    destination = "./VaahCms/Modules/"+args.module_name+"/"+destination.replace(file_name, "");

    return destination;
};

/*
|--------------------------------------------------------------------------
| Copy Package File
|--------------------------------------------------------------------------
*/
const copyPackageFile =  (file_path, args) => {

    let file_name = path.basename(file_path);
    let file_name_parse = path.parse(file_name);
    let file_name_only = file_name_parse.name;
    let file_name_ext = file_name_parse.ext;

    let destination = getDestinationPath(file_path, args);

    let file_content = null;
    file_content = fs.readFileSync(file_path).toString();
    file_content = ejs.render(file_content, args);


    if(file_name == "ServiceProvider.php.ejs")
    {
        file_name = args.module_name+'ServiceProvider.php';
    } else
    {
        file_name = file_name.replace('.ejs', "");
    }


    switch (file_name) {
        case 'Model.php':
            file_name = args.model_name+".php";
            break;
        case 'Controller.php':
            file_name = args.controller_name+"Controller.php";
            break;
        case 'routes-template.php':
            file_name = 'routes-'+args.controller_name_lower+".php";
            break;
        case 'store-template.js':
            file_name = args.controller_name_lower+".js";
            break;
        case 'vue-routes-template.js':
            file_name = 'routes-'+args.controller_name_lower+".js";
            break;
    }

    if(destination.includes('Vue\\pages\\template'))
    {
        destination = getDestinationPrefixPath(args)+'\\Vue\\pages\\'+args.controller_name_lower+"\\";
    }


    destination = destination+file_name;

    fsSync.write(destination, file_content);
    log.green(destination);
    //log.grey('------------------------------');

};


/*
|--------------------------------------------------------------------------
| Reset Package Files
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get File Content
|--------------------------------------------------------------------------
*/
const getFileContent = (file_path) => {
    let file_name = path.basename(file_path);
    if (!fs.existsSync(file_path)) {

        if(file_name == 'vaah-config.json')
        {
            log.red("'"+file_path+"' file does not exist. Please run `vaah laravel make:package` command.");
        } else
        {
            log.red("'"+file_path+"' file does not exist.");
        }


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


/*
|--------------------------------------------------------------------------
| Title Case
|--------------------------------------------------------------------------
*/
const titleCase = (str) => {
    let wordsArray = str.toLowerCase().split(/\s+/);
    let upperCased = wordsArray.map(function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    });
    return upperCased.join(" ");
};




module.exports = {getQuestions, generatePackage};
