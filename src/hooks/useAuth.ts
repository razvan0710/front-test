import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/store'

export const useAuth = () => {
  const token = useAppSelector((state) => state.auth.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate]) 

  return token
}