import { Router } from 'express';
import PDFDocument from 'pdfkit';
import { prisma } from '../database/prisma.js';
import { ok } from '../shared/http.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import * as auth from '../modules/auth/auth.service.js';
import * as core from '../modules/core/core.service.js';
import { loginSchema, signupSchema, memberCreateSchema, trainerCreateSchema, receptionistCreateSchema, leadCreateSchema, noticeCreateSchema, workoutSchema, dietSchema, progressSchema } from '../validators/schemas.js';
import { attendanceDto, dietDto, leadDto, memberDto, noticeDto, paymentDto, receptionistDto, trainerDto, workoutDto } from '../utils/format.js';
export const api = Router();
api.get('/health', (_req, res) => ok(res, { status: 'ok', service: 'till-failure-backend' }));
api.get('/bootstrap', requireAuth, async (_req, res) => ok(res, await core.bootstrap()));
api.post('/auth/login', async (req, res) => {
    const body = loginSchema.parse(req.body);
    ok(res, await auth.login(body.email, body.password, body.role, req.ip));
});
api.post('/auth/logout', requireAuth, async (req, res) => {
    await auth.logout(req.user?.id, req.body?.refreshToken, req.ip);
    ok(res, { success: true });
});
api.post('/auth/refresh', async (req, res) => ok(res, await auth.refresh(req.body.refreshToken)));
api.post('/auth/forgot-password', async (req, res) => ok(res, await auth.forgotPassword(req.body.email)));
api.post('/auth/reset-password', async (req, res) => {
    await auth.resetPassword(req.body.token, req.body.password);
    ok(res, { success: true });
});
api.get('/auth/profile', requireAuth, async (req, res) => {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: req.user.id } });
    ok(res, { id: user.memberId ?? user.trainerId ?? user.receptionistId ?? user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, memberId: user.memberId, trainerId: user.trainerId });
});
api.put('/auth/profile', requireAuth, async (req, res) => ok(res, await auth.updateProfile(req.user.id, req.body.name, req.body.phone ?? '')));
api.post('/signup', async (req, res) => {
    const body = signupSchema.parse(req.body);
    const today = new Date();
    const expiry = new Date(today);
    const lower = body.interestPlan.toLowerCase();
    expiry.setMonth(today.getMonth() + (lower.includes('quarterly') ? 3 : lower.includes('annual') || lower.includes('warrior') ? 12 : 1));
    ok(res, await core.createMember({ name: body.name, email: body.email, phone: body.phone, membershipName: body.interestPlan, startDate: today.toISOString(), endDate: expiry.toISOString(), gender: body.gender, activeSlot: body.activeSlot }), 201);
});
api.get('/members', requireAuth, async (_req, res) => ok(res, (await prisma.member.findMany({ include: { progress: true } })).map(memberDto)));
api.post('/members', requireAuth, allowRoles('ADMIN', 'RECEPTIONIST'), async (req, res) => ok(res, await core.createMember(memberCreateSchema.parse(req.body), req.user?.id), 201));
api.put('/members/:id', requireAuth, allowRoles('ADMIN', 'RECEPTIONIST'), async (req, res) => ok(res, await core.updateMember(req.params.id, req.body, req.user?.id)));
api.delete('/members/:id', requireAuth, allowRoles('ADMIN'), async (req, res) => { await core.deleteMember(req.params.id, req.user?.id); ok(res, { success: true }); });
api.post('/members/:id/renew', requireAuth, allowRoles('ADMIN', 'RECEPTIONIST'), async (req, res) => ok(res, await core.renewMember(req.params.id, req.body.planName, Number(req.body.durationMonths), Number(req.body.cost), req.user?.id)));
api.get('/members/:id/history', requireAuth, async (req, res) => ok(res, await prisma.membershipHistory.findMany({ where: { memberId: req.params.id }, orderBy: { createdAt: 'desc' } })));
api.get('/trainers', requireAuth, async (_req, res) => ok(res, (await prisma.trainer.findMany()).map(trainerDto)));
api.post('/trainers', requireAuth, allowRoles('ADMIN'), async (req, res) => ok(res, await core.createTrainer(trainerCreateSchema.parse(req.body), req.user?.id), 201));
api.put('/trainers/:id', requireAuth, allowRoles('ADMIN'), async (req, res) => ok(res, await core.updateTrainer(req.params.id, req.body, req.user?.id)));
api.delete('/trainers/:id', requireAuth, allowRoles('ADMIN'), async (req, res) => { await prisma.trainer.delete({ where: { id: req.params.id } }); ok(res, { success: true }); });
api.get('/trainers/:id/members', requireAuth, async (req, res) => ok(res, (await prisma.member.findMany({ where: { assignedTrainerId: req.params.id }, include: { progress: true } })).map(memberDto)));
api.get('/receptionists', requireAuth, async (_req, res) => ok(res, (await prisma.receptionist.findMany()).map(receptionistDto)));
api.post('/receptionists', requireAuth, allowRoles('ADMIN'), async (req, res) => ok(res, await core.createReceptionist(receptionistCreateSchema.parse(req.body), req.user?.id), 201));
api.put('/receptionists/:id', requireAuth, allowRoles('ADMIN'), async (req, res) => ok(res, await core.updateReceptionist(req.params.id, req.body, req.user?.id)));
api.delete('/receptionists/:id', requireAuth, allowRoles('ADMIN'), async (req, res) => { await prisma.receptionist.delete({ where: { id: req.params.id } }); ok(res, { success: true }); });
api.post('/assignments/:memberId/trainer', requireAuth, allowRoles('ADMIN'), async (req, res) => ok(res, await core.assignTrainer(req.params.memberId, req.body.trainerId, req.user?.id)));
api.delete('/assignments/:memberId/trainer', requireAuth, allowRoles('ADMIN'), async (req, res) => ok(res, await core.removeTrainer(req.params.memberId, req.user?.id)));
api.get('/leads', requireAuth, async (_req, res) => ok(res, (await prisma.lead.findMany({ orderBy: { date: 'desc' } })).map(leadDto)));
api.post('/leads', requireAuth, allowRoles('ADMIN', 'RECEPTIONIST'), async (req, res) => ok(res, await core.createLead(leadCreateSchema.parse(req.body), req.user?.id), 201));
api.put('/leads/:id', requireAuth, allowRoles('ADMIN', 'RECEPTIONIST'), async (req, res) => ok(res, await core.updateLead(req.params.id, req.body, req.user?.id)));
api.get('/attendance', requireAuth, async (_req, res) => ok(res, (await prisma.attendanceRecord.findMany({ orderBy: { date: 'desc' } })).map(attendanceDto)));
api.post('/attendance/checkin/:memberId', requireAuth, allowRoles('ADMIN', 'RECEPTIONIST'), async (req, res) => ok(res, { success: await core.checkIn(req.params.memberId, req.user?.id) }));
api.get('/payments', requireAuth, async (_req, res) => ok(res, (await prisma.paymentRecord.findMany({ orderBy: { paymentDate: 'desc' } })).map(paymentDto)));
api.post('/payments', requireAuth, allowRoles('ADMIN', 'RECEPTIONIST'), async (req, res) => ok(res, await core.createPayment(req.body, req.user?.id), 201));
api.get('/payments/:id/receipt', requireAuth, async (req, res) => {
    const payment = await prisma.paymentRecord.findUniqueOrThrow({ where: { id: req.params.id } });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${payment.receiptNumber}.pdf"`);
    const doc = new PDFDocument({ margin: 48 });
    doc.pipe(res);
    doc.fontSize(20).text('TILL FAILURE', { align: 'center' });
    doc.moveDown().fontSize(10).text('Official Membership Receipt', { align: 'center' });
    doc.moveDown(2).fontSize(12).text(`Receipt: ${payment.receiptNumber}`);
    doc.text(`Member: ${payment.memberName} (${payment.memberId})`);
    doc.text(`Plan: ${payment.planName}`);
    doc.text(`Amount: INR ${payment.amount}.00`);
    doc.text(`Status: ${payment.status}`);
    doc.text(`Valid Until: ${payment.expiryExtendedDate.toISOString().slice(0, 10)}`);
    doc.end();
});
api.get('/notices', requireAuth, async (_req, res) => ok(res, (await prisma.notice.findMany({ orderBy: { date: 'desc' } })).map(noticeDto)));
api.post('/notices', requireAuth, allowRoles('ADMIN'), async (req, res) => ok(res, await core.createNotice(noticeCreateSchema.parse(req.body), req.user?.id), 201));
api.delete('/notices/:id', requireAuth, allowRoles('ADMIN'), async (req, res) => { await core.deleteNotice(req.params.id, req.user?.id); ok(res, { success: true }); });
api.post('/workouts', requireAuth, allowRoles('ADMIN', 'TRAINER'), async (req, res) => ok(res, await core.upsertWorkout(workoutSchema.parse(req.body), req.user?.id), 201));
api.get('/workouts/member/:memberId', requireAuth, async (req, res) => ok(res, workoutDto(await prisma.workoutPlan.findFirstOrThrow({ where: { memberId: req.params.memberId }, include: { exercises: true } }))));
api.post('/diets', requireAuth, allowRoles('ADMIN', 'TRAINER'), async (req, res) => ok(res, await core.upsertDiet(dietSchema.parse(req.body), req.user?.id), 201));
api.get('/diets/member/:memberId', requireAuth, async (req, res) => ok(res, dietDto(await prisma.dietPlan.findFirstOrThrow({ where: { memberId: req.params.memberId }, include: { meals: true } }))));
api.post('/progress', requireAuth, allowRoles('ADMIN', 'TRAINER'), async (req, res) => ok(res, await core.createProgress(progressSchema.parse(req.body), req.user?.id), 201));
api.get('/analytics/overview', requireAuth, allowRoles('ADMIN'), async (_req, res) => {
    const [totalMembers, activeMembers, expiredMembers, expiringSoonMembers, payments, attendance] = await Promise.all([
        prisma.member.count(),
        prisma.member.count({ where: { status: 'Active' } }),
        prisma.member.count({ where: { status: 'Expired' } }),
        prisma.member.count({ where: { status: 'Active', endDate: { lte: new Date(Date.now() + 10 * 86400000) } } }),
        prisma.paymentRecord.findMany({ where: { status: 'Success' } }),
        prisma.attendanceRecord.count()
    ]);
    ok(res, { totalMembers, activeMembers, expiredMembers, expiringSoonMembers, revenue: payments.reduce((sum, p) => sum + p.amount, 0), attendanceCount: attendance });
});
