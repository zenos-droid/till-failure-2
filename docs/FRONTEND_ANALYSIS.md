# Frontend Analysis

## 1. Route Inventory

- `/`: marketing home.
- `/about`: gym story and brand details.
- `/programs`: training programs.
- `/trainers`: public coach profiles and consultation forms.
- `/memberships`: membership plans and enquiry flow.
- `/transformations`: transformation stories and challenge registration.
- `/bmi-calculator`: public BMI calculator.
- `/blog`: public education content.
- `/contact`: contact/free-trial/enquiry flows.
- `/join-now`: membership registration call-to-action.
- `/login`: role-scoped portal authentication.
- `/signup`: member self-onboarding.
- `/forgot-password`: recovery request.
- `/reset-password`: recovery completion.
- `/portal`: protected role dashboard resolver.
- `/portal font-bold`: stray protected alias preserved by the current frontend.

## 2. Dashboard Inventory

- Admin: overview metrics, member directory, trainer roster, receptionist list, notice broadcasting, trainer assignment.
- Receptionist: check-in terminal, renewal workflow, lead board, payment invoice stream.
- Trainer: assigned member directory, workout plans, diet plans, biometric progress logs.
- Member: profile summary, expiry countdown, assigned coach, biometrics, workout/diet plans, receipts.

## 3. Form Inventory

- Login: email, password, role.
- Signup: name, email, phone, gender, preferred slot, plan, password confirmation.
- Forgot password: email.
- Reset password: token and new password.
- Admin member creation: name, email, phone, gender, plan, slot.
- Admin trainer creation: name, email, phone, specialty.
- Admin notice creation: title, content, target role.
- Admin trainer assignment: member and trainer.
- Reception lead capture: name, phone, interest.
- Reception renewal: member, plan, amount.
- Trainer workout: member, title, day routines.
- Trainer diet: member, title, calories, protein, meals.
- Trainer biometrics: member, weight, BMI, muscle mass, body fat, notes.
- Public enquiry/trial/consultation/challenge forms.

## 4. Existing Role System

The app uses four roles: `ADMIN`, `RECEPTIONIST`, `TRAINER`, and `MEMBER`. `ProtectedRoute` checks for a logged-in session and optionally role membership. `PortalLayout` chooses the dashboard based on `currentUser.role`.

## 5. Existing Data Models

Frontend models include `SessionUser`, `SaasMember`, `SaasTrainer`, `SaasReceptionist`, `Lead`, `PaymentRecord`, `AttendanceRecord`, `NoticeInfo`, `MemberProgress`, `WorkoutPlan`, and `DietPlan`, plus public marketing entities for trainers, programs, memberships, transformations, posts, and booking submissions.

## 6. Existing Services

Services exist for auth, members/leads/progress/plans, trainers/assignments/notices, attendance, payments, and a simulated API client. Components mostly call the Zustand store directly, so the store is the practical integration adapter.

## 7. Existing Mock Data Structures

`src/mocks/operations.mock.ts` contains seeded trainers, receptionists, members, leads, payments, notices, attendance, workouts, diets, and progress. These are migrated into backend Prisma seed data and removed as frontend runtime source of truth.

## 8. Required Backend APIs

- `POST /api/auth/login`, `POST /api/auth/logout`, `POST /api/auth/refresh`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `GET/PUT /api/auth/profile`
- `GET /api/bootstrap`
- `GET/POST/PUT/DELETE /api/members`, `POST /api/members/:id/renew`, `GET /api/members/:id/history`
- `GET/POST/PUT/DELETE /api/trainers`, `GET /api/trainers/:id/members`
- `GET/POST/PUT/DELETE /api/receptionists`
- `POST /api/assignments/:memberId/trainer`, `DELETE /api/assignments/:memberId/trainer`
- `GET /api/leads`, `POST /api/leads`, `PUT /api/leads/:id`
- `GET /api/attendance`, `POST /api/attendance/checkin/:memberId`
- `GET/POST /api/payments`, `GET /api/payments/:id/receipt`
- `GET/POST/DELETE /api/notices`
- `POST /api/workouts`, `GET /api/workouts/member/:memberId`
- `POST /api/diets`, `GET /api/diets/member/:memberId`
- `POST /api/progress`
- `GET /api/analytics/overview`

## 9. Required Database Models

User, Member, Trainer, Receptionist, Lead, MembershipPlan, MembershipHistory, TrainerAssignment, AttendanceRecord, PaymentRecord, ReceiptRecord, Notice, WorkoutPlan, WorkoutExercise, DietPlan, DietMeal, ProgressMetric, NotificationTemplate, NotificationQueueItem, NotificationLog, AuditLog, PasswordResetToken, RefreshToken.

## 10. Required Frontend Modifications

- Move the frontend into `frontend/` without changing visual components.
- Replace simulated API client with a real fetch client using `VITE_API_URL`.
- Hydrate the Zustand store from `GET /api/bootstrap`.
- Route auth, profile, member, trainer, lead, attendance, payment, plan, notice, and progress mutations through backend APIs.
- Preserve optimistic UI behavior for existing synchronous dashboard handlers.
- Add token storage, refresh handling, and logout cleanup.
