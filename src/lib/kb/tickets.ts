// Where each problem in #4471 is tracked now that it is split. One cause, one ticket.
import type { Cause } from '#lib/kb/causes';

export const TRACKER = 'https://github.com/lmilewicz/mega-what-it-shows/issues';

export const TICKETS: Record<Cause, { issue: number; title: string }> = {
  parser: { issue: 1, title: 'Dates parse month first for day-first tenants' },
  hint: { issue: 2, title: 'Booking form hint says MM/DD/YYYY to day-first tenants' },
};

export const ticketUrl = (c: Cause) => `${TRACKER}/${TICKETS[c].issue}`;
