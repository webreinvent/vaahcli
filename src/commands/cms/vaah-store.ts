import { Command } from '@oclif/core';
import * as path from 'path';
import simpleGit from 'simple-git';

export default class CmsInstall extends Command {
    static description = 'Download and install VaahStore and VaahCMS Module Store';

    async run() {
        const mainRepoUrl = 'https://github.com/webreinvent/vaahstore-ready.git';
        const mainRepoDir = path.join(process.cwd(), 'vaahstore-ready');

        const moduleRepoUrl = 'https://github.com/webreinvent/vaahcms-module-store.git';
        const moduleRepoDir = path.join(mainRepoDir, 'VaahCms/Modules', 'vaahcms-module-store');

        this.log("📥 Cloning VaahStore Ready...");

        try {
            await simpleGit().clone(mainRepoUrl, mainRepoDir);
            this.log("✅ VaahStore Ready cloned successfully!");

            // Ensure Modules directory exists
            const fs = require('fs');
            const modulesDir = path.join(mainRepoDir, 'VaahCms/Modules');
            if (!fs.existsSync(modulesDir)) {
                fs.mkdirSync(modulesDir, { recursive: true });
            }

            this.log("📥 Cloning VaahCMS Module Store...");
            await simpleGit().clone(moduleRepoUrl, moduleRepoDir);
            this.log("✅ VaahCMS Module Store cloned successfully!");
        } catch (error) {
            this.log("❌ Clone failed:", error);
        }
    }
}
