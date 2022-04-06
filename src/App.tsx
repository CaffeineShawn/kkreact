import React from 'react'
import './App.css'
import 'antd/dist/antd.less'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Posts from './pages/Posts'
import UploadFile from './pages/UploadFile'

function App() {
  return (
    <div className="App w-screen min-h-screen tailwind-bg">
      <div className="h-12 w-screen flex items-center fixed top-0 left-0 z-80">
        <Link
          to="/"
          className="text-white text-xl font-bold flex-1 text-center"
        >
          BlankSpace
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/upload" element={<UploadFile />}></Route>
      </Routes>
    </div>
  )
}

export default App
