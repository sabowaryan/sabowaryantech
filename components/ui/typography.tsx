import React from 'react';
import { cn } from '@/lib/utils';
import { HeadingProps, TextProps } from '@/lib/types/components';

// Heading Components
export const H1: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  size = 'xl', 
  weight = 'bold', 
  color = 'default',
  gradient = false,
  as = 'h1',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'scroll-m-20 tracking-tight';
  
  const sizeClasses = {
    xs: 'text-2xl',
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
    '2xl': 'text-7xl',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
  };
  
  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent'
    : '';
  
  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        weightClasses[weight],
        gradient ? gradientClass : colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const H2: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  size = 'lg', 
  weight = 'bold', 
  color = 'default',
  gradient = false,
  as = 'h2',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'scroll-m-20 tracking-tight';
  
  const sizeClasses = {
    xs: 'text-xl',
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
    '2xl': 'text-6xl',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
  };
  
  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent'
    : '';
  
  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        weightClasses[weight],
        gradient ? gradientClass : colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const H3: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  size = 'md', 
  weight = 'semibold', 
  color = 'default',
  gradient = false,
  as = 'h3',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'scroll-m-20 tracking-tight';
  
  const sizeClasses = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
  };
  
  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent'
    : '';
  
  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        weightClasses[weight],
        gradient ? gradientClass : colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const H4: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  size = 'sm', 
  weight = 'semibold', 
  color = 'default',
  gradient = false,
  as = 'h4',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'scroll-m-20 tracking-tight';
  
  const sizeClasses = {
    xs: 'text-base',
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
  };
  
  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent'
    : '';
  
  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        weightClasses[weight],
        gradient ? gradientClass : colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// Text Components
export const BodyLarge: React.FC<TextProps> = ({ 
  children, 
  className, 
  weight = 'normal', 
  color = 'default',
  align = 'left',
  as = 'p',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'text-lg leading-7';
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };
  
  return (
    <Component
      className={cn(
        baseClasses,
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const BodyMedium: React.FC<TextProps> = ({ 
  children, 
  className, 
  weight = 'normal', 
  color = 'default',
  align = 'left',
  as = 'p',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'text-base leading-6';
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };
  
  return (
    <Component
      className={cn(
        baseClasses,
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const BodySmall: React.FC<TextProps> = ({ 
  children, 
  className, 
  weight = 'normal', 
  color = 'default',
  align = 'left',
  as = 'p',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'text-sm leading-5';
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };
  
  return (
    <Component
      className={cn(
        baseClasses,
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Caption: React.FC<TextProps> = ({ 
  children, 
  className, 
  weight = 'normal', 
  color = 'muted',
  align = 'left',
  as = 'span',
  ...props 
}) => {
  const Component = as;
  
  const baseClasses = 'text-xs leading-4';
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };
  
  return (
    <Component
      className={cn(
        baseClasses,
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};