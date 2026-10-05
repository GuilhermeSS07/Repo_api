const express = require('express');

const api = express()

const ejs = require('ejs');

const {MongoClient} = require('mongodb');

const dotenv = require('dotenv');

dotenv.config();

const nodemon = require('nodemon');

const url = process.env.DATABASE_URL;

const ObjectId = require('mongodb').ObjectId;

const client = new MongoClient(url);    

const db = client.db("pessoa");

const collection = db.collection("crud");


api.listen(3000, function(){
   console.log("O servidor está rodando na porta 3000")

})

api.get("/", (req, res) => {
    res.send("Olá mundo")
});

