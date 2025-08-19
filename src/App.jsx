import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArchivePage from './pages/ArchivePage'
import Header from './components/Header'
import { motion } from 'framer-motion'

function App() {
  return (
    <Router>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-h-screen backdrop-blur-sm bg-white/10">
          <Header />
          
          <motion.main 
            className="container mx-auto px-4 py-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archive" element={<ArchivePage />} />
            </Routes>
          </motion.main>
        </div>
      </motion.div>
    </Router>
  )
}

export default App