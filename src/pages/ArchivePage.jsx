import React from 'react';
import { motion } from 'framer-motion';
import { Archive, Trash2, RotateCcw } from 'lucide-react';
import TaskList from '../components/TaskList';




  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-yellow-400 p-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Archive size={32} className="text-black" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                ARCHIVE
              </h1>
              <p className="text-white/80 text-lg font-medium">
                Your completed and archived tasks
              </p>
            </div>
          </div>
          
          <div className="bg-black/20 rounded-2xl p-4 border-2 border-white/20">
            <div className="flex flex-wrap gap-4 text-white">
              <div className="bg-green-500/20 px-4 py-2 rounded-xl border border-green-400">
                <span className="font-bold">{archivedTasks.length}</span> Archived Tasks
              </div>
            </div>
          </div>
        </motion.div>

        {/* Archive Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
          {archivedTasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-400 p-6 rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] inline-block mb-6">
                <Archive size={48} className="text-black" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                NO ARCHIVED TASKS
              </h3>
              <p className="text-white/70 text-lg font-medium max-w-md mx-auto">
                Tasks you complete or archive will appear here. You can restore them or delete them permanently.
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-white mb-2">
                  ARCHIVED TASKS
                </h2>
                <p className="text-white/70 font-medium">
                  Restore tasks to bring them back to your active list
                </p>
              </div>
              
              <div className="space-y-4">
                {archivedTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-white mb-2">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-white/80 font-medium mb-3">
                            {task.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-500/30 px-3 py-1 rounded-lg text-white/90 text-sm font-bold border border-white/20">
                            ARCHIVED
                          </span>
                          {task.category && (
                            <span className="bg-blue-500/30 px-3 py-1 rounded-lg text-white/90 text-sm font-bold border border-blue-400/50">
                              {task.category.toUpperCase()}
                            </span>
                          )}
                          {task.priority && (
                            <span className={`px-3 py-1 rounded-lg text-white/90 text-sm font-bold border ${
                              task.priority === 'high' 
                                ? 'bg-red-500/30 border-red-400/50'
                                : task.priority === 'medium'
                                ? 'bg-yellow-500/30 border-yellow-400/50'
                                : 'bg-green-500/30 border-green-400/50'
                            }`}>
                              {task.priority.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRestoreTask(task.id)}
                          className="bg-green-500 hover:bg-green-600 p-3 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors"
                          title="Restore Task"
                        >
                          <RotateCcw size={20} className="text-white" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteTask(task.id)}
                          className="bg-red-500 hover:bg-red-600 p-3 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors"
                          title="Delete Permanently"
                        >
                          <Trash2 size={20} className="text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArchivePage;
