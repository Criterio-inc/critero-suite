"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Check, X, Info, AlertTriangle, type LucideProps } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

const icons: Record<ToastType, React.ComponentType<LucideProps>> = {
  success: Check,
  error: X,
  info: Info,
  warning: AlertTriangle,
};

const styles: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
  error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
};

const iconStyles: Record<ToastType, string> = {
  success: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
  error: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
  info: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [exiting, setExiting] = useState(false);
  const IconComponent = icons[toast.type];

  useEffect(() => {
    const duration = toast.duration ?? 4000;
    const exitTimer = setTimeout(() => setExiting(true), duration - 300);
    const removeTimer = setTimeout(() => onDismiss(toast.id), duration);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [toast, onDismiss]);

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300",
        styles[toast.type],
        exiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      )}
    >
      <span className={cn("flex h-5 w-5 items-center justify-center rounded-full", iconStyles[toast.type])}>
        <IconComponent size={12} />
      </span>
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-current opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
