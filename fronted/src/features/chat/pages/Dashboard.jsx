import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js'
import { useEffect } from 'react'

const Dashboard = () => {

  const chat = useChat()

  useEffect(() => {
    chat.initializeSocket()
  }, [])

    const { user } = useSelector((state) => state.auth);
    console.log(user);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard