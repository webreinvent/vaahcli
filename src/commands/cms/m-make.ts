import {Command, flags} from '@oclif/command'
const Listr = require('listr');

import Generator from "../../libraries/Generator";
import Helpers from "../../libraries/Helpers";


const chalk = require('chalk');
const log = console.log;


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
    frontend: flags.boolean({
      char: 'f',
      default: false,
    }),
    backend: flags.boolean({
      char: 'b',
      default: true,
    }),
    help: flags.help({char: 'h'}),
    name: flags.help({char: 'n'}),
  };


  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [
    {
      name: 'type',
      required: true,
      options:[
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
    },
    {
      name: 'module',
      required: true,
    },
    {
      name: 'name',
      required: true,
    }
  ];


  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {
    const {args, flags} = this.parse(CmsMMake);

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

    let source = '\\skeletons\\vaahcms\\module-files\\';



    console.log('--->', this.inputs);

    let generator = new Generator(args, flags, this.inputs, source, this.inputs['target_dir']);


    log(chalk.green('======================================='));
    log('Generating Files for Module: '+chalk.green(this.args.module));
    log(chalk.green('---------------------------------------'));


    const tasks = new Listr([
      {
        title: 'File Generated',
        task: function () {
          generator.file();
        }
      }
    ]);



    tasks.run().then((ctx: any) => {
      log(chalk.green('======================================='));
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
