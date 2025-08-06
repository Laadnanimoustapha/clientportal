import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ToggleButton from '../components/ToggleButton'
import { useSettings } from '../contexts/SettingsContext'
import { useToast } from '../contexts/ToastContext'
import { useTheme } from '../contexts/ThemeContext'
import { 
  Palette, 
  Type, 
  MessageSquare, 
  FileText, 
  Moon, 
  Sun, 
  Globe,
  Save,
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react'

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings()
  const { success, error } = useToast()
  const { isDarkMode, toggleTheme, isAnimating } = useTheme()
  const [formData, setFormData] = useState(settings)
  const [activeTab, setActiveTab] = useState('branding')

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      updateSettings(formData)
      success('Settings saved successfully!')
    } catch (err) {
      error('Failed to save settings')
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      resetSettings()
      setFormData(settings)
      success('Settings reset to default!')
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const tabs = [
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'content', label: 'Content', icon: MessageSquare },
    { id: 'localization', label: 'Localization', icon: Globe }
  ]

  const colorPresets = [
    { name: 'Ocean Blue', value: '#0ea5e9', gradient: 'from-cyan-500 to-blue-500' },
    { name: 'Emerald', value: '#10b981', gradient: 'from-emerald-500 to-green-500' },
    { name: 'Purple Magic', value: '#8b5cf6', gradient: 'from-purple-500 to-indigo-500' },
    { name: 'Sunset Red', value: '#ef4444', gradient: 'from-red-500 to-pink-500' },
    { name: 'Golden Orange', value: '#f97316', gradient: 'from-orange-500 to-amber-500' },
    { name: 'Rose Pink', value: '#ec4899', gradient: 'from-pink-500 to-rose-500' },
    { name: 'Teal Fresh', value: '#14b8a6', gradient: 'from-teal-500 to-cyan-500' },
    { name: 'Violet Dream', value: '#7c3aed', gradient: 'from-violet-500 to-purple-500' }
  ]

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                <Sparkles className="inline-block w-8 h-8 mr-3 text-purple-500" />
                Settings
              </h1>
              <p className="mt-3 text-slate-600 text-lg">Customize your client portal with vibrant colors and modern design</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="btn btn-outline btn-md"
              >
                <RotateCcw size={16} className="mr-2" />
                Reset to Default
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Categories
                </h3>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon size={18} className="mr-3" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="card-elevated">
                  <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center">
                      {tabs.find(tab => tab.id === activeTab)?.icon && 
                        React.createElement(tabs.find(tab => tab.id === activeTab).icon, { 
                          size: 24, 
                          className: "mr-3 text-blue-600" 
                        })
                      }
                      {tabs.find(tab => tab.id === activeTab)?.label} Settings
                    </h3>
                    <p className="text-slate-600 mt-1">Customize your portal's appearance and functionality</p>
                  </div>

                  <div className="px-8 py-8 space-y-8">
                    {/* Branding Tab */}
                    {activeTab === 'branding' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                            className="input"
                            placeholder="Your Company Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-4">
                            🎨 Primary Color Theme
                          </label>
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="relative">
                              <input
                                type="color"
                                value={formData.primaryColor}
                                onChange={(e) => handleChange('primaryColor', e.target.value)}
                                className="w-16 h-12 rounded-xl border-2 border-slate-200 cursor-pointer shadow-lg"
                              />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full animate-pulse"></div>
                            </div>
                            <input
                              type="text"
                              value={formData.primaryColor}
                              onChange={(e) => handleChange('primaryColor', e.target.value)}
                              className="input flex-1"
                              placeholder="#0ea5e9"
                            />
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            {colorPresets.map((color) => (
                              <button
                                key={color.name}
                                type="button"
                                onClick={() => handleChange('primaryColor', color.value)}
                                className={`group relative p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                                  formData.primaryColor === color.value 
                                    ? 'border-white shadow-lg ring-2 ring-blue-500' 
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                                title={color.name}
                              >
                                <div className={`w-full h-8 rounded-xl bg-gradient-to-r ${color.gradient} shadow-md`}></div>
                                <p className="text-xs font-medium text-slate-600 mt-2 text-center">{color.name}</p>
                                {formData.primaryColor === color.value && (
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Secondary Color
                          </label>
                          <div className="flex items-center space-x-4">
                            <input
                              type="color"
                              value={formData.secondaryColor}
                              onChange={(e) => handleChange('secondaryColor', e.target.value)}
                              className="w-12 h-10 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={formData.secondaryColor}
                              onChange={(e) => handleChange('secondaryColor', e.target.value)}
                              className="input flex-1"
                              placeholder="#64748b"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Logo
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Type className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                              Logo upload functionality would be implemented here
                            </p>
                            <p className="text-xs text-gray-500">
                              Supported formats: PNG, JPG, SVG (Max 2MB)
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                      <>
                        <div className={`p-8 rounded-3xl border-2 transition-all duration-500 ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-slate-800 to-indigo-900 border-indigo-500' 
                            : 'bg-gradient-to-r from-yellow-50 to-blue-50 border-yellow-200'
                        }`}>
                          <label className="block text-xl font-bold mb-8 flex items-center justify-center">
                            <div className={`animate-float ${isDarkMode ? 'text-indigo-400' : 'text-yellow-500'}`}>
                              {isDarkMode ? <Moon className="w-8 h-8 mr-3" /> : <Sun className="w-8 h-8 mr-3" />}
                            </div>
                            <span className={`animate-gradient bg-gradient-to-r ${
                              isDarkMode 
                                ? 'from-indigo-400 via-purple-400 to-blue-400' 
                                : 'from-yellow-600 via-orange-500 to-red-500'
                            } bg-clip-text text-transparent`}>
                              {isDarkMode ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
                            </span>
                          </label>
                          
                          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <div className="flex items-center space-x-4">
                              <div className="animate-bounce-slow">
                                <Sun size={32} className="text-yellow-500" />
                              </div>
                              <div>
                                <span className="text-lg font-semibold">Light</span>
                                <p className="text-sm opacity-75">Bright & Clean</p>
                              </div>
                            </div>
                            
                            <div className={`transform transition-transform duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                              <ToggleButton
                                enabled={isDarkMode}
                                onChange={toggleTheme}
                                size="lg"
                                colorScheme="purple"
                              />
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div>
                                <span className="text-lg font-semibold">Dark</span>
                                <p className="text-sm opacity-75">Easy on Eyes</p>
                              </div>
                              <div className="animate-pulse-slow">
                                <Moon size={32} className="text-indigo-400" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 text-center">
                            <p className="text-sm opacity-75">
                              🎨 Experience the portal in your preferred theme
                            </p>
                            <div className="flex justify-center space-x-2 mt-3">
                              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-4">Preview</h4>
                          <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center space-x-3 mb-4">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: formData.primaryColor }}
                              >
                                CP
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{formData.companyName}</h3>
                                <p className="text-sm text-gray-600">Client Portal</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div 
                                className="h-2 rounded"
                                style={{ backgroundColor: formData.primaryColor, width: '60%' }}
                              ></div>
                              <div 
                                className="h-2 rounded"
                                style={{ backgroundColor: formData.secondaryColor, width: '40%' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Welcome Message
                          </label>
                          <textarea
                            value={formData.welcomeMessage}
                            onChange={(e) => handleChange('welcomeMessage', e.target.value)}
                            rows={4}
                            className="input"
                            placeholder="Enter a welcome message for your clients..."
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            This message will be displayed on the client portal homepage.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Invoice Footer Text
                          </label>
                          <textarea
                            value={formData.invoiceFooter}
                            onChange={(e) => handleChange('invoiceFooter', e.target.value)}
                            rows={3}
                            className="input"
                            placeholder="Enter footer text for invoices..."
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            This text will appear at the bottom of all invoices.
                          </p>
                        </div>
                      </>
                    )}

                    {/* Localization Tab */}
                    {activeTab === 'localization' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select
                            value={formData.language}
                            onChange={(e) => handleChange('language', e.target.value)}
                            className="input"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="it">Italian</option>
                          </select>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-4">
                            Additional Features (Coming Soon)
                          </h4>
                          <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Globe size={16} className="mr-2" />
                              Multi-language support
                            </div>
                            <div className="flex items-center">
                              <FileText size={16} className="mr-2" />
                              Custom date/time formats
                            </div>
                            <div className="flex items-center">
                              <Type size={16} className="mr-2" />
                              Currency localization
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary btn-md"
                    >
                      <Save size={16} className="mr-2" />
                      Save Settings
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings