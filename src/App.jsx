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
import Payments from './pages/Payments/Payments'
import Repairs from './pages/Repairs/Repairs'
import Legal from './pages/Legal/Legal'
import TenantRights from './pages/Legal/TenantRights'
import LandlordRights from './pages/Legal/LandlordRights'
import Debts from './pages/Legal/Debts'
import Consumption from './pages/Legal/Consumption/Consumption'
import RepairsGame from './pages/Legal/RepairsGame/RepairsGame'
import Communication from './pages/Legal/Communication/Communication'
import Profile from './pages/Profile/Profile'
import Simulations from './pages/Simulations/Simulations'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={
          <ProtectedRoute>
           <MainLayout />
          </ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/budget/read-bill" element={<ReadBill />} />
          <Route path="/energy" element={<EnergySaving />} />
          <Route path="/energy/lighting" element={<Lighting />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/tenant-rights" element={<TenantRights />} />
          <Route path="/legal/landlord-rights" element={<LandlordRights />} />
          <Route path="/legal/debts" element={<Debts />} />
          <Route path="/legal/consumption" element={<Consumption />} />
          <Route path="/legal/repairs" element={<RepairsGame />} />
          <Route path="/legal/communication" element={<Communication />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/simulations" element={<Simulations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App