import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Users, Sparkles } from 'lucide-react'

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(formData.email, formData.password, 'client')
      if (result.success) {
        success('Welcome back! Redirecting to your portal...')
        setTimeout(() => {
          navigate('/client/demo')
        }, 1000)
      } else {
        error('Invalid credentials. Please try again.')
      }
    } catch (err) {
      error('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const demoCredentials = [
    { email: 'john@example.com', name: 'John Smith' },
    { email: 'sarah@example.com', name: 'Sarah Johnson' },
    { email: 'mike@example.com', name: 'Mike Wilson' }
  ]

  const fillDemoCredentials = (email) => {
    setFormData({
      email: email,
      password: 'demo123'
    })
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card-elevated p-8 animate-zoom-in">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/erasebg-transformed.png" 
                alt="Client Portal Pro"
                className="h-24 w-auto drop-shadow-2xl animate-float"
              />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 animate-gradient">
              Client Portal
            </h2>
            <p className="text-slate-600 dark:text-slate-400 flex items-center justify-center">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              Access your project dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-12"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-12 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full h-12 text-base font-semibold group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Access Portal
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-blue-200 dark:border-slate-600">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-purple-500 mr-2 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Demo Accounts</h3>
            </div>
            <div className="space-y-2">
              {demoCredentials.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoCredentials(demo.email)}
                  className="w-full text-left p-3 rounded-xl bg-white/50 dark:bg-slate-600/50 hover:bg-white dark:hover:bg-slate-600 transition-all duration-200 transform hover:scale-105 border border-slate-200 dark:border-slate-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{demo.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{demo.email}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
              Password: <code className="bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded">demo123</code>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Back to Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientLogin