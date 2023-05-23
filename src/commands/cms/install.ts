import {Command, flags} from '@oclif/command'

let fs = require('fs');
let ora = require('ora');
const execa = require('execa');
const Listr = require('listr');
var shell = require('shelljs');
const { exec } = require('child_process');
let fsSync = require('fs-sync');
const fsPromises = fs.promises;
// @ts-ignore
//import { download, extract }  from 'gitly';
//import * as download  from 'download-git-repo';
import Functions from '../../libraries/Functions'
import Questions from '../../libraries/Questions'
import * as inquirer from 'inquirer'



const download = require('download-git-repo');
const chalk = require('chalk');

const log = console.log;


export default class CmsInstall extends Command {
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahcms-ready';
  target_dir: string = './';
  source_dir: string = '';


  static description = 'Install VaahCMS';


  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    here: flags.boolean({
      description: 'If you want to install VaahCMS in current directory',
      default: false,
    }),
    help: flags.help({char: 'h'}),
  };


  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [
    {
      name: 'project_name',
      description: 'Enter the project folder name',
      default: 'vaahcms',
    }
  ];


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

    const {args, flags} = this.parse(CmsInstall);

    this.args = args;
    this.flags = flags;

    await this.printName();



    if(!flags.here)
    {
      this.target_dir = this.target_dir+args.project_name;
    }

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getVaahCmsVersions());

    if(this.inputs.version)
    {
      await this.spin();
      await this.install();
    }



  }

  //-----------------------------------

  //-----------------------------------
  async install()
  {



    const tasks = new Listr([
      {
        title: 'Creating Project Folder',
        task: () => new Promise((resolve, reject) => {
          {

            let self = this;
            if(this.args.project_name)
            {

              fs.mkdir(self.target_dir, (error: null, result: unknown) => {
                if (error != null) {
                  log("");
                  log(chalk.red("- Project Folder Already Exists"));
                  return reject(error);
                }

                resolve(result);
              });


            }
          }
        })
      },
      {
        title: 'Downloading VaahCMS',
        task: () => new Promise((resolve, reject) => {
          {

            let self = this;
            let repo = 'webreinvent/vaahcms-ready';



            if(self.inputs.version === 'VaahCMS 2.x')
            {
              repo =  'webreinvent/vaahcms-ready#2.x';
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms-2/";
              //repo =  'https://github.com/webreinvent/vaahcms-ready/archive/2.x.zip';
            }

            if(self.inputs.version === 'VaahCMS 1.x')
            {
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms/";
              repo =  'webreinvent/vaahcms-ready#1.x';
            }

            // @ts-ignore
            download(repo, self.target_dir, function (err: any) {
              console.log((err ? reject('Error') : resolve('Success')));
            })

          }
        })
      },
      /*{
        title: 'Extracting VaahCMS Files',
        task: () => new Promise((resolve, reject) => {
          {
            extract(this.source_dir, this.target_dir).then(resolve)
              .catch(() => {
                reject(new Error('Failed'));
              });
          }
        })
      }, */

      /* {
        title: 'Installing Dependencies via Composer (Takes 3 - 5 minutes)',
        task: () => new Promise((resolve, reject) => {
          {

            log(chalk.yellow("Be patient, this can take up to 5 - 6 minutes.."));

            shell.cd(this.target_dir);

            //let project = '.git';

            //fs.rmdirSync(project, {recursive: true});

            let options = [
              'install',
              '--ignore-platform-reqs'
            ];

            let composer;

            composer = execa('composer', options);

            //---print composer command progress
            let output_options = {
              buffer: true,
              stderr: "inherit"
            };
            //composer = execa('composer', options, output_options);
            //composer.stdout.pipe(process.stdout);
            //---end of print composer command progress



            composer.then(resolve)
              .catch((error: any) => {
                return reject(error);
              });

            return composer;

          }
        })
      }, */
      /*
       {
        title: 'Publishing Assets',
        task: () => new Promise((resolve, reject) => {
          {

            shell.cd(this.target_dir);

            let options = [
              'artisan',
              'vendor:publish',
              '--provider="WebReinvent\\VaahCms\\VaahCmsServiceProvider"',
              '--tag=assets',
              '--force',
            ];

            let command = execa('php', options, {
              buffer: true,
              stderr: "inherit"
            });

            command.stdout.pipe(process.stdout);

            command.then(resolve)
              .catch(() => {
                reject(new Error('Failed'));
              });

            return command;
          }
        })
      } */

    ]);

    tasks.run().then(()=>{
      this.spinStop();
    }).catch((err: any) => {

      console.error(err);
      this.spinStopWithError();

    });

  }
  //-----------------------------------

  //-----------------------------------
  async spin() {


    this.spinner = ora();

    this.spinner.start('Installing VaahCMS...');

    this.spinner._spinner = {
      "interval": 80,
      "frames": [
        "⠋",
        "⠙",
        "⠹",
        "⠸",
        "⠼",
        "⠴",
        "⠦",
        "⠧",
        "⠇",
        "⠏"
      ]
    };

  }
  //-----------------------------------
  async printName()
  {
    log(chalk.red(`
 /\\   /\\ __ _   __ _ | |__    / __\\ /\\/\\  / _\\
 \\ \\ / // _\` | / _\` || '_ \\  / /   /    \\ \\ \\
  \\ V /| (_| || (_| || | | |/ /___/ /\\/\\ \\_\\ \\
   \\_/  \\__,_| \\__,_||_| |_|\\____/\\/    \\/\\__/
`));
  }
  //-----------------------------------
  async spinStop()
  {

    this.spinner.succeed();

    log(chalk.white.bgGreen.bold("      VaahCMS Installed!      "));

    log(chalk.black("=================================================================="));
    log("Open the project folder "+chalk.green(this.args.project_name)+" in terminal and follow the steps ");
    log("Step 1. Run "+chalk.green("composer install")+" command");
    log("Step 2. Run "+chalk.green("php artisan serve")+" command");
    log("and visit following url to setup:");
    log(chalk.green("http://127.0.0.1:8000/vaahcms/setup"));
    log(chalk.bold(chalk.blueBright("OR")));
    log("Step 2. In case of "+chalk.green("Xampp or Wamp")+", visit following url to setup:");
    log(chalk.green("http://localhost/<project-folder-path>/public/vaahcms/setup"));

    log(chalk.redBright("------"));

    log(chalk.bold(chalk.blueBright("Documentation: "))+this.inputs.documentation);
    log(chalk.black("=================================================================="));

  }
  //-----------------------------------
  async spinStopWithError()
  {

    this.spinner.succeed();

    log(chalk.white.bgRed.bold("      VaahCMS Installation Failed!      "));

  }
  //-----------------------------------
  //-----------------------------------


}
