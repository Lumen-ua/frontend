import React from 'react'

const Register = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
      <h1 className="text-xl font-semibold mb-4 text-center">Створити обліковий запис LUMEN</h1>
      <form className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Ім'я</label>
          <input className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm mb-1">Пароль</label>
          <input type="password" className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="w-full py-2 rounded-md bg-orange-500 text-white text-sm font-medium">
          Зареєструватись
        </button>
      </form>
    </div>
  )
}

export default Register
