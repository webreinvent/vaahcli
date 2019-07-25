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
            name : 'vendor_name',
            default: 'WebReinvent',
            message : 'Enter developer/vendor name: '
        },
        {
            type : 'input',
            name : 'package_name',
            default: 'HelloWorld',
            message : 'Enter your module name: '
        },
        {
            type : 'input',
            name : 'description',
            default: 'description',
            message : 'Enter your package description: '
        },
        {
            type : 'input',
            name : 'homepage',
            default: 'https://www.webreinvent.com',
            message : 'Enter homepage url: '
        },
        {
            type : 'input',
            name : 'author_name',
            default: 'pradeep',
            message : 'Enter Author name: '
        },
        {
            type : 'input',
            name : 'author_email',
            default: 'we@webreinvent.com',
            message : 'Enter Author email: '
        },

    ];

    return questions;
};



/*
|--------------------------------------------------------------------------
| Generate VaahCms Module
|--------------------------------------------------------------------------
*/
const generatePackage = (args) => {

    args.vendor_name_lower = args.vendor_name.toLowerCase();
    args.package_name_lower = args.package_name.toLowerCase();
    args.namespace = 'VaahCms\\Modules\\'+args.package_name;
    args.year = dateFormat(now, 'yyyy');

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
| Get Module Files List
|--------------------------------------------------------------------------
*/
const getPackageFiles =  (args) => {

    let template_path = globalFileSourcePath+'/skeletons/vaahcms/module';

    console.log(template_path);

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
| Get Destination Path
|--------------------------------------------------------------------------
*/
const getDestinationPath =  (file_path) => {

    //log.yellow('file path-->'+file_path);
    let replace_path;

    if(globalAppEnv == 'dev')
    {
        replace_path = "skeletons\\vaahcms\\module\\";
    } else
    {
        replace_path = globalFileSourcePath+"\\skeletons\\vaahcms\\module\\";
    }

    //log.red('replace path-->'+replace_path);

    let file_name = path.basename(file_path);
    let destination = file_path.replace(replace_path, "");
    destination = "./VaahCms/Modules/"+destination.replace(file_name, "");

    return destination;
};

/*
|--------------------------------------------------------------------------
| Copy Package File
|--------------------------------------------------------------------------
*/
const copyPackageFile =  (file_path, args) => {

    let file_name = path.basename(file_path);

    let destination = getDestinationPath(file_path);

    let file_content = null;





    switch(file_name) {
        case 'config.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = args.package_name_lower+'.php';
            break;
        case 'DatabaseTableSeeder.ejs':
        case 'SampleDataTableSeeder.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = file_name+'.php';
            break;
        case 'SetupController.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = 'SetupController.php';
            break;
        case 'RouteServiceProvider.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = file_name+'.php';
            break;
        case 'ServiceProvider.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = args.package_name+'ServiceProvider'+'.php';
            break;
        case 'app.ejs':
        case 'app-routes.ejs':
        case 'app-store.ejs':
        case 'aside-menu.blade.ejs':
        case 'dashboard.blade.ejs':
        case 'api.ejs':
        case 'web.ejs':
        case 'admin.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = file_name+'.php';
            break;

        case '.gitignore.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = '.gitignore';
            break;

        case 'composer.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = 'composer.json';
            break;

        case 'package.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = 'package.json';
            break;

        case 'README.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = 'README.md';
            break;

        case 'settings.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = 'settings.json';
            break;

        case 'webpack.mix.ejs':
            file_content = fs.readFileSync(file_path).toString();
            file_content = ejs.render(file_content, args);
            file_name = 'webpack.mix.js';
            break;

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
const resetPackage = (args) => {
    let remove_list = {
        'folders': [
            'src',
        ],
        'files': [
            'vaah-config.json',
            'composer.json',
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

/*
|--------------------------------------------------------------------------
| Get Package Config
|--------------------------------------------------------------------------
*/
const getPackageConfig = () => {
    let config = parseJsonFileContent('./vaah-config.json');

    return config;
};


/*
|--------------------------------------------------------------------------
| Get Package Config
|--------------------------------------------------------------------------
*/
const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
};


/*
|--------------------------------------------------------------------------
| Generate Laravel Files
|--------------------------------------------------------------------------
*/
const generateLaravelFiles = (type, file_name) => {

    var types = ["model", "view", "controller", "seed", "migration", "trait", "observer"];
    var exist = types.includes(type);


    if(!exist)
    {
        log.red("Unknown command type: `vaah lv:p-file "+type+" "+file_name+"`. Check for typos.");
        return false;
    }

    let vaah_config = getPackageConfig();
    vaah_config.name = file_name;
    log.red(globalFileSourcePath);

    let template_path  = globalFileSourcePath+"/skeletons/laravel";

    let des_path = "./";

    switch (type) {
        case 'model':
            file_content = fs.readFileSync(template_path+'/model.ejs').toString();
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'.php';
            des_path = './src/Entities/'+file_name;
            break;
        case 'view':
            file_content = fs.readFileSync(template_path+'/view.ejs').toString();
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'.blade.php';
            des_path = './src/Resources/views/'+file_name;
            break;
        case 'controller':
            file_content = fs.readFileSync(template_path+'/controller.ejs').toString();
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Controller.php';
            des_path = './src/Http/Controllers/'+file_name;
            break;
        case 'seed':
            file_content = fs.readFileSync(template_path+'/seed.ejs').toString();
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'TableSeeder.php';
            des_path = './src/Database/Seeders/'+file_name;
            break;
        case 'migration':

            table_name = vaah_config.name;
            table_name = replaceAll(table_name, "_", " ");
            table_name = titleCase(table_name);
            table_name = replaceAll(table_name, " ", "");
            vaah_config.class_name = table_name;

            table_name = replaceAll(vaah_config.name, "create_", "");
            table_name = replaceAll(table_name, "_table", "");

            vaah_config.table_name = table_name;

            file_content = fs.readFileSync(template_path+'/migration.ejs').toString();

            //log.red('class_name='+vaah_config.class_name);

            file_content = ejs.render(file_content, vaah_config);
            file_name = dateFormat(now, "yyyy_mm_dd_HHMMss_")+vaah_config.name+'.php';
            des_path = './src/Database/Migrations/'+file_name;

            break;

        case 'trait':

            file_content = fs.readFileSync(template_path+'/trait.ejs').toString();
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'.php';
            des_path = './src/Traits/'+file_name;

            break;

        case 'observer':

            file_content = fs.readFileSync(template_path+'/observer.ejs').toString();
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Observer.php';
            des_path = './src/Observers/'+file_name;

            break;

        default:
            log.red('Sorry, "'+type+'" command does not match with any of the available commands.');
    }



    log.green("Following file is generated:");
    log.green("=============================================================================");
    log.green(des_path);

    fsSync.write(des_path, file_content);

};


module.exports = { generatePackage, resetPackage, generateLaravelFiles, parseJsonFileContent };
