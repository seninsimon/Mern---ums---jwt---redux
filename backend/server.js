const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mern1').then(()=>console.log("connected to mongodb"))
const cors = require('cors')
const router = require('./routes/userroutes')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(router)


















app.listen(3000,()=>
{
    console.log("server is running");
    
})