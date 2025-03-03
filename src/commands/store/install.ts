import { Command } from '@oclif/core';
import * as path from 'path';
const chalk = require('chalk');
let ora = require('ora');
import simpleGit from 'simple-git';
import { exec } from 'child_process';
import * as fs from 'fs';
import Questions from "../../libraries/Questions";
const inquirer = require('inquirer');

export default class CmsInstall extends Command {
    spinner: {[k: string]: any} = {};
    static description = 'Download and install VaahStore and VaahCMS Module Store';

    async run() {
        let questions = new Questions();
        let answers = await inquirer.prompt(questions.askStoreSetupType());

        if (answers.install_type === 'full') {
            let inputs = await inquirer.prompt(questions.getUserInfoFullSetup());
            const main_repo_dir = await this.cloneRepo();
            this.log(inputs);
            // await this.runMigrations();
        }

        if (answers.install_type === 'clone') {
            await this.cloneRepo();
        }
    }

    async cloneRepo(): Promise<string> {
        const main_repo_url = 'https://github.com/webreinvent/vaahstore-ready.git';
        const main_repo_dir = path.join(process.cwd(), 'vaahstore-ready');
        const module_repo_url = 'https://github.com/webreinvent/vaahcms-module-store.git';
        const module_repo_dir = path.join(main_repo_dir, 'VaahCms/Modules', 'Store');

        this.log("📥 Cloning VaahStore Ready...");

        try {
            await simpleGit().clone(main_repo_url, main_repo_dir);
            this.log("✅ VaahStore Ready cloned successfully!");

            const modules_dir = path.join(main_repo_dir, 'VaahCms/Modules');
            if (!fs.existsSync(modules_dir)) {
                fs.mkdirSync(modules_dir, { recursive: true });
            }

            this.log("📥 Cloning VaahCMS Module Store into 'Store'...");
            await simpleGit().clone(module_repo_url, module_repo_dir);
            this.log("✅ VaahCMS Module Store cloned successfully as 'Store'!");

            await this.installDependencies(main_repo_dir);
            return main_repo_dir;
        } catch (error) {
            this.log("❌ Installation failed:", error);
            throw error;
        }
    }

    async installDependencies(main_repo_dir: string) {
        await this.setupEnv(main_repo_dir);
        this.log("📦 Running 'composer install' inside vaahstore-ready...");

        return new Promise<void>((resolve, reject) => {
            exec(``, (error, stdout, stderr) => {
                if (error) {
                    this.log(`❌ Composer install failed: ${error.message}`);
                    return reject(error);
                }
                if (stderr) {
                    this.log(`⚠️ Composer warnings: ${stderr}`);
                }
                this.log("✅ Composer install completed!");
                // this.generateKey(main_repo_dir);
                this.log(stdout);
                resolve();
            });
        });
    }

    setupEnv(main_repo_dir: string) {
        const env_example = path.join(main_repo_dir, '.env.example');
        const env_file = path.join(main_repo_dir, '.env');

        if (fs.existsSync(env_example)) {
            fs.copyFileSync(env_example, env_file);
            this.log("✅ .env file created from .env.example");
        } else {
            this.log("⚠️ .env.example not found. Skipping .env setup.");
        }
    }

    generateKey(main_repo_dir: string) {
        this.log("🔑 Generating application key...");

        return new Promise<void>((resolve, reject) => {
            exec(`cd ${main_repo_dir} && php artisan key:generate`, (error, stdout, stderr) => {
                if (error) {
                    this.log(`❌ Key generation failed: ${error.message}`);
                    return reject(error);
                }
                if (stderr) {
                    this.log(`⚠️ Key generation warnings: ${stderr}`);
                }
                this.log("✅ Application key generated successfully!");
                this.log(stdout);
                resolve();
            });
        });
    }

    async runMigrations() {
        const project_path = "D:\\xampp8117\\htdocs\\vineet-k001\\vaahcli\\vaahstore-ready"; // Hardcoded path
        this.log("📂 Running database migrations...");

        return new Promise<void>((resolve, reject) => {
            exec(`cd ${project_path} && php artisan migrate --force`, (error, stdout, stderr) => {
                if (error) {
                    this.log(`❌ Migration failed: ${error.message}`);
                    return reject(error);
                }
                if (stderr) {
                    this.log(`⚠️ Migration warnings: ${stderr}`);
                }
                this.log("✅ Migrations completed successfully!");
                this.log(stdout);
                resolve();
            });
        });
    }

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
        this.log(chalk.red(`
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

        this.log(chalk.white.bgGreen.bold("      VaahCMS Installed!      "));

        this.log(chalk.black("=================================================================="));
        this.log("Open the project folder "+chalk.green(this.args.project_name)+" in terminal and follow the steps ");
        this.log("Step 1. Run "+chalk.green("composer install")+" command");
        this.log("Step 2. Run "+chalk.green("php artisan serve")+" command");
        this.log("and visit following url to setup:");
        this.log(chalk.green("http://127.0.0.1:8000/vaahcms/setup"));
        this.log(chalk.bold(chalk.blueBright("OR")));
        this.log("Step 2. In case of "+chalk.green("Xampp or Wamp")+", visit following url to setup:");
        this.log(chalk.green("http://localhost/<project-folder-path>/public/vaahcms/setup"));

        this.log(chalk.redBright("------"));

        this.log(chalk.bold(chalk.blueBright("Documentation: "))+this.inputs.documentation);
        this.log(chalk.black("=================================================================="));

    }
    //-----------------------------------
    async spinStopWithError()
    {

        this.spinner.succeed();

        this.log(chalk.white.bgRed.bold("      VaahCMS Installation Failed!      "));

    }
}
