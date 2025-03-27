
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export interface AnalysisResult {
  score: number;
  keywordMatch: number;
  skillsMatch: number;
  requirementsMatch: number;
  keywords: {
    matched: string[];
    missing: string[];
  };
  skills: {
    matched: string[];
    missing: string[];
  };
}

interface AnalysisResultsProps {
  results: AnalysisResult | null;
  isLoading: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="card-elegant p-6 md:p-8">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-lg font-medium">Analyzing your resume...</p>
            <p className="text-muted-foreground">This may take a moment</p>
          </div>
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <div className="card-elegant p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Resume Analysis Results</h2>
        
        <div className="space-y-6">
          {/* Overall score */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 mb-3">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#f1f1f1" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={getScoreColor(results.score)} 
                  strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 45 * (results.score / 100)} ${2 * Math.PI * 45 * (1 - results.score / 100)}`}
                  strokeDashoffset={(2 * Math.PI * 45) * 0.25}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  style={{ 
                    transition: "stroke-dasharray 1s ease-out" 
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {results.score}%
              </div>
            </div>
            <h3 className="text-lg font-medium">Resume Match Score</h3>
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Keyword Match</p>
              <p className="text-xl font-bold">{results.keywordMatch}%</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Skills Match</p>
              <p className="text-xl font-bold">{results.skillsMatch}%</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Req. Match</p>
              <p className="text-xl font-bold">{results.requirementsMatch}%</p>
            </div>
          </div>
          
          {/* Keywords */}
          <div>
            <h3 className="text-lg font-medium mb-3">Keywords Analysis</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Matched Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.matched.length > 0 ? (
                    results.keywords.matched.map((keyword, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No matching keywords found</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <X className="h-4 w-4 text-red-500 mr-1" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.missing.length > 0 ? (
                    results.keywords.missing.map((keyword, idx) => (
                      <span key={idx} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No missing keywords</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <h3 className="text-lg font-medium mb-3">Skills Analysis</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Matched Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.skills.matched.length > 0 ? (
                    results.skills.matched.map((skill, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No matching skills found</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <X className="h-4 w-4 text-red-500 mr-1" />
                  Missing Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.skills.missing.length > 0 ? (
                    results.skills.missing.map((skill, idx) => (
                      <span key={idx} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No missing skills</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to determine color based on score
const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

export default AnalysisResults;
