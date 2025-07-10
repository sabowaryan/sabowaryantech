import { apiFetch } from './api-client';
import { Session, SessionSchema, User, UserSchema } from '../types';

export const sessionService = {
  async get() {
    return apiFetch<Session>(`/api/session`, undefined, SessionSchema);
  },
  async refresh(token: string) {
    return apiFetch<Session>(`/api/session/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }, SessionSchema);
  },
  async login(email: string, password: string) {
    return apiFetch<{ user: User; session: Session }>(`/api/session/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  },
  async logout() {
    return apiFetch<void>(`/api/session/logout`, { method: 'POST' });
  },
}; 