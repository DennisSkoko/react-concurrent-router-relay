import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { NotFound } from '../NotFound'
import { UserList } from './UserList'
import { UserView } from './UserView'

export function User() {
  const navigate = useNavigate()

  const handleUserSelected = (id: string) => {
    navigate(`view/${encodeURIComponent(id)}`)
  }

  return (
    <Routes>
      <Route path='/' element={<Navigate to='list' />} />
      <Route
        path='list'
        element={<UserList onUserSelected={handleUserSelected} />}
      />
      <Route path='view/:id' element={<UserView />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
