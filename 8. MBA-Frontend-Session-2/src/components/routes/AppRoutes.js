import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './../../pages/Auth/Auth'
import LandingPage from '../../pages/LandingPage/LandingPage'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
