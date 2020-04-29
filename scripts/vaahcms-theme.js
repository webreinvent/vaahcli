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
            name : 'theme_name',
            default: 'Example',
            message : 'Enter your theme name: '
        },
        {
            type : 'input',
            name : 'title',
            default: 'Theme for VaahCMS',
            message : 'Enter meaningful title for your theme: '
        },
        {
            type : 'input',
            name : 'description',
            default: 'description',
            message : 'Enter your theme description: '
        },
        {
            type : 'input',
            name : 'author_name',
            default: 'vaah',
            message : 'Enter Author name: '
        },
        {
            type : 'input',
            name : 'author_email',
            default: 'support@vaah.dev',
            message : 'Enter Author email: '
        },
        {
            type : 'input',
            name : 'author_website',
            default: 'https://vaah.dev',
            message : 'Enter author website: '
        },
        {
            type : 'input',
            name : 'download_link',
            default: '',
            message : 'Enter download url: '
        },
        {
            type : 'input',
            name : 'is_migratable',
            default: 'true',
            message : 'Do you want to run migration when activated (true/false): '
        },
        {
            type : 'input',
            name : 'has_sample_data',
            default: 'false',
            message : 'Will your theme contains sample data (true/false): '
        },

    ];

    return questions;
};


const getNamespace = function (args) {
    return 'VaahCms\\Themes\\'+args.theme_name;
};

