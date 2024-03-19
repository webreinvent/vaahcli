import {Command, Flags} from '@oclif/core'
import Questions from '../../libraries/Questions'
const inquirer = require('inquirer')
import Generator from '../../libraries/Generator'
import Functions from '../../libraries/Functions'

let fs = require('fs');
let ora = require('ora');
const execa = require('execa');
const Listr = require('listr');
var shell = require('shelljs');
const { exec } = require('child_process');
let fsSync = require('fs-sync');
const fsPromises = fs.promises;

const chalk = require('chalk');

export default class CmsCrud extends Command {

  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  primary: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahcms-ready';
  target_dir: string = './';
  source_dir: string = '';

  static description = 'Generate CRUD operations for VaahCMS'

  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: Flags.boolean({
      description: 'Generate CRUD operation for VaahCMS',
      default: false,
    }),
  };

  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = {};

  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }


    const {args, flags} = await this.parse(CmsCrud)

    let questions = new Questions();

    this.primary = await inquirer.prompt(questions.getCrudQuestionsPrimary());

    let get_questions = questions.getCrudQuestions(this.primary.for);

    this.inputs = await inquirer.prompt(get_questions);

    this.inputs.for = this.primary.for;

    let target = "";
    let source = '\\skeletons\\vaahcms\\crud\\';
    this.inputs['namespace_controller'] = '';

    if(this.inputs.for == 'Module - Vue3 & PrimeVue')
    {
      source = '\\skeletons\\vaahcms\\crud-vue3\\';
      this.inputs['namespace'] = 'VaahCms\\Modules\\'+this.inputs.folder_name;
      target = "./VaahCms/Modules/"+this.inputs.folder_name;

    } else if(this.inputs.for == 'Module - Vue2 & Buefy'){

      source = '\\skeletons\\vaahcms\\crud\\';
      this.inputs['namespace'] = 'VaahCms\\Modules\\'+this.inputs.folder_name;
      target = "./VaahCms/Modules/"+this.inputs.folder_name;

    } else if(this.inputs.for == 'Theme')
    {
      this.inputs['namespace'] = 'VaahCms\\Themes\\'+this.inputs.folder_name;
      target = "./VaahCms/Themes/"+this.inputs.folder_name;
    } else{
      source = '\\skeletons\\vaahcms\\crud-vue3\\';
      this.inputs['namespace_controller'] = this.inputs['namespace']+'\\Http\\Controllers';
      target = this.inputs.path;
    }


    let generator = new Generator(args, flags, this.inputs, source, target);

    this.log(chalk.green('======================================='));
    this.log('Generating CRUD Files');
    this.log(chalk.green('---------------------------------------'));

    const tasks = new Listr([
      {
        title: 'Files Generated for CRUD operations',
        task: function () {
          generator.generateCrudFiles();
        }
      }
    ]);

    let self = this;

    tasks.run().then((ctx: any) => {
      self.successMessage();
    }).catch((err: any) => {
      console.error(err);
    });

  }

  //---------------------------------------------------
  successMessage()
  {

    this.log(chalk.white.bgGreen.bold("      Files Generated!      "));
    this.log(chalk.green("=================================================================="));
    this.log(chalk.green("Now, follow following steps:"));

    if(this.inputs['generate_migration'] === 'true')
    {
      this.log("0.1) Update the migration file with the table name and columns");
      this.log("0.2) Re-activate module to run migrations");
    }

    this.log("2) Include the crud router file in the module's backend route file");
    this.log("3) Include the vue router file");

    if(this.inputs.for == 'Module - Vue2 & Buefy')
    {
      this.log("4) Include the vue store file");
      this.log("5) Add vue router link to you menu");
    }

    if(this.inputs.for == 'Module - Vue3 & PrimeVue')
    {
      this.log("6) Add vue router link to you <module>/Vue/Components/Aside.vue file");
    }


    this.log(chalk.green("=================================================================="));

  }

  //---------------------------------------------------
  //---------------------------------------------------


}
