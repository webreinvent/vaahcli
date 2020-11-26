
const chalk = require('chalk');
let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let fsSync = require('fs-sync');

const log = console.log;

export default class Helpers {
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};


  constructor(args: object, flags: object, inputs: object) {
    this.args = args;
    this.flags = flags;
    this.inputs = inputs;


    this.setLowerAndUpperCaseValues();
  }

  //-------------------------------------------------------

  setLowerAndUpperCaseValues()
  {

    if(Object.keys(this.args).length)
    {
      for (let key in this.args) {
        if (typeof this.inputs[key] === 'string'){
          this.args[key+'_lower'] = this.args[key].toLowerCase();
          this.args[key+'_upper'] = this.args[key].toUpperCase();
        }

      }
    }

    if(Object.keys(this.flags).length)
    {
      for (let key in this.flags) {
        if (typeof this.inputs[key] === 'string'){
          this.flags[key+'_lower'] = this.flags[key].toLowerCase();
          this.flags[key+'_upper'] = this.flags[key].toUpperCase();
        }

      }
    }

    if(Object.keys(this.inputs).length)
    {
      for (let key in this.inputs) {

        if (typeof this.inputs[key] === 'string'){
          this.inputs[key+'_lower'] = this.inputs[key].toLowerCase();
          this.inputs[key+'_upper'] = this.inputs[key].toUpperCase();
        }

      }
    }

  }

  //-------------------------------------------------------
  getDerivedVariables()
  {

    let params = {
      namespace: '',
      target_dir: '',
    };


    let namespace = 'VaahCms';
    let target_dir = './';

    switch (this.inputs.for) {

      case 'module':
        namespace = namespace+'\\Modules\\'+this.args.module
        target_dir = target_dir+'Modules/'+this.args.module;
        break;

      case 'theme':
        namespace = namespace+'\\Themes\\'+this.args.theme;
        target_dir = target_dir+'Themes/'+this.args.theme;
        break;

    }

    console.log('--->', target_dir);

    switch (this.args.type) {

      case 'migration':

        target_dir = target_dir+'/Database/Migrations';

        break;

      case 'seed':

        namespace = namespace+'\\Database\\Seeders';

        target_dir = target_dir+'/Database/Seeders';

        break;

      case 'model':

        namespace = namespace+'\\Models';
        target_dir = target_dir+'/Models';

        break;

      case 'controller':

        namespace = namespace+'\\Http\\Controllers';
        target_dir = target_dir+'/Http/Controllers';

        if(this.flags.frontend)
        {
          namespace = namespace+'\\Frontend';
          target_dir = target_dir+'/Frontend';
        }

        if(this.flags.backend)
        {
          namespace = namespace+'\\Backend';
          target_dir = target_dir+'/Backend';
        }

        break;

      case 'middleware':

        namespace = namespace+'\\Http\\Middleware';
        target_dir = target_dir+'/Http/Middleware';

        break;

      case 'observer':

        namespace = namespace+'\\Observers';
        target_dir = target_dir+'/Observers';

        break;

      case 'trait':

        namespace = namespace+'\\Traits';
        target_dir = target_dir+'/Traits';

        break;

      case 'test':

        namespace = namespace+'\\Tests';
        target_dir = target_dir+'/Tests';

        break;

      case 'event':

        namespace = namespace+'\\Events';
        target_dir = target_dir+'/Events';

        break;

      case 'listener':

        namespace = namespace+'\\Listeners';

        target_dir = target_dir+'/Listeners';

        break;


      case 'mail':

        namespace = namespace+'\\Mails';

        target_dir = target_dir+'/Mails';

        break;


      case 'notification':

        namespace = namespace+'\\Notifications';

        target_dir = target_dir+'/Notifications';

        break;


    }


    params.namespace = namespace;
    params.target_dir = target_dir;


    return params;

  }
  //-------------------------------------------------------

  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------


}
