import React from 'react'

const ToggleButton = ({ 
  enabled, 
  onChange, 
  size = 'md',
  colorScheme = 'default',
  disabled = false,
  label,
  description 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-5'
      case 'lg':
        return 'w-14 h-8'
      default:
        return 'w-11 h-6'
    }
  }

  const getToggleClasses = () => {
    switch (size) {
      case 'sm':
        return enabled ? 'translate-x-3' : 'translate-x-0'
      case 'lg':
        return enabled ? 'translate-x-6' : 'translate-x-0'
      default:
        return enabled ? 'translate-x-5' : 'translate-x-0'
    }
  }

  const getToggleSize = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4'
      case 'lg':
        return 'h-7 w-7'
      default:
        return 'h-5 w-5'
    }
  }

  const getColorClasses = () => {
    if (disabled) {
      return 'bg-gray-200'
    }
    
    switch (colorScheme) {
      case 'success':
        return enabled ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gray-200'
      case 'warning':
        return enabled ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-200'
      case 'danger':
        return enabled ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gray-200'
      case 'purple':
        return enabled ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-gray-200'
      case 'cyan':
        return enabled ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-200'
      default:
        return enabled ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-200'
    }
  }

  return (
    <div className={`flex items-center ${label ? 'space-x-3' : ''}`}>
      <button
        type="button"
        className={`
          ${getSizeClasses()}
          ${getColorClasses()}
          relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        `}
        role="switch"
        aria-checked={enabled}
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
      >
        <span className="sr-only">{label || 'Toggle'}</span>
        <span
          aria-hidden="true"
          className={`
            ${getToggleSize()}
            ${getToggleClasses()}
            pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 
            transition-all duration-300 ease-in-out
          `}
        />
      </button>
      
      {label && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{label}</span>
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default ToggleButton