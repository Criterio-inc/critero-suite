"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { RoleDeepDive } from "@/config/courses/types";
import { getRoleDefinition } from "@/config/courses/roles";

interface RoleDeepDiveSectionProps {
  roleDeepDives: RoleDeepDive[];
}

export function RoleDeepDiveSection({
  roleDeepDives,
}: RoleDeepDiveSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const current = roleDeepDives[activeTab];
  const roleDef = getRoleDefinition(current.role);

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Tab header */}
      <div className="flex border-b border-border/60 bg-muted/20">
        {roleDeepDives.map((rd, idx) => {
          const def = getRoleDefinition(rd.role);
          const isActive = idx === activeTab;

          return (
            <button
              key={rd.role}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-medium transition-colors relative ${
                isActive
                  ? `${def.colorClass} bg-card`
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Icon name={def.icon} size={14} />
              {def.label}
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-5 space-y-4">
        {/* Role badge + perspective */}
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${roleDef.bgClass}`}
          >
            <Icon name={roleDef.icon} size={18} className={roleDef.colorClass} />
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${roleDef.colorClass}`}>
              {roleDef.label}s perspektiv
            </h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {current.perspective}
            </p>
          </div>
        </div>

        {/* Key actions */}
        <div>
          <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Icon name="zap" size={12} className="text-primary" />
            Nyckelåtgärder
          </h5>
          <ul className="space-y-1.5">
            {current.keyActions.map((action, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Icon
                  name="arrow-right"
                  size={12}
                  className={`${roleDef.colorClass} shrink-0 mt-1`}
                />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pitfalls */}
        <div>
          <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Icon name="alert-triangle" size={12} className="text-amber-500" />
            Vanliga fallgropar
          </h5>
          <ul className="space-y-1.5">
            {current.pitfalls.map((pitfall, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Icon
                  name="alert-circle"
                  size={12}
                  className="text-amber-500 shrink-0 mt-1"
                />
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
