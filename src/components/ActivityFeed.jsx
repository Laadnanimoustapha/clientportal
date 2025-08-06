import React from 'react'
import { Clock, User, FileText, DollarSign, CheckCircle, AlertCircle, Activity } from 'lucide-react'

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'client_added',
      title: 'New client registered',
      description: 'John Smith joined as a new client',
      time: '5 minutes ago',
      icon: User,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: 2,
      type: 'invoice_paid',
      title: 'Invoice payment received',
      description: 'Invoice #1234 has been paid by Sarah Johnson',
      time: '1 hour ago',
      icon: DollarSign,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30'
    },
    {
      id: 3,
      type: 'project_completed',
      title: 'Project milestone reached',
      description: 'Website redesign project 75% completed',
      time: '3 hours ago',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      id: 4,
      type: 'file_uploaded',
      title: 'New file uploaded',
      description: 'Design mockups.zip uploaded to Project Alpha',
      time: '5 hours ago',
      icon: FileText,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      id: 5,
      type: 'payment_overdue',
      title: 'Payment reminder sent',
      description: 'Reminder sent for overdue invoice #1230',
      time: '1 day ago',
      icon: AlertCircle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30'
    }
  ]

  return (
    <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-green-500 animate-pulse" />
          Recent Activity
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-10 h-10 rounded-xl ${activity.bgColor} flex items-center justify-center flex-shrink-0 animate-float`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Activity timeline indicator */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Live Activity</span>
        </div>
      </div>
    </div>
  )
}

export default ActivityFeed