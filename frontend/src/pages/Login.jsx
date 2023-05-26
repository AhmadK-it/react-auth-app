import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({handleToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userdata, setUserdata] = useState(false)
  const port = 4000

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${port}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData)
        handleToken(userData.token)
        setUserdata(userData)
        // window.location.href = `/users/${userData.username}`;
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <div>
      <nav className="m-2 navbar bg-primary rounded-4 ">
        <div className="p-5 nav-item container-fluid">      
          <h2 >Welcome Again!, To our Login Page </h2>      
        </div>
      </nav>

      <form className='m-2' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label  className="form-label">User Name</label>
          <input  
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp" 
          value={username}
          onChange={e=> setUsername(e.target.value)}
          />
          <div id="emailHelp" className="form-text">We'll never share your Name with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
          type="password" 
          className="form-control" 
          id="exampleInputPassword1"
          value={password}
          onChange={e=> setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>      
        <p className='form-text'>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>

       </form>

      {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      {userdata && <p className='text-success'>{userdata.username} is loged in successfully </p>}
      {userdata && <Link className='btn btn-outline-info' to={`/users/${userdata.username}`} >show {userdata.username} Page </Link>}

    </div>
  );
};

export default LoginPage;