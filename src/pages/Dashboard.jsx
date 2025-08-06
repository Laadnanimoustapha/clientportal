import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import QuickActions from '../components/QuickActions'
import ActivityFeed from '../components/ActivityFeed'
import { useToast } from '../contexts/ToastContext'
import { getClients, addClient, deleteClient, initializeMockData } from '../utils/mockData'
import { formatDate, formatCurrency, getStatusColor } from '../utils/helpers'
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Plus, 
  Eye, 
  Trash2, 
  Search,
  Filter
} from 'lucide-react'

const Dashboard = () => {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    projectTitle: '',
    status: 'Active'
  })
  
  const { success, error } = useToast()

  useEffect(() => {
    initializeMockData()
    loadClients()
  }, [])

  useEffect(() => {
    filterClients()
  }, [clients, searchTerm, statusFilter])

  const loadClients = () => {
    const clientData = getClients()
    setClients(clientData)
  }

  const filterClients = () => {
    let filtered = clients

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => client.status === statusFilter)
    }

    setFilteredClients(filtered)
  }

  const handleAddClient = async (e) => {
    e.preventDefault()
    
    try {
      const client = addClient(newClient)
      setClients(prev => [...prev, client])
      setNewClient({ name: '', email: '', projectTitle: '', status: 'Active' })
      setShowAddModal(false)
      success('Client added successfully!')
    } catch (err) {
      error('Failed to add client')
    }
  }

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient(clientId)
      setClients(prev => prev.filter(c => c.id !== clientId))
      success('Client deleted successfully!')
    }
  }

  // Calculate dashboard stats
  const stats = {
    totalClients: clients.length,
    activeProjects: clients.filter(c => c.status === 'Active').length,
    totalRevenue: clients.reduce((sum, client) => 
      sum + client.invoices.reduce((invoiceSum, invoice) => 
        invoiceSum + (invoice.status === 'Paid' ? invoice.amount : 0), 0
      ), 0
    ),
    pendingInvoices: clients.reduce((sum, client) => 
      sum + client.invoices.filter(invoice => invoice.status === 'Pending').length, 0
    )
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-8 sm:px-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="mt-3 text-slate-600 text-lg">Manage your clients and projects with ease</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-md shadow-lg hover:shadow-xl"
            >
              <Plus size={18} className="mr-2" />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-elevated p-6 hover:scale-105 transition-transform duration-200 animate-fade-in bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-600">👥 Total Clients</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{stats.totalClients}</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6 hover:scale-105 transition-transform duration-200 animate-fade-in bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-500" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-emerald-600">🚀 Active Projects</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{stats.activeProjects}</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6 hover:scale-105 transition-transform duration-200 animate-fade-in bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-500" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-amber-600">💰 Total Revenue</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6 hover:scale-105 transition-transform duration-200 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-slate-600">Pending Invoices</p>
                <p className="text-3xl font-bold text-slate-900">{stats.pendingInvoices}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <QuickActions />
          <ActivityFeed />
        </div>

        {/* Filters */}
        <div className="card-elevated p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-12"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
        </div>

        {/* Clients Table */}
        <div className="card-elevated">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Clients</h3>
            <p className="text-slate-600 mt-1">Manage your client relationships</p>
          </div>
          <div className="card-content p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.projectTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(client.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/client/${client.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Eye size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredClients.length === 0 && (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Get started by adding your first client.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Client"
      >
        <form onSubmit={handleAddClient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="input mt-1"
              placeholder="Client name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              className="input mt-1"
              placeholder="client@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              required
              value={newClient.projectTitle}
              onChange={(e) => setNewClient({ ...newClient, projectTitle: e.target.value })}
              className="input mt-1"
              placeholder="Project title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={newClient.status}
              onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
              className="input mt-1"
            >
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="btn btn-outline btn-md"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-md">
              Add Client
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Dashboard