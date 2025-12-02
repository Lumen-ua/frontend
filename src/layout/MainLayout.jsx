import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'

const MainLayout = () => {
  return (
    <div className="app-shell flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 bg-[#f5f5f5] flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
