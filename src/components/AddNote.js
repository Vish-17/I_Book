import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useState, useEffect } from 'react';

//Socket
import io from 'socket.io-client'
// import {nanoid} from 'nanoid'

const socket = io.connect('http://localhost:4000')
//Socket

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})

    //Socket
    const [sendNotes, setSendNotes] = useState([])
    //Socket
    const {showAlert} = props
    const handleClick = (e)=>{
        e.preventDefault();

        //Socket Emition
        socket.emit("noteshare", {note})
        //Socket Emition end

        //If not workinf then comment the addNote and showAlert in useEffect and uncomment below two lines of code
        addNote(note.title, note.description, note.tag)
        showAlert("Your Notes has been added","success")

        setNote({title:"", description:"", tag:""})
    };

    useEffect(() => {
      socket.on("noteshare",(payload)=>{
        setSendNotes([...sendNotes, payload])
        // addNote(note.title, note.description, note.tag)        
        showAlert("Your Notes has been added","success")
      })
    })
    



    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


    // const sendNotes = (e)=>{
    //     e.preventDefault();
        
    // }

    return (
        <div className="container my-3">
            <h1>Add Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag:</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
            </form>
            <h1>Your Notes</h1>
            
        </div>
    )
}

export default AddNote