
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  onResumeUpload: (file: File) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onResumeUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      onResumeUpload(droppedFile);
      toast({
        title: "Resume uploaded",
        description: `${droppedFile.name} has been successfully uploaded.`,
      });
    }
  }, [onResumeUpload, toast]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onResumeUpload(selectedFile);
        toast({
          title: "Resume uploaded",
          description: `${selectedFile.name} has been successfully uploaded.`,
        });
      }
    }
  }, [onResumeUpload, toast]);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOC/DOCX file.",
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const removeFile = useCallback(() => {
    setFile(null);
    toast({
      title: "Resume removed",
      description: "Your resume has been removed.",
    });
  }, [toast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <div className="card-elegant p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
        
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-base font-medium">
                  Drag and drop your resume here
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, DOC or DOCX (max 5MB)
                </p>
              </div>
              <div className="flex items-center justify-center">
                <label className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-secondary/30 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <File className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="rounded-full p-1 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeUpload;
