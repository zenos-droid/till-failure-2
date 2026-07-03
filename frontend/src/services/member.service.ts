import { ApiClient } from './api.client';
import { useGymStore } from '../store/gymStore';
import { SaasMember, Lead, MemberProgress, WorkoutPlan, DietPlan } from '../types';

export class MemberService {
  /**
   * Retrieves all members registered in Rishra facility.
   */
  static async getAllMembers(): Promise<SaasMember[]> {
    return ApiClient.get('members', () => {
      return useGymStore.getState().members;
    });
  }

  /**
   * Registers a brand-new member.
   */
  static async addMember(member: Omit<SaasMember, 'id' | 'attendanceCount' | 'status' | 'balanceDue'>): Promise<SaasMember> {
    return ApiClient.post('members', member, (payload) => {
      return useGymStore.getState().addMember(payload);
    });
  }

  /**
   * Update selective properties of a member.
   */
  static async updateMember(id: string, updates: Partial<SaasMember>): Promise<void> {
    return ApiClient.put('members', id, updates, (targetId, payload) => {
      useGymStore.getState().updateMember(targetId, payload);
    });
  }

  /**
   * Extends expired or ongoing membership duration securely.
   */
  static async renewMembership(id: string, planName: string, durationMonths: number, cost: number): Promise<void> {
    return ApiClient.post(`members/${id}/renew`, { planName, durationMonths, cost }, (payload) => {
      useGymStore.getState().renewMembership(id, payload.planName, payload.durationMonths, payload.cost);
    });
  }

  /**
   * Submits a fresh cold lead to interest columns.
   */
  static async addLead(lead: Omit<Lead, 'id' | 'date'>): Promise<void> {
    return ApiClient.post('leads', lead, (payload) => {
      useGymStore.getState().addLead(payload);
    });
  }

  /**
   * Shifts lead workflow status bounds.
   */
  static async updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
    return ApiClient.put('leads', id, { status }, (targetId, payload) => {
      useGymStore.getState().updateLeadStatus(targetId, payload.status);
    });
  }

  /**
   * Documents new progress metric metrics.
   */
  static async addProgressMetric(metric: Omit<MemberProgress, 'id' | 'date'>): Promise<void> {
    return ApiClient.post('progress', metric, (payload) => {
      useGymStore.getState().addProgressMetric(payload);
    });
  }

  /**
   * Pulls structural diet schedules logged for user.
   */
  static async getDietForMember(memberId: string): Promise<DietPlan | undefined> {
    return ApiClient.get(`diet/${memberId}`, () => {
      return useGymStore.getState().diets.find(d => d.memberId === memberId);
    });
  }

  /**
   * Pulls structural workout schedules logged for user.
   */
  static async getWorkoutForMember(memberId: string): Promise<WorkoutPlan | undefined> {
    return ApiClient.get(`workout/${memberId}`, () => {
      return useGymStore.getState().workouts.find(w => w.memberId === memberId);
    });
  }
}
