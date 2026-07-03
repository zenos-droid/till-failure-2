import bcrypt from 'bcryptjs';
import { prisma } from '../src/database/prisma.js';

const passwordHash = await bcrypt.hash('securedPassword123', 12);

await prisma.auditLog.deleteMany();
await prisma.notificationLog.deleteMany();
await prisma.notificationQueueItem.deleteMany();
await prisma.notificationTemplate.deleteMany();
await prisma.refreshToken.deleteMany();
await prisma.passwordResetToken.deleteMany();
await prisma.user.deleteMany();
await prisma.receiptRecord.deleteMany();
await prisma.paymentRecord.deleteMany();
await prisma.attendanceRecord.deleteMany();
await prisma.progressMetric.deleteMany();
await prisma.workoutExercise.deleteMany();
await prisma.workoutPlan.deleteMany();
await prisma.dietMeal.deleteMany();
await prisma.dietPlan.deleteMany();
await prisma.trainerAssignment.deleteMany();
await prisma.membershipHistory.deleteMany();
await prisma.notice.deleteMany();
await prisma.lead.deleteMany();
await prisma.member.deleteMany();
await prisma.trainer.deleteMany();
await prisma.receptionist.deleteMany();
await prisma.membershipPlan.deleteMany();

await prisma.membershipPlan.createMany({ data: [
  { name: 'Sprint Monthly Starter', durationMonths: 1, price: 1200 },
  { name: 'Discipline Quarterly Lock', durationMonths: 3, price: 3200 },
  { name: 'Half-Yearly Transformation Index', durationMonths: 6, price: 6200 },
  { name: 'Absolute Warrior Club', durationMonths: 12, price: 10000 },
  { name: 'Personal Training', durationMonths: 1, price: 6000, isPersonalTraining: true }
] });

const trainers = [
  { id: 'T-01', name: 'Biplab Singh', email: 'biplab@tillfailure.com', phone: '+91 82405 01258', specialty: 'Hypertrophy & Powerlifting Volume', assignedCount: 3, status: 'Active' },
  { id: 'T-02', name: 'Suman Ghosh', email: 'suman@tillfailure.com', phone: '+91 94337 99912', specialty: 'Body Fat Caliper Deficits', assignedCount: 2, status: 'Active' },
  { id: 'T-03', name: 'Amit Pal', email: 'amit@tillfailure.com', phone: '+91 91234 56789', specialty: 'Sattu Sports Diet Diagnostics', assignedCount: 1, status: 'Active' }
] as const;
for (const trainer of trainers) {
  await prisma.trainer.create({ data: trainer as any });
  await prisma.user.create({ data: { name: trainer.name, email: trainer.email, phone: trainer.phone, role: 'TRAINER', trainerId: trainer.id, passwordHash } });
}

const recs = [
  { id: 'R-01', name: 'Rita Ghosh', email: 'rita@tillfailure.com', phone: '+91 89001 22334', shift: 'Morning Shift (6AM - 2PM)' },
  { id: 'R-02', name: 'Joydeep Sen', email: 'joydeep@tillfailure.com', phone: '+91 76543 21098', shift: 'Evening Shift (2PM - 10PM)' }
];
for (const rec of recs) {
  await prisma.receptionist.create({ data: rec });
  await prisma.user.create({ data: { name: rec.name, email: rec.email, phone: rec.phone, role: 'RECEPTIONIST', receptionistId: rec.id, passwordHash } });
}

await prisma.user.create({ data: { name: 'Biplab Singh (Director)', email: 'admin@tillfailure.com', role: 'ADMIN', passwordHash } });

