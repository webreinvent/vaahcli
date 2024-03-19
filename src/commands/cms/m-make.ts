import {Args, Command, Flags} from '@oclif/core'
const Listr = require('listr');

import Generator from "../../libraries/Generator";
import Helpers from "../../libraries/Helpers";
import Functions from '../../libraries/Functions'


const chalk = require('chalk');


export default class CmsMMake extends Command {

  questions: {[k: string]: any} = {};
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};


  static description = 'Generate for VaahCMS Module';


  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    frontend: Flags.boolean({
      char: 'f',
      default: false,
    }),
    backend: Flags.boolean({
      char: 'b',
      default: true,
    }),
    help: Flags.help({char: 'h'}),
    name: Flags.help({char: 'n'}),
  };


  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = {
    type: Args.string({
      required: true,
      options: [
        'migration',
        'seed',
        'model',
        'controller',
        'view',
        'middleware',
        'observer',
        'trait',
        'test',
        'event',
        'listener',
        'mail',
        'notification',
      ]
    }),
    'module': Args.string({
      required: true,
    }),
    'name': Args.string({
      required: true,
    })
  };


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

    const {args, flags} = await this.parse(CmsMMake);

    this.args = args;
    this.flags = flags;

    /*let questions = new Questions();
    this.inputs = await inquirer.prompt(questions.getModuleCrudQuestions());*/


    let helpers = new Helpers(this.args, this.flags, this.inputs);

    this.inputs['for'] = 'module';

    let params: any = helpers.getDerivedVariables();

    console.log('--->', params);

    for(let key in params)
    {
      this.inputs[key] = params[key];
    }

    for(let key in this.args)
    {
      this.inputs[key] = this.args[key];
    }

    for(let key in this.flags)
    {
      this.inputs[key] = this.flags[key];
    }

    let source = '/skeletons/vaahcms/module-files/';



    console.log('--->', this.inputs);

    let generator = new Generator(args, flags, this.inputs, source, this.inputs['target_dir']);


    this.log(chalk.green('======================================='));
    this.log('Generating Files for Module: '+chalk.green(this.args.module));
    this.log(chalk.green('---------------------------------------'));


    const tasks = new Listr([
      {
        title: 'File Generated',
        task: function () {
          generator.file();
        }
      }
    ]);



    tasks.run().then((ctx: any) => {
      this.log(chalk.green('======================================='));
    }).catch((err: any) => {
      console.error(err);
    });



  }


  //----------------------------------------------------------

  //----------------------------------------------------------
  //----------------------------------------------------------
  //----------------------------------------------------------
  //----------------------------------------------------------

}
