const server = require('./server');
const fs= require ('fs');

fs.stat("/tmp/alpsdrive",function (err, stats){
    if(err){
        fs.mkdir('/tmp/alpsdrive',function (err){})
    }    
})

server.start();