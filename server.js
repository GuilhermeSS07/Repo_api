const express = require("express")
const api = express()
const {mongoClient, MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const url = process.env.DATABASE_URL
const ObjectId = require("mongodb").ObjectId
const client = new MongoClient(url)
let collection
api.use(express.static('public'));

api.set("view engine","ejs")
api.use(express.urlencoded({ extended: true }))
api.get("/index",(req,res)=>{
    res.render("index.ejs")
})

//cadastrar um novo usuario

api.post("/show", async (req, res)=>{
    await collection.insertOne({
        nomeCompleto:req.body.nomeCompleto,
        email:req.body.email,
    })
    res.redirect("/show")
})

api.get("/show", async (req, res)=>{
    const crud = await collection.find().toArray()
    // visualizar o registro no Show.ejs
    res.render("show.ejs", {crud})
})

api.post("/edit/:id", async (req, res)=>{  //function do servidor
    await collection.updateOne({_id: new ObjectId(req.params.id)},  // Banco de dados
    {$set:{
        nomeCompleto:req.body.nomeCompleto, 
        email:req.body.email}})
    res.redirect("/show")
})
// criar o servidor e iniciar o servido e o banco

async function iniciar(){
    await client.connect()
    const db = client.db("Guardalink")
    collection = db.collection("crud")
    console.log("Conectado ao banco de dados!")

    api.listen(3000, ()=>{
        console.log("Servidor rodando na porta 3000")
    })
}

iniciar().catch(function(erro){
    console.log("Erro ao iniciar a aplicação: " + erro)
})

// Visualizar o editar

api.get("/edit/:id", async (req, res)=>{
    const crud = await collection.find(
        {_id: new ObjectId(req.params.id)}).toArray()
    res.render('edit.ejs', {crud})
})


//deletar um registro

api.get("/delete/:id", async (req, res)=>{
    await collection.deleteOne({_id: new ObjectId(req.params.id)})
    res.redirect("/show")
})
