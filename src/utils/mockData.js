// Mock data for the application
export const mockClients = [
  {
    id: 'client-1',
    name: 'John Smith',
    email: 'john@example.com',
    projectTitle: 'E-commerce Website Redesign',
    status: 'Active',
    createdAt: '2024-01-15',
    updates: [
      {
        id: 'update-1',
        title: 'Project Kickoff',
        content: 'We have successfully started your e-commerce website redesign project. Our team has analyzed your current site and created a comprehensive plan for the redesign.',
        date: '2024-01-15',
        type: 'milestone'
      },
      {
        id: 'update-2',
        title: 'Design Mockups Ready',
        content: 'The initial design mockups for your homepage and product pages are now ready for review. Please check the files section to download and review them.',
        date: '2024-01-22',
        type: 'progress'
      },
      {
        id: 'update-3',
        title: 'Development Phase Started',
        content: 'We have begun the development phase of your website. The responsive framework has been implemented and we are now working on the product catalog functionality.',
        date: '2024-02-01',
        type: 'progress'
      }
    ],
    tasks: [
      { id: 'task-1', title: 'Review design mockups', completed: true, dueDate: '2024-01-25' },
      { id: 'task-2', title: 'Provide product images', completed: true, dueDate: '2024-01-30' },
      { id: 'task-3', title: 'Review development progress', completed: false, dueDate: '2024-02-05' },
      { id: 'task-4', title: 'Content review and approval', completed: false, dueDate: '2024-02-10' }
    ],
    files: [
      {
        id: 'file-1',
        name: 'Homepage_Mockup_v1.pdf',
        url: '#',
        uploadDate: '2024-01-22',
        size: '2.4 MB',
        type: 'pdf'
      },
      {
        id: 'file-2',
        name: 'Product_Page_Design.pdf',
        url: '#',
        uploadDate: '2024-01-22',
        size: '1.8 MB',
        type: 'pdf'
      },
      {
        id: 'file-3',
        name: 'Brand_Guidelines.pdf',
        url: '#',
        uploadDate: '2024-01-20',
        size: '3.2 MB',
        type: 'pdf'
      }
    ],
    invoices: [
      {
        id: 'invoice-1',
        date: '2024-01-15',
        amount: 2500,
        status: 'Paid',
        description: 'Project Setup & Design Phase',
        fileURL: '#'
      },
      {
        id: 'invoice-2',
        date: '2024-02-01',
        amount: 3000,
        status: 'Pending',
        description: 'Development Phase - Milestone 1',
        fileURL: '#'
      }
    ]
  },
  {
    id: 'client-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    projectTitle: 'Mobile App Development',
    status: 'Active',
    createdAt: '2024-01-20',
    updates: [
      {
        id: 'update-4',
        title: 'Project Planning Complete',
        content: 'We have completed the project planning phase for your mobile app. The technical specifications and user flow diagrams are ready for your review.',
        date: '2024-01-20',
        type: 'milestone'
      },
      {
        id: 'update-5',
        title: 'UI/UX Design in Progress',
        content: 'Our design team is currently working on the user interface and user experience design for your mobile application. We expect to have the first draft ready by next week.',
        date: '2024-01-28',
        type: 'progress'
      }
    ],
    tasks: [
      { id: 'task-5', title: 'Review technical specifications', completed: true, dueDate: '2024-01-25' },
      { id: 'task-6', title: 'Approve user flow diagrams', completed: false, dueDate: '2024-02-02' },
      { id: 'task-7', title: 'Provide app content', completed: false, dueDate: '2024-02-08' }
    ],
    files: [
      {
        id: 'file-4',
        name: 'Technical_Specifications.pdf',
        url: '#',
        uploadDate: '2024-01-20',
        size: '1.5 MB',
        type: 'pdf'
      },
      {
        id: 'file-5',
        name: 'User_Flow_Diagrams.pdf',
        url: '#',
        uploadDate: '2024-01-25',
        size: '2.1 MB',
        type: 'pdf'
      }
    ],
    invoices: [
      {
        id: 'invoice-3',
        date: '2024-01-20',
        amount: 1500,
        status: 'Paid',
        description: 'Project Planning & Analysis',
        fileURL: '#'
      }
    ]
  },
  {
    id: 'client-3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    projectTitle: 'Brand Identity Design',
    status: 'Completed',
    createdAt: '2023-12-01',
    updates: [
      {
        id: 'update-6',
        title: 'Brand Research Complete',
        content: 'We have completed comprehensive research on your industry and target audience. The brand strategy document is ready for your review.',
        date: '2023-12-05',
        type: 'milestone'
      },
      {
        id: 'update-7',
        title: 'Logo Concepts Delivered',
        content: 'Three unique logo concepts have been created based on your brand strategy. Please review and provide feedback on your preferred direction.',
        date: '2023-12-15',
        type: 'progress'
      },
      {
        id: 'update-8',
        title: 'Project Completed',
        content: 'Your brand identity project has been completed successfully. All final files including logo variations, brand guidelines, and marketing materials have been delivered.',
        date: '2024-01-10',
        type: 'milestone'
      }
    ],
    tasks: [
      { id: 'task-8', title: 'Review brand strategy', completed: true, dueDate: '2023-12-08' },
      { id: 'task-9', title: 'Select logo concept', completed: true, dueDate: '2023-12-20' },
      { id: 'task-10', title: 'Final approval', completed: true, dueDate: '2024-01-05' }
    ],
    files: [
      {
        id: 'file-6',
        name: 'Brand_Strategy.pdf',
        url: '#',
        uploadDate: '2023-12-05',
        size: '2.8 MB',
        type: 'pdf'
      },
      {
        id: 'file-7',
        name: 'Logo_Concepts.pdf',
        url: '#',
        uploadDate: '2023-12-15',
        size: '4.2 MB',
        type: 'pdf'
      },
      {
        id: 'file-8',
        name: 'Final_Brand_Package.zip',
        url: '#',
        uploadDate: '2024-01-10',
        size: '15.6 MB',
        type: 'zip'
      }
    ],
    invoices: [
      {
        id: 'invoice-4',
        date: '2023-12-01',
        amount: 2000,
        status: 'Paid',
        description: 'Brand Strategy & Research',
        fileURL: '#'
      },
      {
        id: 'invoice-5',
        date: '2024-01-10',
        amount: 3500,
        status: 'Paid',
        description: 'Logo Design & Brand Guidelines',
        fileURL: '#'
      }
    ]
  }
]

