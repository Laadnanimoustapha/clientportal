import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import { useToast } from '../contexts/ToastContext'
import { getClients, updateClient } from '../utils/mockData'
import { formatDate, generateId } from '../utils/helpers'
import { 
  Upload as UploadIcon, 
  File, 
  Plus, 
  X, 
  FileText, 
  Image, 
  Archive,
  DollarSign,
  MessageSquare,
  Calendar
} from 'lucide-react'

const Upload = () => {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [uploadType, setUploadType] = useState('file')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    status: 'Pending',
    dueDate: ''
  })
  
  const { success, error } = useToast()

  useEffect(() => {
    setClients(getClients())
  }, [])

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (!selectedClient) {
      error('Please select a client first')
      return
    }

    if (files.length === 0) return

    // Simulate file upload
    files.forEach(file => {
      const fileData = {
        id: generateId('file'),
        name: file.name,
        url: '#', // In real app, this would be the uploaded file URL
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.name.split('.').pop().toLowerCase()
      }

      const client = clients.find(c => c.id === selectedClient)
      if (client) {
        const updatedFiles = [...client.files, fileData]
        updateClient(selectedClient, { files: updatedFiles })
        success(`File "${file.name}" uploaded successfully!`)
      }
    })

    // Reset file input
    e.target.value = ''
    setClients(getClients())
  }

  const handleAddUpdate = (e) => {
    e.preventDefault()
    
    if (!selectedClient) {
      error('Please select a client first')
      return
    }

    const updateData = {
      id: generateId('update'),
      title: formData.title,
      content: formData.description,
      date: new Date().toISOString().split('T')[0],
      type: 'progress'
    }

    const client = clients.find(c => c.id === selectedClient)
    if (client) {
      const updatedUpdates = [...client.updates, updateData]
      updateClient(selectedClient, { updates: updatedUpdates })
      success('Project update added successfully!')
      
      setFormData({ title: '', description: '', amount: '', status: 'Pending', dueDate: '' })
      setShowModal(false)
      setClients(getClients())
    }
  }

  const handleAddInvoice = (e) => {
    e.preventDefault()
    
    if (!selectedClient) {
      error('Please select a client first')
      return
    }

    const invoiceData = {
      id: generateId('invoice'),
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(formData.amount),
      status: formData.status,
      description: formData.description,
      fileURL: '#' // In real app, this would be the PDF URL
    }

    const client = clients.find(c => c.id === selectedClient)
    if (client) {
      const updatedInvoices = [...client.invoices, invoiceData]
      updateClient(selectedClient, { invoices: updatedInvoices })
      success('Invoice added successfully!')
      
      setFormData({ title: '', description: '', amount: '', status: 'Pending', dueDate: '' })
      setShowModal(false)
      setClients(getClients())
    }
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <Image className="h-8 w-8 text-blue-500" />
    } else if (['zip', 'rar', '7z'].includes(extension)) {
      return <Archive className="h-8 w-8 text-yellow-500" />
    } else {
      return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const uploadTypes = [
    { id: 'file', label: 'Upload Files', icon: UploadIcon, description: 'Upload documents, images, or other files' },
    { id: 'update', label: 'Add Update', icon: MessageSquare, description: 'Share project progress or milestones' },
    { id: 'invoice', label: 'Create Invoice', icon: DollarSign, description: 'Generate and send invoices' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Upload & Manage</h1>
            <p className="mt-2 text-gray-600">Upload files, add updates, and create invoices for your clients</p>
          </div>

          {/* Client Selection */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Client</h3>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="input max-w-md"
            >
              <option value="">Choose a client...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} - {client.projectTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {uploadTypes.map(type => {
              const Icon = type.icon
              return (
                <div
                  key={type.id}
                  className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all ${
                    uploadType === type.id ? 'ring-2 ring-primary-500 border-primary-500' : 'hover:shadow-md'
                  }`}
                  onClick={() => setUploadType(type.id)}
                >
                  <div className="flex items-center mb-3">
                    <Icon className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">{type.label}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </div>
              )
            })}
          </div>

          {/* Upload Content */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {uploadTypes.find(t => t.id === uploadType)?.label}
              </h3>
            </div>

            <div className="p-6">
              {uploadType === 'file' && (
                <div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Drop files here or click to upload
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">
                          Supports: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB each)
                        </span>
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={handleFileUpload}
                        disabled={!selectedClient}
                      />
                    </div>
                  </div>
                  
                  {!selectedClient && (
                    <p className="mt-4 text-sm text-red-600">Please select a client before uploading files.</p>
                  )}
                </div>
              )}

              {(uploadType === 'update' || uploadType === 'invoice') && (
                <div className="text-center">
                  <button
                    onClick={() => setShowModal(true)}
                    disabled={!selectedClient}
                    className="btn btn-primary btn-lg"
                  >
                    <Plus size={16} className="mr-2" />
                    {uploadType === 'update' ? 'Add Project Update' : 'Create Invoice'}
                  </button>
                  
                  {!selectedClient && (
                    <p className="mt-4 text-sm text-red-600">Please select a client first.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          {selectedClient && (
            <div className="mt-6 bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                {(() => {
                  const client = clients.find(c => c.id === selectedClient)
                  if (!client) return null

                  const recentFiles = client.files.slice(-3)
                  const recentUpdates = client.updates.slice(-2)
                  const recentInvoices = client.invoices.slice(-2)

                  return (
                    <div className="space-y-6">
                      {recentFiles.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Files</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {recentFiles.map(file => (
                              <div key={file.id} className="flex items-center p-3 border rounded-lg">
                                {getFileIcon(file.name)}
                                <div className="ml-3 flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                  <p className="text-xs text-gray-500">{formatDate(file.uploadDate)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {recentUpdates.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Updates</h4>
                          <div className="space-y-2">
                            {recentUpdates.map(update => (
                              <div key={update.id} className="p-3 border rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-medium text-gray-900">{update.title}</p>
                                  <span className="text-xs text-gray-500">{formatDate(update.date)}</span>
                                </div>
                                <p className="text-sm text-gray-600">{update.content.substring(0, 100)}...</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {recentInvoices.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Invoices</h4>
                          <div className="space-y-2">
                            {recentInvoices.map(invoice => (
                              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Invoice #{invoice.id}</p>
                                  <p className="text-xs text-gray-500">{formatDate(invoice.date)}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">${invoice.amount}</p>
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {invoice.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Updates and Invoices */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={uploadType === 'update' ? 'Add Project Update' : 'Create Invoice'}
        size="lg"
      >
        <form onSubmit={uploadType === 'update' ? handleAddUpdate : handleAddInvoice} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {uploadType === 'update' ? 'Update Title' : 'Invoice Description'}
            </label>
            <input
              type="text"
              required
              value={uploadType === 'update' ? formData.title : formData.description}
              onChange={(e) => setFormData({ 
                ...formData, 
                [uploadType === 'update' ? 'title' : 'description']: e.target.value 
              })}
              className="input mt-1"
              placeholder={uploadType === 'update' ? 'Enter update title' : 'Enter invoice description'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {uploadType === 'update' ? 'Update Content' : 'Additional Notes'}
            </label>
            <textarea
              required={uploadType === 'update'}
              value={uploadType === 'update' ? formData.description : formData.title}
              onChange={(e) => setFormData({ 
                ...formData, 
                [uploadType === 'update' ? 'description' : 'title']: e.target.value 
              })}
              rows={4}
              className="input mt-1"
              placeholder={uploadType === 'update' ? 'Describe the progress or milestone...' : 'Additional notes (optional)'}
            />
          </div>

          {uploadType === 'invoice' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="input mt-1"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input mt-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn btn-outline btn-md"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-md">
              {uploadType === 'update' ? 'Add Update' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Upload