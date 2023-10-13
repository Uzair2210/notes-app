const mongoose = require('mongoose')


const notesModel = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required:true,
        unique:true
    },
    desc: {
        type: String,
        trim: true,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model("notes", notesModel)