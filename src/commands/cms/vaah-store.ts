import { Command } from '@oclif/core';
import * as path from 'path';
import simpleGit from 'simple-git';
import { execSync } from 'child_process';
import * as fs from 'fs';

export default class CmsInstall extends Command {
    static description = 'Download and install VaahStore and VaahCMS Module Store';

    async run() {
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

            // Run `composer install`
            this.log("📦 Running 'composer install' inside vaahstore-ready...");
            execSync(`composer install --no-interaction --no-cache`, { cwd: mainRepoDir, stdio: 'inherit' });
            this.log("✅ Composer install completed!");

            // Run `npm install`
            this.log("📦 Running 'npm install' inside vaahstore-ready...");
            execSync(`npm install`, { cwd: mainRepoDir, stdio: 'inherit' });
            this.log("✅ npm install completed!");

            // Copy .env.example to .env
            const envExample = path.join(mainRepoDir, '.env.example');
            const envFile = path.join(mainRepoDir, '.env');

            if (fs.existsSync(envExample)) {
                fs.copyFileSync(envExample, envFile);
                this.log("✅ .env file created from .env.example");

                // Run `php artisan key:generate`
                this.log("🔑 Generating application key...");
                execSync(`php artisan key:generate`, { cwd: mainRepoDir, stdio: 'inherit' });
                this.log("✅ Application key generated successfully!");
            } else {
                this.log("⚠️ .env.example not found. Skipping .env setup.");
            }

        } catch (error) {
            this.log("❌ Installation failed:", error);
        }
    }
}
