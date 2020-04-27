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
        res.send(await drive.readAlpsDir(''));
    } catch (error) {
        res.send('Pas bon');
    }
});

//dans un second dossier
app.get('/api/drive/:name', async (req, res) => {
    try {
        res.send(await drive.readAlpsDir(req.params.name));
    } catch (error) {
        res.send('error');
    }
});

//creer un nouveau dossier
//a la racine du drive assync await
app.post('/api/drive/', async (req, res) => {
        const regex = new RegExp('^[\\d\\w\\s]+$')
        if (regex.test(req.query.name)) {
            try {
                res.send(await drive.createAlpsDir('', req.query.name))
            } catch (e) {
                res.send(e)
            }
        } else {
            res.status(400).send({error: 'pas bon'})
        }
    }
)
// //
//dans un autre dossier async await
app.post('/api/drive/:folder', async (req, res) => {
        const regex = new RegExp('^[\\d\\w\\s]+$')
        if (regex.test(eq.query.name)) {
            try {
                res.send(await drive.createAlpsDir(req.params.folder, eq.query.name))
            } catch (e) {
                res.send(e)
            }
        } else {
            res.status(400).send({error: 'pas bon'})
        }
    }
)

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

// // a la racine du drive callback
// app.post('/api/drive/:folder',(req, res)=>{
//     drive.createAlpsDir(req.params.folder, req.query.name, file => {
//         res.send(file)
//     })
// })


//supprimer un fichier ou dossier
//a la racine du drive
app.delete('/api/drive/:name', async (req, res) => {
    const regex = new RegExp('^[\\d\\w\\s]+$')
    if (regex.test(req.query.name)) {
        try {
            res.send(await drive.deleteAlpsDir('', req.params.name))
        } catch (e) {
            res.send(e)
        }
    } else {
        res.status(400).send({error: 'pas bon'})
    }
});

//dans un autre dossier
app.delete('/api/drive/:folder/:name', async (req, res) => {
    const regex = new RegExp('^[\\d\\w\\s]+$')
    if (regex.test(req.params.name)) {
        try {
            res.send(await drive.deleteAlpsDir(req.params.folder, req.params.name))
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
    try {
        res.send(await drive.uploadFile('', req.files.file))
    } catch (e) {
        res.send(e)
    }
})

app.put('/api/drive/:folder', async (req, res) => {
    try {
        res.send(await drive.uploadFile(req.params.folder, req.files.file))
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