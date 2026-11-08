<script lang="ts">
  // One number from a ticket's cause groups, for use inside a sentence. Computed, never typed.
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, type Cause, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  let { ticket, cause, of = 'reports' }: { ticket: number; cause?: Cause; of?: 'reports' | 'tenants' | 'causes' } = $props();

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const groups = $derived(groupByCause(merged, tenantOf, notes.oneDayMove));
  const g = $derived(cause ? groups.find((x) => x.cause === cause) : undefined);
  const n = $derived(of === 'causes' ? groups.length : !cause ? merged.length : of === 'tenants' ? (g?.tenants ?? 0) : (g?.reports.length ?? 0));
</script>

<strong>{n}</strong>
