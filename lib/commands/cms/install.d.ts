import { Command } from '@oclif/command';
export default class CmsInstall extends Command {
    inputs: {
        [k: string]: any;
    };
    spinner: {
        [k: string]: any;
    };
    repo: string;
    target_dir: string;
    static description: string;
    static flags: {
        here: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
    };
    static args: {
        name: string;
        description: string;
        default: string;
    }[];
    run(): Promise<void>;
    install(): Promise<void>;
    spin(): Promise<void>;
    spinStop(): Promise<void>;
}
