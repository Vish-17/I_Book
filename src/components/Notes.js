import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes } = context;
    return (
        <div>
            <AddNote/>
            <div className="row my-3">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />;
                })}
            </div>
        </div>
    )
}

export default Notes
