import { z } from "zod";

// --- Product ---
export const ProductTypeEnum = z.enum(["component", "template"]);
export const FrameworkEnum = z.enum(["react", "vue", "angular", "svelte", "html", "other"]);
export const ProductFileSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  size: z.number().nonnegative(), // en octets
  type: z.string(), // ex: 'zip', 'js', 'json', etc.
});
export const ProductStatusEnum = z.enum(["draft", "active", "archived"]);
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  description: z.string().max(2000),
  price: z.number().nonnegative(),
  images: z.array(z.string().url()),
  type: ProductTypeEnum,
  framework: FrameworkEnum,
  files: z.array(ProductFileSchema),
  demoUrl: z.string().url().optional(),
  status: ProductStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  stock: z.number().int().nonnegative(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
});
export type Product = z.infer<typeof ProductSchema>;

// --- CartItem ---
export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive(),
});
export type CartItem = z.infer<typeof CartItemSchema> & {
  get total(): number;
};

// --- Order ---
export const OrderStatusEnum = z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]);
export const OrderSchema = z.object({
  id: z.string().uuid(),
  items: z.array(CartItemSchema),
  userId: z.string().uuid(),
  status: OrderStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  total: z.number().nonnegative(),
  downloadLinks: z.array(z.string().url()),
});
export type Order = z.infer<typeof OrderSchema>;

// --- User ---
export const UserRoleEnum = z.enum(["user", "admin", "manager"]);
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2),
  role: UserRoleEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema> & {
  hasPermission: (permission: string) => boolean;
};

// --- Session ---
export const SessionSchema = z.object({
  userId: z.string().uuid(),
  token: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string().datetime(),
});
export type Session = z.infer<typeof SessionSchema>;

export { LoginFormSchema, type LoginFormValues } from "../validations/session-schema";