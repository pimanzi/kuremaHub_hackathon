import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "@/lib/constants";
// import { toast } from "@/hooks/use-toast";
import { LucideUpload, LucideX } from "lucide-react";
const FileInput = ({
  onFileChange,
  previewUrl,
  error,
  className,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      validateAndProcessFile(files[0]);
    }
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files?.length) {
      validateAndProcessFile(files[0]);
    }
  };
  const validateAndProcessFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        variant: "destructive",
      });
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image or document",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    onFileChange(file);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  const clearFile = (e) => {
    e.stopPropagation();
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <div className="space-y-2">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "art-upload-zone",
          isDragging && "dragging",
          error && "border-destructive/50 hover:border-destructive/70",
          className
        )}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept={ALLOWED_FILE_TYPES.join(",")}
          className="sr-only"
          {...props}
        />
        
        {previewUrl ? (
          <div className="relative">
            <div className={cn("relative rounded-md overflow-hidden mx-auto max-h-80", isLoading && "img-loading")}>
              {previewUrl.match(/\.(jpe?g|png|gif|webp)$/i) ? (
                <img
                  src={previewUrl}
                  alt="Artwork preview"
                  className="object-contain mx-auto max-h-80"
                  onLoad={() => setIsLoading(false)}
                />
              ) : (
                <div className="p-6 bg-secondary/50 rounded-md text-center">
                  <p className="text-sm font-medium">File uploaded</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Document or non-image file
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-2 right-2 p-1 rounded-full bg-foreground/10 backdrop-blur-sm text-foreground hover:bg-foreground/20 transition-soft"
            >
              <LucideX className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <LucideUpload className="h-10 w-10 mb-2" />
            <p className="text-sm font-medium mb-1">Drag and drop your artwork here</p>
            <p className="text-xs">or click to browse</p>
            <p className="text-xs mt-3 text-muted-foreground/70">
              Supported formats: JPG, PNG, GIF, WebP, PDF, SVG (Max: 10MB)
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};
export default FileInput;