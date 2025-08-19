import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'

export default function AddTaskForm({ onAddTask, isOpen, onToggle }) {
  const [taskText, setTaskText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!taskText || !taskText.trim()) return
    
    setIsSubmitting(true)
    
    try {
      const newTask = {
        id: Date.now().toString(),
        text: taskText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium'
      }
      
      if (typeof onAddTask === 'function') {
        await onAddTask(newTask)
      }
      
      setTaskText('')
      if (typeof onToggle === 'function') {
        onToggle()
      }
    } catch (error) {
      console.error('Failed to add task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setTaskText('')
      if (typeof onToggle === 'function') {
        onToggle()
      }
    }
  }

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={onToggle}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl border-4 border-black transform hover:scale-110 transition-all duration-200"
          style={{
            boxShadow: '8px 8px 0px #000000',
          }}
        >
          <Plus className="h-8 w-8 text-white" />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && typeof onToggle === 'function') {
          onToggle()
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="bg-white rounded-lg border-4 border-black p-8 w-full max-w-md"
        style={{
          boxShadow: '12px 12px 0px #000000',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-black">ADD NEW TASK</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="task-input" className="block text-sm font-bold text-black uppercase tracking-wide">
              Task Description
            </label>
            <Input
              id="task-input"
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="h-12 text-lg border-4 border-black rounded-lg focus:ring-0 focus:border-purple-600 bg-yellow-50"
              style={{
                boxShadow: '4px 4px 0px #000000',
              }}
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!taskText.trim() || isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold border-4 border-black rounded-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                boxShadow: '4px 4px 0px #000000',
              }}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'ADD TASK'
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onToggle}
              disabled={isSubmitting}
              className="px-6 h-12 border-4 border-black rounded-lg font-bold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
              style={{
                boxShadow: '4px 4px 0px #000000',
              }}
            >
              CANCEL
            </Button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Press ESC to cancel • Enter to submit
        </div>
      </motion.div>
    </motion.div>
  )
}