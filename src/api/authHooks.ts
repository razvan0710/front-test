import { useMutation } from '@tanstack/react-query'
import { loginUser, LoginResponse } from './invoiceApi'
import { useAppDispatch } from '../store/store'
import { setToken } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  return useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (data) => {
      dispatch(setToken(data.token))
      navigate('/invoices')
    },
    onError: (error) => {
      console.error('Login failed:', error)
    }
  })
}