// Where each cause is tracked now that #4471 is split. One cause, one ticket.
import type { Cause } from '#lib/kb/causes';

export const TRACKER = 'https://github.com/lmilewicz/mega-what-it-shows/issues';

export const TICKETS: Record<Cause, { issue: number; title: string }> = {
  parser: { issue: 1, title: 'Dates parse month first for day-first tenants' },
  hint: { issue: 2, title: 'booking-v3 form hint says MM/DD/YYYY to day-first tenants' },
  shift: { issue: 3, title: 'Bookings shift by one day across time zones' },
};

export const ticketUrl = (c: Cause) => `${TRACKER}/${TICKETS[c].issue}`;
