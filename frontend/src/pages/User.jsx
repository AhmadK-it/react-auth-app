import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = ({ token }) => {
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(false)
  const param = useParams()
  const port = 4000

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:${port}/users/${param.username}`, {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });
        console.log(param.username)
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username);
        } else {
        //   window.location.href = '/login';
        }
      } catch (error) {
        console.log(error);
        // window.location.href = '/login';
      }
    };

    fetchUser();
  }, []);
  const sleep = ms => new Promise(resolve => setTimeout(resolve,ms))
  
  const handleLogout = async () => {
    try {
      await fetch(`http://localhost:${port}/logout`, { 
          method: 'POST',
          headers:{
              "Content-Type": "application/json",
              Authorization : `Bearer ${token}`
            } 
      });
      setVisible(true)
      sleep(2000).then( () => window.location.href = '/login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav class="m-2 navbar bg-primary rounded-4">
        <div class="p-5 container-fluid">      
          <h2>Welcome, {username}!</h2>
        </div>
      </nav>
      <button className='m-2 btn btn-outline-danger' onClick={handleLogout}>Logout</button>
      {visible && <p className='text-success'>User {username} logged out</p>}
    </div>
  );
};

export default UserPage;