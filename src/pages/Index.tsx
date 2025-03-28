
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Components
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ResumeUpload from '@/components/ResumeUpload';
import JobUrlInput from '@/components/JobUrlInput';
import AnalysisResults, { AnalysisResult } from '@/components/AnalysisResults';
import OptimizationSuggestions, { Suggestion } from '@/components/OptimizationSuggestions';

// Utilities
import { analyzeResume } from '@/utils/resumeAnalyzer';

const Index = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobUrl, setJobUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const { toast } = useToast();

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    // Reset results if a new resume is uploaded
    if (analysisResults) {
      setAnalysisResults(null);
      setSuggestions(null);
    }
  };

  const handleJobUrlSubmit = (url: string) => {
    setJobUrl(url);
    
    // If we already have a resume file, start the analysis
    if (resumeFile) {
      performAnalysis(resumeFile, url);
    }
  };

  const performAnalysis = async (file: File, url: string) => {
    if (!file || !url) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and enter a job posting URL.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // In a real implementation, this would do real analysis
      const { analysisResults, suggestions } = await analyzeResume(file, url);
      
      setAnalysisResults(analysisResults);
      setSuggestions(suggestions);
      
      toast({
        title: "Analysis complete",
        description: "We've analyzed your resume against the job posting.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <Hero />
        
        <div className="mt-10">
          <ResumeUpload onResumeUpload={handleResumeUpload} />
          <JobUrlInput onJobUrlSubmit={handleJobUrlSubmit} />
          
          {(isAnalyzing || analysisResults) && (
            <AnalysisResults 
              results={analysisResults} 
              isLoading={isAnalyzing} 
            />
          )}
          
          {(isAnalyzing || suggestions) && (
            <OptimizationSuggestions 
              suggestions={suggestions} 
              isLoading={isAnalyzing}
            />
          )}
          
          {!resumeFile && !jobUrl && !isAnalyzing && !analysisResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center my-12"
            >
              <p className="text-muted-foreground">
                Upload your resume and enter a job posting URL to get started.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
