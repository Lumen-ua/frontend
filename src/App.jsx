import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Budget from './pages/Budget/Budget'
import ReadBill from './pages/Budget/topics/ReadBill/ReadBill'
import EnergySaving from './pages/Energy/EnergySaving'

import Lighting from './pages/Energy/Lighting'
import Heating from './pages/Energy/Heating'
import Appliances from './pages/Energy/Appliances'
import Water from './pages/Energy/Water'
import SmartHome from './pages/Energy/SmartHome'

import Payments from './pages/Payments/Payments'
import Repairs from './pages/Repairs/Repairs'
import Legal from './pages/Legal/Legal'
import Profile from './pages/Profile/Profile'
import Simulations from './pages/Simulations/Simulations'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/budget" element={<Budget />} />
          <Route path="/budget/read-bill" element={<ReadBill />} />
          
          {}
          <Route path="/energy" element={<EnergySaving />} />
          <Route path="/energy/lighting" element={<Lighting />} />
          <Route path="/energy/heating" element={<Heating />} />
          <Route path="/energy/appliances" element={<Appliances />} />
          <Route path="/energy/water" element={<Water />} />
          <Route path="/energy/smart-home" element={<SmartHome />} />

          <Route path="/payments" element={<Payments />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/simulations" element={<Simulations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App