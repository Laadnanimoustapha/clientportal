import React from 'react'
import { CheckCircle, Circle, Clock, Calendar } from 'lucide-react'
import { formatDate } from '../utils/helpers'

const TaskList = ({ tasks, onTaskToggle, showActions = false }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500">No tasks have been assigned yet.</p>
      </div>
    )
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{completedTasks} of {totalTasks} completed</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
              task.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 flex-1">
              {showActions ? (
                <button
                  onClick={() => onTaskToggle && onTaskToggle(task.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {task.completed && <CheckCircle size={12} />}
                </button>
              ) : (
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300'
                }`}>
                  {task.completed ? <CheckCircle size={12} /> : <Circle size={12} className="text-gray-400" />}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  task.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-900'
                }`}>
                  {task.title}
                </p>
                
                {task.description && (
                  <p className={`text-xs mt-1 ${
                    task.completed 
                      ? 'text-gray-400' 
                      : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}
                
                {task.dueDate && (
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    <span>Due: {formatDate(task.dueDate)}</span>
                    {new Date(task.dueDate) < new Date() && !task.completed && (
                      <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                        Overdue
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {task.priority && (
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-800'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              )}
              
              {task.completed ? (
                <span className="text-green-600 text-sm font-medium">
                  ✓ Done
                </span>
              ) : (
                <Clock size={16} className="text-yellow-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
            <p className="text-sm text-gray-600">Total Tasks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">{totalTasks - completedTasks}</p>
            <p className="text-sm text-gray-600">Remaining</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList