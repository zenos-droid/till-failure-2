import bcrypt from 'bcryptjs';
import { AuditAction } from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import { addMonths, toDateString } from '../../utils/dates.js';
import { nextHumanId, nextShortId } from '../../utils/ids.js';
import { attendanceDto, dietDto, leadDto, memberDto, noticeDto, paymentDto, progressDto, receptionistDto, trainerDto, workoutDto } from '../../utils/format.js';
import { audit } from '../audit/audit.service.js';
const defaultPassword = async () => bcrypt.hash('securedPassword123', 12);
export async function bootstrap() {
    const [members, trainers, receptionists, leads, payments, attendance, notices, progress, workouts, diets] = await Promise.all([
        prisma.member.findMany({ include: { progress: { orderBy: { date: 'asc' } } }, orderBy: { id: 'asc' } }),
        prisma.trainer.findMany({ orderBy: { id: 'asc' } }),
        prisma.receptionist.findMany({ orderBy: { id: 'asc' } }),
        prisma.lead.findMany({ orderBy: { date: 'desc' } }),
        prisma.paymentRecord.findMany({ orderBy: { paymentDate: 'desc' } }),
        prisma.attendanceRecord.findMany({ orderBy: { date: 'desc' } }),
        prisma.notice.findMany({ orderBy: { date: 'desc' } }),
        prisma.progressMetric.findMany({ orderBy: { date: 'desc' } }),
        prisma.workoutPlan.findMany({ include: { exercises: true }, orderBy: { dateAssigned: 'desc' } }),
        prisma.dietPlan.findMany({ include: { meals: true }, orderBy: { dateAssigned: 'desc' } })
    ]);
    return {
        members: members.map(memberDto),
        trainers: trainers.map(trainerDto),
        receptionists: receptionists.map(receptionistDto),
        leads: leads.map(leadDto),
        payments: payments.map(paymentDto),
        attendance: attendance.map(attendanceDto),
        notices: notices.map(noticeDto),
        progress: progress.map(progressDto),
        workouts: workouts.map(workoutDto),
        diets: diets.map(dietDto)
    };
}
export async function createMember(input, userId) {
    const count = await prisma.member.count();
    const id = nextHumanId('M', count + 1, 100);
    const member = await prisma.member.create({
        data: {
            id,
            name: input.name,
            email: input.email,
            phone: input.phone,
            membershipName: input.membershipName,
            startDate: new Date(input.startDate),
            endDate: new Date(input.endDate),
            assignedTrainerId: input.assignedTrainerId,
            assignedTrainerName: input.assignedTrainerName,
            gender: input.gender,
            activeSlot: input.activeSlot,
            user: { create: { name: input.name, email: input.email, phone: input.phone, role: 'MEMBER', passwordHash: await defaultPassword() } }
        },
        include: { progress: true }
    });
    await prisma.membershipHistory.create({ data: { memberId: id, planName: input.membershipName, startDate: new Date(input.startDate), endDate: new Date(input.endDate), amount: estimateAmount(input.membershipName), action: 'CREATE' } });
    await createPayment({ memberId: id, memberName: input.name, amount: estimateAmount(input.membershipName), planName: input.membershipName, status: 'Success', paymentMethod: 'Cash', expiryExtendedDate: input.endDate }, userId);
    await audit(userId, AuditAction.MEMBER_ACTION, 'Member', id, { action: 'create' });
    return memberDto(member);
}
function estimateAmount(planName) {
    const lower = planName.toLowerCase();
    if (lower.includes('quarterly'))
        return 3200;
    if (lower.includes('annual') || lower.includes('warrior'))
        return 10000;
    if (lower.includes('couple'))
        return 5500;
    if (lower.includes('elite'))
        return 6000;
    return 1200;
}
export async function updateMember(id, updates, userId) {
    const member = await prisma.member.update({ where: { id }, data: updates, include: { progress: true } });
    await audit(userId, AuditAction.MEMBER_ACTION, 'Member', id, { action: 'update', updates });
    return memberDto(member);
}
export async function deleteMember(id, userId) {
    await prisma.member.delete({ where: { id } });
    await audit(userId, AuditAction.MEMBER_ACTION, 'Member', id, { action: 'delete' });
}
export async function renewMember(id, planName, durationMonths, cost, userId) {
    const member = await prisma.member.findUniqueOrThrow({ where: { id } });
    const today = new Date();
    const endDate = addMonths(today, durationMonths);
    const updated = await prisma.member.update({ where: { id }, data: { status: 'Active', membershipName: planName, startDate: today, endDate, balanceDue: 0 }, include: { progress: true } });
    await prisma.membershipHistory.create({ data: { memberId: id, planName, startDate: today, endDate, amount: cost, action: 'RENEW' } });
    const payment = await createPayment({ memberId: id, memberName: member.name, amount: cost, planName, status: 'Success', paymentMethod: 'Razorpay-UPI', expiryExtendedDate: toDateString(endDate) }, userId);
    await audit(userId, AuditAction.MEMBERSHIP_ACTION, 'Member', id, { planName, durationMonths, cost });
    return { member: memberDto(updated), payment };
}
export async function createTrainer(input, userId) {
    const id = nextShortId('T', await prisma.trainer.count());
    const trainer = await prisma.trainer.create({ data: { id, ...input, user: { create: { name: input.name, email: input.email, phone: input.phone, role: 'TRAINER', passwordHash: await defaultPassword() } } } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Trainer', id, { action: 'create' });
    return trainerDto(trainer);
}
export async function updateTrainer(id, updates, userId) {
    const trainer = await prisma.trainer.update({ where: { id }, data: updates });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Trainer', id, { action: 'update' });
    return trainerDto(trainer);
}
export async function createReceptionist(input, userId) {
    const id = nextShortId('R', await prisma.receptionist.count());
    const rec = await prisma.receptionist.create({ data: { id, ...input, user: { create: { name: input.name, email: input.email, phone: input.phone, role: 'RECEPTIONIST', passwordHash: await defaultPassword() } } } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Receptionist', id, { action: 'create' });
    return receptionistDto(rec);
}
export async function updateReceptionist(id, updates, userId) {
    const rec = await prisma.receptionist.update({ where: { id }, data: updates });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Receptionist', id, { action: 'update' });
    return receptionistDto(rec);
}
export async function assignTrainer(memberId, trainerId, userId) {
    const trainer = await prisma.trainer.findUniqueOrThrow({ where: { id: trainerId } });
    const member = await prisma.member.update({ where: { id: memberId }, data: { assignedTrainerId: trainer.id, assignedTrainerName: trainer.name }, include: { progress: true } });
    await prisma.trainerAssignment.create({ data: { memberId, trainerId } });
    await refreshTrainerCounts();
    await audit(userId, AuditAction.TRAINER_ASSIGNMENT, 'Member', memberId, { trainerId });
    return memberDto(member);
}
export async function removeTrainer(memberId, userId) {
    const member = await prisma.member.update({ where: { id: memberId }, data: { assignedTrainerId: null, assignedTrainerName: null }, include: { progress: true } });
    await prisma.trainerAssignment.updateMany({ where: { memberId, removedAt: null }, data: { removedAt: new Date() } });
    await refreshTrainerCounts();
    await audit(userId, AuditAction.TRAINER_ASSIGNMENT, 'Member', memberId, { removed: true });
    return memberDto(member);
}
async function refreshTrainerCounts() {
    const trainers = await prisma.trainer.findMany();
    for (const trainer of trainers) {
        const assignedCount = await prisma.member.count({ where: { assignedTrainerId: trainer.id } });
        await prisma.trainer.update({ where: { id: trainer.id }, data: { assignedCount } });
    }
}
export async function createLead(input, userId) {
    const id = nextHumanId('L', await prisma.lead.count() + 1, 500);
    const lead = await prisma.lead.create({ data: { id, ...input, date: new Date() } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Lead', id, { action: 'create' });
    return leadDto(lead);
}
export async function updateLead(id, updates, userId) {
    const lead = await prisma.lead.update({ where: { id }, data: updates });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Lead', id, { action: 'update' });
    return leadDto(lead);
}
export async function checkIn(memberId, userId) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member || member.status !== 'Active')
        return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existing = await prisma.attendanceRecord.findFirst({ where: { memberId, date: today } });
    if (existing)
        return true;
    const id = nextHumanId('A', await prisma.attendanceRecord.count() + 1, 200);
    const now = new Date();
    await prisma.attendanceRecord.create({ data: { id, memberId, memberName: member.name, date: today, checkInTime: now.toTimeString().slice(0, 5), status: 'Present' } });
    await prisma.member.update({ where: { id: memberId }, data: { attendanceCount: { increment: 1 } } });
    await audit(userId, AuditAction.ATTENDANCE_ACTION, 'Member', memberId, { checkIn: true });
    return true;
}
export async function createPayment(input, userId) {
    const id = nextHumanId('P', await prisma.paymentRecord.count() + 1, 900);
    const receiptNumber = `TF-${new Date().getFullYear()}-${String(350 + await prisma.paymentRecord.count()).padStart(5, '0')}`;
    const payment = await prisma.paymentRecord.create({ data: { id, ...input, paymentDate: new Date(), expiryExtendedDate: new Date(input.expiryExtendedDate), receiptNumber } });
    await prisma.receiptRecord.create({ data: { paymentId: payment.id, receiptNumber } });
    await audit(userId, AuditAction.PAYMENT_ACTION, 'PaymentRecord', id, { amount: input.amount });
    return paymentDto(payment);
}
export async function createNotice(input, userId) {
    const id = `N-${String(1 + await prisma.notice.count()).padStart(2, '0')}`;
    const notice = await prisma.notice.create({ data: { id, ...input, date: new Date() } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Notice', id, { action: 'create' });
    return noticeDto(notice);
}
export async function deleteNotice(id, userId) {
    await prisma.notice.delete({ where: { id } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'Notice', id, { action: 'delete' });
}
export async function upsertWorkout(input, userId) {
    const existing = await prisma.workoutPlan.findFirst({ where: { memberId: input.memberId } });
    if (existing)
        await prisma.workoutPlan.delete({ where: { id: existing.id } });
    const id = `WP-${100 + await prisma.workoutPlan.count()}`;
    const workout = await prisma.workoutPlan.create({ data: { id, memberId: input.memberId, title: input.title, exercises: { create: input.exercises } }, include: { exercises: true } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'WorkoutPlan', id, { memberId: input.memberId });
    return workoutDto(workout);
}
export async function upsertDiet(input, userId) {
    const existing = await prisma.dietPlan.findFirst({ where: { memberId: input.memberId } });
    if (existing)
        await prisma.dietPlan.delete({ where: { id: existing.id } });
    const id = `DP-${100 + await prisma.dietPlan.count()}`;
    const diet = await prisma.dietPlan.create({ data: { id, memberId: input.memberId, title: input.title, calories: input.calories, proteinGrams: input.proteinGrams, meals: { create: input.meals } }, include: { meals: true } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'DietPlan', id, { memberId: input.memberId });
    return dietDto(diet);
}
export async function createProgress(input, userId) {
    const id = `PG-${100 + await prisma.progressMetric.count()}`;
    const metric = await prisma.progressMetric.create({ data: { id, ...input, date: new Date() } });
    await audit(userId, AuditAction.ADMIN_ACTION, 'ProgressMetric', id, { memberId: input.memberId });
    return progressDto(metric);
}
