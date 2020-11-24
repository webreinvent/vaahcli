import {Command, flags} from '@oclif/command'

let fs = require('fs');
let ora = require('ora');
const execa = require('execa');
const Listr = require('listr');
var shell = require('shelljs');
const { exec } = require('child_process');


const chalk = require('chalk');

const log = console.log;


export default class CmsInstall extends Command {
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


    if(!flags.here)
    {
      this.target_dir = this.target_dir+args.project_name+"/";
    }


    if (!fs.existsSync(this.target_dir)){
      fs.mkdirSync(this.target_dir);
    }


    await this.spin();
    await this.install();

  }

  //-----------------------------------
  async install()
  {
    const tasks = new Listr([
      {
        title: 'Downloading Repository',
        task: () => new Promise((resolve, reject) => {
          {

            shell.cd(this.target_dir);

            let options = [
              'clone',
              this.repo,
              this.target_dir
            ] ;

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
        title: 'Installing Dependencies via Composer',
        task: () => new Promise((resolve, reject) => {
          {


            shell.cd(this.target_dir);

            fs.rmdirSync(this.target_dir+'.git/', { recursive: true });

            let options = [
              'install',
            ];

            let composer = execa('composer', options, {
              buffer: true,
              stderr: "inherit"
            });

            composer.stdout.pipe(process.stdout);

            composer.then(resolve)
              .catch(() => {
                reject(new Error('Failed'));
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
      },

    ]);

    tasks.run().then(()=>{
      this.spinStop();
    }).catch((err: any) => {
      console.error(err);
    });

  }
  //-----------------------------------
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
  async spinStop()
  {

    this.spinner.succeed();

    log(chalk.red(`
 /\\   /\\ __ _   __ _ | |__    / __\\ /\\/\\  / _\\
 \\ \\ / // _\` | / _\` || '_ \\  / /   /    \\ \\ \\
  \\ V /| (_| || (_| || | | |/ /___/ /\\/\\ \\_\\ \\
   \\_/  \\__,_| \\__,_||_| |_|\\____/\\/    \\/\\__/
`));

    log(chalk.white.bgGreen.bold("      VaahCMS Installed!      "));

    log(chalk.green("=================================================================="));
    log("Run "+chalk.green("php artisan server")+" and visit following url to setup:");
    log(chalk.green("http://127.0.0.1:8000/vaahcms/setup"));
    log(chalk.green("=================================================================="));

  }
  //-----------------------------------
  //-----------------------------------
  //-----------------------------------


}
