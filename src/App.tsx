import React from 'react'
import './App.css'
import 'antd/dist/antd.less'
import { Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Posts from './pages/Posts'
import UploadFile from './pages/UploadFile'

function App () {
  return (
    <div className="App">
      <div className='flex-col z-3 sticky text-blue-600 text-xl py-4 font-bold'>BlankSpace</div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/posts' element={<Posts />}></Route>
        <Route path='/upload' element={<UploadFile />}></Route>
      </Routes>
    </div>
  )
}

export default App
