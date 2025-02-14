import { Command } from '@oclif/core';

export default class CmsInstall extends Command {
    static description = 'Simple Hello Command';

    async run() {
        this.log("Hello World");
    }
}
