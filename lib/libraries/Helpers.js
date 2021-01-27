"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let fsSync = require('fs-sync');
var dateFormat = require('dateformat');
const log = console.log;
class Helpers {
    constructor(args, flags, inputs) {
        this.args = {};
        this.flags = {};
        this.inputs = {};
        this.args = args;
        this.flags = flags;
        this.inputs = inputs;
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
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    //-------------------------------------------------------
    titleCase(str) {
        let wordsArray = str.toLowerCase().split(/\s+/);
        let upperCased = wordsArray.map(function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1);
        });
        return upperCased.join(" ");
    }
    //-------------------------------------------------------
    getClassName(str) {
        let class_name = '';
        class_name = str;
        class_name = this.replaceAll(class_name, "_", " ");
        class_name = this.titleCase(class_name);
        class_name = this.replaceAll(class_name, " ", "");
        return class_name;
    }
    //-------------------------------------------------------
    getMigrationFileName(str) {
        var now = new Date();
        let name = dateFormat(now, "yyyy_mm_dd_HHMMss_") + str;
        name = this.replaceAll(name, " ", "_");
        name = name.toLowerCase();
        name = name + '_table.php';
        return name;
    }
    //-------------------------------------------------------
    getMigrationTableName(str) {
        let name = '';
        name = str.toLowerCase();
        name = this.replaceAll(name, " ", '_');
        return name;
    }
    //-------------------------------------------------------
    getDerivedVariables() {
        let params = {
            namespace: '',
            target_dir: '',
            table_name: '',
            class_name: '',
            file_name: '',
        };
        let namespace = 'VaahCms';
        let target_dir = './VaahCms/';
        switch (this.inputs.for) {
            case 'module':
                namespace = namespace + '\\Modules\\' + this.args.module;
                target_dir = target_dir + 'Modules/' + this.args.module;
                break;
            case 'theme':
                namespace = namespace + '\\Themes\\' + this.args.theme;
                target_dir = target_dir + 'Themes/' + this.args.theme;
                break;
        }
        switch (this.args.type) {
            case 'migration':
                target_dir = target_dir + '/Database/Migrations';
                params.file_name = this.getMigrationFileName(this.args.name);
                params.class_name = this.getClassName(this.args.name);
                params.table_name = this.getMigrationTableName(this.args.name);
                break;
            case 'seed':
                namespace = namespace + '\\Database\\Seeders';
                target_dir = target_dir + '/Database/Seeders';
                params.file_name = this.args.name + 'TableSeeder.php';
                break;
            case 'model':
                namespace = namespace + '\\Models';
                target_dir = target_dir + '/Models';
                break;
            case 'controller':
                params.file_name = this.args.name + 'Controller.php';
                namespace = namespace + '\\Http\\Controllers';
                target_dir = target_dir + '/Http/Controllers';
                if (this.flags.frontend) {
                    namespace = namespace + '\\Frontend';
                    target_dir = target_dir + '/Frontend';
                }
                else if (this.flags.backend) {
                    namespace = namespace + '\\Backend';
                    target_dir = target_dir + '/Backend';
                }
                break;
            case 'middleware':
                namespace = namespace + '\\Http\\Middleware';
                target_dir = target_dir + '/Http/Middleware';
                break;
            case 'observer':
                params.file_name = this.args.name + 'Observer.php';
                namespace = namespace + '\\Observers';
                target_dir = target_dir + '/Observers';
                break;
            case 'trait':
                namespace = namespace + '\\Traits';
                target_dir = target_dir + '/Traits';
                break;
            case 'test':
                namespace = namespace + '\\Tests';
                target_dir = target_dir + '/Tests';
                break;
            case 'event':
                namespace = namespace + '\\Events';
                target_dir = target_dir + '/Events';
                break;
            case 'listener':
                params.file_name = this.args.name + 'Listener.php';
                namespace = namespace + '\\Listeners';
                target_dir = target_dir + '/Listeners';
                break;
            case 'mail':
                params.file_name = this.args.name + 'Mail.php';
                namespace = namespace + '\\Mails';
                target_dir = target_dir + '/Mails';
                break;
            case 'notification':
                params.file_name = this.args.name + 'Notification.php';
                namespace = namespace + '\\Notifications';
                target_dir = target_dir + '/Notifications';
                break;
            case 'view':
                params.file_name = this.args.name + '.blade.php';
                target_dir = target_dir + '/Resources/views';
                if (this.flags.frontend) {
                    target_dir = target_dir + '/frontend/pages';
                }
                else if (this.flags.backend) {
                    target_dir = target_dir + '/backend/pages';
                }
                break;
        }
        params.namespace = namespace;
        params.target_dir = target_dir;
        return params;
    }
}
exports.default = Helpers;