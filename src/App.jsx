import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Show from './components/Show'
import New from './components/New'
import Edit from './components/Edit'

function App() {

  return (
    <div className='container'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/transactions" replace/>} />
        <Route path="/transactions" element={<Home />}/>
        <Route path="/transactions/new" element={<New />}/>
        <Route path="/transactions/:index" element={<Show />}/>
        <Route path="/transactions/:index/edit" element={<Edit />}/>
      </Routes>
    </div>
  )
}

export default App
