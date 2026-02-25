/** Merlin-style: Keystone vs Traditional EA comparison */
export function PricingComparison() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      {/* Keystone */}
      <div className="rounded-2xl border-2 border-keystone-accent bg-keystone-surface/50 p-8 dark:bg-keystone-surface/20">
        <h3 className="text-xl font-semibold text-keystone-ink">Keystone</h3>
        <ul className="mt-6 space-y-3 text-sm text-keystone-ink-muted">
          <li className="flex gap-2">
            <span className="text-keystone-accent">✓</span>
            Available 24/7. Inbox + Calendar in one Today view.
          </li>
          <li className="flex gap-2">
            <span className="text-keystone-accent">✓</span>
            Receipts-first summaries. Every claim tied to evidence.
          </li>
          <li className="flex gap-2">
            <span className="text-keystone-accent">✓</span>
            Draft replies and proposals. You approve—nothing sends without you.
          </li>
          <li className="flex gap-2">
            <span className="text-keystone-accent">✓</span>
            SOC 2–ready. No human sees your data. PII-safe by design.
          </li>
          <li className="flex gap-2">
            <span className="text-keystone-accent">✓</span>
            Prioritization with “why ranked” so you stay in control.
          </li>
          <li className="flex gap-2">
            <span className="text-keystone-accent">✓</span>
            Connect Gmail + Calendar in minutes. Read-only first.
          </li>
          <li className="flex gap-2">
            <span className="text-keystone-accent">✓</span>
            No contracts. Start and stop when you want.
          </li>
        </ul>
        <p className="mt-6 text-lg font-semibold text-keystone-ink">
          Simple pricing. No payroll, no HR, no hidden costs.
        </p>
      </div>

      {/* Traditional EA */}
      <div className="rounded-2xl border border-keystone-border bg-keystone-bg-subtle/30 p-8 dark:bg-keystone-surface/10">
        <h3 className="text-xl font-semibold text-keystone-ink-muted">Traditional EA</h3>
        <ul className="mt-6 space-y-3 text-sm text-keystone-ink-muted">
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            Works office hours only. Urgent items can wait.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            Back-and-forth and task switching. Delays are common.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            Still need separate tools for AI, scheduling, email.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            Data privacy depends on one person’s discretion.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            Lists based on memory or scattered notes.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            Waits for instruction. Can overlook urgent items.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            $4,000–$8,000+/month plus benefits and admin time.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 dark:text-red-400">✗</span>
            Weeks to hire, train, and build trust.
          </li>
        </ul>
      </div>
    </div>
  );
}
