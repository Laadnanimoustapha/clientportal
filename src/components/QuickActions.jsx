import React from 'react'
import { Plus, Users, FileText, Upload, Settings, Zap, Sparkles } from 'lucide-react'

const QuickActions = () => {
  const actions = [
    {
      id: 'add-client',
      title: 'Add Client',
      description: 'Create a new client profile',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      action: () => console.log('Add client')
    },
    {
      id: 'create-invoice',
      title: 'New Invoice',
      description: 'Generate a new invoice',
      icon: FileText,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50',
      action: () => console.log('Create invoice')
    },
    {
      id: 'upload-file',
      title: 'Upload Files',
      description: 'Share files with clients',
      icon: Upload,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      action: () => console.log('Upload file')
    },
    {
      id: 'settings',
      title: 'Quick Settings',
      description: 'Customize your portal',
      icon: Settings,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      action: () => console.log('Settings')
    }
  ]

  return (
    <div className="card-elevated p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-500 animate-bounce-slow" />
          Quick Actions
        </h3>
        <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`group relative p-4 rounded-2xl bg-gradient-to-br ${action.bgColor} dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-float`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )
        })}
      </div>

      {/* Add more actions button */}
      <button className="w-full mt-4 p-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all duration-200 flex items-center justify-center space-x-2 group">
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
        <span className="text-sm font-medium">Customize Actions</span>
      </button>
    </div>
  )
}

export default QuickActions