'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Edit3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { generateSlug, type SlugEditState } from '@/lib/utils/slug';

interface SlugInputProps {
  label?: string;
  sourceLabel?: string;
  slugLabel?: string;
  sourceValue: string;
  slugValue: string;
  onSourceChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  editState: SlugEditState;
  onRegenerate: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function SlugInput({
  label,
  sourceLabel = 'Title',
  slugLabel = 'Slug',
  sourceValue,
  slugValue,
  onSourceChange,
  onSlugChange,
  editState,
  onRegenerate,
  placeholder,
  required = false,
  disabled = false,
}: SlugInputProps) {
  // Track if source has been changed from initial value
  const [sourceEdited, setSourceEdited] = useState(false);

  // Update slug when source changes (only if in auto mode and source was edited)
  useEffect(() => {
    if (editState === 'auto' && sourceValue && sourceEdited) {
      const newSlug = generateSlug(sourceValue);
      if (newSlug !== slugValue) {
        onSlugChange(newSlug);
      }
    }
  }, [sourceValue, editState, sourceEdited, slugValue, onSlugChange]);

  // Track source changes
  const handleSourceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSourceEdited(true);
    onSourceChange(value);
  }, [onSourceChange]);

  // Handle manual slug edit
  const handleSlugChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSlugChange(e.target.value);
  }, [onSlugChange]);

  // Reset and regenerate
  const handleRegenerate = useCallback(() => {
    setSourceEdited(true);
    onRegenerate();
    const newSlug = generateSlug(sourceValue);
    onSlugChange(newSlug);
  }, [onRegenerate, sourceValue, onSlugChange]);

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}
      
      <div className="grid gap-4">
        {/* Source field (title/name) */}
        <div className="space-y-2">
          <Label htmlFor="source">{sourceLabel}</Label>
          <Input
            id="source"
            value={sourceValue}
            onChange={handleSourceChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
          />
        </div>

        {/* Slug field with regenerate button */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug">{slugLabel}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRegenerate}
              disabled={disabled}
              className="h-7 px-2 text-muted-foreground"
            >
              {editState === 'manual' ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync
                </>
              ) : (
                <>
                  <Edit3 className="h-3 w-3 mr-1" />
                  Auto
                </>
              )}
            </Button>
          </div>
          <Input
            id="slug"
            value={slugValue}
            onChange={handleSlugChange}
            placeholder={sourceValue ? generateSlug(sourceValue) : 'url-friendly-slug'}
            required={required}
            disabled={disabled}
          />
          {editState === 'manual' && (
            <p className="text-xs text-muted-foreground">
              Manual override - click &quot;Sync&quot; to regenerate from {sourceLabel.toLowerCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
