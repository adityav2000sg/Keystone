"use client";

/** Merlin-style conversational demo: user ask + Keystone response */
export function ChatDemo() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-keystone-border bg-keystone-bg-subtle/50 p-6 shadow-sm dark:bg-keystone-surface/30">
      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-keystone-ink px-4 py-3 text-sm text-white">
            Hey Keystone — what should I focus on today?
          </div>
        </div>
        <div className="text-sm text-keystone-ink-muted">Checking your inbox and calendar…</div>
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-keystone-border bg-keystone-surface px-4 py-3 text-sm text-keystone-ink dark:bg-keystone-bg-subtle dark:border-keystone-border">
            <p className="font-medium text-keystone-ink">Here’s your Today view:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-keystone-ink-muted">
              <li>
                <strong className="text-keystone-ink">Investor reply</strong> — Sarah’s email re: runway (thread #42)
              </li>
              <li>
                <strong className="text-keystone-ink">Product sync</strong> — 2pm, 3 action items from last meeting
              </li>
              <li>
                <strong className="text-keystone-ink">Follow-up</strong> — Jason re: Tokyo dates (I can draft options)
              </li>
            </ul>
            <p className="mt-3 text-keystone-ink-muted">
              I’ve got draft replies ready. Review and send when you’re ready—nothing goes out without you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
