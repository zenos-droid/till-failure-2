import { create } from 'zustand';
import { UserRole, SessionUser, SaasMember, SaasTrainer, SaasReceptionist, Lead, PaymentRecord, AttendanceRecord, NoticeInfo, MemberProgress, WorkoutPlan, DietPlan } from '../types';
import { ApiClient } from '../services/api.client';

interface BootstrapPayload {
  members: SaasMember[];
  trainers: SaasTrainer[];
  receptionists: SaasReceptionist[];
  leads: Lead[];
  payments: PaymentRecord[];
  attendance: AttendanceRecord[];
  notices: NoticeInfo[];
  progress: MemberProgress[];
  workouts: WorkoutPlan[];
  diets: DietPlan[];
}

interface GymStoreState extends BootstrapPayload {
  currentUser: SessionUser | null;
  loading: boolean;
  initialize: () => Promise<void>;
  login: (email: string, role: UserRole, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;
  addMember: (member: Omit<SaasMember, 'id' | 'attendanceCount' | 'status' | 'balanceDue'>) => SaasMember;
  updateMember: (id: string, updates: Partial<SaasMember>) => void;
  renewMembership: (id: string, planName: string, durationMonths: number, cost: number) => void;
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  addTrainer: (trainer: Omit<SaasTrainer, 'id' | 'assignedCount'>) => void;
  updateTrainer: (id: string, updates: Partial<SaasTrainer>) => void;
  addReceptionist: (receptionist: Omit<SaasReceptionist, 'id'>) => void;
  updateReceptionist: (id: string, updates: Partial<SaasReceptionist>) => void;
  assignTrainer: (memberId: string, trainerId: string) => void;
  assignWorkoutPlan: (plan: Omit<WorkoutPlan, 'id' | 'dateAssigned'>) => void;
  assignDietPlan: (plan: Omit<DietPlan, 'id' | 'dateAssigned'>) => void;
  addProgressMetric: (metric: Omit<MemberProgress, 'id' | 'date'>) => void;
  checkInMember: (memberId: string) => boolean;
  addNotice: (notice: Omit<NoticeInfo, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;
  addPaymentRecord: (payment: Omit<PaymentRecord, 'id' | 'paymentDate' | 'receiptNumber'>) => PaymentRecord;
}

const emptyData: BootstrapPayload = { members: [], trainers: [], receptionists: [], leads: [], payments: [], attendance: [], notices: [], progress: [], workouts: [], diets: [] };
const today = () => new Date().toISOString().split('T')[0];
const tempId = (prefix: string) => `${prefix}-TMP-${Date.now()}`;

export const useGymStore = create<GymStoreState>((set, get) => ({
  currentUser: null,
  loading: false,
  ...emptyData,

  initialize: async () => {
    if (!ApiClient.accessToken) return;
    set({ loading: true });
    try {
      const data = await ApiClient.get<BootstrapPayload>('/bootstrap');
      set({ ...data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  login: async (email, role, password = 'securedPassword123') => {
    const data = await ApiClient.post<{ user: SessionUser; accessToken: string; refreshToken: string }>('/auth/login', { email, role, password }, false);
    ApiClient.setTokens(data.accessToken, data.refreshToken);
    set({ currentUser: data.user });
    await get().initialize();
    return true;
  },

  logout: () => {
    void ApiClient.post('/auth/logout', { refreshToken: localStorage.getItem('tf_refresh_token') }).catch(() => undefined);
    ApiClient.clearTokens();
    set({ currentUser: null, ...emptyData });
  },

  updateProfile: (name, phone) => {
    const current = get().currentUser;
    if (!current) return;
    set({ currentUser: { ...current, name, phone } });
    void ApiClient.put<SessionUser>('/auth/profile', { name, phone }).then(user => set({ currentUser: user })).catch(console.error);
  },

  addMember: (memberInput) => {
    const newMember: SaasMember = { ...memberInput, id: tempId('M'), attendanceCount: 0, status: 'Active', balanceDue: 0, weightHistory: [] };
    set(state => ({ members: [newMember, ...state.members] }));
    void ApiClient.post<SaasMember>('/members', memberInput).then(saved => set(state => ({ members: state.members.map(m => m.id === newMember.id ? saved : m) }))).catch(console.error);
    return newMember;
  },

  updateMember: (id, updates) => {
    set(state => ({ members: state.members.map(m => m.id === id ? { ...m, ...updates } : m) }));
    void ApiClient.put<SaasMember>(`/members/${id}`, updates).then(saved => set(state => ({ members: state.members.map(m => m.id === id ? saved : m) }))).catch(console.error);
  },

  renewMembership: (id, planName, durationMonths, cost) => {
    const targetMember = get().members.find(m => m.id === id);
    if (!targetMember) return;
    const future = new Date();
    future.setMonth(future.getMonth() + durationMonths);
    const optimisticPayment: PaymentRecord = { id: tempId('P'), memberId: id, memberName: targetMember.name, amount: cost, paymentDate: today(), planName, status: 'Success', paymentMethod: 'Razorpay-UPI', expiryExtendedDate: future.toISOString().split('T')[0], receiptNumber: `TF-${new Date().getFullYear()}-PENDING` };
    set(state => ({ members: state.members.map(m => m.id === id ? { ...m, status: 'Active', membershipName: planName, startDate: today(), endDate: optimisticPayment.expiryExtendedDate, balanceDue: 0 } : m), payments: [optimisticPayment, ...state.payments] }));
    void ApiClient.post<{ member: SaasMember; payment: PaymentRecord }>(`/members/${id}/renew`, { planName, durationMonths, cost }).then(saved => set(state => ({ members: state.members.map(m => m.id === id ? saved.member : m), payments: state.payments.map(p => p.id === optimisticPayment.id ? saved.payment : p) }))).catch(console.error);
  },

  addLead: (leadInput) => {
    const optimistic: Lead = { ...leadInput, id: tempId('L'), date: today() };
    set(state => ({ leads: [optimistic, ...state.leads] }));
    void ApiClient.post<Lead>('/leads', leadInput).then(saved => set(state => ({ leads: state.leads.map(l => l.id === optimistic.id ? saved : l) }))).catch(console.error);
  },

  updateLeadStatus: (id, status) => {
    set(state => ({ leads: state.leads.map(l => l.id === id ? { ...l, status } : l) }));
    void ApiClient.put<Lead>(`/leads/${id}`, { status }).then(saved => set(state => ({ leads: state.leads.map(l => l.id === id ? saved : l) }))).catch(console.error);
  },

  addTrainer: (trainerInput) => {
    const optimistic: SaasTrainer = { ...trainerInput, id: tempId('T'), assignedCount: 0 };
    set(state => ({ trainers: [...state.trainers, optimistic] }));
    void ApiClient.post<SaasTrainer>('/trainers', trainerInput).then(saved => set(state => ({ trainers: state.trainers.map(t => t.id === optimistic.id ? saved : t) }))).catch(console.error);
  },

  updateTrainer: (id, updates) => {
    set(state => ({ trainers: state.trainers.map(t => t.id === id ? { ...t, ...updates } : t) }));
    void ApiClient.put<SaasTrainer>(`/trainers/${id}`, updates).catch(console.error);
  },

  addReceptionist: (receptionistInput) => {
    const optimistic: SaasReceptionist = { ...receptionistInput, id: tempId('R') };
    set(state => ({ receptionists: [...state.receptionists, optimistic] }));
    void ApiClient.post<SaasReceptionist>('/receptionists', receptionistInput).then(saved => set(state => ({ receptionists: state.receptionists.map(r => r.id === optimistic.id ? saved : r) }))).catch(console.error);
  },

  updateReceptionist: (id, updates) => {
    set(state => ({ receptionists: state.receptionists.map(r => r.id === id ? { ...r, ...updates } : r) }));
    void ApiClient.put<SaasReceptionist>(`/receptionists/${id}`, updates).catch(console.error);
  },

  assignTrainer: (memberId, trainerId) => {
    const trainerName = get().trainers.find(t => t.id === trainerId)?.name || 'Assigned Coach';
    set(state => ({ members: state.members.map(m => m.id === memberId ? { ...m, assignedTrainerId: trainerId, assignedTrainerName: trainerName } : m) }));
    void ApiClient.post<SaasMember>(`/assignments/${memberId}/trainer`, { trainerId }).then(saved => set(state => ({ members: state.members.map(m => m.id === memberId ? saved : m) }))).catch(console.error);
  },

  assignWorkoutPlan: (planInput) => {
    const optimistic: WorkoutPlan = { ...planInput, id: tempId('WP'), dateAssigned: today() };
    set(state => ({ workouts: [...state.workouts.filter(w => w.memberId !== planInput.memberId), optimistic] }));
    void ApiClient.post<WorkoutPlan>('/workouts', planInput).then(saved => set(state => ({ workouts: [...state.workouts.filter(w => w.memberId !== planInput.memberId), saved] }))).catch(console.error);
  },

  assignDietPlan: (planInput) => {
    const optimistic: DietPlan = { ...planInput, id: tempId('DP'), dateAssigned: today() };
    set(state => ({ diets: [...state.diets.filter(d => d.memberId !== planInput.memberId), optimistic] }));
    void ApiClient.post<DietPlan>('/diets', planInput).then(saved => set(state => ({ diets: [...state.diets.filter(d => d.memberId !== planInput.memberId), saved] }))).catch(console.error);
  },

  addProgressMetric: (metricInput) => {
    const optimistic: MemberProgress = { ...metricInput, id: tempId('PG'), date: today() };
    set(state => ({ progress: [optimistic, ...state.progress], members: state.members.map(m => m.id === metricInput.memberId ? { ...m, weightHistory: [...(m.weightHistory || []), { date: optimistic.date, weight: metricInput.weight }] } : m) }));
    void ApiClient.post<MemberProgress>('/progress', metricInput).then(saved => set(state => ({ progress: state.progress.map(p => p.id === optimistic.id ? saved : p) }))).catch(console.error);
  },

  checkInMember: (memberId) => {
    const member = get().members.find(m => m.id === memberId);
    if (!member || member.status !== 'Active') return false;
    const exists = get().attendance.some(a => a.memberId === memberId && a.date === today());
    if (!exists) {
      const record: AttendanceRecord = { id: tempId('A'), memberId, memberName: member.name, date: today(), checkInTime: new Date().toTimeString().slice(0, 5), status: 'Present' };
      set(state => ({ attendance: [record, ...state.attendance], members: state.members.map(m => m.id === memberId ? { ...m, attendanceCount: m.attendanceCount + 1 } : m) }));
    }
    void ApiClient.post<{ success: boolean }>(`/attendance/checkin/${memberId}`, {}).catch(console.error);
    return true;
  },

  addNotice: (noticeInput) => {
    const optimistic: NoticeInfo = { ...noticeInput, id: tempId('N'), date: today() };
    set(state => ({ notices: [optimistic, ...state.notices] }));
    void ApiClient.post<NoticeInfo>('/notices', noticeInput).then(saved => set(state => ({ notices: state.notices.map(n => n.id === optimistic.id ? saved : n) }))).catch(console.error);
  },

  deleteNotice: (id) => {
    set(state => ({ notices: state.notices.filter(n => n.id !== id) }));
    void ApiClient.delete(`/notices/${id}`).catch(console.error);
  },

  addPaymentRecord: (payInput) => {
    const optimistic: PaymentRecord = { ...payInput, id: tempId('P'), paymentDate: today(), receiptNumber: `TF-${new Date().getFullYear()}-PENDING` };
    set(state => ({ payments: [optimistic, ...state.payments] }));
    void ApiClient.post<PaymentRecord>('/payments', payInput).then(saved => set(state => ({ payments: state.payments.map(p => p.id === optimistic.id ? saved : p) }))).catch(console.error);
    return optimistic;
  }
}));
