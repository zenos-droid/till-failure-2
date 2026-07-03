import { ApiClient } from './api.client';
import { useGymStore } from '../store/gymStore';
import { SaasTrainer, WorkoutPlan, DietPlan, NoticeInfo } from '../types';

export class TrainerService {
  /**
   * Retrieves all certified active coaching staffs in Rishra.
   */
  static async getAllTrainers(): Promise<SaasTrainer[]> {
    return ApiClient.get('trainers', () => {
      return useGymStore.getState().trainers;
    });
  }

  /**
   * Adds deep strength/bodybuilding trainers to operations lists.
   */
  static async addTrainer(trainer: Omit<SaasTrainer, 'id' | 'assignedCount'>): Promise<void> {
    return ApiClient.post('trainers', trainer, (payload) => {
      useGymStore.getState().addTrainer(payload);
    });
  }

  /**
   * Updates coordinates of coach files.
   */
  static async updateTrainer(id: string, updates: Partial<SaasTrainer>): Promise<void> {
    return ApiClient.put('trainers', id, updates, (targetId, payload) => {
      useGymStore.getState().updateTrainer(targetId, payload);
    });
  }

  /**
   * Links a member to a specific personal strength coach.
   */
  static async assignTrainerToMember(memberId: string, trainerId: string): Promise<void> {
    return ApiClient.post(`assignments/${memberId}/trainer`, { trainerId }, (payload) => {
      useGymStore.getState().assignTrainer(memberId, payload.trainerId);
    });
  }

  /**
   * Devises a tailored workout sequence worksheet.
   */
  static async assignWorkoutPlan(plan: Omit<WorkoutPlan, 'id' | 'dateAssigned'>): Promise<void> {
    return ApiClient.post('workouts', plan, (payload) => {
      useGymStore.getState().assignWorkoutPlan(payload);
    });
  }

  /**
   * Devises a tailored nutritional calorie/protein worksheet.
   */
  static async assignDietPlan(plan: Omit<DietPlan, 'id' | 'dateAssigned'>): Promise<void> {
    return ApiClient.post('diets', plan, (payload) => {
      useGymStore.getState().assignDietPlan(payload);
    });
  }

  /**
   * Publishes important gym announcements on notifications columns.
   */
  static async addNotice(notice: Omit<NoticeInfo, 'id' | 'date'>): Promise<void> {
    return ApiClient.post('notices', notice, (payload) => {
      useGymStore.getState().addNotice(payload);
    });
  }

  /**
   * Removes notice files permanently.
   */
  static async deleteNotice(id: string): Promise<void> {
    return ApiClient.delete('notices', id, (targetId) => {
      useGymStore.getState().deleteNotice(targetId);
    });
  }
}
