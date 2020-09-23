const express = require('express')
const app = express()

app.get ('/Javacs', function(req, res){
    res.send('Javacs');
})

app.listen(8080, function(){
    console.log("Bienvenidos a Javacs")
})