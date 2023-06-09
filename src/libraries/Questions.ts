import PromptUI = require('inquirer/lib/ui/prompt')

const chalk = require('chalk');
const log = console.log;

export default class Generator {

  questions: {[k: string]: any} = {};


  constructor() {

  }

  //-------------------------------------------------------
  getVaahCmsVersions()
  {

    this.questions = [
      {
        type : 'list',
        name : 'version',
        default: null,
        message : 'Select the VaahCMS version:',
        choices: ["VaahCMS 2.x", "VaahCMS 1.x"],
      },

    ];

    return this.questions;

  }
  //-------------------------------------------------------

  getVaahCmsModuleQuestions()
  {

    this.questions = [
      {
        type : 'list',
        name : 'module-type',
        default: 'Module - Vue3 & PrimeVue',
        message : 'Choose the tech stack of the module: ',
        choices: ["Module - Vue3 & PrimeVue", "Module - Vue2 & Buefy"],
      },
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
      },
      {
        type : 'input',
        name : 'is_using_vue',
        default: 'true',
        message : 'Do you want to vue in this module (true/false): '
      },

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
  getCrudQuestionsPrimary()
  {
    this.questions =  [
      {
        type : 'list',
        name : 'for',
        default: 'Module',
        message : 'For which you want to create CRUD: ',
        choices: ["Module - Vue3 & PrimeVue", "Module - Vue2 & Buefy", "Theme", "Custom Path - Vue3 & PrimeVue"],
      },

    ];


    return this.questions;
  }
  //-------------------------------------------------------
  getTaxonomyQuestionsPrimary()
  {
    this.questions =  [
      {
        type : 'list',
        name : 'for',
        default: 'Module',
        message : 'For which you want to create CRUD: ',
        choices: ["Module", "Theme", "Custom Path"],
      },

    ];


    return this.questions;
  }
  //-------------------------------------------------------
  getUserQuestionsPrimary()
  {
    this.questions =  [
      {
        type : 'list',
        name : 'for',
        default: 'Module',
        message : 'For which you want to create CRUD: ',
        choices: ["Module", "Theme", "Custom Path"],
      },

    ];


    return this.questions;
  }
  //-------------------------------------------------------
  getCrudQuestions(primary: string)
  {

    this.questions = [];


    if(primary === 'Custom Path - Vue3 & PrimeVue')
    {
      this.questions.push({
          type : 'input',
          name : 'path',
          default: './custom',
          message : 'Directory Path'
        },
        {
          type : 'input',
          name : 'namespace',
          default: 'WebReinvent\\\\VaahCms',
          message : 'Enter the namespace'
        },
        {
          type : 'input',
          name : 'folder_name',
          default: 'Vaah',
          message : 'Enter the Module/Theme/Entity name: '
        },
        )
    } else{
      this.questions.push(
        {
          type : 'input',
          name : 'folder_name',
          default: 'HelloWorld',
          message : 'Enter the Module/Theme/Entity name: '
        },);
    }

    this.questions.push(
      {
        type : 'input',
        name : 'section_name',
        default: 'Backend',
        message : 'Enter the section name (Backend | Frontend or Folder name): '
      },)

    if(primary === 'Custom Path - Vue3 & PrimeVue') {
      this.questions.push(
        {
          type : 'input',
          name : 'vue_folder_name',
          default: 'Vue/vaahtwo',
          message : 'Vue folder name/path: '
        },)
    } else{
      this.questions.push(
        {
          type : 'input',
          name : 'vue_folder_name',
          default: 'Vue',
          message : 'Vue folder name/path: '
        },)
    }

    this.questions.push(
      {
        type : 'input',
        name : 'table_name',
        default: 'articles',
        message : 'Enter your database table name: '
      },
      {
        type : 'input',
        name : 'generate_migration',
        default: 'true',
        message : 'Do you want to generate migration file (true/false): '
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
      },);


    return this.questions;

  }
  //-------------------------------------------------------
  getUserQuestions(primary: string)
  {

    this.questions = [];


    if(primary === 'Custom Path')
    {
      this.questions.push({
          type : 'input',
          name : 'path',
          default: './custom',
          message : 'Directory Path'
        },
        {
          type : 'input',
          name : 'namespace',
          default: 'WebReinvent\\\\VaahCms',
          message : 'Enter the namespace'
        },
        {
          type : 'input',
          name : 'folder_name',
          default: 'Vaah',
          message : 'Enter the Module/Theme/Entity name: '
        },
      )
    } else{
      this.questions.push(
        {
          type : 'input',
          name : 'folder_name',
          default: 'HelloWorld',
          message : 'Enter the Module/Theme/Entity name: '
        },);
    }

    this.questions.push(
      {
        type : 'input',
        name : 'section_name',
        default: 'Backend',
        message : 'Enter the section name (Backend | Frontend or Folder name): '
      },)


    if(primary === 'Custom Path') {
      this.questions.push(
        {
          type : 'input',
          name : 'vue_folder_name',
          default: 'Vue/vaahtwo',
          message : 'Vue folder name/path: '
        },)
    } else{
      this.questions.push(
        {
          type : 'input',
          name : 'vue_folder_name',
          default: 'Vue',
          message : 'Vue folder name/path: '
        },)
    }

    this.questions.push(
      {
        type : 'input',
        name : 'model_name',
        default: 'User',
        message : 'Enter your model name (singular): '
      },
      {
        type : 'input',
        name : 'controller_name',
        default: 'Users',
        message : 'Enter your controller name (plural): '
      },);


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
  getTaxonomyQuestions(primary: string)
  {

    this.questions = [];


    if(primary === 'Custom Path')
    {
      this.questions.push({
          type : 'input',
          name : 'path',
          default: './custom',
          message : 'Directory Path'
        },
        {
          type : 'input',
          name : 'namespace',
          default: 'WebReinvent\\\\VaahCms',
          message : 'Enter the namespace'
        },
        {
          type : 'input',
          name : 'folder_name',
          default: 'Vaah',
          message : 'Enter the Module/Theme/Entity name: '
        },
      )
    } else{
      this.questions.push(
        {
          type : 'input',
          name : 'folder_name',
          default: 'HelloWorld',
          message : 'Enter the Module/Theme/Entity name: '
        },);
    }

    if(primary === 'Custom Path') {
      this.questions.push(
        {
          type : 'input',
          name : 'vue_folder_name',
          default: 'Vue/vaahtwo',
          message : 'Vue folder name/path: '
        },)
    } else{
      this.questions.push(
        {
          type : 'input',
          name : 'vue_folder_name',
          default: 'Vue',
          message : 'Vue folder name/path: '
        },)
    }

    this.questions.push(
      {
        type : 'input',
        name : 'table_name',
        default: 'vh_taxonomies',
        message : 'Enter your taxonomy database table name: '
      },
      {
        type : 'input',
        name : 'taxonomy_type_table_name',
        default: 'vh_taxonomy_types',
        message : 'Enter your taxonomy type database table name: '
      },
      {
        type : 'input',
        name : 'generate_migration',
        default: 'true',
        message : 'Do you want to generate migration file (true/false): '
      },
      {
        type : 'input',
        name : 'model_name',
        default: 'Taxonomy',
        message : 'Enter your Taxonomy model name (singular): '
      },
      {
        type : 'input',
        name : 'taxonomy_type_model_name',
        default: 'TaxonomyType',
        message : 'Enter your Taxonomy type model name (singular): '
      },
      {
        type : 'input',
        name : 'controller_name',
        default: 'Taxonomies',
        message : 'Enter your controller name (plural): '
      },);


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
