'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { CustomToastProvider, useToast } from '@/components/ui/toast';
import { LoadingSpinner, LoadingPage, LoadingInline } from '@/components/ui/loading-spinner';
import { 
  H1, H2, H3, H4, 
  BodyLarge, BodyMedium, BodySmall, Caption 
} from '@/components/ui/typography';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Settings, 
  User,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

// Simple Modal component for the showcase
const SimpleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>
        <div className="mb-4">{children}</div>
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

const DesignSystemShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleToastDemo = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { title: 'Success!', message: 'Your action was completed successfully.' },
      error: { title: 'Error!', message: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning!', message: 'Please review your input before proceeding.' },
      info: { title: 'Info', message: 'Here is some helpful information.' },
    };
    
    addToast({
      type,
      ...messages[type],
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
      },
    });
  };

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-50 to-light-200 dark:from-dark-900 dark:to-secondary-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <H1 gradient>Sabowaryan Design System</H1>
          <BodyLarge color="muted">
            A comprehensive design system built with modern web technologies
          </BodyLarge>
        </div>

        {/* Typography Section */}
        <Card variant="elevated" className="p-8">
          <H2 className="mb-6">Typography</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Caption>Headings</Caption>
                <div className="space-y-2 mt-2">
                  <H1>Heading 1</H1>
                  <H2>Heading 2</H2>
                  <H3>Heading 3</H3>
                  <H4>Heading 4</H4>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Caption>Body Text</Caption>
                <div className="space-y-2 mt-2">
                  <BodyLarge>Large body text for important content</BodyLarge>
                  <BodyMedium>Medium body text for regular content</BodyMedium>
                  <BodySmall>Small body text for secondary information</BodySmall>
                  <Caption>Caption text for labels and metadata</Caption>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Colors Section */}
        <Card variant="elevated" className="p-8">
          <H2 className="mb-6">Color Palette</H2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-full h-20 bg-primary rounded-lg shadow-md"></div>
              <BodySmall weight="medium">Primary</BodySmall>
              <Caption>#C51F5D</Caption>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-dark rounded-lg shadow-md"></div>
              <BodySmall weight="medium">Dark</BodySmall>
              <Caption>#141D26</Caption>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-secondary rounded-lg shadow-md"></div>
              <BodySmall weight="medium">Secondary</BodySmall>
              <Caption>#243447</Caption>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-light rounded-lg shadow-md border"></div>
              <BodySmall weight="medium">Light</BodySmall>
              <Caption>#E2E2D2</Caption>
            </div>
          </div>
        </Card>

        {/* Buttons Section */}
        <Card variant="elevated" className="p-8">
          <H2 className="mb-6">Buttons</H2>
          <div className="space-y-6">
            <div>
              <H4 className="mb-4">Variants</H4>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            
            <div>
              <H4 className="mb-4">Sizes</H4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            <div>
              <H4 className="mb-4">With Icons</H4>
              <div className="flex flex-wrap gap-4">
                <Button leftIcon={<Heart className="h-4 w-4" />}>
                  Like
                </Button>
                <Button rightIcon={<ShoppingCart className="h-4 w-4" />}>
                  Add to Cart
                </Button>
                <Button loading>Loading...</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Inputs Section */}
        <Card variant="elevated" className="p-8">
          <H2 className="mb-6">Form Inputs</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                leftIcon={<Mail className="h-4 w-4" />}
              />
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              <Input
                label="Search"
                placeholder="Search..."
                leftIcon={<Search className="h-4 w-4" />}
                helperText="Search across all content"
              />
            </div>
            <div className="space-y-4">
              <Input
                label="With Error"
                placeholder="Enter something"
                error="This field is required"
              />
              <Input
                variant="filled"
                label="Filled Variant"
                placeholder="Filled input"
              />
              <Input
                variant="outline"
                label="Outline Variant"
                placeholder="Outline input"
                size="lg"
              />
            </div>
          </div>
        </Card>

        {/* Cards Section */}
        <Card variant="elevated" className="p-8">
          <H2 className="mb-6">Cards</H2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" hover>
              <CardHeader title="Default Card" subtitle="Basic card with hover effect" />
              <CardContent>
                <BodyMedium>This is a default card with hover animation.</BodyMedium>
              </CardContent>
              <CardFooter>
                <Button size="sm" fullWidth>Action</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader title="Outlined Card" subtitle="Card with border emphasis" />
              <CardContent>
                <BodyMedium>This card has a prominent border styling.</BodyMedium>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader title="Glass Card" subtitle="Modern glass morphism effect" />
              <CardContent>
                <BodyMedium>This card uses glass morphism styling.</BodyMedium>
              </CardContent>
            </Card>
          </div>
        </Card>

        {/* Interactive Components */}
        <Card variant="elevated" className="p-8">
          <H2 className="mb-6">Interactive Components</H2>
          <div className="space-y-6">
            <div>
              <H4 className="mb-4">Modal</H4>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </div>

            <div>
              <H4 className="mb-4">Loading States</H4>
              <div className="flex flex-wrap gap-4">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" text="Loading..." />
                <Button onClick={handleLoadingDemo}>
                  Show Loading Page
                </Button>
              </div>
            </div>

            <div>
              <H4 className="mb-4">Toast Notifications</H4>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleToastDemo('success')}
                >
                  Success Toast
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleToastDemo('error')}
                >
                  Error Toast
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleToastDemo('warning')}
                >
                  Warning Toast
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleToastDemo('info')}
                >
                  Info Toast
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Modal */}
        <SimpleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Design System Modal"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <BodyMedium>
              This is a modal component with proper accessibility features including:
            </BodyMedium>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Focus management</li>
              <li>Keyboard navigation (ESC to close)</li>
              <li>Click outside to close</li>
              <li>ARIA attributes</li>
              <li>Smooth animations</li>
            </ul>
          </div>
        </SimpleModal>

        {/* Loading Page */}
        {loading && <LoadingPage text="Loading design system..." />}
      </div>
    </div>
  );
};

const DesignSystemShowcaseWrapper: React.FC = () => {
  return (
    <CustomToastProvider>
      <DesignSystemShowcase />
    </CustomToastProvider>
  );
};

export default DesignSystemShowcaseWrapper;