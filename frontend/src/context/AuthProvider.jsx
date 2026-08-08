import { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'
import { authAPI } from '../services/api'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')))

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!token) return

    authAPI
      .getProfile()
      .then((res) => setUser(res.data))
      .catch(() => logout())
      .finally(() => setLoading(false))
  }, [token, logout])

  const login = async (credentials) => {
    const res = await authAPI.login(credentials)
    const { access_token, user: userData } = res.data
    localStorage.setItem('token', access_token)
    setToken(access_token)
    setUser(userData)
    return res.data
  }

  const register = async (data) => {
    const res = await authAPI.register(data)
    const { access_token, user: userData } = res.data
    localStorage.setItem('token', access_token)
    setToken(access_token)
    setUser(userData)
    return res.data
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}