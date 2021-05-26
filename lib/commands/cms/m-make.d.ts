import { Command } from '@oclif/command';
export default class CmsMMake extends Command {
    questions: {
        [k: string]: any;
    };
    args: {
        [k: string]: any;
    };
    flags: {
        [k: string]: any;
    };
    inputs: {
        [k: string]: any;
    };
    static description: string;
    static flags: {
        frontend: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        backend: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        name: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
    };
    static args: ({
        name: string;
        required: boolean;
        options: string[];
    } | {
        name: string;
        required: boolean;
        options?: undefined;
    })[];
    run(): Promise<true | undefined>;
}
