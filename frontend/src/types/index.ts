export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  certifications: string[];
  specialty: string[];
  philosophy: string;
  imageUrl: string;
  instagram?: string;
}

export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  goals: string[];
  benefits: string[];
  intensity: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  coachingStyle: string;
  imageUrl: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  popular: boolean;
  tagline: string;
  features: string[];
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  category: 'Fat Loss' | 'Muscle Gain' | 'Athletic Conditioning' | 'Lifestyle Transformation';
  beforeWeight: string;
  afterWeight: string;
  duration: string;
  story: string;
  achievement: string;
  trainer: string;
  imageUrlBefore: string;
  imageUrlAfter: string;
  profession?: string;
  location?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Nutrition' | 'Training' | 'Mindset' | 'Discipline';
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
  tags: string[];
}

export interface BookingSubmission {
  name: string;
  phone: string;
  email: string;
  service: string;
  timeSlot?: string;
  message?: string;
}

// SaaS Role System
export type UserRole = 'ADMIN' | 'RECEPTIONIST' | 'TRAINER' | 'MEMBER';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  memberId?: string;
  trainerId?: string;
}

// SaaS Entities
export interface SaasMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Expired' | 'Pending' | 'Suspended';
  membershipName: string;
  startDate: string;
  endDate: string;
  assignedTrainerId?: string;
  assignedTrainerName?: string;
  attendanceCount: number;
  gender: 'Male' | 'Female';
  activeSlot: string;
  balanceDue: number;
  weightHistory?: { date: string; weight: number }[];
}

export interface SaasTrainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  assignedCount: number;
  status: 'Active' | 'OnLeave';
}

export interface SaasReceptionist {
  id: string;
  name: string;
  email: string;
  phone: string;
  shift: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interest: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Lost';
  date: string;
}

export interface PaymentRecord {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  paymentDate: string;
  planName: string;
  status: 'Success' | 'Failed' | 'Pending';
  paymentMethod: string;
  expiryExtendedDate: string;
  receiptNumber: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string; // YYYY-MM-DD
  checkInTime: string; // HH:MM
  status: 'Present' | 'Excused';
}

export interface NoticeInfo {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  targetRole: 'ALL' | 'MEMBERS' | 'TRAINERS';
}

export interface MemberProgress {
  id: string;
  memberId: string;
  date: string;
  weight: number;
  bmi: number;
  muscleMass: number;
  bodyFatPercent: number;
  notes: string;
}

export interface WorkoutPlan {
  id: string;
  memberId: string;
  title: string;
  exercises: { day: string; routine: string }[];
  dateAssigned: string;
}

export interface DietPlan {
  id: string;
  memberId: string;
  title: string;
  meals: { time: string; intake: string }[];
  calories: number;
  proteinGrams: number;
  dateAssigned: string;
}
