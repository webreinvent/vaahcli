import { Command } from '@oclif/core';
import * as path from 'path';
import simpleGit from 'simple-git';
import { exec } from 'child_process';
import * as fs from 'fs';
import Questions from "../../libraries/Questions";
const inquirer = require('inquirer')

export default class CmsInstall extends Command {
    static description = 'Download and install VaahStore and VaahCMS Module Store';

    async run() {
        let questions = new Questions();

        let answers = await inquirer.prompt(questions.getFullVaahStoreSetup());

        if(answers.install_type == 'full'){
            this.cloneRepo();
            let inputes = await inquirer.prompt(questions.getFullVaahStoreSetup());
        }

        if(answers.install_type == 'clone'){
            this.cloneRepo();
        }

    }


    async cloneRepo(){
        const mainRepoUrl = 'https://github.com/webreinvent/vaahstore-ready.git';
        const mainRepoDir = path.join(process.cwd(), 'vaahstore-ready');

        const moduleRepoUrl = 'https://github.com/webreinvent/vaahcms-module-store.git';
        const moduleRepoDir = path.join(mainRepoDir, 'VaahCms/Modules', 'Store'); // Renamed to 'Store'

        this.log("📥 Cloning VaahStore Ready...");

        try {
            // Clone main repository
            await simpleGit().clone(mainRepoUrl, mainRepoDir);
            this.log("✅ VaahStore Ready cloned successfully!");

            // Ensure Modules directory exists
            const modulesDir = path.join(mainRepoDir, 'VaahCms/Modules');
            if (!fs.existsSync(modulesDir)) {
                fs.mkdirSync(modulesDir, { recursive: true });
            }

            this.log("📥 Cloning VaahCMS Module Store into 'Store'...");
            await simpleGit().clone(moduleRepoUrl, moduleRepoDir);
            this.log("✅ VaahCMS Module Store cloned successfully as 'Store'!");

            // Install dependencies and generate key
            await this.installDependencies(mainRepoDir);

        } catch (error) {
            this.log("❌ Installation failed:", error);
        }
    }

    async installDependencies(mainRepoDir: string) {
        await this.setupEnv(mainRepoDir);
        this.log("📦 Running 'composer install' inside vaahstore-ready...");

        exec(`cd ${mainRepoDir} && composer install`, (error, stdout, stderr) => {
            if (error) {
                this.log(`❌ Composer install failed: ${error.message}`);
                return;
            }
            if (stderr) {
                this.log(`⚠️ Composer warnings: ${stderr}`);
            }
            this.log("✅ Composer install completed!");
            this.generateKey(mainRepoDir);
            this.log(stdout);
        });
    }

    setupEnv(mainRepoDir: string) {
        const envExample = path.join(mainRepoDir, '.env.example');
        const envFile = path.join(mainRepoDir, '.env');

        if (fs.existsSync(envExample)) {
            fs.copyFileSync(envExample, envFile);
            this.log("✅ .env file created from .env.example");
        } else {
            this.log("⚠️ .env.example not found. Skipping .env setup.");
        }
    }

    generateKey(mainRepoDir: string) {
        this.log("🔑 Generating application key...");
        exec(`cd ${mainRepoDir} && php artisan key:generate`, (error, stdout, stderr) => {
            if (error) {
                this.log(`❌ Key generation failed: ${error.message}`);
                return;
            }
            if (stderr) {
                this.log(`⚠️ Key generation warnings: ${stderr}`);
            }
            this.log("✅ Application key generated successfully!");
            this.log(stdout);



        });
    }

}
