import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import UserPage from './pages/User'
import Home from './component/Home'
import './App.css'

const App = () => {
  const [token, setToken] = useState('')
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage handleToken={setToken}/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/users/:username' element={<UserPage token={token}/>}/>
    </Routes>
    </>
  )
}

export default App