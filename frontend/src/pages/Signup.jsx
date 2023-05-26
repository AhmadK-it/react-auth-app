import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const port = 4000
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${port}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred during signup.');
    }
  };

  return (
    <div>

      <nav className="m-2 navbar bg-primary rounded-4">
        <div className="p-5 container-fluid">      
          <h2>Welcome !, This is our Signup Page</h2>
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
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input 
          type="password" 
          className="form-control" 
          id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <div className='form-text'>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>

      {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      
    </div>
  );
};

export default SignupPage;