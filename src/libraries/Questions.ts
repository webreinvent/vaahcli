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
  getSetupOptions()
  {

    this.questions = [
      {
        name: 'setup',
        message: 'How would you like to setup?',
        type: 'list',
        default: null,
        choices: [
          { name: 'Using command line tool (CLI)', value: 'cli' },
          { name: 'Using wizard (/vaahcms/setup)', value: 'wizard' }
        ]
      },

    ];

    return this.questions;

  }

  //-------------------------------------------------------
  getDatabaseOptions()
  {

    this.questions = [
      {
        type : 'input',
        name : 'database_name',
        default: 'vaahstore_dev',
        message : 'Enter your database name: '
      },
      {
        type : 'input',
        name : 'database_username',
        default: 'root',
        message : 'Enter your database username: '
      },
      {
        type : 'input',
        name : 'database_password',
        default: null,
        message : 'Enter your database password: '
      }

    ];

    return this.questions;

  }

  //-------------------------------------------------------
  getSuperAdminOptions()
  {

    this.questions = [
      {
        type : 'input',
        name : 'first_name',
        default: 'WebReinvent',
        message : 'Enter your first name: '
      },
      {
        type : 'input',
        name : 'last_name',
        default: 'Team',
        message : 'Enter your last name: '
      },
      {
        type : 'input',
        name : 'username',
        default: 'we',
        message : 'Enter your username: '
      },
      {
        type : 'input',
        name : 'email',
        default: 'we@webreinvent.com',
        message : 'Enter your email: '
      },
      {
        type : 'input',
        name : 'password',
        default: "WebReinvent@2025",
        message : 'Enter your password: '
      },
      {
        type : 'input',
        name : 'country_calling_code',
        default: "+91",
        message : 'Enter your country calling code: '
      },
      {
        type : 'input',
        name : 'phone',
        default: "911111111",
        message : 'Enter your phone number: '
      }

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
        default: 'Module - PrimeVue4',
        message : 'Choose the tech stack of the module: ',
        choices: [
          "Module - PrimeVue4",
          "Module - Vue3 & PrimeVue3",
          "Module - Vue2 & Buefy"
        ],
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
        message : 'Do you want to use vue in this module (true/false): '
      },

    ];

    return this.questions;

  }

  //-------------------------------------------------------
  getVaahCmsThemeQuestions()
  {

    this.questions = [
      {
        type : 'list',
        name : 'theme-type',
        default: 'Theme - Vue3 & PrimeVue',
        message : 'Choose the tech stack of the module: ',
        choices: ["Theme - Vue3 & PrimeVue", "Theme - Vue2 & Buefy"],
      },
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
      {
        type : 'input',
        name : 'is_using_vue',
        default: 'false',
        message : 'Do you want to use vue in this theme (true/false): '
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
        choices: [
          "Module - PrimeVue4",
          "Module - Vue3 & PrimeVue3",
          "Module - Vue2 & Buefy",
          "Theme",
          "Custom Path - PrimeVue4",
          "Custom Path - Vue3 & PrimeVue3"
        ],
      },

    ];


    return this.questions;
  }
  //-------------------------------------------------------
  getVue3CrudQuestionsPrimary()
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


    if(
      primary === 'Custom Path - PrimeVue4' || primary === 'Custom Path - Vue3 & PrimeVue'
    )
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
  getTaxonomyQuestionsPrimary(primary: string)
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
        name : 'generate_migration',
        default: 'true',
        message : 'Do you want to generate migration file (true/false): '
      });

    return this.questions;

  }
  //-------------------------------------------------------
  getTaxonomyQuestions(primary: string)
  {

    this.questions = [];


    if(primary === 'true')
    {
      this.questions.push(
        {
          type : 'input',
          name : 'table_name',
          default: 'vh_taxonomies',
          message : 'Enter your taxonomy database table name: '
        },
        {
          type : 'input',
          name : 'second_table_name',
          default: 'vh_taxonomy_types',
          message : 'Enter your taxonomy type database table name: '
        },
        {
          type : 'input',
          name : 'second_table_name_singular',
          default: 'vh_taxonomy_type',
          message : 'Enter your taxonomy type database table name (singular): '
        },
      );

    }

    this.questions.push(
      {
        type : 'input',
        name : 'model_name',
        default: 'Taxonomy',
        message : 'Enter your Taxonomy model name (singular): '
      },
      {
        type : 'input',
        name : 'second_model_name',
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
  getFlutterQuestions()
  {

    this.questions = [];

    this.questions.push(
        {
          type : 'input',
          name : 'package_name',
          default: 'com.example.helloworld',
          message : 'Enter Bundle Identifier / Package Name (domain.company.appname): '
        },
        {
          type : 'input',
          name : 'app_name',
          default: 'HelloWorld',
          message : 'Enter App Name: '
        },
        {
          type : 'input',
          name : 'app_description',
          default: 'Another app on VaahFlutter.',
          message : 'Enter App Description: '
        }
      );

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
  getSettingQuestions(primary: string)
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
        name : 'controller_name',
        default: 'Settings',
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
  askStoreSetupType(){
    this.questions = [
      {
        name: 'install_type',
        message: 'How would you like to setup?',
        type: 'list',
        choices: [
          { name: 'Using command line tool (CLI)', value: 'full' },
          { name: 'Using wizard (/vaahcms/setup)', value: 'clone' }
        ]
      },

    ];

    return this.questions;
  }
  //-------------------------------------------------------
  getUserInfoFullSetup() {
    this.questions = [
      {
        name: 'DB_CONNECTION',
        message: 'Enter database connection type:',
        default: 'mysql'
      },
      {
        name: 'DB_HOST',
        message: 'Enter database host:',
        default: '127.0.0.1'
      },
      {
        name: 'DB_PORT',
        message: 'Enter database port:',
        default: '3306'
      },
      {
        name: 'DB_DATABASE',
        message: 'Enter database name:',
        default: 'laravel'
      },
      {
        name: 'DB_USERNAME',
        message: 'Enter database username:',
        default: 'root'
      },
      {
        name: 'DB_PASSWORD',
        message: 'Enter database password:',
        type: 'password',
        mask: '*'
      },
      {
        name: 'MAIL_FROM_NAME',
        message: 'Enter mail sender name:',
        default: 'webreinvent'
      },
      {
        name: 'MAIL_FROM_ADDRESS',
        message: 'Enter mail sender address:',
        default: 'we@webreinvent.com'
      },
      {
        name: 'APP_NAME',
        message: 'Enter application name:',
        default: 'store'
      },
      {
        name: 'SUPER_ADMIN_EMAIL',
        message: 'Super Admin Email:',
        default: 'we@webreinvent.com'
      },
      {
        name: 'SUPER_ADMIN_USER_NAME',
        message: 'Super Admin User Name:',
        default: 'we'
      },
      {
        name: 'SUPER_ADMIN_PASSWORD',
        message: 'Super Admin Password:',
        default: 'We@web1234'
      },
      {
        name: 'SUPER_ADMIN_PHONE',
        message: 'Super Admin phone:',
        default: '999999999999'
      }
    ];

    return this.questions;
  }
  //-------------------------------------------------------
  //-------------------------------------------------------



}
