import { Trainer, Program, MembershipPlan, TransformationStory, BlogPost } from '../types';

export const programsData: Program[] = [
  {
    id: 'muscle-building',
    title: 'Hypertrophy Forge',
    tagline: 'Scientific Muscle Building',
    description: 'A scientifically backed muscle growth protocols prioritizing volume progression, progressive overload, and high mechanical tension.',
    goals: ['Maximize myofibrillar hypertrophy', 'Optimize lifting form', 'Increase overall lean mass indices'],
    benefits: ['Substantial strength reserves', 'Accelerated metabolic rate', 'Custom daily progressive weight target sheets'],
    intensity: 'Intermediate',
    duration: '12 Weeks (5 Days / Week)',
    coachingStyle: 'Intense hypertrophy tracking with strict rest interval timing.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'strength-power',
    title: 'Power & Platform Club',
    tagline: 'Absolute Powerlifting & Strength',
    description: 'Master the three big lifts (Squat, Bench, Deadlift) and structural compound mechanics to unlock your highest potential torque.',
    goals: ['Max 1-Rep max improvements', 'Optimized neurological muscle recruitment patterns', 'Core lumbar stability strengthening'],
    benefits: ['Dense muscular endurance', 'Flawless compound lift mechanics', 'Official state federation qualification readiness'],
    intensity: 'Advanced',
    duration: '16 Weeks (4 Days / Week)',
    coachingStyle: 'Coached by West Bengal state powerlifting medalists with active platform feedback.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fat-loss',
    title: '12-Week Metcon Shred',
    tagline: 'High Performance Fat Loss',
    description: 'Rigorous high-metabolic rate programming matched with calculated caloric deficits. Burn body fat without losing hard-won muscle.',
    goals: ['Optimize body fat percentage decrease', 'Boost anaerobic VO2 performance', 'Build lifetime nutritional resilience'],
    benefits: ['Visible vascularity definition', 'Sustained cognitive energy levels', 'Personalized macronutrient tracking folders'],
    intensity: 'All Levels',
    duration: '12 Weeks (6 Days / Week)',
    coachingStyle: 'High-energy, interactive body composition metric analysis.',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'personal-coaching',
    title: '1-on-1 Transformation Matrix',
    tagline: 'Elite Private Training Block',
    description: 'The highest-tier coaching protocol in Rishra. Private custom training files, macro assessments, daily checkins, and full accountability.',
    goals: ['Overcome stubborn growth plateaus', 'Rehab prior performance-limiting injuries', '100% custom-fit training velocity'],
    benefits: ['Undivided elite guide focus', 'Personalized workout planning', 'Weekly body fat caliper benchmarking'],
    intensity: 'All Levels',
    duration: 'Contract Based (Monthly / 12-Weeks)',
    coachingStyle: 'Rigorous personal oversight; failure to execute is analyzed and corrected.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'functional-conditioning',
    title: 'Iron Warrior Functional',
    tagline: 'Athletic Agility & Conditioning',
    description: 'Combine dynamic kettlebell complexes, plyometrics, slam balls, and compound conditioning to forge an agile, athletic machine.',
    goals: ['Enhance mobility and flexibility', 'Increase explosive power output', 'Optimize cardio and functional indices'],
    benefits: ['Reduced injury risk models', 'Superior daily stamina', 'Agile recovery heart rate indexes'],
    intensity: 'All Levels',
    duration: 'Ongoing (3 Days / Week)',
    coachingStyle: 'Fast-paced, high-density group strength flow.',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'beginner-onboarding',
    title: 'The Discipline Foundation',
    tagline: 'Beginner Gym Integration',
    description: 'A structural onboarding map for fresh gym-goers. Overcome anxiety, learn gym safety, standard machines, and basic nutrition.',
    goals: ['Establish consistent gym habits', 'Master basic movement patterns safely', 'Understand simple calorie math'],
    benefits: ['Substantial confidence build', 'Steady physical strength foundation', 'Zero-injury progression guarantee'],
    intensity: 'Beginner',
    duration: '6 Weeks (3 Days / Week)',
    coachingStyle: 'Empathetic, structured, patient lifting progression guidance.',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'advanced-athlete',
    title: 'Till Failure Elite',
    tagline: 'Advanced Athlete Conditioning',
    description: 'For candidates with several years of consistent lifting. Intensive high-threshold intensity techniques (Drop sets, Rest-Pause, Negatives).',
    goals: ['Trigger new localized muscle fiber recruitment', 'Enhance mental endurance indices', 'Push physical capacity to true absolute failure'],
    benefits: ['Unprecedented mental toughness', 'Peak physical conditioning', 'Break long-standing volume locks'],
    intensity: 'Advanced',
    duration: '8 Weeks (5 Days / Week)',
    coachingStyle: 'Extreme high intensity, high volume, with close spotter support.',
    imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'rehab-mobility',
    title: 'Joint Restore & Strength',
    tagline: 'Physiological Rehab & Alignment',
    description: 'Fix chronic shoulder discomfort, back stiffness, and knee click indicators while building foundational strength.',
    goals: ['Restore joint space and lubrication', 'Equalize minor structural asymmetries', 'Strengthen postural skeletal bases'],
    benefits: ['Completely pain-free heavy lifting', 'Improved daily sleep quality', 'Full functional range of motion'],
    intensity: 'Beginner',
    duration: '8 Weeks (3 Days / Week)',
    coachingStyle: 'Careful therapeutic rehabilitation pacing with strict biomechanical assessments.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600'
  }
];

