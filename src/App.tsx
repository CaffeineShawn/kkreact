import React, { useEffect, useState } from 'react'
import './App.css'
import 'antd/dist/antd.less'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Posts from './pages/Posts'
import UploadFile from './pages/UploadFile'

interface GuardProps {
  token: string
  routeRedirect: string
}

function Guard({ token, routeRedirect }: GuardProps) {
  useLocation()
  return localStorage.getItem(token) ? (
    <UploadFile />
  ) : (
    <Navigate to={routeRedirect} replace={true} />
  )
}

function App() {
  const location = useLocation()
  const [glassNavigator, setGlassNavigator] = useState(false)
  useEffect(() => {
    console.log(location)
    if (location.pathname === '/posts') {
      setGlassNavigator(true)
    } else {
      setGlassNavigator(false)
    }
  }, [location])
  return (
    <div className="App w-screen min-h-screen tailwind-bg">
      <div
        className={`h-12 w-screen flex items-center fixed top-0 left-0 z-80 transition duration-300 ${glassNavigator ? 'glass' : ''}`}
      >
        <Link
          to="/"
          className={`text-xl font-bold flex-1 text-center transition-colors duration-300 ${glassNavigator ? 'text-blue-300' : 'text-white'}`}
        >
          BlankSpace
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route
          path="/upload"
          element={<Guard token="token" routeRedirect="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
