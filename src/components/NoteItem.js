import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNotes } = props;
    const {showAlert} = props
    return (
        <div className="col-md-3">
            <div className="card mb-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
    
                        <i className="fa-solid fa-trash-arrow-up mx-2 " onClick={()=>{deleteNote(note._id); showAlert("Note is deleted", "success") }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2 " onClick={()=>{updateNotes(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
