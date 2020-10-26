const fs = require('fs');
const path = require('path');

function parseINI(fileName) {
    let str = fs.readFileSync(fileName).toString();
    let pattern = /^((?!;).)+$/gm; // Match without comments
    let result = str.match(pattern);
    let objectFound = false;
    let object = { PHP: {} };
    let newObject;
    for (let i = 0; i < result.length; i++) {
        if (result[i].charAt(0) != '[' && objectFound == false) {
            var split = result[i].split('=');
            /* var split = result[i].match(/(?!\s+=\s+)/gm); */
            object.PHP[split[0].trim()] = split[1].trim();
        }
        /* else {
            if (newObject == null) {
                objectFound = true;
                console.log("objet !" + result[i]);
                newObject = {};
            }
        } */
    }
    console.log(JSON.stringify(object));

}

function parseENV() {

}

let fileName = process.argv[2];
let extension = path.extname(fileName)

if (extension == '.ini')
    parseINI(fileName);
else if (extension == '.env')
    parseENV();