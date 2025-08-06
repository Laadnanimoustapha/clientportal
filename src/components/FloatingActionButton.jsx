import React, { useState } from 'react'
import { Plus, Users, FileText, Upload, Settings, X, Sparkles } from 'lucide-react'

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Users,
      label: 'Add Client',
      color: 'from-blue-500 to-cyan-500',
      action: () => console.log('Add client')
    },
    {
      icon: FileText,
      label: 'New Invoice',
      color: 'from-emerald-500 to-green-500',
      action: () => console.log('New invoice')
    },
    {
      icon: Upload,
      label: 'Upload File',
      color: 'from-purple-500 to-indigo-500',
      action: () => console.log('Upload file')
    },
    {
      icon: Settings,
      label: 'Quick Settings',
      color: 'from-amber-500 to-orange-500',
      action: () => console.log('Settings')
    }
  ]

  const handleActionClick = (action) => {
    action.action()
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <div
                key={index}
                className="flex items-center space-x-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap border border-slate-200 dark:border-slate-600">
                  {action.label}
                </span>
                <button
                  onClick={() => handleActionClick(action)}
                  className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center group`}
                >
                  <Icon className="w-6 h-6 text-white group-hover:animate-bounce" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group ${
          isOpen ? 'rotate-45' : 'rotate-0'
        } animate-float`}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white transition-transform duration-200" />
        ) : (
          <Plus className="w-8 h-8 text-white transition-transform duration-200" />
        )}
        
        {/* Sparkle effect */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default FloatingActionButton