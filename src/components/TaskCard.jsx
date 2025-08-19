import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const handleToggleComplete = () => {
    if (typeof onToggleComplete === 'function') {
      onToggleComplete(task.id);
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      onDelete(task.id);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const taskStyle = task && task.completed 
    ? 'line-through text-gray-500' 
    : 'text-gray-900';

  const cardBg = task && task.completed 
    ? 'bg-gradient-to-br from-gray-100 to-gray-200' 
    : 'bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100';

  const borderColor = task && task.completed 
    ? 'border-gray-300' 
    : 'border-black';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`${cardBg} ${borderColor} border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Button
                onClick={handleToggleComplete}
                variant="ghost"
                size="sm"
                className={`p-1 hover:bg-black/10 rounded-full transition-colors ${
                  task && task.completed ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <CheckCircle 
                  className={`h-6 w-6 ${
                    task && task.completed ? 'fill-current' : ''
                  }`} 
                />
              </Button>
              
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${taskStyle} transition-all duration-200`}>
                  {task && typeof task.title === 'string' ? task.title : 'Untitled Task'}
                </h3>
                {task && task.description && typeof task.description === 'string' && (
                  <p className={`text-sm mt-1 ${taskStyle}`}>
                    {task.description}
                  </p>
                )}
              </div>
            </div>
            
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-full transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
          
          {task && task.createdAt && (
            <div className="mt-3 pt-3 border-t-2 border-black/20">
              <p className="text-xs text-gray-600 font-mono">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;