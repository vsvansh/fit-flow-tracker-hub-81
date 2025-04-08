
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
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <span className="mx-2">/</span>
          <Home className="h-4 w-4 mr-1" />
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 dark:text-gray-200">{pageName}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BackToHome;
