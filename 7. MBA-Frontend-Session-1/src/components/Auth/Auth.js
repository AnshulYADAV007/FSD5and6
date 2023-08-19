import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { signIn, signUp } from '../../api/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false)
  const [userSignUpData, setUserSignUpData] = useState({})
  const [userType, setUserType] = useState('CUSTOMER')
  const [message, setMessage] = useState('Welcome!')
  const navigate = useNavigate()
}

export default Login
