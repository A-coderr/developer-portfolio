import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  id?: string;
  title: string;
  children?: ReactNode;
}

interface CaseStudyLinkProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}

export const sectionSpacing =
  "mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20";

export const narrowCopy = "max-w-3xl text-base leading-8 text-muted sm:text-lg";

export function SectionHeading({
  eyebrow,
  id,
  title,
  children,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="font-mono text-xs font-medium uppercase text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {children ? <div className="mt-5 space-y-5">{children}</div> : null}
    </div>
  );
}

export function ExternalCaseStudyLink({
  children,
  href,
  variant = "primary",
}: CaseStudyLinkProps) {
  const className =
    variant === "primary"
      ? "border-action bg-action text-on-action hover:bg-action-hover active:bg-action"
      : "border-control-border text-foreground hover:border-accent hover:text-accent";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold outline-none interactive-transition focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background ${className}`}
    >
      {children}
    </a>
  );
}

export function AnchorCaseStudyLink({ children, href }: CaseStudyLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex h-11 items-center justify-center rounded-full border border-control-border px-5 text-sm font-semibold text-foreground outline-none interactive-transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {children}
    </a>
  );
}

export function TechnicalLabelList({ labels }: { labels: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technical labels">
      {labels.map((label) => (
        <li
          key={label}
          className="border border-border/70 px-3 py-1.5 font-mono text-xs font-medium uppercase text-muted"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export function MetadataList({
  items,
}: {
  items: readonly { label: string; value: string }[];
}) {
  return (
    <dl className="grid gap-x-5 gap-y-6 border-y border-border/70 py-6 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="font-mono text-xs font-medium uppercase text-muted">
            {item.label}
          </dt>
          <dd className="mt-2 text-sm font-medium text-foreground">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function OrderedFlow({ items }: { items: readonly string[] }) {
  return (
    <ol className="grid gap-2">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center border border-border/70 font-mono text-[11px] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-medium text-foreground">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function ComparisonColumn({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-surface p-5 sm:p-6">
      <h3
        className={`font-mono text-xs font-medium uppercase ${
          accent ? "text-accent" : "text-muted"
        }`}
      >
        {title}
      </h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-foreground/90">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiagramNode({
  x,
  y,
  width,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="52"
        rx="8"
        fill={accent ? "var(--accent-subtle)" : "var(--background)"}
        stroke={accent ? "var(--accent)" : "var(--control-border)"}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 33}
        textAnchor="middle"
        fill={accent ? "var(--foreground)" : "var(--muted)"}
        fontSize="18"
        fontFamily="monospace"
      >
        {label}
      </text>
    </g>
  );
}

export function PowerUpArchitectureDiagram() {
  return (
    <div
      data-theme="light"
      className="overflow-hidden rounded-lg border border-border/70 bg-background p-4 sm:p-6"
      aria-hidden="true"
    >
      <svg viewBox="0 0 760 360" className="h-auto w-full">
        <g fill="none" stroke="var(--control-border)" strokeWidth="2">
          <path d="M380 76V132" />
          <path d="M380 190V244" />
          <path d="M140 244H620" />
          <path d="M140 244V282" />
          <path d="M260 244V282" />
          <path d="M380 244V282" />
          <path d="M500 244V282" />
          <path d="M620 244V282" />
        </g>
        <DiagramNode
          x={260}
          y={24}
          width={240}
          label="PowerupController"
          accent
        />
        <DiagramNode x={270} y={132} width={220} label="PowerupBehaviour" />
        <DiagramNode x={92} y={282} width={96} label="Nitro" />
        <DiagramNode x={212} y={282} width={96} label="Turret" />
        <DiagramNode x={332} y={282} width={96} label="Rocket" />
        <DiagramNode x={452} y={282} width={96} label="Oil" />
        <DiagramNode x={572} y={282} width={96} label="OP Hack" />
      </svg>
    </div>
  );
}

export function RecoveryFlow({
  writeSteps,
  loadSteps,
}: {
  writeSteps: readonly string[];
  loadSteps: readonly string[];
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-lg border border-border/70 bg-surface p-5 sm:p-6">
        <h3 className="font-mono text-xs font-medium uppercase text-accent">
          Write
        </h3>
        <div className="mt-5">
          <OrderedFlow items={writeSteps} />
        </div>
      </div>
      <div className="rounded-lg border border-border/70 bg-surface p-5 sm:p-6">
        <h3 className="font-mono text-xs font-medium uppercase text-accent">
          Load
        </h3>
        <div className="mt-5">
          <OrderedFlow items={loadSteps} />
        </div>
      </div>
    </div>
  );
}

export function PowerUpGrid({
  powerUps,
}: {
  powerUps: readonly {
    name: string;
    category: string;
    description: string;
  }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {powerUps.map((powerUp) => (
        <article
          key={powerUp.name}
          className="rounded-lg border border-border/70 bg-surface p-5"
        >
          <p className="font-mono text-xs font-medium uppercase text-accent">
            {powerUp.category}
          </p>
          <h3 className="mt-4 text-xl font-semibold leading-tight text-foreground">
            {powerUp.name}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted">
            {powerUp.description}
          </p>
        </article>
      ))}
    </div>
  );
}
