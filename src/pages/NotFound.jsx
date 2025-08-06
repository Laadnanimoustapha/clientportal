import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSettings } from '../contexts/SettingsContext'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  const { isAuthenticated, isAdmin } = useAuth()
  const { settings } = useSettings()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: settings.primaryColor }}
            >
              CP
            </div>
          </div>

          {/* 404 Error */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <div className="relative -mt-8">
              <Search className="mx-auto h-16 w-16 text-gray-400" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <p className="text-sm text-gray-500">
              The page might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline btn-md"
              >
                <ArrowLeft size={16} className="mr-2" />
                Go Back
              </button>
              
              {isAuthenticated ? (
                <Link
                  to={isAdmin ? "/dashboard" : "/"}
                  className="btn btn-primary btn-md"
                >
                  <Home size={16} className="mr-2" />
                  {isAdmin ? 'Dashboard' : 'Home'}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary btn-md"
                >
                  <Home size={16} className="mr-2" />
                  Login
                </Link>
              )}
            </div>

            {/* Help Links */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Need help? Try these links:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {isAuthenticated && isAdmin && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/upload"
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Upload Files
                    </Link>
                    <Link
                      to="/settings"
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Settings
                    </Link>
                  </>
                )}
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © 2024 {settings.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound