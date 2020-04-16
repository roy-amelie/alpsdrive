let express = require('express');
let app = express();

app.use(express.static('./frontend/JS_alps-drive-project-frontend/'))

app.get('/', (request,response)=> {
    response.render('./frontend/JS_alps-drive-project-frontend/index.html')
})
app.get('/api/drive', (request,response)=>{
    console.log('bonjour')
})


function start (){
    app.listen(3000)
}
 module.exports={start}