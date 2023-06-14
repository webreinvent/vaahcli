import {Command, flags} from '@oclif/command'
import Questions from '../../libraries/Questions'
import * as inquirer from 'inquirer'
import Generator from '../../libraries/Generator'
import Helpers from '../../libraries/Helpers'
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

const log = console.log;

export default class CmsCrud extends Command {

  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  primary: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahcms-ready';
  target_dir: string = './';
  source_dir: string = '';

  static description = 'Vue3: Generate User CRUD for VaahCMS'

  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: flags.boolean({
      description: 'Vue3: Generate User CRUD for VaahCMS',
      default: false,
    }),
  };

  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [];

  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {

    log(chalk.white.bgGreen.bold("      This command are only for Vue 3 module      "));

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }


    const {args, flags} = this.parse(CmsCrud)

    let questions = new Questions();

    this.primary = await inquirer.prompt(questions.getVue3CrudQuestionsPrimary());

    let get_questions = questions.getUserQuestions(this.primary.for);

    this.inputs = await inquirer.prompt(get_questions);

    this.inputs.for = this.primary.for;

    let target = "";
    let source = '\\skeletons\\vaahcms\\users\\';
    this.inputs['namespace_controller'] = '';

    this.inputs['namespace'] = 'VaahCms\\Modules\\'+this.inputs.folder_name;
    target = "./VaahCms/Modules/"+this.inputs.folder_name;

    if(this.inputs.for == 'Custom Path') {
      this.inputs['namespace_controller'] = this.inputs['namespace'] + '\\Http\\Controllers';
      target = this.inputs.path;
    }

    let generator = new Generator(args, flags, this.inputs, source, target);

    log(chalk.green('======================================='));
    log('Generating CRUD Files');
    log(chalk.green('---------------------------------------'));

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

    let n = 1;

    log(chalk.white.bgGreen.bold("      Files Generated!      "));
    log(chalk.green("=================================================================="));
    log(chalk.green("Now, follow following steps:"));

    log(n+++") Include the crud router file in the module's backend route file");
    log(n+++") Include the vue router file");

    if(this.inputs.for == 'Module')
    {
      log(n+++") Add vue router link to you <module>/Vue/Components/Aside.vue file");
    }


    log(chalk.green("=================================================================="));

  }

  //---------------------------------------------------
  //---------------------------------------------------


}
