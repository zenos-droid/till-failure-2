import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Dumbbell, Calendar, Target, ChevronRight, X, Phone, User, Mail, ShieldAlert } from 'lucide-react';

interface FormProps {
  onSuccess?: () => void;
  defaultPlan?: string;
  className?: string;
  compact?: boolean;
}

export function SuccessModal({ isOpen, onClose, title, message, details }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  details?: string[];
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/30 bg-zinc-950 p-8 shadow-2xl shadow-amber-500/5 text-center"
          >
            {/* Design accents */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />
            
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFE259]">
              <CheckCircle2 className="h-10 w-10 animate-pulse" />
            </div>

            <h3 className="font-sans text-2xl font-black tracking-tight text-white uppercase">
              {title}
            </h3>
            <p className="mt-2 text-zinc-400 text-sm">
              {message}
            </p>

            {details && details.length > 0 && (
              <div className="mt-5 rounded-lg bg-zinc-900 border border-zinc-800 p-4 text-left">
                <span className="font-mono text-xs tracking-wider text-amber-400 font-bold uppercase block mb-2">
                  Reservation Details:
                </span>
                <ul className="space-y-1.5 font-sans text-xs text-zinc-300">
                  {details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <div className="h-1 w-1 bg-amber-400 rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-sans font-bold text-black uppercase tracking-wider text-xs transition-transform active:scale-[0.98] outline-none hover:brightness-110"
              >
                Let's Train
              </button>
              <span className="font-mono text-[10px] text-zinc-500">
                A Coach will initiate call within 2 hours • Powered by Till Failure
              </span>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function MembershipEnquiryForm({ defaultPlan = 'Monthly', onSuccess }: FormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    duration: defaultPlan,
    slots: 'Morning (6:00 AM - 10:00 AM)',
    hasTrainerPreference: 'Any',
    disciplineGoal: 'Muscle Gain',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Please provide at least your Name and Phone Number so we can call you.");
      return;
    }
    setIsSuccess(true);
    if (onSuccess) onSuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
            Full Name <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              required
              placeholder="e.g. Ayush Gore"
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
              Phone Number <span className="text-amber-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all font-medium"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                placeholder="e.g. main@tillfailure.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
              Preferred Membership Term
            </label>
            <select
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all"
            >
              <option value="Monthly">Monthly Membership (Tier 1)</option>
              <option value="Quarterly">Quarterly Bulk (Save 15%)</option>
              <option value="Half-Yearly">Half-Yearly Transformation Index</option>
              <option value="Yearly">Yearly Unlimited Core Membership</option>
              <option value="Student Package">Student ID Package (Rishra Station)</option>
              <option value="Couple Package">Double Heavy Couple Package</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
              Primary Fitness Mission
            </label>
            <select
              value={formData.disciplineGoal}
              onChange={e => setFormData({ ...formData, disciplineGoal: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all"
            >
              <option value="Muscle Gain">Muscle Gain / Hypertrophy</option>
              <option value="Fat Loss">Fat Loss Transformation</option>
              <option value="Strength Training">Strength & Powerlifing</option>
              <option value="General Fitness">General Fitness & Endurance</option>
              <option value="Personal Training">Elite 1-on-1 Transformation</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
            Preferred Daily Slot Setup
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              'Morning (6:00 AM - 10:00 AM)',
              'Afternoon (11:00 AM - 4:00 PM)',
              'Evening (5:00 PM - 10:00 PM)'
            ].map(slot => (
              <button
                type="button"
                key={slot}
                onClick={() => setFormData({ ...formData, slots: slot })}
                className={`py-2 px-3 border rounded-lg font-mono text-xs transition-all ${
                  formData.slots === slot
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {slot.split(' ')[0]} Frame
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-3.5 font-sans font-bold text-black uppercase tracking-wider text-xs transition-transform active:scale-[0.98]"
        >
          Submit Membership Setup
          <ChevronRight className="h-4 w-4" />
        </button>

        <p className="font-mono text-[10px] text-zinc-500 text-center">
          * Standard physical verification of West Bengal ID required on first arrival.
        </p>
      </form>

      <SuccessModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        title="Enquiry Lodged!"
        message="Your 'Till Failure' transformation folder is initialized. A specialist trainer will phone you shortly to approve your slot."
        details={[
          `Applicant Name: ${formData.fullName}`,
          `Primary Objective: ${formData.disciplineGoal}`,
          `Duration selected: ${formData.duration}`,
          `Preferred timing slot: ${formData.slots}`,
          `Rishra Facility Location: Hooghly Corridor Hub`
        ]}
      />
    </>
  );
}

export function FreeTrialForm({ onSuccess }: FormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '2026-06-02',
    disciplineGroup: 'Absolute Novice',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSuccess(true);
    if (onSuccess) onSuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-center flex flex-col items-center mb-1">
          <Dumbbell className="h-6 w-6 text-[#FFE259] animate-bounce mb-1" />
          <span className="font-sans text-xs font-black text-white uppercase tracking-wider">
            1-Day Hardcore Pass Included
          </span>
          <p className="font-mono text-[10px] text-zinc-400 mt-1">
            Access weight lines, platform access, cardio matrices, and dynamic coaching evaluation.
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest text-[#FFE259] uppercase mb-1 font-bold">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Ayush Gore"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
            Dial Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="+91 90000 00000"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
              Target Pass Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
              Level Group
            </label>
            <select
              value={formData.disciplineGroup}
              onChange={e => setFormData({ ...formData, disciplineGroup: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white outline-none focus:border-amber-500/50"
            >
              <option value="Absolute Novice">No Gym Experience</option>
              <option value="Intermediate">Casual Training (1-2 yrs)</option>
              <option value="Hardcore Lifter">Hardcore Athlete / Powerlifter</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 px-4 font-sans font-bold text-black uppercase tracking-wider text-xs transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Activate Day Pass
        </button>
      </form>

      <SuccessModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        title="Pass Activated!"
        message="A custom Till Failure Entry barcode has been allocated to your mobile number. Report to Rishra Front Desk on scheduled date."
        details={[
          `Name: ${formData.name}`,
          `Activated Date: ${formData.date}`,
          `Tier: 1-Day All-Access Pass`,
          `Rishra Desk Instructions: Bring sportswear, water flask, and ID proof.`
        ]}
      />
    </>
  );
}

export function TrainerConsultationForm({ preSelectedTrainer, onSuccess }: FormProps & { preSelectedTrainer?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    trainer: preSelectedTrainer || 'Coach Biplab (Head Strength Coach)',
    timeSlot: '17:00 PM - 18:00 PM',
    focusArea: 'Strength Assessment & Platform Form Fix'
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSuccess(true);
    if (onSuccess) onSuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono tracking-widest text-[#FFE259] uppercase mb-1.5 font-bold">
            Applicant Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ayush"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
            Dial Contact Number
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +91"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
              Coaching Staff Member
            </label>
            <select
              value={formData.trainer}
              onChange={e => setFormData({ ...formData, trainer: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-xs text-white outline-none focus:border-amber-500/50"
            >
              <option value="Coach Biplab (Head Strength Coach)">Coach Biplab (Head Strength Coach)</option>
              <option value="Coach Suman (Transformation Specialist)">Coach Suman (Transformation Specialist)</option>
              <option value="Coach Priya (Women's Conditioning Expert)">Coach Priya (Women's Conditioning Expert)</option>
              <option value="Coach Subrata (Bodybuilding Mentor)">Coach Subrata (Bodybuilding Mentor)</option>
              <option value="Coach Rahul (Functional & Rehab Lead)">Coach Rahul (Functional & Rehab Lead)</option>
              <option value="Coach Ananya (Precision Nutritionist)">Coach Ananya (Precision Nutritionist)</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 font-bold">
              Consultation Goal
            </label>
            <select
              value={formData.focusArea}
              onChange={e => setFormData({ ...formData, focusArea: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-xs text-white outline-none focus:border-amber-500/50"
            >
              <option value="Strength Assessment & Platform Form Fix">Strength Assessment & Squat Form Fix</option>
              <option value="Body Transformation Goal Blueprint">12-Week Fat Loss Blueprint</option>
              <option value="Contest Prep/Physique Tuning">Aesthetic Muscle Bulking & Diet</option>
              <option value="Pain Free Structural Movement Rehab">Joint Pain Free Dynamic Lifting</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 px-4 font-sans font-bold text-black uppercase tracking-wider text-xs transition-all hover:scale-95"
        >
          Book 1-on-1 Consultation Block
        </button>
      </form>

      <SuccessModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        title="Consultation Locked!"
        message="Your 1-on-1 private board evaluation has been noted. Your chosen coach is reviewing your initial goals. Preparing call blueprint."
        details={[
          `Client: ${formData.name}`,
          `Assigned Coach: ${formData.trainer}`,
          `Mission Target: ${formData.focusArea}`
        ]}
      />
    </>
  );
}

export function ChallengeRegistrationForm({ onSuccess }: FormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cityRegion: 'Rishra (Broad Road)',
    currentWeight: '',
    targetWeight: '',
    disciplineAgreement: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.disciplineAgreement) {
      alert("You must commit fully and sign the discipline agreement to enter the Till Failure transformation challenge.");
      return;
    }
    setIsSuccess(true);
    if (onSuccess) onSuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gradient-to-r from-amber-950 to-zinc-950 p-4 border border-amber-500/40 rounded-xl">
          <span className="font-sans font-black text-[#FFE259] uppercase tracking-wide text-sm block">
            ★ UNCHAIN THE MONSTER ★
          </span>
          <p className="font-mono text-[10px] text-zinc-300 mt-1 leading-relaxed">
            The Till Failure 12-Week Transformation is Hooghly's flagship body transformation standard. Extreme results require hard discipline. Full measurement indices, customized nutritional logs, and weekly audits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-[#FFE259] uppercase mb-1 font-bold">
              Candidate Name
            </label>
            <input
              type="text"
              required
              placeholder="Ayush Gore"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
              Active Call Number
            </label>
            <input
              type="tel"
              required
              placeholder="+91..."
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
              Start (KG)
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 84"
              value={formData.currentWeight}
              onChange={e => setFormData({ ...formData, currentWeight: e.target.value })}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 px-3 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
              Target (KG)
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 72"
              value={formData.targetWeight}
              onChange={e => setFormData({ ...formData, targetWeight: e.target.value })}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 px-3 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
              Residence Hub
            </label>
            <select
              value={formData.cityRegion}
              onChange={e => setFormData({ ...formData, cityRegion: e.target.value })}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 px-1.5 font-sans text-[11px] text-white outline-none focus:border-amber-500/50"
            >
              <option value="Rishra (Broad Road)">Rishra Hub</option>
              <option value="Serampore Corridor">Serampore</option>
              <option value="Konnagar Link">Konnagar</option>
              <option value="Uttarpara/Hindmotor">Uttarpara</option>
              <option value="Other West Bengal">Other</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 mt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={formData.disciplineAgreement}
              onChange={e => setFormData({ ...formData, disciplineAgreement: e.target.checked })}
              className="mt-1 h-4 w-4 accent-amber-500 border-zinc-800 bg-zinc-950 rounded cursor-pointer"
            />
            <span className="font-mono text-[10px] text-zinc-400 leading-relaxed">
              I agree that progress demands 100% adherence to macros, zero skipped leg days, and relentless effort. I commit to grinding <span className="text-amber-400 font-bold">Till Failure</span>.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 py-3.5 font-sans font-extrabold text-black uppercase tracking-wider text-xs transition-transform active:scale-95"
        >
          Submit Transformation Registry
        </button>
      </form>

      <SuccessModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        title="Discipline Contract Signed!"
        message="Candidate registered for the Elite Transformation Battle. Check WhatsApp/SMS for macro template dossier files."
        details={[
          `Name: ${formData.name}`,
          `Starting Weight Index: ${formData.currentWeight} KG`,
          `Target Weight Index: ${formData.targetWeight} KG`,
          `Region Base: ${formData.cityRegion}`,
          `Status: Verified Discipline Committed`
        ]}
      />
    </>
  );
}
