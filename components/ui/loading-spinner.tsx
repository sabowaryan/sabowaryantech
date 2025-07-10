import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'white' | 'current'
  text?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
    current: 'text-current'
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-current border-t-transparent",
            sizeClasses[size],
            colorClasses[color]
          )}
        />
        {text && (
          <span className={cn("text-sm font-medium", colorClasses[color])}>
            {text}
          </span>
        )}
      </div>
    </div>
  )
}

interface LoadingPageProps {
  text?: string
  className?: string
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  text = "Loading...",
  className
}) => {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg font-medium text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

interface LoadingInlineProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
}

const LoadingInline: React.FC<LoadingInlineProps> = ({
  size = 'sm',
  text,
  className
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LoadingSpinner size={size} color="current" />
      {text && <span className="text-sm">{text}</span>}
    </div>
  )
}

export { LoadingSpinner, LoadingPage, LoadingInline }