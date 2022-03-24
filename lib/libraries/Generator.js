"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let fsSync = require('fs-sync');
let dateFormat = require('dateformat');
const log = console.log;
class Generator {
    constructor(args, flags, inputs, skeleton_dir, target_dir) {
        this.args = {};
        this.flags = {};
        this.inputs = {};
        this.args = args;
        this.flags = flags;
        this.inputs = inputs;
        this.skeleton_dir = skeleton_dir;
        this.target_dir = target_dir;
        this.setLowerAndUpperCaseValues();
    }
    //-------------------------------------------------------
    lowerCase(str) {
        return str.toLowerCase();
    }
    //-------------------------------------------------------
    upperCase(str) {
        return str.toUpperCase();
    }
    //-------------------------------------------------------
    removeNonWord(str) {
        return str.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, "");
    }
    //-------------------------------------------------------
    replaceAccents(str) {
        // verifies if the String has accents and replace them
        if (str.search(/[\xC0-\xFF]/g) > -1) {
            str = str
                .replace(/[\xC0-\xC5]/g, "A")
                .replace(/[\xC6]/g, "AE")
                .replace(/[\xC7]/g, "C")
                .replace(/[\xC8-\xCB]/g, "E")
                .replace(/[\xCC-\xCF]/g, "I")
                .replace(/[\xD0]/g, "D")
                .replace(/[\xD1]/g, "N")
                .replace(/[\xD2-\xD6\xD8]/g, "O")
                .replace(/[\xD9-\xDC]/g, "U")
                .replace(/[\xDD]/g, "Y")
                .replace(/[\xDE]/g, "P")
                .replace(/[\xE0-\xE5]/g, "a")
                .replace(/[\xE6]/g, "ae")
                .replace(/[\xE7]/g, "c")
                .replace(/[\xE8-\xEB]/g, "e")
                .replace(/[\xEC-\xEF]/g, "i")
                .replace(/[\xF1]/g, "n")
                .replace(/[\xF2-\xF6\xF8]/g, "o")
                .replace(/[\xF9-\xFC]/g, "u")
                .replace(/[\xFE]/g, "p")
                .replace(/[\xFD\xFF]/g, "y");
        }
        return str;
    }
    //-------------------------------------------------------
    toCamelCase(str) {
        str = this.replaceAccents(str);
        str = this.removeNonWord(str)
            .replace(/\-/g, " ") //convert all hyphens to spaces
            .replace(/\s[a-z]/g, this.upperCase) //convert first char of each word to UPPERCASE
            .replace(/\s+/g, "") //remove spaces
            .replace(/^[A-Z]/g, this.lowerCase); //convert first char to lowercase
        return str;
    }
    //-------------------------------------------------------
    /**
     * camelCase + UPPERCASE first char
     */
    toPascalCase(str) {
        str = str.replace("_", " ");
        str = str.replace("-", " ");
        return this.toCamelCase(str).replace(/^[a-z]/, this.upperCase);
    }
    //-------------------------------------------------------
    setLowerAndUpperCaseValues() {
        if (Object.keys(this.args).length) {
            for (let key in this.args) {
                if (typeof this.inputs[key] === 'string') {
                    this.args[key + '_lower'] = this.args[key].toLowerCase();
                    this.args[key + '_upper'] = this.args[key].toUpperCase();
                    this.args[key + '_pascal'] = this.toPascalCase(this.args[key]);
                }
            }
        }
        if (Object.keys(this.flags).length) {
            for (let key in this.flags) {
                if (typeof this.inputs[key] === 'string') {
                    this.flags[key + '_lower'] = this.flags[key].toLowerCase();
                    this.flags[key + '_upper'] = this.flags[key].toUpperCase();
                    this.flags[key + '_pascal'] = this.toPascalCase(this.flags[key]);
                }
            }
        }
        if (Object.keys(this.inputs).length) {
            for (let key in this.inputs) {
                if (typeof this.inputs[key] === 'string') {
                    this.inputs[key + '_lower'] = this.inputs[key].toLowerCase();
                    this.inputs[key + '_upper'] = this.inputs[key].toUpperCase();
                    this.inputs[key + '_pascal'] = this.toPascalCase(this.inputs[key]);
                }
            }
        }
    }
    //-------------------------------------------------------
    scanRecursiveFiles(dir, files = []) {
        fs.readdirSync(dir).forEach((file) => {
            //let fullPath = path.join(dir, file);
            let fullPath = path.join(dir, file);
            //console.log('--->', fullPath);
            let short_path = fullPath.split("skeletons");
            let file_path;
            if (short_path[1]) {
                file_path = short_path[1];
            }
            if (fs.lstatSync(fullPath).isDirectory()) {
                this.scanRecursiveFiles(fullPath, files);
            }
            else {
                files.push(file_path);
            }
        });
        return files;
    }
    //-------------------------------------------------------
    getFilesFromSkeletonDirector() {
        let template_path = __dirname + '/../../' + this.skeleton_dir;
        let files_list = [];
        files_list = this.scanRecursiveFiles(template_path, files_list);
        return files_list;
    }
    ;
    //-------------------------------------------------------
    files() {
        /*
            log(chalk.red(`===ARG===`));
            log(this.args);
        
        
            log(chalk.green(`===FLAGS===`));
            log(this.flags);
        
        
            log(chalk.blue(`===INPUTS===`));
            log(this.inputs);
        */
        let get_files = this.getFilesFromSkeletonDirector();
        //console.log('--->', get_files);
        let self = this;
        get_files.forEach(function (file) {
            self.copyFilesToDestination(file);
        });
    }
    //-------------------------------------------------------
    file() {
        /*    log(chalk.red(`===ARG===`));
            log(this.args);
        
        
            log(chalk.green(`===FLAGS===`));
            log(this.flags);
        
        
            log(chalk.blue(`===INPUTS===`));
            log(this.inputs);*/
        let file_path = __dirname + "/../.." + this.skeleton_dir + this.args.type + '.php.ejs';
        let file_content = fs.readFileSync(file_path).toString();
        let parsed_file_content = ejs.render(file_content, this.inputs);
        let file_name = this.inputs['name'] + ".php";
        if (this.inputs['file_name']) {
            file_name = this.inputs['file_name'];
        }
        let destination = this.target_dir + '/' + file_name;
        fsSync.write(destination, parsed_file_content);
        log(chalk.green(destination));
    }
    //-------------------------------------------------------
    getFileDestination(file_path) {
        //let file_name = path.basename(file_path);
        let destination = '';
        let replace_path = this.skeleton_dir.replace('\\skeletons\\', '');
        destination = file_path.replace(replace_path, "");
        destination = this.target_dir + '/' + destination;
        return destination;
    }
    //-------------------------------------------------------
    copyFilesToDestination(file_path) {
        //console.log('--->', file_path);
        let destination = this.getFileDestination(file_path);
        let file_readable_path = __dirname + "./../../skeletons/" + file_path;
        let file_content = fs.readFileSync(file_readable_path).toString();
        let parsed_file_content = ejs.render(file_content, this.inputs);
        destination = destination.replace('.ejs', "");
        let file_name = path.basename(destination);
        if (file_name == 'ServiceProvider.php') {
            destination = destination.replace('ServiceProvider.php', this.inputs['service_provider_name']);
        }
        fsSync.write(destination, parsed_file_content);
        log(chalk.green(destination));
    }
    //-------------------------------------------------------
    copyCrudFilesToDestination(file_path) {
        let destination = this.getFileDestination(file_path);
        let file_readable_path = __dirname + "./../../skeletons/" + file_path;
        let file_content = fs.readFileSync(file_readable_path).toString();
        let parsed_file_content = ejs.render(file_content, this.inputs);
        destination = destination.replace('.ejs', "");
        let file_name = path.basename(destination);
        if (file_name == 'Model.php') {
            destination = destination.replace('Model', this.inputs['model_name']);
        }
        if (file_name == 'Controller.php') {
            destination = destination.replace('Controller.php', this.inputs['controller_name'] + 'Controller.php');
        }
        if (file_name == 'routes-template.php') {
            destination = destination.replace('routes-template', this.inputs['table_name']);
        }
        if (file_name == 'vue-routes-template.js') {
            destination = destination.replace('vue-routes-template', 'routes-' + this.inputs['table_name']);
        }
        if (file_name == 'store-template.js') {
            destination = destination.replace('store-template', 'store-' + this.inputs['table_name']);
        }
        destination = destination.replace('Vue\\pages\\template', 'Vue\\pages\\' + this.inputs['table_name']);
        fsSync.write(destination, parsed_file_content);
        log(chalk.green(destination));
    }
    //-------------------------------------------------------
    curdFiles() {
        /*
            log(chalk.red(`===ARG===`));
            log(this.args);
    
    
            log(chalk.green(`===FLAGS===`));
            log(this.flags);
    
    
            log(chalk.blue(`===INPUTS===`));
            log(this.inputs);
        */
        let get_files = this.getFilesFromSkeletonDirector();
        //console.log('--->', get_files);
        let self = this;
        get_files.forEach(function (file) {
            self.copyCrudFilesToDestination(file);
        });
    }
    //-------------------------------------------------------
    getDateTimeForMigrationFile() {
        let now = new Date();
        return dateFormat(now, "yyyy_mm_dd_HHMMss_");
    }
    //-------------------------------------------------------
    generateCrudFiles() {
        let get_files = this.getFilesFromSkeletonDirector();
        let destination = null;
        let file_readable_path = null;
        let file_content = null;
        let parsed_file_content = null;
        let file_name = null;
        this.inputs['url'] = '';
        if (this.inputs['section_name_lower'] != 'frontend') {
            this.inputs['url'] = this.inputs['section_name_lower'] + '/';
        }
        get_files.forEach((file_path) => {
            //log("Source file--> "+chalk.green(file_path));
            //-- destination path
            destination = this.getFileDestination(file_path);
            file_readable_path = __dirname + "./../../skeletons/" + file_path;
            file_content = fs.readFileSync(file_readable_path).toString();
            this.inputs['for_name'] = this.inputs.for;
            parsed_file_content = ejs.render(file_content, this.inputs);
            destination = destination.replace('.ejs', "");
            file_name = path.basename(destination);
            if (this.inputs['generate_migration'] === 'false' && file_name === 'migration-template.php') {
                return;
            }
            switch (file_name) {
                case 'Model.php':
                    destination = destination.replace('Model.php', this.inputs['model_name'] + '.php');
                    break;
                case 'Controller.php':
                    destination = destination.replace('Controller.php', this.inputs['controller_name'] + 'Controller.php');
                    destination = destination.replace('Controllers', 'Controllers/' + this.inputs['section_name']);
                    break;
                case 'routes-template.php':
                    destination = destination.replace('template.php', this.inputs['controller_name_lower'] + '.php');
                    destination = destination.replace('backend', this.inputs['section_name_lower']);
                    break;
                case 'api-routes-template.php':
                    destination = destination.replace('template.php', this.inputs['controller_name_lower'] + '.php');
                    break;
                case 'List.vue':
                case 'ListJs.js':
                case 'ListTable.vue':
                case 'ListTableJs.js':
                case 'Form.vue':
                case 'FormJs.js':
                case 'View.vue':
                case 'ViewJs.js':
                    destination = destination.replace('template', this.inputs['controller_name_lower']);
                    destination = destination.replace('Vue', this.inputs['vue_folder_name']);
                    break;
                case 'vue-routes-template.js':
                    destination = destination.replace('template.js', this.inputs['controller_name_lower'] + '.js');
                    destination = destination.replace('Vue', this.inputs['vue_folder_name']);
                    break;
                case 'store-template.js':
                    destination = destination.replace('template.js', this.inputs['controller_name_lower'] + '.js');
                    destination = destination.replace('Vue', this.inputs['vue_folder_name']);
                    break;
                case 'migration-template.php':
                    destination = destination.replace('migration-template.php', this.getDateTimeForMigrationFile() + this.inputs['table_name_lower'] + '.php');
                    break;
            }
            fsSync.write(destination, parsed_file_content);
            log(chalk.green(destination));
        });
    }
    //-------------------------------------------------------
    generateAuthFiles() {
        let get_files = this.getFilesFromSkeletonDirector();
        let destination = null;
        let file_readable_path = null;
        let file_content = null;
        let parsed_file_content = null;
        let file_name = null;
        get_files.forEach((file_path) => {
            //log("Source file--> "+chalk.green(file_path));
            //-- destination path
            destination = this.getFileDestination(file_path);
            file_readable_path = __dirname + "./../../skeletons/" + file_path;
            file_content = fs.readFileSync(file_readable_path).toString();
            parsed_file_content = ejs.render(file_content, this.inputs);
            destination = destination.replace('.ejs', "");
            file_name = path.basename(destination);
            switch (file_name) {
                case 'User.php':
                    destination = destination.replace('User.php', this.inputs['theme_name'] + 'User.php');
                    break;
                case 'Registration.php':
                    destination = destination.replace('Registration.php', this.inputs['theme_name'] + 'Registration.php');
                    break;
            }
            fsSync.write(destination, parsed_file_content);
            log(chalk.green(destination));
        });
    }
}
exports.default = Generator;
