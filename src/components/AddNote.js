import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useState } from 'react';


const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const {showAlert} = props
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        showAlert("Your Notes has been added","success")
        setNote({title:"", description:"", tag:""})
    }; 

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

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