<script lang="ts">
  // One number from the desk's view of a ticket, for use inside a sentence. Computed, never typed.
  // Counts follow the desk: a report is counted under the cause it is filed under (causes.ts);
  // `shift` counts the reports the desk read as a one-day move (desk-notes.json).
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import type { Problem } from '#lib/kb/tickets';

  let { ticket, problem, of = 'reports' }: { ticket: number; problem?: Problem; of?: 'reports' | 'tenants' | 'problems' } = $props();

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const groups = $derived(groupByCause(merged, tenantOf));
  const shift = $derived(merged.filter((r) => notes.oneDayMove.includes(r.id)));
  const pick = $derived(problem === 'shift' ? shift : (groups.find((g) => g.cause === problem)?.reports ?? []));
  const n = $derived(
    of === 'problems'
      ? groups.filter((g) => g.cause !== 'unplaced').length + (shift.length ? 1 : 0)
      : !problem
        ? merged.length
        : of === 'tenants'
          ? new Set(pick.map((r) => r.tenant)).size
          : pick.length,
  );
</script>

<strong>{n}</strong>
