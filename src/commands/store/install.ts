import { Command } from '@oclif/core';
import * as path from 'path';
import simpleGit from 'simple-git';
import { exec } from 'child_process';
import * as fs from 'fs';
import Questions from "../../libraries/Questions";
const inquirer = require('inquirer');

export default class CmsInstall extends Command {
    static description = 'Download and install VaahStore and VaahCMS Module Store';

    async run() {
        let questions = new Questions();
        let answers = await inquirer.prompt(questions.askStoreSetupType());

        if (answers.install_type === 'full') {
            let inputs = await inquirer.prompt(questions.getUserInfoFullSetup());

            // Clone the repository and get the path
            const mainRepoDir = await this.cloneRepo();
            this.log(inputs);

            // Write the .env file using the obtained path
            // await this.writeEnvFile(mainRepoDir);
            // await this.runMigrations();
        }

        if (answers.install_type === 'clone') {
            await this.cloneRepo();
        }
    }

    async cloneRepo(): Promise<string> {
        const mainRepoUrl = 'https://github.com/webreinvent/vaahstore-ready.git';
        const mainRepoDir = path.join(process.cwd(), 'vaahstore-ready');

        const moduleRepoUrl = 'https://github.com/webreinvent/vaahcms-module-store.git';
        const moduleRepoDir = path.join(mainRepoDir, 'VaahCms/Modules', 'Store');

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
            return mainRepoDir;

        } catch (error) {
            this.log("❌ Installation failed:", error);
            throw error; // Ensure error is not swallowed
        }
    }

    async installDependencies(mainRepoDir: string) {
        await this.setupEnv(mainRepoDir);
        this.log("📦 Running 'composer install' inside vaahstore-ready...");

        return new Promise<void>((resolve, reject) => {
            exec(`cd ${mainRepoDir} && composer install`, (error, stdout, stderr) => {
                if (error) {
                    this.log(`❌ Composer install failed: ${error.message}`);
                    return reject(error);
                }
                if (stderr) {
                    this.log(`⚠️ Composer warnings: ${stderr}`);
                }
                this.log("✅ Composer install completed!");
                this.generateKey(mainRepoDir);
                this.log(stdout);
                resolve();
            });
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

        return new Promise<void>((resolve, reject) => {
            exec(`cd ${mainRepoDir} && php artisan key:generate`, (error, stdout, stderr) => {
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

//     async writeEnvFile(mainRepoDir: string) {
//         // Correctly define the path using mainRepoDir
//         const envPath = path.join(mainRepoDir, ".env");
//
//         const envData = `
// DB_CONNECTION=mysql
// DB_HOST=127.0.0.1
// DB_PORT=3306
// DB_DATABASE=laravel
// DB_USERNAME=root
// DB_PASSWORD=
//
// MAIL_FROM_NAME=webreinvent
// MAIL_FROM_ADDRESS=we@webreinvent.com
//
// APP_NAME=store
// `.trim(); // Remove unnecessary spaces
//
//         try {
//             fs.writeFileSync(envPath, envData, { encoding: 'utf8' });
//             this.log(`✅ .env file has been created successfully at ${envPath}`);
//         } catch (error) {
//             this.log(`❌ Error writing .env file: ${error.message}`);
//         }
//     }

    async runMigrations() {
        const projectPath = "D:\\xampp8117\\htdocs\\vineet-k001\\vaahcli\\vaahstore-ready"; // Hardcoded path
        this.log("📂 Running database migrations...");

        return new Promise<void>((resolve, reject) => {
            exec(`cd ${projectPath} && php artisan migrate --force`, (error, stdout, stderr) => {
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
}