const members = [
  { id: 'M-101', name: 'Ayush Gore', email: 'ayushgore21@gmail.com', phone: '+91 98305 12345', status: 'Active', membershipName: 'Discipline Quarterly Lock', startDate: '2026-05-01', endDate: '2026-08-01', assignedTrainerId: 'T-01', assignedTrainerName: 'Biplab Singh', attendanceCount: 24, gender: 'Male', activeSlot: 'Evening Frame (5PM - 10PM)', balanceDue: 0 },
  { id: 'M-102', name: 'Pritam Pal', email: 'pritam.pal@gmail.com', phone: '+91 91235 98765', status: 'Active', membershipName: 'Elite 12-Week Overhaul', startDate: '2026-04-15', endDate: '2026-07-15', assignedTrainerId: 'T-02', assignedTrainerName: 'Suman Ghosh', attendanceCount: 18, gender: 'Male', activeSlot: 'Morning Frame (6AM - 10AM)', balanceDue: 1500 },
  { id: 'M-103', name: 'Sayani Adhikari', email: 'sayani.a@outlook.m', phone: '+91 74390 11223', status: 'Expired', membershipName: 'Sprint Monthly Starter', startDate: '2026-04-01', endDate: '2026-05-01', assignedTrainerId: 'T-01', assignedTrainerName: 'Biplab Singh', attendanceCount: 12, gender: 'Female', activeSlot: 'Morning Frame (6AM - 10AM)', balanceDue: 0 },
  { id: 'M-104', name: 'Joybrata Dawn', email: 'joybrata@gmail.com', phone: '+91 94331 44556', status: 'Active', membershipName: 'Absolute Warrior Club', startDate: '2026-01-10', endDate: '2027-01-10', assignedTrainerId: 'T-03', assignedTrainerName: 'Amit Pal', attendanceCount: 88, gender: 'Male', activeSlot: 'Evening Frame (5PM - 10PM)', balanceDue: 0 },
  { id: 'M-105', name: 'Debasmita Roy', email: 'debasmita.roy@test.com', phone: '+91 82402 33445', status: 'Suspended', membershipName: 'Sprint Monthly Starter', startDate: '2026-05-10', endDate: '2026-06-10', assignedTrainerId: 'T-02', assignedTrainerName: 'Suman Ghosh', attendanceCount: 2, gender: 'Female', activeSlot: 'Afternoon Frame (11AM - 4PM)', balanceDue: 1200 }
] as const;

for (const m of members) {
  await prisma.member.create({ data: { ...m, startDate: new Date(m.startDate), endDate: new Date(m.endDate) } as any });
  await prisma.user.create({ data: { name: m.name, email: m.email, phone: m.phone, role: 'MEMBER', memberId: m.id, passwordHash } });
}

await prisma.lead.createMany({ data: [
  { id: 'L-501', name: 'Aarav Sen', phone: '+91 98831 29481', email: 'aarav.sen@outlook.com', interest: 'Rishra Student Pass', status: 'New', date: new Date('2026-06-01') },
  { id: 'L-502', name: 'Mousumi Pyne', phone: '+91 93321 00213', email: 'mousumi.p@gmail.com', interest: 'Double Heavy Couple Bundle', status: 'Contacted', date: new Date('2026-05-28') },
  { id: 'L-503', name: 'Tanmoy Bannerjee', phone: '+91 70031 99011', email: 'tanmoy_b@outlook.com', interest: 'Elite 12-Week Overhaul', status: 'Converted', date: new Date('2026-05-25') },
  { id: 'L-504', name: 'Subhadeep Das', phone: '+91 81005 23145', interest: 'Sprint Monthly Starter', status: 'Lost', date: new Date('2026-05-20') }
] as any });

const payments = [
  { id: 'P-901', memberId: 'M-101', memberName: 'Ayush Gore', amount: 3200, paymentDate: '2026-05-01', planName: 'Discipline Quarterly Lock', status: 'Success', paymentMethod: 'Razorpay-UPI', expiryExtendedDate: '2026-08-01', receiptNumber: 'TF-2026-00341' },
  { id: 'P-902', memberId: 'M-102', memberName: 'Pritam Pal', amount: 6000, paymentDate: '2026-04-15', planName: 'Elite 12-Week Overhaul (Part-1)', status: 'Success', paymentMethod: 'Razorpay-Card', expiryExtendedDate: '2026-07-15', receiptNumber: 'TF-2026-00215' },
  { id: 'P-903', memberId: 'M-103', memberName: 'Sayani Adhikari', amount: 1200, paymentDate: '2026-04-01', planName: 'Sprint Monthly Starter', status: 'Success', paymentMethod: 'Cash', expiryExtendedDate: '2026-05-01', receiptNumber: 'TF-2026-00108' },
  { id: 'P-904', memberId: 'M-104', memberName: 'Joybrata Dawn', amount: 10000, paymentDate: '2026-01-10', planName: 'Absolute Warrior Club', status: 'Success', paymentMethod: 'Razorpay-Card', expiryExtendedDate: '2027-01-10', receiptNumber: 'TF-2026-00014' }
] as const;
for (const p of payments) {
  await prisma.paymentRecord.create({ data: { ...p, paymentDate: new Date(p.paymentDate), expiryExtendedDate: new Date(p.expiryExtendedDate) } as any });
  await prisma.receiptRecord.create({ data: { paymentId: p.id, receiptNumber: p.receiptNumber } });
}

