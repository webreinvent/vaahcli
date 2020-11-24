import {Command, flags} from '@oclif/command'

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


export default class CmsInstall extends Command {
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahcms-ready';
  target_dir: string = './';


  static description = 'Install VaahCMS';


  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    here: flags.boolean({
      description: 'If you want to VaahCMS in current director',
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

    const {args, flags} = this.parse(CmsInstall);

    this.args = args;
    this.flags = flags;

    await this.printName();

    await this.spin();

    if(!flags.here)
    {
      this.target_dir = this.target_dir+args.project_name;
    }

    await this.install();


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
        title: 'Downloading Repository',
        task: () => new Promise((resolve, reject) => {
          {

            shell.cd(this.target_dir);

            let options = [
              'clone',
              this.repo,
              './'
            ];

            let git = execa('git', options);

            git.then(resolve)
              .catch(() => {
                reject(new Error('Failed'));
              });


            return git;
          }
        })
      },
      {
        title: 'Installing Dependencies via Composer (Takes 5 - 6 minutes)',
        task: () => new Promise((resolve, reject) => {
          {

            log(chalk.yellow("Be patient, this can take up to 5 - 6 minutes.."));

            shell.cd(this.target_dir);

            let project = '.git';

            fs.rmdirSync(project, {recursive: true});

            let options = [
              'install',
            ];

            let output_options = {
              buffer: false,
              stderr: "inherit"
            };

            //let composer = execa('composer', options, output_options);
            //composer.stdout.pipe(process.stdout);


            let composer = execa('composer', options);

            composer.then(resolve)
              .catch((error: any) => {
                return reject(error);
              });

            return composer;

          }
        })
      },
      {
        title: 'Configuring VaahCMS',
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
      }

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

    log(chalk.green("=================================================================="));
    log("Run "+chalk.green("php artisan server")+" and visit following url to setup:");
    log(chalk.green("http://127.0.0.1:8000/vaahcms/setup"));
    log(chalk.green("=================================================================="));

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
