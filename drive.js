const fs = require('fs');
const os = require('os');
const tmp = os.tmpdir();

function sizeFile(item) {
    const path = '/tmp/alpsdrive/' + item.name;
    const file = fs.statSync(path);
    return file.size;
}

function folderList() {
    const read = fs.promises.readdir('/tmp/alpsdrive/', {withFileTypes: true});
    const json_result = read.then(data => {
        let json = [];
        for (const item of data) {
            if (item.isDirectory()) {
                json.push({
                    name: item.name,
                    isFolder: true
                })
            } else {
                const size = sizeFile(item)

                const objet = {
                    name: item.name,
                    size: size,
                    isFolder: false
                };
                json.push(objet)
            }
        }
        console.log(json)
        return json
    })
    console.log(json_result)
    return json_result
}

module.exports = {folderList}

