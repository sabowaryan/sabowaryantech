import { z } from 'zod';

// Base Types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product Types
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string().url()).default([]),
  files: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().url(),
    size: z.number(),
    type: z.string(),
  })).default([]),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Product = z.infer<typeof ProductSchema>;

export interface ProductFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

// Cart Types
export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive().default(1),
  image: z.string().url().optional(),
  downloadUrl: z.string().url().optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// Order Types
export const OrderStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
  'refunded'
]);

export const OrderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
  downloadUrl: z.string().url().optional(),
});

export const OrderSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  stripeSessionId: z.string().optional(),
  amount: z.number().positive(),
  status: OrderStatusSchema,
  items: z.array(OrderItemSchema),
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

// User Types
export const UserRoleSchema = z.enum(['user', 'admin', 'moderator']);

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  isAdmin: z.boolean().default(false),
  role: UserRoleSchema.default('user'),
  avatar: z.string().url().optional(),
  emailVerified: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof UserSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;

// Session Types
export const SessionDataSchema = z.object({
  userId: z.string().optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: UserRoleSchema.optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    language: z.string().default('en'),
    currency: z.string().default('USD'),
  }).optional(),
});

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
  data: SessionDataSchema,
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Session = z.infer<typeof SessionSchema>;
export type SessionData = z.infer<typeof SessionDataSchema>;

// Form Types
export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

export const RegisterFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
export type RegisterForm = z.infer<typeof RegisterFormSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Stripe Types
export interface StripeCheckoutSession {
  id: string;
  url: string;
  status: 'open' | 'complete' | 'expired';
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

// File Upload Types
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  sortBy?: 'name' | 'price' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  filters: SearchFilters;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  action?: {
    label: string;
    url: string;
  };
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: Date;
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  timestamp: Date;
}

// Error Types
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  primaryColor: string;
  borderRadius: number;
  fontFamily: string;
}

// Export all schemas for validation
export const schemas = {
  Product: ProductSchema,
  CartItem: CartItemSchema,
  Order: OrderSchema,
  OrderItem: OrderItemSchema,
  User: UserSchema,
  Session: SessionSchema,
  LoginForm: LoginFormSchema,
  RegisterForm: RegisterFormSchema,
  ContactForm: ContactFormSchema,
} as const;