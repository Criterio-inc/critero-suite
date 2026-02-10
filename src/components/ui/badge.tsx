import { cn } from "@/lib/utils";
import { STATUS_LABELS, PRIORITY_LABELS, LEVEL_LABELS } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "outline" ? "border border-border" : "bg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", `badge-${status}`)}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  return <span className={`priority-${priority} text-sm`}>{PRIORITY_LABELS[priority] ?? priority}</span>;
}

export function LevelBadge({ level }: { level: string }) {
  return (
    <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium", `level-${level}`)}>
      {LEVEL_LABELS[level] ?? level}
    </span>
  );
}
