import React from 'react'

const Header = () => {
  return (
    <header className="w-full bg-white border-b px-4 py-2 flex items-center justify-between">
      <div className="font-medium text-sm">Вітаємо, UserName!</div>
      <div className="text-xs text-gray-500">Прогрес у темах • Досягнення • Налаштування</div>
    </header>
  )
}

export default Header
