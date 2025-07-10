import { z, ZodSchema } from 'zod';

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
  schema?: ZodSchema<T>
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Erreur API: ${res.status}`);
  }
  const data = await res.json();
  if (schema) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error('Validation Zod échouée: ' + JSON.stringify(parsed.error.issues));
    }
    return parsed.data;
  }
  return data;
} 