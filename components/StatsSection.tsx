'use client';

import React, { useEffect, useState } from 'react';
import type { Stat } from '@/lib/types';
import { Icon } from './Icon';

interface StatsSectionProps {
  stats: Stat[];
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1500; // 1.5s
    const stepTime = Math.max(Math.floor(duration / end), 15);

    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection({ stats }: StatsSectionProps) {
  // Map stat IDs to beautiful icons to display on the side
  const getIconForStat = (id: string) => {
    switch (id) {
      case 'years':
        return 'award';
      case 'projects':
        return 'check-circle-2';
      case 'professionals':
        return 'users-2';
      case 'disciplines':
        return 'binary';
      default:
        return 'database';
    }
  };

  return (
    <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4 lg:gap-x-12">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center md:items-start md:text-left border-l-2 border-teal-500/30 pl-4 sm:pl-6">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-teal-500/10 text-teal-400 mb-4">
                <Icon name={getIconForStat(stat.id)} className="h-5 w-5" />
              </div>
              <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-sm font-semibold tracking-wide uppercase text-slate-400">
                {stat.label}
              </dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
