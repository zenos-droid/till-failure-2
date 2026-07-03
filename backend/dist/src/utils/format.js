const dateOnly = (value) => value.toISOString().slice(0, 10);
export const memberDto = (m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    status: m.status,
    membershipName: m.membershipName,
    startDate: dateOnly(m.startDate),
    endDate: dateOnly(m.endDate),
    assignedTrainerId: m.assignedTrainerId ?? undefined,
    assignedTrainerName: m.assignedTrainerName ?? undefined,
    attendanceCount: m.attendanceCount,
    gender: m.gender,
    activeSlot: m.activeSlot,
    balanceDue: m.balanceDue,
    weightHistory: (m.progress ?? []).map((p) => ({ date: dateOnly(p.date), weight: p.weight }))
});
export const trainerDto = (t) => ({ id: t.id, name: t.name, email: t.email, phone: t.phone, specialty: t.specialty, assignedCount: t.assignedCount, status: t.status });
export const receptionistDto = (r) => ({ id: r.id, name: r.name, email: r.email, phone: r.phone, shift: r.shift });
export const leadDto = (l) => ({ id: l.id, name: l.name, phone: l.phone, email: l.email ?? undefined, interest: l.interest, status: l.status, date: dateOnly(l.date) });
export const paymentDto = (p) => ({ id: p.id, memberId: p.memberId, memberName: p.memberName, amount: p.amount, paymentDate: dateOnly(p.paymentDate), planName: p.planName, status: p.status, paymentMethod: p.paymentMethod, expiryExtendedDate: dateOnly(p.expiryExtendedDate), receiptNumber: p.receiptNumber });
export const attendanceDto = (a) => ({ id: a.id, memberId: a.memberId, memberName: a.memberName, date: dateOnly(a.date), checkInTime: a.checkInTime, status: a.status });
export const noticeDto = (n) => ({ id: n.id, title: n.title, content: n.content, date: dateOnly(n.date), author: n.author, targetRole: n.targetRole });
export const progressDto = (p) => ({ id: p.id, memberId: p.memberId, date: dateOnly(p.date), weight: p.weight, bmi: p.bmi, muscleMass: p.muscleMass, bodyFatPercent: p.bodyFatPercent, notes: p.notes });
export const workoutDto = (w) => ({ id: w.id, memberId: w.memberId, title: w.title, exercises: (w.exercises ?? []).map((e) => ({ day: e.day, routine: e.routine })), dateAssigned: dateOnly(w.dateAssigned) });
export const dietDto = (d) => ({ id: d.id, memberId: d.memberId, title: d.title, meals: (d.meals ?? []).map((m) => ({ time: m.time, intake: m.intake })), calories: d.calories, proteinGrams: d.proteinGrams, dateAssigned: dateOnly(d.dateAssigned) });
