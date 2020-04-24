const express = require('express');
const path = require('path');
const drive = require('./drive');
const app = express();
const bb = require('express-busboy');
const os = require('os')

//fichiers statiques
app.use(express.static('./frontend/JS_alps-drive-project-frontend/'))

app.get('/', (req, res) => {
    res.render('./frontend/JS_alps-drive-project-frontend/index.html')
})

bb.extend(app, {
    upload: true,
    path: os.tmpdir(),
})

//voir les dossiers et fichiers
//a la racine du drive
app.get('/api/drive', async (req, res) => {
    try {
        const files = await drive.readAlpsDir('');
        res.send(files);
    } catch (error) {
        res.send('Pas bon');
    }
});

//dans un second dossier
app.get('/api/drive/:name', async (req, res) => {
    const name = req.params.name
    try {
        const files = await drive.readAlpsDir(name);
        res.send(files);
    } catch (error) {
        res.send('error');
    }
});

// //creer un nouveau dossier
// // //a la racine du drive assync await
// // app.post('/api/drive/', async (req, res) => {
// //         const name = req.query.name
// //         const regex = new RegExp('^[\\d\\w\\s]+$')
// //         if (regex.test(name)) {
// //             try {
// //                 const create = await drive.createAlpsDir('', name);
// //                 res.send(create)
// //             } catch (e) {
// //                 res.send(e)
// //             }
// //         } else {
// //             res.status(400).send({error: 'pas bon'})
// //         }
// //     }
// // )
// //
// // //dans un autre dossier async await
// // app.post('/api/drive/:folder', async (req, res) => {
// //         const folder = req.params.folder;
// //         const name = req.query.name;
// //         const regex = new RegExp('^[\\d\\w\\s]+$')
// //         if (regex.test(name)) {
// //             try {
// //                 const create = await drive.createAlpsDir(folder, name);
// //                 res.send(create)
// //             } catch (e) {
// //                 res.send(e)
// //             }
// //         } else {
// //             res.status(400).send({error: 'pas bon'})
// //         }
// //     }
// // )

// //a la racine du drive promise
// app.post('/api/drive', (req, res) => {
//     const name = req.query.name
//     drive.createAlpsDir('',name)
//         .then(create => res.send(create))
//         .catch(err => res.send(err))
// })
//
// //dans un autre dossier
// app.post('/api/drive/:folder', (req, res) =>{
//     const name = req.query.name
//     const folder = req.params.folder
//     drive.createAlpsDir(folder,name)
//         .then(create => res.send(create))
//         .catch(err => res.send(err))
// })

// a la racine du drive callback
app.post('/api/drive/:folder',(req, res)=>{
    const folder= req.params.folder
    const name= req.query.name
    drive.createAlpsDir(folder, name, file => {
        res.send(file)
    })
})


//supprimer un fichier ou dossier
//a la racine du drive
app.delete('/api/drive/:name', async (req, res) => {
    const name = req.params.name
    const regex = new RegExp('^[\\d\\w\\s]+$')
    if (regex.test(name)) {
        try {
            const del = await drive.deleteAlpsDir('', name);
            res.send(del)
        } catch (e) {
            res.send(e)
        }
    } else {
        res.status(400).send({error: 'pas bon'})
    }
});

//dans un autre dossier
app.delete('/api/drive/:folder/:name', async (req, res) => {
    const name = req.params.name
    const folder = req.params.folder
    const regex = new RegExp('^[\\d\\w\\s]+$')
    if (regex.test(name)) {
        try {
            const del = await drive.deleteAlpsDir(folder, name);
            res.send(del)
        } catch (e) {
            res.send(e)
        }
    } else {
        res.status(400).send({error: 'pas bon'})
    }
})

//upload un nouveau fichier
//a la racine du drive
app.put('/api/drive/', async (req, res) => {
    const folder = req.params;
    const file = req.files.file;
    try {
        const upload = await drive.uploadFile('', file);
        res.send(upload)
    } catch (e) {
        res.send(e)
    }
})

app.put('/api/drive/:folder', async (req, res) => {
    const folder = req.params.folder
    const file = req.files.file;
    try {
        const upload = await drive.uploadFile(folder, file);
        res.send(upload)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

//lancer le serveur
function start() {
    app.listen(3000)
}

//export
module.exports = {start}