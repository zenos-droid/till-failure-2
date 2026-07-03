import { ApiClient } from './api.client';
import { useGymStore } from '../store/gymStore';
import { PaymentRecord } from '../types';

export class PaymentService {
  /**
   * Retrieves all verified payment logs in SaaS system.
   */
  static async getAllPayments(): Promise<PaymentRecord[]> {
    return ApiClient.get('payments', () => {
      return useGymStore.getState().payments;
    });
  }

  /**
   * Records a manual cash or POS card renewal transaction.
   */
  static async addPaymentRecord(payment: Omit<PaymentRecord, 'id' | 'paymentDate' | 'receiptNumber'>): Promise<PaymentRecord> {
    return ApiClient.post('payments', payment, (payload) => {
      return useGymStore.getState().addPaymentRecord(payload);
    });
  }
}
