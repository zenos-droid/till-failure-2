import { prisma } from '../../database/prisma.js';
export async function audit(userId, action, entityType, entityId, metadata, ipAddress) {
    await prisma.auditLog.create({
        data: {
            userId,
            action,
            entityType,
            entityId,
            metadata: metadata,
            ipAddress
        }
    });
}
