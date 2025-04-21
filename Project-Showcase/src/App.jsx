import React , {useState,useEffect} from 'react'
import {BrowserRouter, Routes , Route, Navigate } from 'react-router-dom'
import { Home ,  Signup, Login , Dashboard , CreateProject , Edit } from './screen'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from './screen';


const App = () => {
  const [user,setUser] = useState()
  useEffect(()=>{
    auth.onAuthStateChanged((Users)=>{
      setUser(Users)
    })
  },[])

  
  return (
    <BrowserRouter>
     <Routes>
            
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/' element={user ? <Dashboard/> : <Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/create-project" element={<CreateProject/>}></Route>
            <Route path="/edit" element={<Edit/>}></Route>
        </Routes>
        <ToastContainer />
    </BrowserRouter>
  )
}

export default App