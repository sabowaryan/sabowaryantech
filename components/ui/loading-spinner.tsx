'use client';

import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LoadingSpinnerProps } from '@/lib/types/components';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva(
  'animate-spin',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        white: 'text-white',
        current: 'text-current',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
);

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className,
  ...props
}) => {
  return (
    <div 
      className={cn('flex items-center justify-center gap-2', className)}
      role="status"
      aria-label={text || 'Loading'}
      {...props}
    >
      <Loader2 className={cn(spinnerVariants({ size, color }))} />
      {text && (
        <span className="text-sm text-muted-foreground animate-pulse">
          {text}
        </span>
      )}
      <span className="sr-only">{text || 'Loading...'}</span>
    </div>
  );
};

// Full page loading component
const LoadingPage: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-8 bg-card rounded-lg shadow-medium border">
        <LoadingSpinner size="xl" text={text} />
      </div>
    </div>
  );
};

// Inline loading component
const LoadingInline: React.FC<LoadingSpinnerProps> = (props) => {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner {...props} />
    </div>
  );
};

// Button loading state
const LoadingButton: React.FC<{ size?: 'xs' | 'sm' | 'md' | 'lg' }> = ({ 
  size = 'sm' 
}) => {
  return <LoadingSpinner size={size} color="current" />;
};

LoadingSpinner.displayName = 'LoadingSpinner';
LoadingPage.displayName = 'LoadingPage';
LoadingInline.displayName = 'LoadingInline';
LoadingButton.displayName = 'LoadingButton';

export { 
  LoadingSpinner, 
  LoadingPage, 
  LoadingInline, 
  LoadingButton,
  spinnerVariants 
};
export type { LoadingSpinnerProps };