export const trainersData: Trainer[] = [
  {
    id: 'biplab-singh',
    name: 'Coach Biplab Singh',
    role: 'Head Strength Coach & CO-Owner',
    experience: '12+ Years in Hardcore Barbell Mechanics',
    certifications: [
      'K11 Certified Master Trainer in Elite Personal Training',
      'IPF India Verified Powerlifting Platform Coach',
      'IFBB Advanced Biomechanics & Gym Operations'
    ],
    specialty: [
      'Absolute Barbell Powerlifting',
      'Advanced Heavy Orthopedic Joint Alignment',
      'Elite Body Transformations'
    ],
    philosophy: 'A graphic representation of a workout means zero unless the barbell is loaded. Strength is the prerequisite for life.',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400',
    instagram: 'biplab.failure'
  },
  {
    id: 'suman-ghosh',
    name: 'Coach Suman Ghosh',
    role: 'Transformation Architect Lead',
    experience: '8+ Years elite fat-loss structural planning',
    certifications: [
      'Golds Gym National Education Specialist Certified',
      'Precision Nutrition Level 2 (Sports Deficits & Caloric Math)',
      'ACSM Certified Exercise Physiologist'
    ],
    specialty: [
      'Custom Caloric Coaching Logistical Audits',
      'Extreme Fat Loss & Vascular Density Progression',
      'Contest Prep Coaching'
    ],
    philosophy: 'Genetics are templates. Complete discipline is the sculptor. I do not permit average effort under my ceiling.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    instagram: 'suman.tf'
  },
  {
    id: 'priya-shaw',
    name: 'Coach Priya Shaw',
    role: 'Women\'s Strength & Conditioning Expert',
    experience: '6+ Years in Female Hypertrophy & Hormonal Adaptation',
    certifications: [
      'NASM Women\'s Fitness Specialist (WFS)',
      'Certified Strength and Conditioning Specialist (CSCS)',
      'REPs certified Kettlebell Core specialist'
    ],
    specialty: [
      'Female Metabolic Rate Acceleration',
      'Glute/Hamstring Hypertrophy specialization',
      'Functional Mobility Training'
    ],
    philosophy: 'Strong is high authority. Reject standard fragile cardios. Lift heavy, lift formatted, and lead the transformation movement.',
    imageUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400',
    instagram: 'priya.lifts.tf'
  },
  {
    id: 'subrata-das',
    name: 'Coach Subrata Das',
    role: 'Senior Bodybuilding Mentor',
    experience: '10+ Years Competitive Stage Coaching',
    certifications: [
      'National Academy of Sports Medicine (NASM) CPT',
      'WBBA Elite Bodybuilder Silver Medal Class A',
      'International Sports Sciences Association (ISSA) Nutrition Specialist'
    ],
    specialty: [
      'Severe Hypertrophic Muscle Volumizer Methods',
      'Vascular Conditioning Strategy',
      'Skeletal Form Symmetry'
    ],
    philosophy: 'When you hit muscle failure, the brain begs you to rack the bar. That has to be where the growth set begins.',
    imageUrl: 'https://images.unsplash.com/photo-1605218403397-24d377d04bd0?auto=format&fit=crop&q=80&w=400',
    instagram: 'subrata.iron'
  },
  {
    id: 'rahul-mukherjee',
    name: 'Coach Rahul Mukherjee',
    role: 'Functional Conditioning & Rehab Lead',
    experience: '7+ Years in Athletic Agility and Orthopedic Rehab',
    certifications: [
      'Gold\'s Gym Fitness Academy (GGFA) Certified',
      'Certified Strength Specialist - West Bengal Sports Association',
      'Dry Needling & Myofascial Release Specialist Certification'
    ],
    specialty: [
      'Injury Free Movement Re-Education',
      'Explosive Plyometrics & Kettlebells',
      'Core Kinetic Torque Control'
    ],
    philosophy: 'Movement should be powerful and frictionless. I fix biomechanical cracks before adding absolute horsepower.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    instagram: 'rahul.functional.tf'
  },
  {
    id: 'ananya-sen',
    name: 'Coach Ananya Sen',
    role: 'Precision Nutritionist & Lifestyle Coach',
    experience: '5+ Years Clinical Dietetics & Athletic Supplements',
    certifications: [
      'B.Sc. in Nutrition & Dietetics - Calcutta University',
      'ISSN Certified Sports Nutritionist',
      'Precision Nutrition Level 1 (PN1)'
    ],
    specialty: [
      'Keto, High-Protein Carb-Cycling Architecture',
      'Metabolic Deficit Thyroid/PCOS Adaptation Coaching',
      'Hormone Balance Nutrition Logs'
    ],
    philosophy: 'You cannot out-squat a garbage diet. Food is software instructions. Let me rewrite your macronutrient code.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    instagram: 'ananya.nutrition'
  }
];

