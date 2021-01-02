import { Command } from '@oclif/command';
export default class CmsCrud extends Command {
    questions: {
        [k: string]: any;
    };
    inputs: {
        [k: string]: any;
    };
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        name: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: {
        name: string;
        required: boolean;
        default: string;
    }[];
    run(): Promise<void>;
    successMessage(): void;
}
