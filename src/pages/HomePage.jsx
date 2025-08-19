import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import TaskList from '../components/TaskList'
import AddTaskForm from '../components/AddTaskForm'
import { TASK_STATUSES, COLORS } from '../lib/constants'

const HomePage = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('neo-brutalism-tasks')
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error('Error loading tasks:', error)
        setTasks([])
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('neo-brutalism-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskData) => {
    if (!taskData || typeof taskData.title !== 'string' || !taskData.title.trim()) {
      return
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      status: TASK_STATUSES.TODO,
      priority: taskData.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setTasks(prevTasks => [newTask, ...prevTasks])
    setShowAddForm(false)
  }

  const updateTask = (taskId, updates) => {
    if (!taskId || !updates) return

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  const deleteTask = (taskId) => {
    if (!taskId) return
    
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const toggleTaskStatus = (taskId) => {
    if (!taskId) return

    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newStatus = task.status === TASK_STATUSES.TODO 
            ? TASK_STATUSES.COMPLETED 
            : TASK_STATUSES.TODO
          
          return {
            ...task,
            status: newStatus,
            updatedAt: new Date().toISOString()
          }
        }
        return task
      })
    )
  }

  const getFilteredTasks = () => {
    if (!Array.isArray(tasks)) return []

    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.status === TASK_STATUSES.COMPLETED)
      case 'active':
        return tasks.filter(task => task.status === TASK_STATUSES.TODO)
      default:
        return tasks
    }
  }

  const getTaskCounts = () => {
    if (!Array.isArray(tasks)) return { total: 0, completed: 0, active: 0 }

    return {
      total: tasks.length,
      completed: tasks.filter(task => task.status === TASK_STATUSES.COMPLETED).length,
      active: tasks.filter(task => task.status === TASK_STATUSES.TODO).length
    }
  }

  const filteredTasks = getFilteredTasks()
  const taskCounts = getTaskCounts()

  const filterButtons = [
    { key: 'all', label: 'All Tasks', count: taskCounts.total, icon: AlertCircle },
    { key: 'active', label: 'Active', count: taskCounts.active, icon: Clock },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 
            className="text-6xl md:text-8xl font-black text-black mb-4 transform rotate-1"
            style={{ 
              textShadow: '8px 8px 0px #fff, 16px 16px 0px #ff6b6b',
              fontFamily: 'Arial Black, sans-serif'
            }}
          >
            TODO
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black bg-white px-6 py-3 inline-block transform -rotate-1 border-4 border-black shadow-lg">
            BRIGHT NEO BRUTALISM STYLE
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {filterButtons.map((button, index) => {
            const IconComponent = button.icon
            return (
              <motion.button
                key={button.key}
                onClick={() => setFilter(button.key)}
                whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 border-4 border-black font-bold text-lg shadow-lg transform transition-all duration-200 ${
                  filter === button.key
                    ? 'bg-black text-white scale-105'
                    : 'bg-white text-black hover:bg-gray-100'
                } ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              >
                <div className="flex items-center justify-center gap-3">
                  <IconComponent size={24} />
                  <span>{button.label}</span>
                  <span className="bg-yellow-300 text-black px-2 py-1 rounded-full text-sm">
                    {button.count}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Add Task Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 text-center"
        >
          <motion.button
            onClick={() => setShowAddForm(!showAddForm)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-lime-400 hover:bg-lime-300 text-black font-black text-xl px-8 py-4 border-4 border-black shadow-lg transform -rotate-2 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Plus size={28} />
              {showAddForm ? 'CANCEL' : 'ADD TASK'}
            </div>
          </motion.button>
        </motion.div>

        {/* Add Task Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <AddTaskForm onAddTask={addTask} onCancel={() => setShowAddForm(false)} />
          </motion.div>
        )}

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white border-4 border-black p-8 inline-block transform rotate-2 shadow-lg">
                <h3 className="text-2xl font-black text-black mb-2">NO TASKS YET!</h3>
                <p className="text-lg font-bold text-gray-700">
                  {filter === 'completed' && 'No completed tasks yet. Get to work!'}
                  {filter === 'active' && 'No active tasks. Time to add some!'}
                  {filter === 'all' && 'Your task list is empty. Add your first task above!'}
                </p>
              </div>
            </motion.div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleStatus={toggleTaskStatus}
            />
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 mb-8"
        >
          <div className="bg-black text-white p-4 inline-block transform -rotate-1 border-4 border-white shadow-lg">
            <p className="font-bold text-lg">
              STAY PRODUCTIVE • STAY BRUTAL • STAY BRIGHT
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage