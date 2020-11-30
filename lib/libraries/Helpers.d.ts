export default class Helpers {
    args: {
        [k: string]: any;
    };
    flags: {
        [k: string]: any;
    };
    inputs: {
        [k: string]: any;
    };
    constructor(args: object, flags: object, inputs: object);
    setLowerAndUpperCaseValues(): void;
    replaceAll(str: string, find: string, replace: string): string;
    titleCase(str: string): string;
    getClassName(str: string): string;
    getMigrationFileName(str: string): string;
    getMigrationTableName(str: string): string;
    getDerivedVariables(): {
        namespace: string;
        target_dir: string;
        table_name: string;
        class_name: string;
        file_name: string;
    };
}
