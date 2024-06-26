import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [userdata, setuserdata] = useState({ name: "", email: "", password: "", cpassword: "" });
    const history = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (userdata.password === userdata.cpassword) {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: userdata.name, email: userdata.email, password: userdata.password })

            });
            const json = await response.json();
            console.log(json)
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                history('/login')
                props.showalert("Signup successfull","success")
            }
            else {
                props.showalert("Signup unsuccessfull", "danger");
            }
        } else {
            props.showalert("Signup unsuccessfull", "danger");
        }
    }
        const updatedata = (e) => {
            setuserdata({ ...userdata, [e.target.name]: e.target.value })
        }
        return (
            <div className='container my-4' onSubmit={handlesubmit}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={updatedata} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={updatedata} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={updatedata} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={updatedata} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
}

export default Signup
