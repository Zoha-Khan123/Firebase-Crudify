import React from 'react'
import {Routes, Route } from 'react-router-dom'
import { Home , Signup ,Login, Dashboard , CreateProject , Edit  } from '../screen'



const AppRoute = () => {
  return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/create-project" element={<CreateProject/>}></Route>
            <Route path="/edit" element={<Edit/>}></Route>
        </Routes>
  )
}

export default AppRoute