"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const log = console.log;
class Generator {
    constructor() {
        this.questions = {};
    }
    //-------------------------------------------------------
    getVaahCmsModuleQuestions() {
        this.questions = [
            {
                type: 'input',
                name: 'module_name',
                default: 'HelloWorld',
                message: 'Enter your module name: '
            },
            {
                type: 'input',
                name: 'title',
                default: 'Module for VaahCMS',
                message: 'Enter meaningful title for your module: '
            },
            {
                type: 'input',
                name: 'description',
                default: 'description',
                message: 'Enter your module description: '
            },
            {
                type: 'input',
                name: 'author_name',
                default: 'vaah',
                message: 'Enter Author name: '
            },
            {
                type: 'input',
                name: 'author_email',
                default: 'support@vaah.dev',
                message: 'Enter Author email: '
            },
            {
                type: 'input',
                name: 'author_website',
                default: 'https://vaah.dev',
                message: 'Enter author website: '
            },
            {
                type: 'input',
                name: 'download_link',
                default: '',
                message: 'Enter download url: '
            },
            {
                type: 'input',
                name: 'is_migratable',
                default: 'true',
                message: 'Do you want to run migration on activation (true/false): '
            },
            {
                type: 'input',
                name: 'has_sample_data',
                default: 'false',
                message: 'Will your module contains sample data (true/false): '
            }
        ];
        return this.questions;
    }
    //-------------------------------------------------------
    getVaahCmsThemeQuestions() {
        this.questions = [
            {
                type: 'input',
                name: 'theme_name',
                default: 'VaahTheme',
                message: 'Enter your theme name: '
            },
            {
                type: 'input',
                name: 'title',
                default: 'Theme for VaahCMS',
                message: 'Enter meaningful title for your theme: '
            },
            {
                type: 'input',
                name: 'description',
                default: 'description',
                message: 'Enter your theme description: '
            },
            {
                type: 'input',
                name: 'author_name',
                default: 'vaah',
                message: 'Enter Author name: '
            },
            {
                type: 'input',
                name: 'author_email',
                default: 'support@vaah.dev',
                message: 'Enter Author email: '
            },
            {
                type: 'input',
                name: 'author_website',
                default: 'https://vaah.dev',
                message: 'Enter author website: '
            },
            {
                type: 'input',
                name: 'download_link',
                default: '',
                message: 'Enter download url: '
            },
            {
                type: 'input',
                name: 'is_migratable',
                default: 'true',
                message: 'Do you want to run migration when activated (true/false): '
            },
            {
                type: 'input',
                name: 'has_sample_data',
                default: 'false',
                message: 'Will your theme contains sample data (true/false): '
            },
        ];
        return this.questions;
    }
    //-------------------------------------------------------
    getCmsCrudQuestions() {
        this.questions = [
            {
                type: 'input',
                name: 'namespace',
                default: 'WebReinvent\\VaahCms',
                message: 'Enter your namespace name: '
            },
            {
                type: 'input',
                name: 'model_name',
                default: 'Article',
                message: 'Enter your model name: '
            },
            {
                type: 'input',
                name: 'table_name',
                default: 'articles',
                message: 'Enter your table name: '
            },
            {
                type: 'input',
                name: 'controller_name',
                default: 'Articles',
                message: 'Enter your controller name: '
            },
        ];
        return this.questions;
    }
    //-------------------------------------------------------
    getModuleCrudQuestions() {
        this.questions = [
            {
                type: 'input',
                name: 'module_name',
                default: 'HelloWorld',
                message: 'Enter your module name: '
            },
            {
                type: 'input',
                name: 'model_name',
                default: 'Article',
                message: 'Enter your model name: '
            },
            {
                type: 'input',
                name: 'table_name',
                default: 'articles',
                message: 'Enter your table name: '
            },
            {
                type: 'input',
                name: 'controller_name',
                default: 'Articles',
                message: 'Enter your controller name: '
            },
        ];
        return this.questions;
    }
}
exports.default = Generator;
