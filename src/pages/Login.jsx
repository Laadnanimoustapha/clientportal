import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSettings } from '../contexts/SettingsContext'
import { useToast } from '../contexts/ToastContext'
import { Eye, EyeOff, User, Lock, Users, ArrowRight } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'admin'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const { settings } = useSettings()
  const { error: showError, success } = useToast()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password, formData.userType)
      
      if (result.success) {
        success('Login successful!')
      } else {
        showError(result.error || 'Login failed')
      }
    } catch (error) {
      showError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const fillDemoCredentials = (type) => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@example.com',
        password: 'admin123',
        userType: 'admin'
      })
    } else {
      setFormData({
        email: 'john@example.com',
        password: 'client123',
        userType: 'client'
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card-elevated p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/erasebg-transformed.png" 
                alt="Client Portal Pro"
                className="h-32 w-auto drop-shadow-2xl"
              />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600">
              Sign in to access your {settings.companyName} portal
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Login as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  formData.userType === 'admin' 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={formData.userType === 'admin'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">Admin</span>
                </label>
                <label className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  formData.userType === 'client' 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="userType"
                    value="client"
                    checked={formData.userType === 'client'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">Client</span>
                </label>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-12"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-12 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-center text-sm font-medium text-slate-600 mb-4">
              Try Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="btn btn-outline btn-sm"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('client')}
                className="btn btn-outline btn-sm"
              >
                Client Demo
              </button>
            </div>
          </div>

          {/* Client Portal Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/client-login" 
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group"
            >
              <Users className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Client Portal Access
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login