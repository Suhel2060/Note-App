
const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');




//Route 1:Get all the notes using GET: "/api/notes/fetchallnotes". login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error: ")
    }
})

//Route 2:Add a new notes using:  GET: "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be at least more than 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()

        res.json(savednote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error: ")
    }

})

//Route 3:update an existing Note notes using:  GET: "/api/notes/addnote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        
        const{title,description,tag}=req.body;
        // create a newNote object
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        
        
        //find the note to be updated and update it
        
        let note= await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error: ")
    }

})


//Route 4:Delete an existing Note notes using:  Delete: "/api/notes/addnote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
//find the note to be delete and delete it
try {
    
    let note= await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
    
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Sucess": "Note has been deleted"});
} catch (error) {
    console.log(error.message)
        res.status(500).send("Internal Server Error: ")
}

})


module.exports = router;