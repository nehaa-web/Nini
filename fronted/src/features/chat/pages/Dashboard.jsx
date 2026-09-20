import { useSelector } from 'react-redux'

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard