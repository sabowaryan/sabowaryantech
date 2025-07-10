'use client';

import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ToastProps } from '@/lib/types/components';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from './button';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all animate-slide-down',
  {
    variants: {
      variant: {
        success: 'border-success/20 bg-success/10 text-success-foreground',
        error: 'border-error/20 bg-error/10 text-error-foreground',
        warning: 'border-warning/20 bg-warning/10 text-warning-foreground',
        info: 'border-primary/20 bg-primary/10 text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastIcon: React.FC<{ type: ToastProps['type'] }> = ({ type }) => {
  const iconClass = 'h-5 w-5 flex-shrink-0';
  
  switch (type) {
    case 'success':
      return <CheckCircle className={cn(iconClass, 'text-success')} />;
    case 'error':
      return <AlertCircle className={cn(iconClass, 'text-error')} />;
    case 'warning':
      return <AlertTriangle className={cn(iconClass, 'text-warning')} />;
    case 'info':
    default:
      return <Info className={cn(iconClass, 'text-primary')} />;
  }
};

const Toast: React.FC<ToastProps & { onRemove: (id: string) => void }> = ({
  id,
  type,
  title,
  message,
  action,
  onRemove,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={cn(toastVariants({ variant: type }))}>
      <div className="flex items-start space-x-3">
        <ToastIcon type={type} />
        <div className="flex-1 space-y-1">
          <div className="text-sm font-medium">{title}</div>
          {message && (
            <div className="text-sm opacity-90">{message}</div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={action.onClick}
            className="h-auto p-1 text-xs"
          >
            {action.label}
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(id)}
          className="h-auto p-1"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ToastContainer: React.FC<{ toasts: ToastProps[]; onRemove: (id: string) => void }> = ({
  toasts,
  onRemove,
}) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div
      className="fixed top-4 right-4 z-50 flex max-h-screen w-full flex-col-reverse space-y-2 space-y-reverse sm:bottom-auto sm:right-4 sm:top-4 sm:flex-col sm:space-y-2 sm:space-y-reverse md:max-w-[420px]"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Convenience functions
export const toast = {
  success: (title: string, message?: string, action?: ToastProps['action']) => {
    // This will be implemented by the consuming component
    console.log('Toast success:', { title, message, action });
  },
  error: (title: string, message?: string, action?: ToastProps['action']) => {
    console.log('Toast error:', { title, message, action });
  },
  warning: (title: string, message?: string, action?: ToastProps['action']) => {
    console.log('Toast warning:', { title, message, action });
  },
  info: (title: string, message?: string, action?: ToastProps['action']) => {
    console.log('Toast info:', { title, message, action });
  },
};

export { Toast, ToastContainer, toastVariants };
export type { ToastProps };