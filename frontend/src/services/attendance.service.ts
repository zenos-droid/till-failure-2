import { ApiClient } from './api.client';
import { useGymStore } from '../store/gymStore';
import { AttendanceRecord } from '../types';

export class AttendanceService {
  /**
   * Retrieves all checked-in attendance entries.
   */
  static async getAllAttendance(): Promise<AttendanceRecord[]> {
    return ApiClient.get('attendance', () => {
      return useGymStore.getState().attendance;
    });
  }

  /**
   * Electronically scans a member ID barcode at front desk.
   */
  static async checkInMember(memberId: string): Promise<boolean> {
    return ApiClient.post(`attendance/checkin/${memberId}`, {}, () => {
      return useGymStore.getState().checkInMember(memberId);
    });
  }
}
