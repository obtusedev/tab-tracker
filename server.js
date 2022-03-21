const fs = require("fs");
const path = require("path");

const dbFile = "DB.json";
const here = path.join(path.dirname(__dirname), dbFile);

function main() {
    if (fs.existsSync(dbFile)) {
        console.log(`DB file doesn't exists at ${dbFile}. Creating db file at ${here}`);
        fs.writeFile(dbFile, "{}", "utf8", (err) => {
            if (err) {
                throw err;
            }
            console.log(`File created.`);
        })
    }
}

main();
