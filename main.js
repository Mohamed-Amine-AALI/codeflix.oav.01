const fs = require('fs');
const path = require('path');

function parseINI(fileName) {

    let str = fs.readFileSync(fileName).toString();
    let pattern = /^((?!;).)+$/gm; // Match without comments ";"
    let lines = str.match(pattern);
    let newSectionData;
    let newSectionName;
    let writtenObject = {};

    lines.forEach(line => {
        let isSection = /^\[+?/.test(line); // Regex to check if line is section "[...]"
        if (!isSection && newSectionData == null) {
            let split = line.match(/(\w+)*=*(\w+)/gm); // Regex to extract data between "="
            writtenObject[split[0]] = split[1];
        }
        else if (isSection) {
            if (newSectionData != null && Object.keys(newSectionData).keys > 0)
                writtenObject[newSectionName] = newSectionData;
            newSectionData = {};
            // Regex to extrat section name which is between '[' and ']'
            newSectionName = line.match(/(?<=\[)(.*?)(?=\])/gm)[0].toString();
            if (newSectionName != "PHP")
                writtenObject["PHP"][newSectionName] = {};
            else writtenObject[newSectionName] = {};
        }
        else if (!isSection && Object.keys(newSectionData).length == 0) {
            let splitForSection = line.match(/(\w+)*=*(\w+)/gm); // Regex to extract data between "="
            if (newSectionName != "PHP")
                writtenObject["PHP"][newSectionName][splitForSection[0]] = splitForSection[1];
            else writtenObject[newSectionName][splitForSection[0]] = splitForSection[1];
        }
    });

    let jsonToWrite = JSON.stringify(writtenObject);
    let writeFileName = "php.20181003133700.json";
    fs.writeFile(writeFileName, jsonToWrite, 'utf8', (err, content) => {
        if (!err)
            console.log(`File ${writeFileName} has been successfully created`)
    });

}

function parseENV(fileName) {

}

let fileName = process.argv[2];
let extension = path.extname(fileName)

if (extension == '.ini')
    parseINI(fileName);
else if (extension == '.env')
    parseENV(fileName);