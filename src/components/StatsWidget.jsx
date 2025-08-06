import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatsWidget = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgGradient, 
  borderColor,
  trend,
  trendValue,
  emoji,
  animationDelay = 0 
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-500" />
    return null
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600'
    if (trend === 'down') return 'text-red-600'
    return 'text-slate-500'
  }

  return (
    <div 
      className={`card-elevated p-6 hover:scale-105 transition-all duration-300 animate-fade-in bg-gradient-to-br ${bgGradient} border-l-4 ${borderColor} group cursor-pointer`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-pulse`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center">
              {emoji && <span className="mr-2">{emoji}</span>}
              {title}
            </p>
            <p className={`text-4xl font-bold bg-gradient-to-r ${color.replace('from-', 'from-').replace('to-', 'to-')} bg-clip-text text-transparent`}>
              {value}
            </p>
            {trend && (
              <div className="flex items-center mt-2 space-x-1">
                {getTrendIcon()}
                <span className={`text-xs font-medium ${getTrendColor()}`}>
                  {trendValue}
                </span>
                <span className="text-xs text-slate-500">vs last month</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="flex flex-col space-y-1 opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default StatsWidget