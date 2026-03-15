'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  accept?: string;
  maxSize?: number; // in MB
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  placeholder = 'Enter image URL or upload',
  disabled = false,
  accept = 'image/jpeg,image/png,image/webp,image/gif',
  maxSize = 10,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState(value || '');

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file) return;

      setIsUploading(true);
      setUploadError(null);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        onChange?.(data.url);
        setUrlInput(data.url);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        setUploadError(message);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled || isUploading) return;

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        handleUpload(file);
      }
    },
    [disabled, isUploading, handleUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrlInput(newUrl);
    onChange?.(newUrl);
  };

  const handleRemove = () => {
    onChange?.('');
    setUrlInput('');
    setUploadError(null);
  };

  const hasImage = value && value.length > 0;

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}

      {/* Preview Area */}
      {hasImage && (
        <div className="relative rounded-lg overflow-hidden border bg-muted/20">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover"
            onError={() => {
              onChange?.('');
              setUrlInput('');
            }}
          />
          {!disabled && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Upload Zone */}
      {!disabled && (
        <div
          className={`
            relative rounded-lg border-2 border-dashed transition-colors
            ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
            ${isUploading ? 'bg-muted/50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />

          <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-text-gradient text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, WebP up to {maxSize}MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* URL Input Fallback */}
      {!disabled && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={urlInput}
              onChange={handleUrlChange}
              className="pl-9"
              disabled={disabled}
            />
          </div>
          {urlInput && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              title="Clear"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
