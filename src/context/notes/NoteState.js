import NoteContext from "./noteContext";
import { useState } from "react";

const NoteSate = (props) => {
  const host = 'http://localhost:5000'
  const noteIntial = []
  const [notes, setNotes] = useState(noteIntial)

  const authtoken = localStorage.getItem('token');

  //Geting a note
  const getNote = async () => {
    //Calling Api to Add a note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }





  //add a noted
  const addNote = async (title, description, tag) => {
    //Calling Api to Add a note
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken
      },
      body: JSON.stringify({ title, description, tag }) 
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }






  //delete a node
  const deleteNote = async (id) => {
    //Calling Api to Delete a note
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken
      },
    });
    const json = await response.json();
    console.log(json);


    //Checking the deleting Note
    console.log("Deleting the Node with id " + id);
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }





  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Calling ApI
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();


    let newNotes = JSON.parse(JSON.stringify(notes))
    //Login to Edit Note
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }

    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteSate;