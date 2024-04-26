import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


const App=()=> {
const [alert, setAlert] = useState(null);
const showalert=(message,type)=>{
setAlert({
  msg: message,
  type:type
})
setTimeout(() => {
  setAlert(null)
}, 2000);
}
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div style={{height:"30px"}}>
          <Alert alert={alert}/>
          </div>
          
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showalert={showalert}/>}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/login' element={<Login showalert={showalert}/>}></Route>
              <Route exact path='/signup' element={<Signup showalert={showalert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
