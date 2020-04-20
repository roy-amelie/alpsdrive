const fs = require('fs');
const path = require('path');


async function readAlpsDir(name) {
    const stats = await fs.promises.stat('/tmp/alpsdrive/' + name)
    if (stats.isDirectory()) {
        return readFolder(name)
    } else {
        return readFile(name)
    }
}

async function readFolder(name) {
    const files = await fs.promises.readdir('/tmp/alpsdrive/' + name, {withFileTypes: true});
    return files.map(file => ({name: file.name, isFolder: file.isDirectory()}));
}

async function readFile(name) {
    return file = await fs.promises.readFile('/tmp/alpsdrive/' + name)
}

async function deleteAlpsDir(name) {
    const typeFile = path.extname(name)
    if (typeFile.includes('.')) {
        fs.unlink('/tmp/alpsdrive/' + name, (err) => {
            if (err) throw err;
        })
    } else {
        fs.rmdir('/tmp/alpsdrive/' + name, (err) => {
            if (err) throw err;
        })
    }
}

module.exports = {readAlpsDir, deleteAlpsDir};

