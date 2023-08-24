import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './../../pages/Auth/Auth'
import LandingPage from '../../pages/LandingPage/LandingPage'
import Admin from './../../pages/Admin/Admin'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
