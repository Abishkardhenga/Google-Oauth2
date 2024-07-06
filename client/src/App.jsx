import React from 'react'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Error from './pages/404Error/Error'

const App = () => {
  return (
    <>
    <Navbar/>
    
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
      <Route path = "/Dashboard" element={<Dashboard/>}/>
      <Route path = "*" element={<Error/>}/>

    </Routes>
    </>
  )
}

export default App