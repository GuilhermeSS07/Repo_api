const express = require('express');
const api = express()
const drive = "mongodb+srv://gui2007s_db_user:admin@cluster0.z8hgf6n.mongodb.net/?appName=Cluster0"


//mongodb+srv://gui2007s_db_user:admin@cluster0.z8hgf6n.mongodb.net/?appName=Cluster0

api.listen(3000, function(){
   console.log("O servidor está rodando na porta 3000")

})

api.get("/", (req, res) => {
    res.send("Ola mundo")
});

