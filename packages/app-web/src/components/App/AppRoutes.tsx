import { Routes, Route, Navigate } from 'react-router-dom'
import { User } from '../User'
import { NotFound } from '../NotFound'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='user' />} />
      <Route path='user/*' element={<User />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
