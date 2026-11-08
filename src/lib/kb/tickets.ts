// Where each problem in #4471 is tracked now that it is split. One problem, one ticket.
// `shift` (a one-day move) has no cause of its own in causes.ts: the desk files those reports
// under their tenant's cause and lists them in desk-notes.json (`oneDayMove`).
import type { Cause } from '#lib/kb/causes';

export type Problem = Cause | 'shift';

export const TRACKER = 'https://github.com/lmilewicz/mega-what-it-shows/issues';

export const TICKETS: Record<Problem, { issue: number; title: string }> = {
  parser: { issue: 1, title: 'Dates parse month first for day-first tenants' },
  hint: { issue: 2, title: 'booking-v3 form hint says MM/DD/YYYY to day-first tenants' },
  shift: { issue: 3, title: 'Bookings shift by one day across time zones' },
};

export const ticketUrl = (p: Problem) => `${TRACKER}/${TICKETS[p].issue}`;