await prisma.notice.createMany({ data: [
  { id: 'N-01', title: 'Post-Workout Sattu Refueling Stocked', content: 'Our Head Coach Biplab Singh has replenished high-protein local chickpea sattu bags at the front desk reception. Avail verified post-workout nutrition drinks for flat rates.', date: new Date('2026-06-01'), author: 'Biplab Singh', targetRole: 'ALL' },
  { id: 'N-02', title: 'Powerlifting Training Platform Notice', content: 'The secondary deadlift platform will undergo wood-reinforcement varnish and structural rubber padding updates. Lift only on Platform 1 in morning shifts.', date: new Date('2026-05-29'), author: 'Suman Ghosh', targetRole: 'ALL' },
  { id: 'N-03', title: 'Trainer Caliper Assessment Schedule', content: 'Attention trainers: Ensure mandatory bi-weekly bodyfat caliper tracking cards are thoroughly logged in member charts.', date: new Date('2026-05-27'), author: 'Biplab Singh', targetRole: 'TRAINERS' }
] as any });

await prisma.attendanceRecord.createMany({ data: [
  { id: 'A-201', memberId: 'M-101', memberName: 'Ayush Gore', date: new Date('2026-06-02'), checkInTime: '17:45', status: 'Present' },
  { id: 'A-202', memberId: 'M-102', memberName: 'Pritam Pal', date: new Date('2026-06-02'), checkInTime: '07:15', status: 'Present' },
  { id: 'A-204', memberId: 'M-104', memberName: 'Joybrata Dawn', date: new Date('2026-06-02'), checkInTime: '18:30', status: 'Present' },
  { id: 'A-205', memberId: 'M-101', memberName: 'Ayush Gore', date: new Date('2026-06-01'), checkInTime: '18:00', status: 'Present' },
  { id: 'A-206', memberId: 'M-102', memberName: 'Pritam Pal', date: new Date('2026-06-01'), checkInTime: '06:55', status: 'Present' }
] as any });

await prisma.workoutPlan.create({ data: { id: 'W-01', memberId: 'M-101', title: 'Heavy Concentric Hypertrophy Push-Pull-Legs', dateAssigned: new Date('2026-05-02'), exercises: { create: [
  { day: 'Monday (Heavy Squat/Push)', routine: 'Low Bar Barbell Squats: 5 sets x 5 reps. Overhead Barbell Press: 4 sets x 8 reps.' },
  { day: 'Wednesday (Heavy Dead/Pull)', routine: 'Platform Deficit Deadlifts: 5 sets x 3 reps. Weighted Chin-ups: 4 sets x 10 reps.' },
  { day: 'Friday (Joint Bracing Pump)', routine: 'Barbell Flat Bench Press: 4 sets x 8 reps. Hammer Dumbbell Curls: 3 sets x 15 reps.' }
] } } });

await prisma.dietPlan.create({ data: { id: 'D-01', memberId: 'M-101', title: 'Caloric Surplus local Sattu & Katla Fueling', calories: 2900, proteinGrams: 160, dateAssigned: new Date('2026-05-02'), meals: { create: [
  { time: '08:00 AM Breakfast', intake: '4 boiled eggs + banana + oatmeal with almonds' },
  { time: '01:30 PM Lunch', intake: 'Rice + Hooghly fish stew + green vegetables' },
  { time: '05:30 PM Pre-Workout', intake: 'Local roasted chickpea sattu in cold water' },
  { time: '08:45 PM Post-Workout Dinner', intake: 'Grilled chicken breast + rotis + cucumber salad' }
] } } });

await prisma.progressMetric.createMany({ data: [
  { id: 'P-01', memberId: 'M-101', date: new Date('2026-05-15'), weight: 79.5, bmi: 24.3, muscleMass: 38.5, bodyFatPercent: 17.5, notes: 'Solid density increase across concentric bench press. Caliper metrics shrinking.' },
  { id: 'P-02', memberId: 'M-101', date: new Date('2026-06-01'), weight: 78.4, bmi: 24.0, muscleMass: 39.1, bodyFatPercent: 16.0, notes: 'Outstanding abdominal fibers carving out. Perfect sattu absorption.' }
] });

await prisma.notificationTemplate.createMany({ data: [
  { key: 'membership_expiring', channel: 'whatsapp', body: 'Hi {{name}}, your Till Failure membership expires on {{endDate}}.' },
  { key: 'payment_receipt', channel: 'whatsapp', body: 'Payment received. Receipt {{receiptNumber}} is ready.' }
] });

console.log('Seeded Till Failure SaaS data. Default password: securedPassword123');
await prisma.$disconnect();
