import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

const defaultSettings = {
  companyName: 'ClientPortal Pro',
  companyLogo: null,
  primaryColor: '#4f46e5',
  secondaryColor: '#64748b',
  welcomeMessage: 'Welcome to your client portal. Here you can view project updates, download files, and manage invoices.',
  invoiceFooter: 'Thank you for your business!',
  darkMode: false,
  language: 'en'
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('clientportal_settings')
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) })
    }
  }, [])

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem('clientportal_settings', JSON.stringify(updatedSettings))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.setItem('clientportal_settings', JSON.stringify(defaultSettings))
  }

  const value = {
    settings,
    updateSettings,
    resetSettings
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}