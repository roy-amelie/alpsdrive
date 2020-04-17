const express = require('express');
const drive = require('./drive');
const app = express();

app.use(express.static('./frontend/JS_alps-drive-project-frontend/'))

app.get('/', (req, res) => {
    res.render('./frontend/JS_alps-drive-project-frontend/index.html')
})
app.get('/api/drive', (req, res) => {
    const jsonpromise = drive.folderList()
    jsonpromise.then((result) => res.send(result));
});


function start() {
    app.listen(3000)
}

module.exports = {start}