/*
|--------------------------------------------------------------------------
| Generate VaahCms Theme
|--------------------------------------------------------------------------
*/
const generatePackage = (args, getNamespace) => {

    args.vendor_name = 'VaahCms';

    args.vendor_name_lower = args.vendor_name.toLowerCase();
    args.theme_name_lower = args.theme_name.toLowerCase();
    args.namespace = args.vendor_name+'\\Themes\\'+args.theme_name;
    args.year = dateFormat(now, 'yyyy');

    generateConfig(args);
    getPackageFiles(args);

    console.info('success | vendor: '+args.vendor_name+" package: "+args.theme_name);

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
| Get Theme Files List
|--------------------------------------------------------------------------
*/
const getPackageFiles =  (args) => {

    let template_path = globalFileSourcePath+'/skeletons/vaahcms/theme';

    console.log(template_path);

    let files_list = [];
    files_list = scanFiles(template_path, files_list);

    log.green('Theme Name='+args.theme_name+" | Namespace="+args.namespace);
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
const getDestinationPath =  (file_path, args) => {

    //log.yellow('file path-->'+file_path);
    let replace_path;

    if(globalAppEnv == 'dev')
    {
        replace_path = "skeletons\\vaahcms\\theme\\";
    } else
    {
        replace_path = globalFileSourcePath+"\\skeletons\\vaahcms\\theme\\";
    }

    //log.red('replace path-->'+replace_path);

    let file_name = path.basename(file_path);
    let destination = file_path.replace(replace_path, "");
    destination = "./VaahCms/Themes/"+args.theme_name+"/"+destination.replace(file_name, "");

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

    switch(file_name) {
        case 'app.ejs':
        case 'app-routes.ejs':
        case 'app-store.ejs':
            file_name = file_name_only+'.js';
            break;

        case 'TopMenu.ejs':
            file_name = file_name_only+'.vue';
            break;

        case 'TopMenuJs.ejs':
            file_name = file_name_only+'.js';
            break;

        case 'Dashboard.ejs':
            file_name = file_name_only+'.vue';
            break;

        case 'DashboardJs.ejs':
            file_name = file_name_only+'.js';
            break;

        case '.gitignore.ejs':
            file_name = '.gitignore';
            break;

        case 'composer.ejs':
            file_name = 'composer.json';
            break;

        case 'package.ejs':
            file_name = 'package.json';
            break;

        case 'README.ejs':
            file_name = 'README.md';
            break;

        case 'settings.ejs':
            file_name = 'settings.json';
            break;

        case 'webpack.mix.ejs':
            file_name = 'webpack.mix.js';
            break;

        case '.gitkeep':
            file_name = '.gitkeep';
            break;

        case 'ServiceProvider.ejs':
            file_name = args.theme_name+'ServiceProvider.php';
            break;

        default:
            file_name = file_name_only+'.php';
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


const resetTheme = (theme_name) => {

    let folder = './VaahCms/Themes/'+theme_name;

    let remove_list = {
        'folders': [
            folder,
        ],
    };

    log.red("Following folders and files are deleted:");
    log.red("===============================================");

    remove_list.folders.forEach(function(item) {
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
const generateThemeFiles = (type, theme_name, file_name, folder) => {


    let folder_namespace;
    let folder_path;

    if(!folder)
    {
        log.green('Type='+type+" | Theme="+theme_name+" | Name="+file_name);
        folder_namespace = folder;
        folder_path = folder;
    } else
    {
        log.green('Type='+type+" | Theme="+theme_name+" | Name="+file_name+" | Folder="+folder);
        folder_namespace = "\\"+folder;
        folder_path = folder+"/";
    }


    var types = ["model", "view", "controller", "middleware",
        "seed", "migration", "trait", "test", "observer"];
    var exist = types.includes(type);


    if(!exist)
    {
        log.red("Unknown command type: `vaah cms:t:make "+type+" "+theme_name+" "+file_name+"`. Check for typos.");
        return false;
    }


    let namespace = "VaahCms\\Themes\\"+theme_name;

    vaah_config = {
        name:file_name,
        name_lower:file_name.toLowerCase(),
        theme_name:theme_name,
        theme_name_lower: theme_name.toLowerCase(),
        namespace: namespace
    };

    let des_path = "./VaahCms/Themes/"+theme_name;

    //log.red(globalFileSourcePath);

    let template_path  = globalFileSourcePath+"/skeletons/vaahcms/theme-files";


    switch (type) {
        case 'model':
            console.log('test-->');
            file_content = fs.readFileSync(template_path+'/model.ejs').toString();
            vaah_config.namespace += "\\Entities"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'.php';
            des_path = des_path+'/Entities/'+folder_path+file_name;
            break;
        case 'view':
            file_content = fs.readFileSync(template_path+'/view.ejs').toString();
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'.blade.php';
            des_path = des_path+'/Resources/views/'+folder_path+file_name;
            break;
        case 'controller':
            file_content = fs.readFileSync(template_path+'/controller.ejs').toString();
            vaah_config.namespace += "\\Http\\Controllers"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Controller.php';
            des_path = des_path+'/Http/Controllers/'+folder_path+file_name;
            break;

        case 'middleware':
            file_content = fs.readFileSync(template_path+'/middleware.ejs').toString();
            vaah_config.namespace += "\\Http\\Middleware"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'.php';
            des_path = des_path+'/Http/Middleware/'+folder_path+file_name;
            break;

        case 'seed':
            file_content = fs.readFileSync(template_path+'/seed.ejs').toString();
            vaah_config.namespace += "\\Database\\Seeds"+folder_namespace;

            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'TableSeeder.php';
            des_path = des_path+'/Database/Seeds/'+folder_path+file_name;
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
            des_path = des_path+'/Database/Migrations/'+folder_path+file_name;

            break;

        case 'trait':

            file_content = fs.readFileSync(template_path+'/trait.ejs').toString();
            vaah_config.namespace += "\\Traits"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'.php';
            des_path = des_path+'/Traits/'+folder_path+file_name;

            break;

        case 'observer':

            file_content = fs.readFileSync(template_path+'/observer.ejs').toString();
            vaah_config.namespace += "\\Observers\\"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Observer.php';
            des_path = des_path+'/Observers/'+folder_path+file_name;

            break;

        case 'test':

            file_content = fs.readFileSync(template_path+'/test.ejs').toString();
            vaah_config.namespace += "\\Tests\\Browser"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Test.php';
            des_path = des_path+'/Tests/Browser/'+folder_path+file_name;

            break;

        default:
            log.red('Sorry, "'+type+'" command does not match with any of the available commands.');
    }



    log.green("Following file is generated:");
    log.green("=============================================================================");
    log.green(des_path);

    fsSync.write(des_path, file_content);

};


module.exports = {getQuestions, generatePackage, resetTheme, generateThemeFiles, parseJsonFileContent };
