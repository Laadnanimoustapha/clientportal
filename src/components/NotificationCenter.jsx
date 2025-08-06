import React, { useState, useEffect } from 'react'
import { Bell, X, Check, AlertTriangle, Info, Star, Clock, Users } from 'lucide-react'

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'New Client Added',
      message: 'John Smith has been successfully added to your client list.',
      time: '2 minutes ago',
      read: false,
      icon: Users
    },
    {
      id: 2,
      type: 'warning',
      title: 'Payment Overdue',
      message: 'Invoice #1234 is 5 days overdue. Consider sending a reminder.',
      time: '1 hour ago',
      read: false,
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features have been added to your dashboard. Check them out!',
      time: '3 hours ago',
      read: true,
      icon: Info
    },
    {
      id: 4,
      type: 'success',
      title: 'Project Completed',
      message: 'Website redesign project has been marked as completed.',
      time: '1 day ago',
      read: true,
      icon: Check
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
      case 'warning':
        return 'border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20'
      case 'error':
        return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      default:
        return 'border-l-4 border-slate-500 bg-slate-50 dark:bg-slate-900/20'
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-emerald-600'
      case 'warning':
        return 'text-amber-600'
      case 'error':
        return 'text-red-600'
      case 'info':
        return 'text-blue-600'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-slate-200 dark:border-slate-700"
      >
        <Bell className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-12 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 animate-slide-down">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-blue-500" />
                  Notifications
                </h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No notifications yet</p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification) => {
                    const Icon = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 m-2 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer ${
                          getNotificationStyle(notification.type)
                        } ${!notification.read ? 'ring-2 ring-blue-500/20' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getIconColor(notification.type)} bg-white/50`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-semibold ${
                                !notification.read ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'
                              }`}>
                                {notification.title}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                                className="p-1 rounded hover:bg-white/50 transition-colors"
                              >
                                <X className="w-3 h-3 text-slate-400" />
                              </button>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-slate-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {notification.time}
                              </span>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationCenter