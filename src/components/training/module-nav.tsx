"use client";

import { Icon } from "@/components/ui/icon";
import type { EnhancedModule } from "@/config/courses/types";
import type { ModuleProgress } from "@/config/courses/types";
import { isModuleComplete } from "@/lib/academy-progress";

interface ModuleNavProps {
  modules: EnhancedModule[];
  activeModuleIndex: number;
  moduleProgress: Record<string, ModuleProgress>;
  onSelectModule: (index: number) => void;
}

export function ModuleNav({
  modules,
  activeModuleIndex,
  moduleProgress,
  onSelectModule,
}: ModuleNavProps) {
  return (
    <nav className="space-y-1">
      {modules.map((mod, idx) => {
        const isActive = idx === activeModuleIndex;
        const mp = moduleProgress[mod.id];
        const isDone = mp ? isModuleComplete(mp) : false;

        return (
          <button
            key={mod.id}
            onClick={() => onSelectModule(idx)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors ${
              isActive
                ? "bg-primary/10 border border-primary/20"
                : "hover:bg-muted/50"
            }`}
          >
            {/* Step indicator */}
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold shrink-0 ${
                isDone
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                  : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {isDone ? (
                <Icon name="check" size={12} />
              ) : (
                idx + 1
              )}
            </div>

            {/* Title */}
            <span
              className={`text-xs font-medium truncate ${
                isActive
                  ? "text-primary"
                  : isDone
                    ? "text-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {mod.title}
            </span>

            {/* Active arrow */}
            {isActive && (
              <Icon
                name="chevron-right"
                size={12}
                className="text-primary shrink-0 ml-auto"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
