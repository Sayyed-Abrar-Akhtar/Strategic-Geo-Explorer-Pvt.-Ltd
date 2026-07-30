import React from 'react';
import type { ValueProp } from '@/lib/types';
import { Icon } from './Icon';

interface ValuePropsSectionProps {
  valueProps: ValueProp[];
}

export function ValuePropsSection({ valueProps }: ValuePropsSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Partner With Apex?
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            We operate at the intersection of geotechnical expertise, strict environmental compliance, and structural design.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop) => (
            <div
              key={prop.id}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-6">
                <Icon name={prop.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {prop.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
