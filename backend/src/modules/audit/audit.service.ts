import { AuditAction } from '@prisma/client';
import { prisma } from '../../database/prisma.js';

export async function audit(userId: string | undefined, action: AuditAction, entityType?: string, entityId?: string, metadata?: unknown, ipAddress?: string) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      metadata: metadata as object,
      ipAddress
    }
  });
}
