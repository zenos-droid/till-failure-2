import { ApiClient } from './api.client';
import { useGymStore } from '../store/gymStore';
import { UserRole, SessionUser } from '../types';

export class AuthService {
  static async login(email: string, role: UserRole, password = 'securedPassword123'): Promise<boolean> {
    return useGymStore.getState().login(email, role, password);
  }

  static async logout(): Promise<void> {
    useGymStore.getState().logout();
  }

  static async updateProfile(name: string, phone: string): Promise<void> {
    useGymStore.getState().updateProfile(name, phone);
  }

  static getCurrentUser(): SessionUser | null {
    return useGymStore.getState().currentUser;
  }
}
