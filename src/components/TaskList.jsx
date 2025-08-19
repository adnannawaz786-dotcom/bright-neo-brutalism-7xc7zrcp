import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from './TaskCard'
import { TASK_STATUSES } from '../lib/constants'

const TaskList = ({ tasks, onToggleTask, onDeleteTask, filter = 'all' }) => {
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return task.status === TASK_STATUSES.PENDING
      case 'completed':
        return task.status === TASK_STATUSES.COMPLETED
      default:
        return true
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  }

  if (filteredTasks.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 flex items-center justify-center shadow-2xl border-4 border-black">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-2xl font-black text-gray-800 mb-2 text-center">
          {filter === 'active' ? 'No Active Tasks!' : 
           filter === 'completed' ? 'No Completed Tasks!' : 
           'No Tasks Yet!'}
        </h3>
        <p className="text-gray-600 text-center max-w-md font-medium">
          {filter === 'active' ? 'All caught up! Time to add some new tasks.' :
           filter === 'completed' ? 'Complete some tasks to see them here.' :
           'Start by adding your first task above.'}
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="transform-gpu"
          >
            <TaskCard
              task={task}
              onToggle={() => onToggleTask && onToggleTask(task.id)}
              onDelete={() => onDeleteTask && onDeleteTask(task.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {filteredTasks.length > 0 && (
        <motion.div 
          className="text-center pt-6 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-black rounded-2xl shadow-lg border-2 border-black">
            <span className="text-sm">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
            </span>
            {filter === 'all' && (
              <>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span className="text-xs font-medium">
                  {tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length} Done
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TaskList