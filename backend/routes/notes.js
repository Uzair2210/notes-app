const NotesModel = require("../models/notes")
const router = require('express').Router()




router.post('/',async (req,res)=>{
    try {
        
        const note = await NotesModel.create(req.body)

        res.status(201).json({
            success:true,
            message:note
        })

    } catch (error) {


        if(error.code == 11000){
            res.status(409).json({
                success:false,
                message:"Title Already Exist!"
            })
            return
        }

        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again later."
        })
    }
})

router.get('/',async (req,res)=>{
    try {
        
        const notes = await NotesModel.find()

        res.status(200).json({
            success:true,
            message:notes
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again later."
        })
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        
        const note = await NotesModel.findByIdAndDelete(req.params.id)

        if(!note){
            res.status(404).json({
                success:false,
                message:"Not Found!"
            })
            return
        }

        res.status(201).json({
            success:true,
            message:"Deleted Successfully!"
        })

    } catch (error) {


        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again later."
        })
    }
})

router.put('/:id',async (req,res)=>{
    try {
        
        const notes = await NotesModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

        res.status(201).json({
            success:true,
            message:notes
        })

    } catch (error) {

        
        if(error.code == 11000){
            res.status(409).json({
                success:false,
                message:"Title Already Exist!"
            })
            return
        }


        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again later."
        })
    }
})







module.exports = router