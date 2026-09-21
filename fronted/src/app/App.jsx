import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import { useAuth } from '../features/auth/hook/useAuth.js'
import { useEffect } from 'react'

const App = () => {

  const auth = useAuth()

  useEffect(() => {
    auth.handleGetMe()
  }, [])

  return <RouterProvider router={router} />
}

export default App

