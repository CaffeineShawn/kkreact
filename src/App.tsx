import React, { useEffect, useState } from 'react'
import './App.css'
import 'antd/dist/antd.less'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UploadFile from './pages/UploadFile'
import InfinityScroll from './pages/InfinityScroll'
import SearchPage from './pages/SearchPage'

interface GuardProps {
  routeRedirect: string
  destination: typeof Login
}

function Guard({ routeRedirect, destination }: GuardProps) {
  useLocation()
  return <> {localStorage.getItem('token') ? (
    destination()
  ) : (
    <Navigate to={routeRedirect} replace={true}/>
  )}</>
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
        className={`h-12 w-screen flex items-center fixed top-0 left-0 z-2 transition duration-300 ${
          glassNavigator ? 'glass' : ''
        }`}
      >
        <Link
          to="/"
          className={`text-xl font-bold flex-1 text-center transition-colors duration-300 ${
            glassNavigator ? 'text-blue-300' : 'text-white'
          }`}
        >
          BlankSpace
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route
          path="/searchPage"
          element={<Guard routeRedirect="/login" destination={SearchPage}/>}
        />
        <Route
          path="/upload"
          element={<Guard routeRedirect="/login" destination={UploadFile}/>}
        />
        <Route
          path="/infinityScroll"
          element={<Guard routeRedirect="/login" destination={InfinityScroll}/>}
        />
      </Routes>
    </div>
  )
}

export default App
