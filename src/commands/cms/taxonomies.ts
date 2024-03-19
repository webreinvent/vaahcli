import {Args, Command, Flags} from '@oclif/core'
import Questions from '../../libraries/Questions'
const inquirer = require('inquirer')
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

export default class CmsCrud extends Command {

  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  primary: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  primary_inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahcms-ready';
  target_dir: string = './';
  source_dir: string = '';

  static description = 'Vue 3: Generate Taxonomies CRUD operations for VaahCMS'

  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: Flags.boolean({
      description: 'Vue 3: Generate Taxonomies CRUD operations for VaahCMS',
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

    this.log(chalk.white.bgGreen.bold("      This command are only for Vue 3 module      "));

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }


    const {args, flags} = await this.parse(CmsCrud)

    let questions = new Questions();

    this.primary = await inquirer.prompt(questions.getVue3CrudQuestionsPrimary());

    let get_primary_questions = questions.getTaxonomyQuestionsPrimary(this.primary.for);

    this.primary_inputs = await inquirer.prompt(get_primary_questions);

    let get_questions = questions.getTaxonomyQuestions(this.primary_inputs.generate_migration);

    this.inputs = await inquirer.prompt(get_questions);

    this.inputs = {
      ...this.primary_inputs,
      ...this.inputs
    };

    this.inputs.for = this.primary.for;

    let target = "";
    let source = '/skeletons/vaahcms/taxonomies/';
    this.inputs['namespace_controller'] = '';

    this.inputs['namespace'] = 'VaahCms\\Modules\\'+this.inputs.folder_name;
    target = "./VaahCms/Modules/"+this.inputs.folder_name;

    if(this.inputs.for == 'Custom Path') {
      this.inputs['namespace_controller'] = this.inputs['namespace'] + '\\Http\\Controllers';
      target = this.inputs.path;
    }
    if(this.primary_inputs.generate_migration !== 'true') {
      this.inputs['table_name'] = 'vh_taxonomies';
      this.inputs['second_table_name'] = 'vh_taxonomy_types';
      this.inputs['second_table_name_singular'] = 'vh_taxonomy_type';
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

    let n = 1;

    this.log(chalk.white.bgGreen.bold("      Files Generated!      "));
    this.log(chalk.green("=================================================================="));
    this.log(chalk.green("Now, follow following steps:"));

    if(this.inputs['generate_migration'] === 'true')
    {
      this.log(n+++") Update the migration file with the table name and columns");
      this.log(n+++") Re-activate module to run migrations");
    }

    this.log(n+++") Run "+chalk.green("npm install --save @grapoza/vue-tree")+" command in "+this.inputs['namespace']+"\\Vue directory");
    this.log(n+++") Include the crud router file in the module's backend route file");
    this.log(n+++") Include the vue router file");

    if(this.inputs.for == 'Module')
    {
      this.log(n+++") Add vue router link to you <module>/Vue/Components/Aside.vue file");
    }


    this.log(chalk.green("=================================================================="));

  }

  //---------------------------------------------------
  //---------------------------------------------------


}
