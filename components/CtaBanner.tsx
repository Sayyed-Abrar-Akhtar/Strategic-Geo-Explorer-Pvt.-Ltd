import React from 'react';
import Link from 'next/link';

interface CtaBannerProps {
  headline: string;
  buttonLabel: string;
  buttonHref: string;
}

export function CtaBanner({ headline, buttonLabel, buttonHref }: CtaBannerProps) {
  return (
    <section className="bg-teal-700 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
          {headline}
        </h2>
        <div className="mt-8 flex justify-center">
          <Link
            href={buttonHref}
            className="rounded-md bg-white px-6 py-3 text-base font-semibold text-teal-800 shadow-sm hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
