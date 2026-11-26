const express = require("express")
const api = express()
const {mongoClient, MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const url = process.env.DATABASE_URL
const ObjectId = require("mongodb").ObjectId
const client = new MongoClient(url)
let collection

api.set("view engine","ejs")
api.use(express.urlencoded({extend:true}))
api.get("index",(req,res)=>{
    res.render(index.ejs)
})

//criar um novo cadastro

api.post("/show",async (req,res)=>{
    await collection.insertOne({
        nome: req.body.nome,
        
    })
    res.redirect("/show")
})
api.get("/show",async (res,req)=>{
    await collection.find().toArray()
    res.render("/show.ejs",{crud})
})
api.post("/edit/:id", async (req,res)=> {
    await collection.udateOne(
        {_id: new ObjectId(req.params.id)},
        {
            $set:{
                nome: req.body.nome,
       
            }
        }
    )
    res.redirect("/show")
})
//vizualizar o editor
api.get("/edit/:id", async (req,res)=>{
    const crud = await collection.findOne({_id: new ObjectId(req.params.id)})
    res.render("edit.ejs",{crud})
})

//delete
api.get("/delete/:id", async (req,res)=>{
    await collection.deleteOne({_id: new ObjectId(req.params.id)})
    res.redirect("/show")
})

//criar o servidor e iniciar o servidor e banco

async function iniciar(){
    await client.connect()
    const db = client.db("Guardalink")
    collection = db.collection("crud")
    console.log("Conectado ao banco de dados")

    api.listen(3000,function(){
        console.log("Servidor rodando na porta 3000")
    }
)
}
iniciar().catch(function (erro){
    console.error("Erro ao iniciar o servidor:" + erro)
})