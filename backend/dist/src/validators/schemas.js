import { z } from 'zod';
export const roleSchema = z.enum(['ADMIN', 'RECEPTIONIST', 'TRAINER', 'MEMBER']);
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6), role: roleSchema });
export const signupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10),
    gender: z.enum(['Male', 'Female']),
    activeSlot: z.string().min(1),
    interestPlan: z.string().min(1),
    password: z.string().min(6)
});
export const memberCreateSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    membershipName: z.string().min(1),
    startDate: z.string(),
    endDate: z.string(),
    assignedTrainerId: z.string().optional(),
    assignedTrainerName: z.string().optional(),
    gender: z.enum(['Male', 'Female']),
    activeSlot: z.string().min(1),
    weightHistory: z.array(z.object({ date: z.string(), weight: z.number() })).optional()
});
export const trainerCreateSchema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().min(5), specialty: z.string().min(1), status: z.enum(['Active', 'OnLeave']).default('Active') });
export const receptionistCreateSchema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().min(5), shift: z.string().min(1) });
export const leadCreateSchema = z.object({ name: z.string().min(2), phone: z.string().min(5), email: z.string().email().optional(), interest: z.string().min(1), status: z.enum(['New', 'Contacted', 'Converted', 'Lost']).default('New') });
export const noticeCreateSchema = z.object({ title: z.string().min(2), content: z.string().min(2), author: z.string().min(1), targetRole: z.enum(['ALL', 'MEMBERS', 'TRAINERS']) });
export const workoutSchema = z.object({ memberId: z.string(), title: z.string().min(1), exercises: z.array(z.object({ day: z.string(), routine: z.string() })).min(1) });
export const dietSchema = z.object({ memberId: z.string(), title: z.string().min(1), calories: z.number(), proteinGrams: z.number(), meals: z.array(z.object({ time: z.string(), intake: z.string() })).min(1) });
export const progressSchema = z.object({ memberId: z.string(), weight: z.number(), bmi: z.number(), muscleMass: z.number(), bodyFatPercent: z.number(), notes: z.string().default('') });
