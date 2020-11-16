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
            name : 'title',
            default: 'Module for VaahCMS',
            message : 'Enter meaningful title for your module: '
        },
        {
            type : 'input',
            name : 'description',
            default: 'description',
            message : 'Enter your module description: '
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
            message : 'Will your module contains sample data (true/false): '
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
    args.namespace = args.vendor_name+'\\Modules\\'+args.module_name;
    args.year = dateFormat(now, 'yyyy');

    generateConfig(args);
    getPackageFiles(args);

    console.info('success | vendor: '+args.vendor_name+" package: "+args.module_name);

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
const getDestinationPath =  (file_path, args) => {

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


const resetModule = (module_name) => {

    let folder = './VaahCms/Modules/'+module_name;

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
const generateModuleFiles = (type, module_name, file_name, folder) => {

/*
    console.log('file_type-->', type);
    console.log('test-->', module_name);
    console.log('test-->', file_name);
    console.log('test-->', file_name);

*/

    let folder_namespace;
    let folder_path;

    if(!folder)
    {
        log.green('Type='+type+" | Module="+module_name+" | Name="+file_name);
        folder_namespace = folder;
        folder_path = folder;
    } else
    {
        log.green('Type='+type+" | Module="+module_name+" | Name="+file_name+" | Folder="+folder);
        folder_namespace = "\\"+folder;
        folder_path = folder+"/";
    }


    var types = ["model", "view", "controller", "middleware",
        "seed", "migration", "trait", "test",
        "event", "listener", "observer",
        "mail", "notification"
    ];
    var exist = types.includes(type);


    if(!exist)
    {
        log.red("Unknown command type: `vaah cms:m:make "+type+" "+module_name+" "+file_name+"`. Check for typos.");
        return false;
    }


    let namespace = "VaahCms\\Modules\\"+module_name;
    vaah_config = {
        name:file_name,
        name_lower:file_name.toLowerCase(),
        module_name:module_name,
        module_name_lower:module_name.toLowerCase(),
        namespace: namespace
    };

    let des_path = "./VaahCms/Modules/"+module_name;

    log.red(globalFileSourcePath);

    let template_path  = globalFileSourcePath+"/skeletons/vaahcms/module-files";


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
            vaah_config.namespace += "\\Observers"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Observer.php';
            des_path = des_path+'/Observers/'+folder_path+file_name;

            break;

        case 'event':

            file_content = fs.readFileSync(template_path+'/event.ejs').toString();
            vaah_config.namespace += "\\Events"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Event.php';
            des_path = des_path+'/Events/'+folder_path+file_name;

            break;

        case 'listener':

            file_content = fs.readFileSync(template_path+'/listener.ejs').toString();
            vaah_config.namespace += "\\Listeners"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Listener.php';
            des_path = des_path+'/Listeners/'+folder_path+file_name;

            break;

        case 'mail':

            file_content_email = fs.readFileSync(template_path+'/mailEmail.ejs').toString();
            file_name_email = vaah_config.name_lower+'.blade.php';
            des_path_email = des_path+'/Resources/views/emails/'+file_name_email;
            fsSync.write(des_path_email, file_content_email);

            file_content = fs.readFileSync(template_path+'/mail.ejs').toString();
            vaah_config.namespace += "\\Mails"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Email.php';
            des_path = des_path+'/Mails/'+folder_path+file_name;

            break;

        case 'notification':

            file_content = fs.readFileSync(template_path+'/notification.ejs').toString();
            vaah_config.namespace += "\\Notifications"+folder_namespace;
            file_content = ejs.render(file_content, vaah_config);
            file_name = vaah_config.name+'Notification.php';
            des_path = des_path+'/Notifications/'+folder_path+file_name;

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


module.exports = {getQuestions, generatePackage, resetModule, generateModuleFiles, parseJsonFileContent };
