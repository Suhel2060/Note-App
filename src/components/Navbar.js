import React,{useEffect,useContext} from 'react'
import {
Link,
useLocation
   } from "react-router-dom";
import noteContext from '../context/notecontext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    let location = useLocation();
    const userlogin=useContext(noteContext);
    const navigate=useNavigate();
    const {login,logout}=userlogin;
   useEffect(() => {
    // Google Analytics
console.log(location)
  }, [location]);

  const handlelogout=()=>{
    logout();
    navigate('/login')
  }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-2" to="/login"  role='button'>login</Link>  
                            <Link className="btn btn-primary mx-2" to="/signup"  role='button'>Signup</Link>  
                        </form>
                        :<button className="btn btn-primary mx-2" onClick={handlelogout}>Logout</button>}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
