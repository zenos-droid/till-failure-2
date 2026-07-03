import { useState, useEffect } from 'react';
import { MemberService } from '../services/member.service';
import { PaymentService } from '../services/payment.service';
import { AttendanceService } from '../services/attendance.service';
import { TrainerService } from '../services/trainer.service';
import { SaasMember, PaymentRecord, AttendanceRecord, SaasTrainer } from '../types';

export function useDashboardMetrics() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<SaasMember[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [trainers, setTrainers] = useState<SaasTrainer[]>([]);

  const refetch = async () => {
    setLoading(true);
    try {
      const [membersData, paymentsData, attendanceData, trainersData] = await Promise.all([
        MemberService.getAllMembers(),
        PaymentService.getAllPayments(),
        AttendanceService.getAllAttendance(),
        TrainerService.getAllTrainers()
      ]);
      setMembers(membersData);
      setPayments(paymentsData);
      setAttendance(attendanceData);
      setTrainers(trainersData);
    } catch (err) {
      console.error("[useDashboardMetrics] Failed to fetch layout matrices", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const totalLeads = members.filter(m => m.status === 'Pending').length;
  const totalRevenue = payments
    .filter(p => p.status === 'Success')
    .reduce((sum, p) => sum + p.amount, 0);

  return {
    loading,
    members,
    payments,
    attendance,
    trainers,
    metrics: {
      totalMembers,
      activeMembers,
      totalLeads,
      totalRevenue
    },
    refetch
  };
}
