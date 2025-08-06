import React, { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSettings } from '../contexts/SettingsContext'
import { getClient } from '../utils/mockData'
import { formatDate, formatCurrency, getStatusColor, downloadFile } from '../utils/helpers'
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  DollarSign,
  User,
  Mail,
  Briefcase
} from 'lucide-react'

const ClientPortal = () => {
  const { id } = useParams()
  const { user, isClient } = useAuth()
  const { settings } = useSettings()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('updates')

  useEffect(() => {
    const clientData = getClient(id)
    
    // If user is a client, they can only view their own portal
    if (isClient && user.id !== id) {
      setClient(null)
    } else {
      setClient(clientData)
    }
    
    setLoading(false)
  }, [id, user, isClient])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!client) {
    return <Navigate to="/login" replace />
  }

  const tabs = [
    { id: 'updates', label: 'Project Updates', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: DollarSign }
  ]

  const completedTasks = client.tasks.filter(task => task.completed).length
  const totalTasks = client.tasks.length
  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src="/erasebg-transformed.png" 
                  alt="Client Portal Pro"
                  className="h-16 w-auto drop-shadow-lg"
                />
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Welcome back,</p>
                <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {client.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="card-elevated p-8 mb-8 animate-fade-in">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome to Your Project Portal</h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">{settings.welcomeMessage}</p>
          </div>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Project Title</p>
                    <p className="font-medium text-gray-900">{client.projectTitle}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Client Name</p>
                    <p className="font-medium text-gray-900">{client.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Project Started</p>
                    <p className="font-medium text-gray-900">{formatDate(client.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Project Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
              <div className="text-center">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
            </div>

            {/* Task Progress */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium">{completedTasks}/{totalTasks}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${taskProgress}%`,
                      backgroundColor: settings.primaryColor 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{Math.round(taskProgress)}% Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Updates Tab */}
            {activeTab === 'updates' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Project Updates</h3>
                {client.updates.length > 0 ? (
                  <div className="space-y-4">
                    {client.updates.map((update) => (
                      <div key={update.id} className="border-l-4 border-primary-500 pl-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{update.title}</h4>
                          <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                        </div>
                        <p className="text-gray-600">{update.content}</p>
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium mt-2 ${
                          update.type === 'milestone' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {update.type}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No updates available yet.</p>
                )}
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
                {client.tasks.length > 0 ? (
                  <div className="space-y-3">
                    {client.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            task.completed 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {task.completed && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <div>
                            <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </p>
                            {task.dueDate && (
                              <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {task.completed ? (
                            <span className="text-green-600 text-sm font-medium">Completed</span>
                          ) : (
                            <Clock size={16} className="text-yellow-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No tasks assigned yet.</p>
                )}
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Project Files</h3>
                {client.files.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {client.files.map((file) => (
                      <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <FileText className="h-8 w-8 text-primary-600" />
                          <button
                            onClick={() => downloadFile(file.url, file.name)}
                            className="text-primary-600 hover:text-primary-800"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1 truncate">{file.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{file.size}</p>
                        <p className="text-xs text-gray-400">Uploaded: {formatDate(file.uploadDate)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No files available yet.</p>
                )}
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
                {client.invoices.length > 0 ? (
                  <div className="space-y-4">
                    {client.invoices.map((invoice) => (
                      <div key={invoice.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">Invoice #{invoice.id}</h4>
                            <p className="text-sm text-gray-600">{invoice.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                            <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">Date: {formatDate(invoice.date)}</p>
                          <button
                            onClick={() => downloadFile(invoice.fileURL, `Invoice_${invoice.id}.pdf`)}
                            className="btn btn-outline btn-sm"
                          >
                            <Download size={14} className="mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No invoices available yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientPortal