import type { ReactNode } from "react";

type SectionCardProps = {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionCard({
  title,
  description,
  actions,
  children,
  className = "",
  contentClassName = "",
}: SectionCardProps) {
  return (
    <section className={`sigo-card overflow-hidden ${className}`.trim()}>
      <div className="flex flex-col gap-3 border-b border-[var(--sigo-border)] bg-white px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-extrabold text-[var(--sigo-text)]">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-[var(--sigo-muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className={`grid gap-4 p-5 ${contentClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
}
