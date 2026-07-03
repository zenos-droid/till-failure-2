import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { AuditAction, UserRole } from '@prisma/client';
import { env } from '../../config/env.js';
import { prisma } from '../../database/prisma.js';
import { AppError } from '../../shared/http.js';
import { audit } from '../audit/audit.service.js';

const tokenHash = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

const publicUser = (user: any) => ({
  id: user.memberId ?? user.trainerId ?? user.receptionistId ?? user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone ?? undefined,
  memberId: user.memberId ?? undefined,
  trainerId: user.trainerId ?? undefined
});

function signAccess(user: any) {
  return jwt.sign({ id: user.id, role: user.role, email: user.email }, env.JWT_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL } as SignOptions);
}

function signRefresh(user: any) {
  return jwt.sign({ id: user.id, role: user.role, email: user.email, type: 'refresh' }, env.REFRESH_TOKEN_SECRET, { expiresIn: env.REFRESH_TOKEN_TTL } as SignOptions);
}

export async function login(email: string, password: string, role: UserRole, ip?: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== role || !user.isActive) throw new AppError(401, 'Invalid credentials or role');
  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) throw new AppError(401, 'Invalid credentials or role');
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  await prisma.refreshToken.create({ data: { userId: user.id, tokenHash: tokenHash(refreshToken), expiresAt } });
  await audit(user.id, AuditAction.LOGIN, 'User', user.id, { role }, ip);
  return { user: publicUser(user), accessToken, refreshToken };
}

export async function refresh(refreshToken: string) {
  let payload: any;
  try {
    payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new AppError(401, 'Invalid refresh token');
  }
  const stored = await prisma.refreshToken.findFirst({ where: { userId: payload.id, tokenHash: tokenHash(refreshToken), revokedAt: null, expiresAt: { gt: new Date() } } });
  if (!stored) throw new AppError(401, 'Refresh token revoked');
  const user = await prisma.user.findUniqueOrThrow({ where: { id: payload.id } });
  return { user: publicUser(user), accessToken: signAccess(user) };
}

export async function logout(userId: string | undefined, refreshToken?: string, ip?: string) {
  if (refreshToken) {
    await prisma.refreshToken.updateMany({ where: { tokenHash: tokenHash(refreshToken) }, data: { revokedAt: new Date() } });
  }
  await audit(userId, AuditAction.LOGOUT, 'User', userId, {}, ip);
}

export async function updateProfile(userId: string, name: string, phone: string) {
  const user = await prisma.user.update({ where: { id: userId }, data: { name, phone } });
  if (user.memberId) await prisma.member.update({ where: { id: user.memberId }, data: { name, phone } });
  if (user.trainerId) await prisma.trainer.update({ where: { id: user.trainerId }, data: { name, phone } });
  if (user.receptionistId) await prisma.receptionist.update({ where: { id: user.receptionistId }, data: { name, phone } });
  await audit(userId, AuditAction.PROFILE_ACTION, 'User', userId, { name, phone });
  return publicUser(user);
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { resetToken: null };
  const resetToken = `TF-OVERRIDE-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);
  await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash: tokenHash(resetToken), expiresAt } });
  return { resetToken };
}

export async function resetPassword(token: string, password: string) {
  const hash = tokenHash(token);
  const reset = await prisma.passwordResetToken.findFirst({ where: { tokenHash: hash, usedAt: null, expiresAt: { gt: new Date() } } });
  if (!reset) throw new AppError(400, 'Invalid or expired reset token');
  await prisma.user.update({ where: { id: reset.userId }, data: { passwordHash: await bcrypt.hash(password, 12) } });
  await prisma.passwordResetToken.update({ where: { id: reset.id }, data: { usedAt: new Date() } });
}