// Initialize mock data in localStorage if not exists
export const initializeMockData = () => {
  if (!localStorage.getItem('clientportal_clients')) {
    localStorage.setItem('clientportal_clients', JSON.stringify(mockClients))
  }
}

// Helper functions for data management
export const getClients = () => {
  return JSON.parse(localStorage.getItem('clientportal_clients') || '[]')
}

export const getClient = (id) => {
  const clients = getClients()
  return clients.find(client => client.id === id)
}

export const updateClient = (id, updates) => {
  const clients = getClients()
  const index = clients.findIndex(client => client.id === id)
  if (index !== -1) {
    clients[index] = { ...clients[index], ...updates }
    localStorage.setItem('clientportal_clients', JSON.stringify(clients))
    return clients[index]
  }
  return null
}

export const addClient = (clientData) => {
  const clients = getClients()
  const newClient = {
    id: `client-${Date.now()}`,
    ...clientData,
    createdAt: new Date().toISOString().split('T')[0],
    updates: [],
    tasks: [],
    files: [],
    invoices: []
  }
  clients.push(newClient)
  localStorage.setItem('clientportal_clients', JSON.stringify(clients))
  return newClient
}

export const deleteClient = (id) => {
  const clients = getClients()
  const filteredClients = clients.filter(client => client.id !== id)
  localStorage.setItem('clientportal_clients', JSON.stringify(filteredClients))
  return true
}