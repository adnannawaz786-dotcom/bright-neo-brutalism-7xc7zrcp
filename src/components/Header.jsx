import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/constants';

export default function Header() {
  return (
    <header className="bg-black border-b-8 border-yellow-400 shadow-[8px_8px_0px_0px_rgba(255,255,0,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link 
            to={ROUTES.HOME}
            className="text-3xl font-black text-white hover:text-yellow-400 transition-colors duration-200 transform hover:scale-105"
          >
            TODO BRUTAL
          </Link>
          
          <nav className="flex space-x-1">
            <Link
              to={ROUTES.HOME}
              className="px-6 py-3 bg-white text-black font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 transform hover:bg-yellow-400"
            >
              TASKS
            </Link>
            
            <Link
              to={ROUTES.COMPLETED}
              className="px-6 py-3 bg-green-400 text-black font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 transform hover:bg-green-300"
            >
              DONE
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="bg-yellow-400 h-2 w-full"></div>
    </header>
  );
}