export const membershipPlansData: MembershipPlan[] = [
  {
    id: 'monthly',
    name: 'Iron Starter',
    price: 1200,
    duration: '1 Month',
    popular: false,
    tagline: 'Basic Core Access Tier',
    features: [
      'Full Access to Heavy Barbell weight floor lines',
      'Full locker access & dynamic trial program logs',
      'Introductory session with platform coach',
      'Operating slot window allocation'
    ]
  },
  {
    id: 'quarterly',
    name: 'Discipline Cohort',
    price: 3200,
    originalPrice: 3600,
    duration: '3 Months',
    popular: true,
    tagline: 'Most Popular Habits Phase',
    features: [
      '15% Save over monthly core pricing',
      '2 Comprehensive strength biomechanics assesment slots',
      'Starter Macronutrient Matrix consultation card',
      'Access to off-peak slots with zero restrictions',
      'Lockers & shower access'
    ]
  },
  {
    id: 'half-yearly',
    name: 'Transformation Engine',
    price: 5800,
    originalPrice: 7200,
    duration: '6 Months',
    popular: false,
    tagline: 'Physique Overhaul Blueprint',
    features: [
      '20% Bulk rate save benchmark',
      'Free Entry into any Till Failure Transformation Challenge',
      '3 Dedicated Caliper body-fat testing index dates',
      '6 Detailed nutritional macro review blocks',
      'Priority access to heavy deadlift cages and platforms'
    ]
  },
  {
    id: 'yearly',
    name: 'Unyielding Failure Club',
    price: 10000,
    originalPrice: 14400,
    duration: '12 Months',
    popular: false,
    tagline: 'Complete Lifestyle Overhaul',
    features: [
      'Extreme savings (equivalent to Rs. 833 / month)',
      '12 Private consultation logs (1 every month)',
      'Full family event guest token pass once a month',
      'Custom printed "Till Failure Coach Club" dry-fit armor vest',
      'Unlimited operations and lock-in of prime evening workout slot'
    ]
  }
];

