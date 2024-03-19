import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')
const Listr = require('listr');

import Questions from "../../libraries/Questions";
import Generator from "../../libraries/Generator";
import Functions from '../../libraries/Functions'


const chalk = require('chalk');


export default class CmsM extends Command {
  questions: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};


  static description = 'To generate module for VaahCMS';

  static flags = {
    help: Flags.help({char: 'h'}),
    name: Flags.help({char: 'n'}),
    force: Flags.boolean({char: 'f'}),
  };

  static args = {};

  async run() {

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }

    const {args, flags} = await this.parse(CmsM);

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getVaahCmsModuleQuestions());

    this.inputs['webpack_port'] = functions.generateRandom(8000, 8999);


    this.inputs['namespace'] = 'VaahCms\\Modules\\'+this.inputs.module_name;
    this.inputs['service_provider_name'] = this.inputs.module_name;

    this.inputs['year'] = (new Date()).getFullYear();

    let source;

    if(this.inputs['module-type'] === 'Module - Vue3 & PrimeVue')
    {
      source = '/skeletons/vaahcms/module-vue3/';
    } else{
      source = '/skeletons/vaahcms/module/';
    }

    let target = "./VaahCms/Modules/"+this.inputs.module_name;

    this.inputs['service_provider_name'] = this.inputs.module_name+'ServiceProvider.php';

    let generator = new Generator(args, flags, this.inputs, source, target);

    this.log(chalk.green('======================================='));
    this.log('Generating Module: '+chalk.green(this.inputs.module_name));
    this.log(chalk.green('---------------------------------------'));

    const tasks = new Listr([
      {
        title: 'Files Generated',
        task: function () {
          generator.files();
        }
      }
    ]);


    tasks.run().then((ctx: any) => {
      this.log(chalk.green('======================================='));

      this.log("0) Activate your module by this.login to the VaahCMS Backend > Extend > Modules section");

      this.log(chalk.blue("To use Vue in your project, follow the following steps:"));
      this.log("1) Add MODULE_"+this.inputs.module_name_upper+"_ENV=develop in your environment file");
      this.log("2) Run 'npm install' at VaahCms/Modules/"+this.inputs.module_name+"/Vue module folder");
      this.log("3) Now run 'npm run dev' at VaahCms/Modules/"+this.inputs.module_name+"/Vue module folder");
      this.log(`4) Visit <base-url>/public/backend/`+this.inputs.module_name_lower);



    }).catch((err: any) => {
      console.error(err);
    });



  }





}
