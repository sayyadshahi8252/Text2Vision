import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'
import Plans from './pages/Plans'
import { useState } from 'react'
import GenerateImage from './pages/GenerateImage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserData } from './redux/dataSlice/dataSlice'

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const dispatch=useDispatch()
  useEffect(() => {
  dispatch(getUserData());
}, []);
  return (
    <div className="app-layout">
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans/>} />
          <Route path="/generate" element={<GenerateImage/>} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App