export const transformationStoriesData: TransformationStory[] = [
  {
    id: 'ayushman-chatterjee',
    name: 'Ayushman Chatterjee',
    age: 27,
    category: 'Fat Loss',
    beforeWeight: '104 KG',
    afterWeight: '78 KG',
    duration: '16 Weeks',
    story: 'As an IT senior consultant working standard sedentary shifts in Rajarhat, my stress and body fat were surging. Coach Suman reconstructed my posture and structured simple carb-cycling routines. Grinding Till Failure literally rebuilt my focus, dropping 26 kilograms while adding dense shoulder definitions.',
    achievement: 'Lost 26 KG fat while multiplying power outputs',
    trainer: 'Coach Suman Ghosh',
    imageUrlBefore: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400&auto=compress&opacity=0.4',
    imageUrlAfter: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
    profession: 'Software Architect',
    location: 'Rishra Station Corridor'
  },
  {
    id: 'sourav-paul',
    name: 'Sourav Paul',
    age: 23,
    category: 'Muscle Gain',
    beforeWeight: '59 KG',
    afterWeight: '74 KG',
    duration: '24 Weeks',
    story: 'Being chronically skinny, I felt highly intimidated entering weight floors. Coach Biplab made me feel at home but held me to uncompromising performance levels. Standard progressive compound overloading became my ritual. Six months later, I am packing 15 kilos of dense lean fiber muscle.',
    achievement: 'Gained 15 KG lean mass index',
    trainer: 'Coach Biplab Singh',
    imageUrlBefore: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400&auto=compress&opacity=0.4',
    imageUrlAfter: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
    profession: 'Student (Serampore College)',
    location: 'Serampore'
  },
  {
    id: 'shreya-bhattacharya',
    name: 'Shreya Bhattacharya',
    age: 31,
    category: 'Lifestyle Transformation',
    beforeWeight: '79 KG',
    afterWeight: '63 KG',
    duration: '12 Weeks',
    story: 'Managing high-intensity teaching shifts alongside clinical PCOS made losing weight a massive drag. Coach Priya formulated customized metabolic rate stimulants and steady barbell routines. Dropping 16 KG has leveled up my joint mobility and completely restored my daily hormones.',
    achievement: 'Lost 16 KG, completely eliminated metabolic lethargy',
    trainer: 'Coach Priya Shaw',
    imageUrlBefore: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&auto=compress&opacity=0.4',
    imageUrlAfter: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400',
    profession: 'Kolkata Secondary Teacher',
    location: 'Konnagar'
  },
  {
    id: 'karan-gupta',
    name: 'Karan Gupta',
    age: 35,
    category: 'Athletic Conditioning',
    beforeWeight: '92 KG',
    afterWeight: '81 KG',
    duration: '12 Weeks',
    story: 'I had developed persistent low back pain that kept me from heavy movements. Under Coach Rahul, we did deep mobility work and rebuilt my stability vectors from scratch. Today, my pain is completely non-existent and my deadlift is sitting high at 180 KG!',
    achievement: 'Postural pain eradicated, Deadlift increased by 50 KG',
    trainer: 'Coach Rahul Mukherjee',
    imageUrlBefore: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400&auto=compress&opacity=0.4',
    imageUrlAfter: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=400',
    profession: 'Jute Mill Operations Head',
    location: 'Rishra Broad Road'
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'muscle-growth-overload',
    title: 'The Truth About Progressive Overload: More Than Adding Weight',
    excerpt: 'Many gym-goers fail to grow because they equate progressive overload to just throwing plates on a bar. Discover the 5 hidden variables of hypertrophy.',
    content: 'We see it hourly on the Rishra workout floor: lift-enthusiasts grinding out messy reps just to log a higher weight. Real muscular hypertrophy registers when cellular muscle tension reaches a premium threshold. Progressive overload, scientifically managed, can be advanced by improving lifting leverage, increasing control/eccentric pauses (3-second negatives), shortening recovery times, adding target set volume, or completing reps with superior neurological form. Do not load a barbell with ego; load it with programmatic intent and lift Till Failure with safety.',
    category: 'Training',
    date: 'May 12, 2026',
    readTime: '5 min read',
    author: 'Coach Biplab Singh',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
    tags: ['Lifting Science', 'Hypertrophy', 'Form']
  },
  {
    id: 'local-diet-macros',
    title: 'Calcutta Diet Matrix: How to Hit Your Muscle Macros Locally',
    excerpt: 'Lacking access to expensive western health food imports? Master tracking your bulking and cutting protein indices using clean local ingredients.',
    content: 'A classic excuse we audit is "eating high protein in West Bengal is too expensive/hard." This is completely false. A local Hooghly athlete has stellar, cost-effective, high-yield sources: fresh local sattu, desk-scrambled local farm eggs, premium local Rohu or Katla fish (dense in lean Omega-3 values), locally set double-toned paneer, and high-yield pulses. Tracking sattu is a stellar cheat code, packing 20 grams of premium vegetarian protein and 10 grams of digestive fiber per hundred grams. Match this with proper macro portion control, and you will outgrow anyone relying on expensive fancy isolates alone.',
    category: 'Nutrition',
    date: 'May 18, 2026',
    readTime: '6 min read',
    author: 'Coach Ananya Sen',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
    tags: ['Local Diet', 'Cheap Protein', 'Macros']
  },
  {
    id: 'overcome-gym-anxiety',
    title: 'Overcoming Iron Floor Anxiety: The Habit Blueprint',
    excerpt: 'Does entering a hardcore gym space intimidate you? Read our mental guide to mastering the floor on your first day and earning local respect.',
    content: 'We understand. The heavy metal clanging of a strength platform, loud breathing, and ripped coaches looking from training cubes can raise anyone\'s pulse. But know this: every single coach at Till Failure was once physically weak or out-of-shape. Hardcore iron culture does not judge newcomers; we judge bad attitude. When you show up, wipe your benches, rerack your dumbbells, and ask for active spotters with respect, you instantly earn the brotherhood of our floor. Build consistency, establish your slot time, and the weights will quickly begin to feel lighter.',
    category: 'Mindset',
    date: 'May 24, 2026',
    readTime: '4 min read',
    author: 'Coach Rahul Mukherjee',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400',
    tags: ['Habit Building', 'Mental Health', 'Anxiety']
  },
  {
    id: 'avoid-fat-loss-crashing',
    title: 'The Dangerous Mistakes of Extreme Crashing Deficits',
    excerpt: 'Starvation diets will completely murder your muscle cells, slow your thyroid down, and cause immediate fat rebound. Learn metabolic math.',
    content: 'When people in Serampore or Rishra decide to cut down for family festive seasons, they often cut their calories down to a punishing 800 per day. While the scale initially registers weight loss, the data is disastrous: you are shedding active muscle structures while your metabolic shield slows to a halt. When you inevitably relapse, your body deposits fat even faster to protect itself against starvation. The correct strategy is a gentle, progressive 300-500 calorie deficit match with heavy loading indicators. This maintains the physical engine speed while burning fat securely.',
    category: 'Nutrition',
    date: 'May 29, 2026',
    readTime: '7 min read',
    author: 'Coach Suman Ghosh',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400',
    tags: ['Deficits', 'Metabolic Rate', 'Cutting Science']
  }
];
