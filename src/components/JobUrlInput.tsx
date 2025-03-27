
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JobUrlInputProps {
  onJobUrlSubmit: (url: string) => void;
}

const JobUrlInput: React.FC<JobUrlInputProps> = ({ onJobUrlSubmit }) => {
  const [jobUrl, setJobUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobUrl(value);
    setIsValidUrl(value === '' || validateUrl(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobUrl) {
      toast({
        title: "URL required",
        description: "Please enter a job posting URL.",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateUrl(jobUrl)) {
      setIsValidUrl(false);
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL for the job posting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading state
    setTimeout(() => {
      onJobUrlSubmit(jobUrl);
      setIsLoading(false);
      toast({
        title: "Job URL submitted",
        description: "We're analyzing the job posting.",
      });
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <div className="card-elegant p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Enter Job Posting URL</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="https://example.com/job-posting"
              value={jobUrl}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-foreground focus:ring-2 focus:outline-none transition-all duration-200 ${
                isValidUrl 
                  ? 'border-input focus:ring-primary/20 focus:border-primary' 
                  : 'border-destructive focus:ring-destructive/20'
              }`}
              disabled={isLoading}
            />
          </div>
          
          {!isValidUrl && (
            <p className="text-sm text-destructive">
              Please enter a valid URL (e.g., https://example.com/job-posting)
            </p>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center h-10 px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"></span>
                  Analyzing...
                </>
              ) : (
                'Analyze Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default JobUrlInput;
