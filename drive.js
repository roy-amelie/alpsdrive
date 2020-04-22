const fs = require('fs');
const path = require('path');

// lire ce qu'il y a dasn le drive
async function readAlpsDir(name) {
    const stats = await fs.promises.stat('/tmp/alpsdrive/' + name)
    if (stats.isDirectory()) {
        return readFolder(name)
    } else {
        return readFile(name)
    }
}

//lire un dossier
async function readFolder(name) {
    const files = await fs.promises.readdir('/tmp/alpsdrive/' + name, {withFileTypes: true});
    return Promise.all(files.map(file => mapFile(name , file)));
}

async function mapFile(name, file) {
    if (file.isDirectory()) {
        return {
            name: file.name,
            isFolder: true
        }
    } else {
        console.log(file)
        return {
            name: file.name,
            size: await fileSize(name, file),
            isFolder: false
        }
    }
}


async function fileSize(name, file) {
    const stats = await fs.promises.stat(path.join('/tmp/alpsdrive/' , name , file.name))
    return stats.size
}

//lire un fichier
async function readFile(name) {
    return file = await fs.promises.readFile('/tmp/alpsdrive/' + name)
}

//supprimer un fichier ou un dossier
async function deleteAlpsDir(folder, name) {
    const stats = await fs.promises.stat('/tmp/alpsdrive/' + name)
    //supprimmer un dossier
    if (stats.isDirectory()) {
        //dans un dossier secondaire
        if (folder !== '') {
            fs.rmdir('/tmp/alpsdrive/' + folder + '/' + name, {recursive: true}, (err) => {
                if (err) throw err;
            })
            // a la racine du drive
        } else {
            fs.rmdir('/tmp/alpsdrive/' + name, {recursive: true}, (err) => {
                if (err) throw err;
            })
        }
    } else {
        // supprimer un fichier
        //dans un dossier secondaire
        if (folder !== '') {
            fs.unlink('/tmp/alpsdrive/' + folder + '/' + name, (err) => {
                if (err) throw err;
            })
            //a la racine du drive
        } else {
            fs.unlink('/tmp/alpsdrive/' + name, (err) => {
                if (err) throw err;
            })
        }
    }
}

//creer un noouveau dossier
async function createAlpsDir(folder, name) {
    const stats = await fs.promises.stat('/tmp/alpsdrive/' + folder)
    if (stats.isDirectory()) {
        // dans un sossier secondaire
        if (folder !== '') {
            fs.mkdir('/tmp/alpsdrive/' + folder + '/' + name, (err) => {
                if (err) throw err;
            })
            // a la racine du drive
        } else {
            fs.mkdir('/tmp/alpsdrive/' + name, (err) => {
                if (err) throw err;
            })
        }
    }
}

//upload un fichier
async function uploadFile() {
    console.log('bonjour')
}


// exports
module.exports = {readAlpsDir, deleteAlpsDir, createAlpsDir, uploadFile};

