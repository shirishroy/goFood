import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';

export default function Entry() {
    const [credentials, setcredentials] = useState({ email : " ", password:"",  })
    let navigate = useNavigate()
    const handleSubmit = async(e)=>{
     e.preventDefault();
     console.log(JSON.stringify({email: credentials.email, password: credentials.password }))
     const response = await fetch("http://localhost:7001/api/entryuser",{
        method: 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
         body:JSON.stringify({email: credentials.email, password: credentials.password})
     });
    const json = await response.json()
    console.log(json);

    if(!json.success){
        alert("enter valid credentials")
    }
     if(json.success){
      localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
     }
    }
    const onchange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
        <div className='container'>
<form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onchange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'>i am a new user</Link>
</form>
</div>
    </div>
  )
}
