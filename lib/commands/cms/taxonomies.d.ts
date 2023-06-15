import { Command } from '@oclif/command';
export default class CmsCrud extends Command {
    args: {
        [k: string]: any;
    };
    flags: {
        [k: string]: any;
    };
    primary: {
        [k: string]: any;
    };
    inputs: {
        [k: string]: any;
    };
    primary_inputs: {
        [k: string]: any;
    };
    spinner: {
        [k: string]: any;
    };
    repo: string;
    target_dir: string;
    source_dir: string;
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: never[];
    run(): Promise<true | undefined>;
    successMessage(): void;
}
