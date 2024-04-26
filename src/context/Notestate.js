import React, { useState } from "react";
import NoteContext from "./notecontext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = [];
  // const s1={
  //     "name":"suhel",
  //     "class":"bachelor"
  // }
  // const [state, setstate] = useState(s1)
  // const update=()=>{
  //     setTimeout(()=>{
  //         setstate({
  //             "name":"sachin",
  //             "class":"master"
  //         })
  //     },3000)
  // }
  const [notes, setnotes] = useState(notesinitial);

  //fetch all notes a Note
  const fetchnotes = async () => {
    //to do api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json=await response.json();
     console.log("hello")
    setnotes(json)
  
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    //to do api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });    
    const json=await response.json();
    console.log(json)

// logic to add note
    setnotes(notes.concat(json))
    console.log("notes added");
  }


  //Delete a Note
  const deleteNote = async (noteid) => {
    //to do api call
  
    const response = await fetch(`${host}/api/notes/deletenote/${noteid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json=await response.json();
     console.log(json)
    setnotes(json)

    //logic for delete
    console.log(`note with id ${noteid} is being deleted`);
    const newnotes = notes.filter((notes) => notes._id !== noteid);
    setnotes(newnotes)

  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
  
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json =await response.json();
    console.log(json)



let newNote=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag
        console.log("data")
        setnotes(newNote)
        break;
      }




    }

  }
  const [login, setlogin] = useState(false)
  const logout=()=>{
    localStorage.removeItem('token');
    setlogin(false);
  }
  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote,fetchnotes,setlogin,login,logout}}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;