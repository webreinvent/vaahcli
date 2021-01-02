"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let fsSync = require('fs-sync');
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
    setLowerAndUpperCaseValues() {
        if (Object.keys(this.args).length) {
            for (let key in this.args) {
                if (typeof this.inputs[key] === 'string') {
                    this.args[key + '_lower'] = this.args[key].toLowerCase();
                    this.args[key + '_upper'] = this.args[key].toUpperCase();
                }
            }
        }
        if (Object.keys(this.flags).length) {
            for (let key in this.flags) {
                if (typeof this.inputs[key] === 'string') {
                    this.flags[key + '_lower'] = this.flags[key].toLowerCase();
                    this.flags[key + '_upper'] = this.flags[key].toUpperCase();
                }
            }
        }
        if (Object.keys(this.inputs).length) {
            for (let key in this.inputs) {
                if (typeof this.inputs[key] === 'string') {
                    this.inputs[key + '_lower'] = this.inputs[key].toLowerCase();
                    this.inputs[key + '_upper'] = this.inputs[key].toUpperCase();
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
}
exports.default = Generator;
