import React,{useContext, useState} from 'react'
import noteContext from '../context/notecontext';

const InsertNote = (props) => {
    const context = useContext(noteContext);
    const {notes,addNote}=context;
const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
    addNote(note.title,note.description,note.tag)
    props.showalert("Notes added successfully","success")
    setNote({title:"",description:"",tag:""})
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name] : e.target.value})

    }
  return (
    <div>
      <div className="container my-4">
        <h3>Add Notes</h3>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onChange} minLength={3} required value={note.title}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required value={note.description}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<5}type="submit" className="btn btn-primary" onClick={handleClick}>Add Notes</button>
        </form>
      </div>
    </div>

  )
}

export default InsertNote
