const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use('/api/notes',require('./routes/notes'))


mongoose.connect('mongodb+srv://uzair:uzair5225@uzaircluster.fdml45t.mongodb.net/notes?retryWrites=true&w=majority').then(()=>{
    console.log("Connected!")
})




app.listen(5000,()=>{
  console.log("Application is Running...")
})