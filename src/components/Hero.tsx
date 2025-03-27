
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block py-1 px-3 rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
        >
          Resume Optimization Simplified
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
        >
          Stand out with an optimized resume
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
        >
          Upload your resume and provide a job posting URL to receive personalized optimization suggestions that align your experience with what employers are looking for.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
