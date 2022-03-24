export default class Generator {
    args: {
        [k: string]: any;
    };
    flags: {
        [k: string]: any;
    };
    inputs: {
        [k: string]: any;
    };
    skeleton_dir: string;
    target_dir: string;
    constructor(args: object, flags: object, inputs: object, skeleton_dir: string, target_dir: string);
    lowerCase(str: string): string;
    upperCase(str: string): string;
    removeNonWord(str: string): string;
    replaceAccents(str: string): string;
    toCamelCase(str: string): string;
    /**
     * camelCase + UPPERCASE first char
     */
    toPascalCase(str: string): string;
    setLowerAndUpperCaseValues(): void;
    scanRecursiveFiles(dir: string, files?: any[]): any[];
    getFilesFromSkeletonDirector(): any[];
    files(): void;
    file(): void;
    getFileDestination(file_path: string): string;
    copyFilesToDestination(file_path: string): void;
    copyCrudFilesToDestination(file_path: string): void;
    curdFiles(): void;
    getDateTimeForMigrationFile(): any;
    generateCrudFiles(): void;
    generateAuthFiles(): void;
}
