import React, { useState } from 'react';
import { Mail, Phone, MapPin, Compass, Clock, Send, Landmark } from 'lucide-react';
import { SuccessModal } from '../components/Forms';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Membership Enquiry',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSuccess(true);
  };

  const contactInfos = [
    {
      icon: <MapPin className="h-5 w-5 text-black" />,
      title: "PHYSICAL FOUNDRY LOCATION",
      value: "24/1 Broad Road, near Railway Platform 1 Corridor, Rishra, Hooghly, West Bengal, India, Zip 712248."
    },
    {
      icon: <Phone className="h-5 w-5 text-black" />,
      title: "HOTLINE CALL ENQUIRIES",
      value: "+91 82405 01258 / +91 94337 99912 (Desk Hours: 6:00 AM - 10:00 PM)."
    },
    {
      icon: <Mail className="h-5 w-5 text-black" />,
      title: "CORPORATE EMAIL INBOX",
      value: "contact@tillfailure.com / admissions@tillfailure.com"
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. SECTION HEADER */}
      <section className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 h-52 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-[#FFE259] uppercase">
            // LOCATION COORDINATES & RECEPTION
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            CONTACT HEADQUARTERS
          </h1>
          <p className="font-sans text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Ready to inspect the lifting cages? Grab directions below, dial our direct desk lines, or send an instant digital request directly to our Head Coach.
          </p>
        </div>
      </section>

      {/* 2. CHANNELS & FORM GRID */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Channels Details - 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-sans font-black text-white uppercase text-lg tracking-tight">
            ESTABLISH CONNECTION
          </h3>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We are situated right next to Rishra station platforms, making commuting easy for lifters across Serampore, Konnagar, and Hindmotor.
          </p>

          <div className="space-y-4">
            {contactInfos.map((info, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-zinc-900 bg-zinc-950 space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFE259]">
                  {info.icon}
                </div>
                <h4 className="font-mono text-[9px] text-zinc-555 tracking-wider font-extrabold uppercase pt-2">
                  {info.title}
                </h4>
                <p className="font-sans text-xs text-white leading-relaxed">
                  {info.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick WhatsApp Link Buttons */}
          <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center justify-between gap-4">
            <span className="font-sans text-xs text-zinc-300 font-bold leading-normal">
              Need immediate answers? Send a quick query on WhatsApp.
            </span>
            <a
              href="https://wa.me/918240501258"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-green-650 hover:bg-green-600 text-white font-mono text-[10px] uppercase font-black tracking-wider shadow-lg flex-shrink-0"
            >
              WhatsApp Dial
            </a>
          </div>
        </div>

        {/* Right: Contact Form - 7 Cols */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="absolute top-0 right-10 h-1 w-20 bg-amber-500" />
          
          <h3 className="font-sans font-black text-white uppercase text-base mb-6 pb-2 border-b border-zinc-900">
            Submit Consultation Ticket
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            <div>
              <label className="block text-[11px] font-mono tracking-widest text-[#FFE259] uppercase mb-1 font-bold">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ayush Gore"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-white outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                  Active Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 90000 00000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                Subject Focus Area
              </label>
              <select
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-white outline-none"
              >
                <option value="Membership Enquiry">Membership Fee Enquiry</option>
                <option value="1-on-1 PT Coaching slots">1-on-1 Certified PT Coaching slots</option>
                <option value="Transformation Challenge Entry">Transformation Challenge Entry</option>
                <option value="Corporate/Partner deals">Corporate/Double Couple deals</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                Detailed message (Goals, experiences)
              </label>
              <textarea
                rows={4}
                required
                placeholder="List your fitness history and current limitations so Coach Biplab can pre-screen your application."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 text-white outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 font-sans font-black tracking-widest text-black text-xs uppercase shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Send className="h-4 w-4" />
              LOCK & SUBMIT RECEPTION TICKET
            </button>
          </form>
        </div>

      </section>

      {/* 3. HARDCORE GOOGLE MAP VISUAL COMPONENT */}
      <section className="bg-zinc-900/40 border-y border-zinc-900 py-20 text-center px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <div className="max-w-xl mx-auto space-y-2">
            <span className="font-mono text-xs font-black tracking-[0.25em] text-amber-500 block uppercase">
              // PHYSICAL ROUTING Blueprints
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              INTERACTIVE RECEPTION LOCATOR MAP
            </h2>
            <p className="font-sans text-xs text-zinc-500 leading-relaxed">
              We operate Hooghly's premiere strength lines. The card below redirects directly to Google Maps coordinates so you can trace platform routes from anywhere in West Bengal.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-8 flex flex-col items-center justify-center space-y-4 h-96 shadow-2xl relative">
            {/* Styled background grid mimicking structural map blueprint lines */}
            <div className="absolute inset-x-0 inset-y-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="relative z-10 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFE259]">
                <Landmark className="h-7 w-7 animate-pulse" />
              </div>

              <h4 className="font-sans font-black text-white uppercase text-base">
                TILL FAILURE GYM FOUNDRY HUB
              </h4>
              <p className="font-sans text-xs text-zinc-400 max-w-xs mx-auto">
                24/1 Broad Road, Rishra (Just 2 Minutes walk from Train Platform No. 1)
              </p>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=24/1+Broad+Road,+Rishra,+Hooghly,+West+Bengal"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase px-6 py-3 shadow-lg active:scale-95 transition-transform"
                >
                  <span>LAUNCH GOOGLE MAPS ROUTING</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Success notifier */}
      <SuccessModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        title="Reception Ticket Dropped!"
        message="A pre-admission profile has been initiated. Expect an instant WhatsApp callback validation within 2 hours. Preparing iron slots."
        details={[
          `Name: ${formData.name}`,
          `Scope: ${formData.subject}`,
          `Status: Locked in Rishra Cohorts Queue`
        ]}
      />

    </div>
  );
}
