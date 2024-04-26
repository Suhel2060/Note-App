import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notecontext';
import Noteitem from './Noteitem';
import InsertNote from './InsertNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchnotes,editNote,login } = context;
  const ref = useRef(null)
  const refClose = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
    fetchnotes();
    }else{
    navigate('/login');
    }
  }, [])
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentnote) => {
    ref.current.click()
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
   
  }

  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showalert("updated note succesfully","success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' minLength={3} required onChange={onChange} value={note.etitle} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription'minLength={5} required onChange={onChange} value={note.edescription} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<3 || note.edescription.length<5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <InsertNote showalert={props.showalert}/>
      <div className=" container row my-4">
        <h3>Your Notes</h3>
        <div className="container">
        {notes.length===0&&'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showalert={props.showalert}/>
        })}
      </div>
    </>

  )
}

export default Notes
