export const SITE_CONFIG = {
  name: 'SaboWaryanTech',
  description: 'Advanced technology solutions platform',
  url: 'https://sabowaryan.tech',
  ogImage: 'https://sabowaryan.tech/og.jpg',
  links: {
    twitter: 'https://twitter.com/sabowaryantech',
    github: 'https://github.com/sabowaryantech',
    linkedin: 'https://linkedin.com/company/sabowaryantech',
    email: 'contact@sabowaryan.tech',
  },
  author: {
    name: 'SaboWaryan Team',
    email: 'team@sabowaryan.tech',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SHOP: '/shop',
  PRODUCTS: '/products',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  API: {
    AUTH: '/api/auth',
    PRODUCTS: '/api/products',
    ORDERS: '/api/orders',
    USERS: '/api/users',
    STRIPE: '/api/stripe',
    UPLOAD: '/api/upload',
  },
} as const;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  
  // Product endpoints
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  PRODUCT_SEARCH: '/api/products/search',
  PRODUCT_CATEGORIES: '/api/products/categories',
  
  // Order endpoints
  ORDERS: '/api/orders',
  ORDER_BY_ID: (id: string) => `/api/orders/${id}`,
  CREATE_ORDER: '/api/orders/create',
  
  // User endpoints
  USERS: '/api/users',
  USER_PROFILE: '/api/users/profile',
  USER_ORDERS: '/api/users/orders',
  
  // Stripe endpoints
  CREATE_CHECKOUT_SESSION: '/api/stripe/create-checkout-session',
  WEBHOOK: '/api/stripe/webhook',
  
  // File upload
  UPLOAD_FILE: '/api/upload',
  DELETE_FILE: '/api/upload/delete',
} as const;

export const STORAGE_KEYS = {
  CART: 'sabowaryan-cart',
  USER: 'sabowaryan-user',
  THEME: 'sabowaryan-theme',
  PREFERENCES: 'sabowaryan-preferences',
  SESSION: 'sabowaryan-session',
} as const;

export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  ORDERS: 'orders',
  ORDER: 'order',
  USER: 'user',
  CATEGORIES: 'categories',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  DESCRIPTION_MAX_LENGTH: 1000,
  PRODUCT_NAME_MAX_LENGTH: 100,
} as const;

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_FILES_PER_UPLOAD: 5,
} as const;

export const CURRENCY = {
  DEFAULT: 'USD',
  SYMBOL: '$',
  SUPPORTED: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'] as const,
} as const;

export const THEME = {
  DEFAULT: 'system',
  OPTIONS: ['light', 'dark', 'system'] as const,
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;