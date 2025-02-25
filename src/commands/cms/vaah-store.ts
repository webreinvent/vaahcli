import { Command } from '@oclif/core';
import * as path from 'path';
import simpleGit from 'simple-git';
import { exec } from 'child_process';
import * as fs from 'fs';
import util from 'util';

const execPromise = util.promisify(exec); // Convert exec to return a Promise

export default class CmsInstall extends Command {
    static description = 'Download and install VaahStore and VaahCMS Module Store';

    async run() {
        const mainRepoUrl = 'https://github.com/webreinvent/vaahstore-ready.git';
        const mainRepoDir = path.join(process.cwd(), 'vaahstore-ready');

        const moduleRepoUrl = 'https://github.com/webreinvent/vaahcms-module-store.git';
        const moduleRepoDir = path.join(mainRepoDir, 'VaahCms/Modules', 'Store'); // Renamed to 'Store'

        try {
            this.log("📥 Cloning VaahStore Ready...");
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

            // Run dependencies installation
            await this.installDependencies(mainRepoDir);

            // Setup .env and generate app key
            await this.setupEnv(mainRepoDir);
        } catch (error) {
            this.log("❌ Installation failed:", error);
        }
    }

    async installDependencies(mainRepoDir: string) {
        try {
            // Run composer install
            this.log("📦 Running 'composer install'...");
            await execPromise(`cd ${mainRepoDir} && composer install`);
            this.log("✅ Composer install completed!");

            // Run npm install
            this.log("📦 Running 'npm install'...");
            await execPromise(`cd ${mainRepoDir} && npm install`);
            this.log("✅ npm install completed!");
        } catch (error) {
            this.log(`❌ Dependency installation failed: ${error.message}`);
        }
    }

    async setupEnv(mainRepoDir: string) {
        const envExample = path.join(mainRepoDir, '.env.example');
        const envFile = path.join(mainRepoDir, '.env');

        if (fs.existsSync(envExample)) {
            fs.copyFileSync(envExample, envFile);
            this.log("✅ .env file created from .env.example");

            try {
                // Generate application key
                this.log("🔑 Generating application key...");
                await execPromise(`cd ${mainRepoDir} && php artisan key:generate`);
                this.log("✅ Application key generated successfully!");
            } catch (error) {
                this.log(`❌ Key generation failed: ${error.message}`);
            }
        } else {
            this.log("⚠️ .env.example not found. Skipping .env setup.");
        }
    }
}
