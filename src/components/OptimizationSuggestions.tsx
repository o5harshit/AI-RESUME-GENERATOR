
import React from 'react';
import { motion } from 'framer-motion';

export interface Suggestion {
  category: 'critical' | 'important' | 'recommendation';
  text: string;
  rationale: string;
}

interface OptimizationSuggestionsProps {
  suggestions: Suggestion[] | null;
  isLoading: boolean;
}

const OptimizationSuggestions: React.FC<OptimizationSuggestionsProps> = ({ 
  suggestions, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="card-elegant p-6 md:p-8">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-lg font-medium">Generating optimization suggestions...</p>
            <p className="text-muted-foreground">This may take a moment</p>
          </div>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) return null;

  // Group suggestions by category
  const criticalSuggestions = suggestions.filter(s => s.category === 'critical');
  const importantSuggestions = suggestions.filter(s => s.category === 'important');
  const recommendations = suggestions.filter(s => s.category === 'recommendation');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto mb-12"
    >
      <div className="card-elegant p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Optimization Suggestions</h2>
        
        <div className="space-y-8">
          {criticalSuggestions.length > 0 && (
            <SuggestionCategory 
              title="Critical Improvements" 
              suggestions={criticalSuggestions} 
              badgeColor="bg-red-100 text-red-800"
            />
          )}
          
          {importantSuggestions.length > 0 && (
            <SuggestionCategory 
              title="Important Enhancements" 
              suggestions={importantSuggestions} 
              badgeColor="bg-amber-100 text-amber-800"
            />
          )}
          
          {recommendations.length > 0 && (
            <SuggestionCategory 
              title="Recommendations" 
              suggestions={recommendations} 
              badgeColor="bg-blue-100 text-blue-800"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface SuggestionCategoryProps {
  title: string;
  suggestions: Suggestion[];
  badgeColor: string;
}

const SuggestionCategory: React.FC<SuggestionCategoryProps> = ({ title, suggestions, badgeColor }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="space-y-4">
        {suggestions.map((suggestion, idx) => (
          <div key={idx} className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start mb-2">
              <span className={`${badgeColor} text-xs px-2 py-0.5 rounded-full`}>
                {suggestion.category}
              </span>
            </div>
            <p className="font-medium mb-2">{suggestion.text}</p>
            <p className="text-sm text-muted-foreground">{suggestion.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationSuggestions;
