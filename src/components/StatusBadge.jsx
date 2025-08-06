import React from 'react'
import { CheckCircle, Clock, XCircle, AlertCircle, Pause } from 'lucide-react'

const StatusBadge = ({ status, size = 'md', showIcon = true }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'Active': {
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: CheckCircle,
        iconColor: 'text-emerald-600'
      },
      'Pending': {
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Clock,
        iconColor: 'text-amber-600'
      },
      'Completed': {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: CheckCircle,
        iconColor: 'text-blue-600'
      },
      'On Hold': {
        color: 'bg-slate-100 text-slate-800 border-slate-200',
        icon: Pause,
        iconColor: 'text-slate-600'
      },
      'Cancelled': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        iconColor: 'text-red-600'
      },
      'Paid': {
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: CheckCircle,
        iconColor: 'text-emerald-600'
      },
      'Unpaid': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
        iconColor: 'text-red-600'
      },
      'Overdue': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
        iconColor: 'text-red-600'
      }
    }

    return configs[status] || {
      color: 'bg-slate-100 text-slate-800 border-slate-200',
      icon: AlertCircle,
      iconColor: 'text-slate-600'
    }
  }

  const getSizeClasses = (size) => {
    const sizes = {
      'sm': 'px-2 py-1 text-xs',
      'md': 'px-2.5 py-0.5 text-sm',
      'lg': 'px-3 py-1 text-base'
    }
    return sizes[size] || sizes.md
  }

  const getIconSize = (size) => {
    const sizes = {
      'sm': 12,
      'md': 14,
      'lg': 16
    }
    return sizes[size] || sizes.md
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center rounded-full border font-semibold transition-all duration-200 ${config.color} ${getSizeClasses(size)}`}>
      {showIcon && (
        <Icon size={getIconSize(size)} className={`mr-1.5 ${config.iconColor}`} />
      )}
      {status}
    </span>
  )
}

export default StatusBadge