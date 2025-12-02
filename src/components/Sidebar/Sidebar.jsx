import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-orange-500 text-white min-h-screen p-4">
      <div className="font-bold text-lg mb-6">LUMEN</div>
      <nav className="space-y-2 text-sm">
        <Link to="/" className="block hover:underline">Головна</Link>
        <Link to="/budget" className="block hover:underline">Бюджет та рахунки</Link>
        <Link to="/energy" className="block hover:underline">Економія та енергоефективність</Link>
        <Link to="/payments" className="block hover:underline">Оплата послуг</Link>
        <Link to="/repairs" className="block hover:underline">Ремонт і звернення</Link>
        <Link to="/legal" className="block hover:underline">Правові аспекти</Link>
        <Link to="/profile" className="block hover:underline">Профіль</Link>
        <Link to="/simulations" className="block hover:underline">Симуляції</Link>
      </nav>
    </aside>
  )
}

export default Sidebar
