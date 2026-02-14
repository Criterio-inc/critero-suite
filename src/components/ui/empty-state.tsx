"use client";

import { Icon } from "@/components/ui/icon";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
      )}
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground max-w-md">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
