
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  return (
    <motion.nav 
      className="border-b py-3 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-bold text-lg"
        >
          Resume Optimizer
        </motion.div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.user_metadata.avatar_url && (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="User profile" 
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm hidden md:inline">
                {user.user_metadata.full_name || user.email}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={signOut}
                disabled={loading}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          ) : (
            <Button 
              onClick={signInWithGoogle} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
