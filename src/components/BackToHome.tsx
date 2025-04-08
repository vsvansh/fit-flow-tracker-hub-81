
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface BackToHomeProps {
  className?: string;
}

const BackToHome = ({ className = '' }: BackToHomeProps) => {
  const location = useLocation();
  
  // Don't show on the home page
  if (location.pathname === '/') {
    return null;
  }

  // Get current page name from the path
  const pageName = location.pathname.split('/').pop()?.charAt(0).toUpperCase() + 
                   location.pathname.split('/').pop()?.slice(1);

  return (
    <motion.div 
      className={`flex items-center justify-between py-4 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="group">
          <Link to="/" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <span className="mx-2">/</span>
          <Home className="h-4 w-4 mr-1" />
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 dark:text-gray-200 font-medium">{pageName}</span>
        </div>
      </div>
      
      <div className="hidden md:block">
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-800/30 dark:text-blue-400 dark:border-blue-800"
        >
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default BackToHome;
