import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Splash_screen from './pages/Splash_screen'
import Home from './pages/Home'
import Sign_in from './pages/Sign_in'
import Sign_up from './pages/Sign_up'
import Header from './components/header'
export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>

        <Route path='/' element={<Splash_screen />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<Sign_in />} />
        <Route path='/signup' element={<Sign_up />} />

      </Routes>

   </BrowserRouter>
  )
}
