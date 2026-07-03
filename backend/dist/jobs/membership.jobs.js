import cron from 'node-cron';
import { prisma } from '../database/prisma.js';
export function registerMembershipJobs() {
    cron.schedule('0 2 * * *', async () => {
        const now = new Date();
        await prisma.member.updateMany({ where: { endDate: { lt: now }, status: 'Active' }, data: { status: 'Expired' } });
    });
    cron.schedule('15 2 * * *', async () => {
        const tenDays = new Date(Date.now() + 10 * 86400000);
        const members = await prisma.member.findMany({ where: { status: 'Active', endDate: { lte: tenDays } } });
        for (const member of members) {
            await prisma.notificationQueueItem.create({
                data: {
                    provider: 'DISABLED',
                    recipientPhone: member.phone,
                    templateKey: 'membership_expiring',
                    payload: { memberId: member.id, name: member.name, endDate: member.endDate },
                    scheduledFor: new Date()
                }
            });
        }
    });
}
