import * as React from "react"
import { cn } from "@/lib/utils"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'primary' | 'secondary'
  gradient?: boolean
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  align?: 'left' | 'center' | 'right' | 'justify'
}

const headingSizes = {
  xs: 'text-lg',
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl'
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

const weights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

const colors = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400'
}

const aligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = 'h2', size = 'md', weight = 'semibold', color = 'default', gradient = false, className, children, ...props }, ref) => {
    const classes = cn(
      headingSizes[size],
      weights[weight],
      gradient ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent' : colors[color],
      className
    )

    return React.createElement(
      Component,
      { ref, className: classes, ...props },
      children
    )
  }
)
Heading.displayName = "Heading"

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Component = 'p', size = 'md', weight = 'normal', color = 'default', align = 'left', className, children, ...props }, ref) => {
    const classes = cn(
      textSizes[size],
      weights[weight],
      colors[color],
      aligns[align],
      className
    )

    return React.createElement(
      Component,
      { ref, className: classes, ...props },
      children
    )
  }
)
Text.displayName = "Text"

// Specific heading components
const H1 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h1" size="2xl" {...props} />
)
H1.displayName = "H1"

const H2 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h2" size="xl" {...props} />
)
H2.displayName = "H2"

const H3 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h3" size="lg" {...props} />
)
H3.displayName = "H3"

const H4 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h4" size="md" {...props} />
)
H4.displayName = "H4"

// Specific text components
const BodyLarge = React.forwardRef<HTMLParagraphElement, Omit<TextProps, 'as' | 'size'>>(
  (props, ref) => <Text ref={ref} as="p" size="lg" {...props} />
)
BodyLarge.displayName = "BodyLarge"

const BodyMedium = React.forwardRef<HTMLParagraphElement, Omit<TextProps, 'as' | 'size'>>(
  (props, ref) => <Text ref={ref} as="p" size="md" {...props} />
)
BodyMedium.displayName = "BodyMedium"

const BodySmall = React.forwardRef<HTMLParagraphElement, Omit<TextProps, 'as' | 'size'>>(
  (props, ref) => <Text ref={ref} as="p" size="sm" {...props} />
)
BodySmall.displayName = "BodySmall"

const Caption = React.forwardRef<HTMLSpanElement, Omit<TextProps, 'as' | 'size'>>(
  (props, ref) => <Text ref={ref} as="span" size="xs" color="muted" {...props} />
)
Caption.displayName = "Caption"

export {
  Heading,
  Text,
  H1,
  H2,
  H3,
  H4,
  BodyLarge,
  BodyMedium,
  BodySmall,
  Caption
}