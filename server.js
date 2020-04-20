const express = require('express');
const path = require('path');
const drive = require('./drive');
const app = express();

app.use(express.static('./frontend/JS_alps-drive-project-frontend/'))

app.get('/', (req, res) => {
    res.render('./frontend/JS_alps-drive-project-frontend/index.html')
})

app.get('/api/drive', async (req, res) => {
    try {
        const files = await drive.readAlpsDir('');
        res.send(files);
    } catch (error) {
        res.send('Pas bon');
    }
});

app.get('/api/drive/:name',async (req,res)=>{
    const name = req.params.name
    try {
        const files = await drive.readAlpsDir(name);
        res.send(files);
    } catch (error) {
        res.send('error');
    }
});

app.delete('/api/drive/:name', async (req, res)=>{
    const name = req.params.name
    try {
        const del = await drive.deleteAlpsDir(name);
        res.send(del)
    } catch (e) {
        res.send(e)
    }
});

function start() {
    app.listen(8000)
}

module.exports = {start}