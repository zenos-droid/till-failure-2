import { env } from './config/env.js';
import { app } from './app.js';
import { registerMembershipJobs } from './jobs/membership.jobs.js';

registerMembershipJobs();

app.listen(env.PORT, () => {
  console.log(`Till Failure backend running on http://localhost:${env.PORT}`);
});
