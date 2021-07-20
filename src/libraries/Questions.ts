const chalk = require('chalk');
const log = console.log;

export default class Generator {

  questions: {[k: string]: any} = {};


  constructor() {

  }

  //-------------------------------------------------------

  getVaahCmsModuleQuestions()
  {

    this.questions = [
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
        message : 'Do you want to run migration on activation (true/false): '
      },
      {
        type : 'input',
        name : 'has_sample_data',
        default: 'false',
        message : 'Will your module contains sample data (true/false): '
      }

    ];

    return this.questions;

  }

  //-------------------------------------------------------
  getVaahCmsThemeQuestions()
  {

    this.questions = [
      {
        type : 'input',
        name : 'theme_name',
        default: 'VaahTheme',
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

    return this.questions;

  }

  //-------------------------------------------------------
  getCmsCrudQuestions()
  {

    this.questions =  [
      {
        type : 'input',
        name : 'namespace',
        default: 'WebReinvent\\VaahCms',
        message : 'Enter your namespace name: '
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


    return this.questions;

  }
  //-------------------------------------------------------
  getModuleCrudQuestions()
  {

    this.questions =  [
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


    return this.questions;

  }
  //-------------------------------------------------------
  getCrudQuestions()
  {

    this.questions =  [
      {
        type : 'list',
        name : 'for',
        default: 'Module',
        message : 'For which you want to create CRUD: ',
        choices: ["Module", "Theme"],
      },
      {
        type : 'input',
        name : 'folder_name',
        default: 'HelloWorld',
        message : 'Enter the Module/Theme folder name: '
      },
      {
        type : 'input',
        name : 'section_name',
        default: 'Backend',
        message : 'Enter the section name (Backend | Frontend or Folder name): '
      },
      {
        type : 'input',
        name : 'vue_folder_name',
        default: 'Vue',
        message : 'Vue folder name: '
      },
      {
        type : 'input',
        name : 'table_name',
        default: 'articles',
        message : 'Enter your database table name: '
      },
      {
        type : 'input',
        name : 'model_name',
        default: 'Article',
        message : 'Enter your model name (singular): '
      },
      {
        type : 'input',
        name : 'controller_name',
        default: 'Articles',
        message : 'Enter your controller name (plural): '
      },
    ];


    return this.questions;

  }
  //-------------------------------------------------------
  getAuthQuestions()
  {

    this.questions =  [
      {
        type : 'input',
        name : 'theme_name',
        default: 'HelloWorld',
        message : 'Enter the Theme folder name: '
      }
    ];


    return this.questions;

  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------



}
