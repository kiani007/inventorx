'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  error?: boolean;
  errorMessage?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  preview?: boolean;
  required?: boolean;
  helpText?: string;
  className?: string;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      accept = 'image/*',
      maxSizeMB = 5,
      error,
      errorMessage,
      value,
      onChange,
      preview = true,
      required,
      helpText,
      className,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (file: File | null) => {
      if (!file) {
        onChange(null);
        setPreviewUrl(null);
        return;
      }

      // Check file size
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        alert(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      onChange(file);

      // Create preview for images
      if (preview && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    };

    const handleRemove = () => {
      handleFileChange(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <label className="block text-[14px] font-semibold text-[#1A1A1A] uppercase tracking-[0.5px]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {!value && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'relative w-full px-6 py-8 rounded-[20px] border-2 border-dashed',
              'bg-gradient-to-br from-[#FFF8F0] to-white',
              'transition-all duration-300 cursor-pointer',
              'hover:border-[#D4AF37] hover:bg-[#FFF8F0]',
              dragActive ? 'border-[#D4AF37] bg-[#FFF8F0]' : 'border-gray-300',
              error && 'border-red-500',
            )}
            style={{ boxShadow: 'var(--neo-shadow)' }}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <Upload size={24} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  Click to upload or drag and drop
                </p>
                <p className="text-[12px] text-[#999999] mt-1">
                  {accept.includes('image') ? 'PNG, JPG, GIF' : 'Any file'} (max {maxSizeMB}MB)
                </p>
              </div>
            </div>
          </div>
        )}

        {value && previewUrl && (
          <div className="relative w-full rounded-[20px] overflow-hidden border-2 border-[#D4AF37]">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors"
            >
              <X size={16} className="text-red-500" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-2">
              <p className="text-[13px] text-white truncate">{value.name}</p>
            </div>
          </div>
        )}

        {value && !previewUrl && (
          <div className="relative w-full px-6 py-4 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white border-2 border-[#D4AF37]"
               style={{ boxShadow: 'var(--neo-shadow)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <ImageIcon size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#1A1A1A]">{value.name}</p>
                  <p className="text-[12px] text-[#999999]">
                    {(value.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        )}

        {helpText && !error && (
          <p className="text-[12px] text-[#999999]">{helpText}</p>
        )}

        {error && errorMessage && (
          <p className="text-[13px] text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

