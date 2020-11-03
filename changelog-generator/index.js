//########## VARIABLES TO UPDATE

let git_commit_url = "https://github.com/webreinvent/vaahcli/commit/";

let types = [
    "## Added",
    "## Changed",
    "## Deprecated",
    "## Removed",
    "## Fixed",
    "## Security",
];

let changelog_path = "./CHANGELOG.md";


//########## CODE TO GENERATE LOG FILE

const child = require("child_process");
const fs = require("fs");

const output = child
    .execSync(`git log --format=%B***%H----DELIMITER----`)
    .toString("utf-8");



const commitsArray = output
    .split("----DELIMITER----\n").map(commit => {
        const [message, sha] = commit.split("***");
        return { sha, message };
    });



if (!fs.existsSync(changelog_path)) {
    fs.writeFileSync(changelog_path);
}

const currentChangelog = fs.readFileSync(changelog_path, "utf-8");


//const currentVersion = Number(require("./../package.json").version);
const currentVersion = require("./../package.json").version;


const newVersion = currentVersion;

let newChangelog = `# Version ${newVersion} (${
    new Date().toISOString().split("T")[0]
})\n\n`;


function findStringBetween(str, start, end) {
    let substring = str.substring(
        str.lastIndexOf(start),
        str.lastIndexOf(end)
    );
    return substring.replace(start, "");
}


let logs = [];
let log_type;


let log_message;

commitsArray.forEach(commit => {


    types.forEach(type=>{


        log_type = type.replace("## ", "");



        if (commit.message.indexOf(log_type) !== -1) {


            log_message = findStringBetween(commit.message, log_type, '## ');

            log_message.replace(log_type, "");

            //console.log('--->log_message', log_message);

            if(log_message)
            {

                if(logs.includes(log_type) == false)
                {
                    logs[log_type] = [];
                }

                logs[log_type].push(
                    ` ([${commit.sha.substring(
                        0,
                        6
                    )}](${
                        git_commit_url + commit.sha
                    }))\n${log_message}`
                );
            }



        }
    });

});



types.forEach(type=>{

    log_type = type.replace("## ", "");


    if (logs[log_type] && logs[log_type].length) {
        newChangelog += `## ${log_type}\n`;

        console.log('--->newChangelog', newChangelog);

        logs[log_type].forEach(item => {
            newChangelog += item;
        });
        newChangelog += '\n';
    }

});


fs.writeFileSync("./CHANGELOG.md", `${newChangelog}${currentChangelog}`);

