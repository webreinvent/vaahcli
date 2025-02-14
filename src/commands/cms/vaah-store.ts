import { Command } from '@oclif/core';
const download = require('download-git-repo'); // Use require instead of import
import * as path from 'path';

export default class CmsInstall extends Command {
    static description = 'Download and install VaahCMS Module Store';

    async run() {
        const repo = 'webreinvent/vaahcms-module-store'; // GitHub repo
        const targetDir = path.join(process.cwd(), 'vaahcms-module-store'); // Download location

        this.log("📥 Downloading VaahCMS Module Store...");

        download(repo, targetDir, (err: any) => {
            if (err) {
                this.log("❌ Download failed:", err);
            } else {
                this.log("✅ Download complete! Module stored in:", targetDir);
            }
        });
    }
}
