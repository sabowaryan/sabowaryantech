'use client';

import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { HeadingProps, TextProps } from '@/lib/types/components';

const headingVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      size: {
        xs: 'text-display-xs',
        sm: 'text-display-sm',
        md: 'text-display-md',
        lg: 'text-display-lg',
        xl: 'text-display-xl',
        '2xl': 'text-display-2xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
      },
      gradient: {
        true: 'text-gradient',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'bold',
      color: 'default',
      gradient: false,
    },
  }
);

const textVariants = cva(
  '',
  {
    variants: {
      size: {
        xs: 'text-body-xs',
        sm: 'text-body-sm',
        md: 'text-body-md',
        lg: 'text-body-lg',
        xl: 'text-body-xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'normal',
      color: 'default',
      align: 'left',
    },
  }
);

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    as: Component = 'h1', 
    size, 
    weight, 
    color, 
    gradient, 
    className, 
    children, 
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, weight, color, gradient, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ 
    as: Component = 'p', 
    size, 
    weight, 
    color, 
    align, 
    className, 
    children, 
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, color, align, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

// Convenience components
const H1 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading as="h1" size="2xl" ref={ref} {...props} />
);

const H2 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading as="h2" size="xl" ref={ref} {...props} />
);

const H3 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading as="h3" size="lg" ref={ref} {...props} />
);

const H4 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading as="h4" size="md" ref={ref} {...props} />
);

const H5 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading as="h5" size="sm" ref={ref} {...props} />
);

const H6 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading as="h6" size="xs" ref={ref} {...props} />
);

// Body text variants
const BodyLarge = forwardRef<HTMLParagraphElement, Omit<TextProps, 'size'>>(
  (props, ref) => <Text size="lg" ref={ref} {...props} />
);

const BodyMedium = forwardRef<HTMLParagraphElement, Omit<TextProps, 'size'>>(
  (props, ref) => <Text size="md" ref={ref} {...props} />
);

const BodySmall = forwardRef<HTMLParagraphElement, Omit<TextProps, 'size'>>(
  (props, ref) => <Text size="sm" ref={ref} {...props} />
);

const Caption = forwardRef<HTMLParagraphElement, Omit<TextProps, 'size' | 'color'>>(
  (props, ref) => <Text size="xs" color="muted" ref={ref} {...props} />
);

// Display names
Heading.displayName = 'Heading';
Text.displayName = 'Text';
H1.displayName = 'H1';
H2.displayName = 'H2';
H3.displayName = 'H3';
H4.displayName = 'H4';
H5.displayName = 'H5';
H6.displayName = 'H6';
BodyLarge.displayName = 'BodyLarge';
BodyMedium.displayName = 'BodyMedium';
BodySmall.displayName = 'BodySmall';
Caption.displayName = 'Caption';

export {
  Heading,
  Text,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  BodyLarge,
  BodyMedium,
  BodySmall,
  Caption,
  headingVariants,
  textVariants,
};

export type { HeadingProps, TextProps };