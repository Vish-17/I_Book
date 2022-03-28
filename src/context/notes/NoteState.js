import NoteContext from "./noteContext";
import { useState } from "react";

const NoteSate = (props) => {
  const noteIntial = [
    {
      "_id": "62398a2807928reed70175285",
      "user": "6232d30f0fc7dd787fdc4bd6",
      "title": "This is me updated",
      "description": "This is just check",
      "tag": "General",
      "date": "2022-03-22T08:34:48.869Z",
      "__v": 0
    },
    {
      "_id": "62398a2807928eede70175285",
      "user": "6232d30f0fc7dd787fdc4bd6",
      "title": "This is me updated",
      "description": "This is just check",
      "tag": "General",
      "date": "2022-03-22T08:34:48.869Z",
      "__v": 0
    },
    {
      "_id": "62398a2807928efed70175285",
      "user": "6232d30f0fc7dd787fdc4bd6",
      "title": "This is me updated",
      "description": "This is just check",
      "tag": "General",
      "date": "2022-03-22T08:34:48.869Z",
      "__v": 0
    },
    {
      "_id": "62398a2807928eed70d175285",
      "user": "6232d30f0fc7dd787fdc4bd6",
      "title": "This is me updated",
      "description": "This is just check",
      "tag": "General",
      "date": "2022-03-22T08:34:48.869Z",
      "__v": 0
    },
    {
      "_id": "62398a2807928eed701a75285",
      "user": "6232d30f0fc7dd787fdc4bd6",
      "title": "This is me updated",
      "description": "This is just check",
      "tag": "General",
      "date": "2022-03-22T08:34:48.869Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(noteIntial)

  //add a noted
  const addNote = (title, description, tag) => {
    const note = {
      "_id": "62398a2807928ee4d701a75285",
      "user": "6232d30f0fc7dd787fdc4bd6",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-03-22T08:34:48.869Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  //delete a node
  const deleteNote = (id) => {
    console.log("Deleting the Node with id " + id);
    const newNote = notes.filter((note)=>{return note._id!=id});
    setNotes(newNote);
  }

  //Edit a note
  const editNote = () => {

  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteSate;