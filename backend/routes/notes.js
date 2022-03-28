const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');




//ROUTE 1: Get All Notes using: 'api/notes/fetchallnotes.  login require'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }

})


//ROUTE 2: Add Notes using: 'api/notes/addnotes.  login require'
router.post('/addnotes', fetchuser, [
    body('title', 'Add valid title').isLength({ min: 3 }),
    body('description', 'add valid description').isLength({ min: 5 })
], async (req, res) => {

    //Checking error if true return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const {title, description, tag} =req.body;
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await notes.save();
        res.json(saveNotes)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})

//ROUTE 3: update existing Notes using: 'api/notes/updatenotes/:id.  login require'
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    
    try {
        const {title, description, tag} =req.body;

        //New Notes to update the notes
        const newNotes = {}

        if(title){newNotes.title =title}
        if(description){newNotes.description =description}
        if(tag){newNotes.tag =tag}


        //Finding notes in database to upadate it
        let notes = await Notes.findById(req.params.id)
        if(!notes){
            return res.status(401).send("Note Not Found")
        }
        if(notes.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, {$set:newNotes}, {new:true})
        res.json(notes)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})


//ROUTE 4: Delete existing Notes using: 'api/notes/deletenotes/:id.  login require'
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    
    try {
        //Finding notes for deleting to delete it
        let notes = await Notes.findById(req.params.id)
        if(!notes){
            return res.status(401).send("Note Not Found")
        }

        //Allowing deletion if user owns this notes
        if(notes.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Notes has been deleted",notes:notes})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})

module.exports = router