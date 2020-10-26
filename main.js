const fs = require('fs');
const path = require('path');

function parseINI(fileName) {

    let str = fs.readFileSync(fileName).toString();
    let pattern = /^((?!;).)+$/gm; // Match without comments ";"
    let result = str.match(pattern);
    let newSectionData;
    let newSectionName;
    let writtenObject = { };

    for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
        let isSection = /^\[+?/.test(result[i]); // Regex to check if line is section "[...]"
        if (!isSection && newSectionData == null) {
            let split = result[i].match(/(\w+)*=*(\w+)/gm); // Regex to extract data between "="
            writtenObject[split[0]] = split[1];
        }
        else if (isSection) {
            if (newSectionData != null && Object.keys(newSectionData).keys > 0)
                writtenObject[newSectionName] = newSectionData;
            newSectionData = {};
            // Regex to extrat section name which is between '[' and ']'
            newSectionName = result[i].match(/(?<=\[)(.*?)(?=\])/gm)[0].toString();
            writtenObject[newSectionName] = {};
        }
        else if (!isSection && Object.keys(newSectionData).length == 0) {
            let splitForSection = result[i].match(/(\w+)*=*(\w+)/gm); // Regex to extract data between "="
            writtenObject[newSectionName][splitForSection[0]] = splitForSection[1];
        }
        
    }
    console.log(JSON.stringify(writtenObject));

}

function parseENV() {

}

let fileName = process.argv[2];
let extension = path.extname(fileName)

if (extension == '.ini')
    parseINI(fileName);
else if (extension == '.env')
    parseENV();