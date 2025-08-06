import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('clientportal_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, userType = 'admin') => {
    // Mock authentication - in real app, this would call an API
    if (userType === 'admin' && email === 'admin@example.com' && password === 'admin123') {
      const userData = {
        id: 'admin-1',
        email: 'admin@example.com',
        name: 'Admin User',
        type: 'admin'
      }
      setUser(userData)
      localStorage.setItem('clientportal_user', JSON.stringify(userData))
      return { success: true }
    } else if (userType === 'client') {
      // Check if client exists in mock data
      const clients = JSON.parse(localStorage.getItem('clientportal_clients') || '[]')
      const client = clients.find(c => c.email === email)
      
      if (client && (password === 'client123' || password === client.password || password === 'demo123')) {
        const userData = {
          id: client.id,
          email: client.email,
          name: client.name,
          type: 'client',
          company: client.company,
          avatar: client.avatar
        }
        setUser(userData)
        localStorage.setItem('clientportal_user', JSON.stringify(userData))
        return { success: true }
      }
    }
    
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('clientportal_user')
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.type === 'admin',
    isClient: user?.type === 'client'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}