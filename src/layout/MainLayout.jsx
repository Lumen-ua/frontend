import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import {
  AppShell,
  FixedHeaderArea,
  FixedSidebarArea,
  MainContentArea
} from './MainLayout.styled'

const MainLayout = () => {
  return (
    <AppShell>
      <FixedHeaderArea>
        <Header />
      </FixedHeaderArea>

      <FixedSidebarArea>
        <Sidebar />
      </FixedSidebarArea>

      <MainContentArea>
        <Outlet />
      </MainContentArea>
    </AppShell>
  )
}

export default MainLayout
