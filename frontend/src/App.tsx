import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'
import { CreateContentModel } from './components/CreateContentModel'
import { SideBar } from './components/SideBar'
import { Dashboard } from './components/Dashboard'
import { Auth } from './pages/Auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Auth heading='Signup' buttonText='Signup'/>}></Route>
        <Route path="/signin" element={<Auth heading='Signin' buttonText='Signin'/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
