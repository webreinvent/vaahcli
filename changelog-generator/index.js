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


//########## CODE TO GENERATE LOG FILE

const child = require("child_process");
const fs = require("fs");

const output = child
    .execSync(`git log --format=%B***%H----DELIMITER----`)
    .toString("utf-8");

//console.log('--->', output);




/*const commitsArray = output
    .split("----DELIMITER----\n")
    .map(commit => {
        const [message, sha] = commit.split("\n");
        return { sha, message };
    })
    .filter(commit => Boolean(commit.sha));*/

const commitsArray = output
    .split("----DELIMITER----\n").map(commit => {
        const [message, sha] = commit.split("***");
        return { sha, message };
    });

//console.log('--->', commitsArray);



const currentChangelog = fs.readFileSync("./CHANGELOG.md", "utf-8");
const currentVersion = Number(require("./../package.json").version);


const newVersion = currentVersion + 1;
let newChangelog = `# Version ${newVersion} (${
    new Date().toISOString().split("T")[0]
})\n\n`;


function findStringBetween(str, start, end) {
    let substring = str.substring(
        str.lastIndexOf(start),
        str.lastIndexOf(end)
    );

    return substring;
}

const features = [];
const chores = [];

let logs = [];
let log_type;


let log_message;

commitsArray.forEach(commit => {


    types.forEach(type=>{

        //console.log('--->type', type);

        log_type = type.replace("## ", "");



        if (commit.message.indexOf(log_type) !== -1) {

            //console.log('--->log_type', log_type);
            //console.log('--->commit.message', commit.message);

            log_message = findStringBetween(commit.message, log_type, '## ');

            //console.log('--->log_message', log_message);

            if(log_message)
            {

                if(logs.includes(log_type) == false)
                {
                    logs[log_type] = [];
                }

                logs[log_type].push(
                    `* ${log_message} ([${commit.sha.substring(
                        0,
                        6
                    )}](${
                        git_commit_url+commit.sha
                    }))\n`
                );
            }



        }
    });

});

//console.log('--->logs', logs['Added']);



types.forEach(type=>{

    log_type = type.replace("## ", "");

    console.log('--->log_type', log_type);
    console.log('--->logs[log_type]', logs[log_type]);

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

//console.log('--->', newChangelog);
//console.log('--->', newChangelog);


/*

if (features.length) {
    newChangelog += `## Features\n`;
    features.forEach(feature => {
        newChangelog += feature;
    });
    newChangelog += '\n';
}

if (chores.length) {
    newChangelog += `## Fixes\n`;
    chores.forEach(chore => {
        newChangelog += chore;
    });
    newChangelog += '\n';
}


fs.writeFileSync("./CHANGELOG.md", `${newChangelog}${currentChangelog}`);

*/
