import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LoadingSpinnerProps } from '@/lib/types/components';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className,
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    current: 'text-current',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={cn(sizeClasses[size], colorClasses[color])} />
      </motion.div>
      {text && (
        <span className={cn('text-sm', colorClasses[color])}>
          {text}
        </span>
      )}
    </div>
  );
};

export const LoadingPage: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" text={text} />
      </div>
    </div>
  );
};

export const LoadingInline: React.FC<LoadingSpinnerProps> = (props) => {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner {...props} />
    </div>
  );
};